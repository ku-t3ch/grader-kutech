import { db } from '@/server/db'
import { unstable_noStore } from 'next/cache'
import Link from 'next/link'
import React from 'react'

const getAllProblem = async () => {
    const data = await db.tasks.findMany({
        include: {
            owner: true
        }
    })
    return data
}


export default async function Problem({ params }: { params: { id: string } }) {
    unstable_noStore()
    const problemAll = await getAllProblem()
    return (
        <div className='w-full flex flex-col gap-3'>
            <div className='flex justify-between items-center'>
                <div className='text-xl'>Problems</div>
            </div>
            <div className="flex flex-col gap-3 w-full">
                {problemAll.length > 0 ? problemAll.map((item, i) => (
                    <Link href={`/admin/testcase/${item.id}`} key={i} className="flex flex-col bg-base-200 p-5 rounded-lg hover:bg-base-300 cursor-pointer">
                        <div className="text-xl flex items-center gap-2">
                            {item.name} <span className='badge badge-accent '>{item.language}</span>
                        </div>
                        <div>by {item.owner.email}</div>
                    </Link>
                )) : <>No problems</>}
            </div>

        </div>
    )
}
