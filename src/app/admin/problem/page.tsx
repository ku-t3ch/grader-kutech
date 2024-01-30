import { db } from '@/server/db'
import Link from 'next/link'
import React from 'react'

const getAllProblem = async () => {
    const data = await db.tasks.findMany()
    return data
}


export default async function Problem() {
    const problemAll = await getAllProblem()
    return (
        <div className='w-full flex flex-col'>
            <div className='flex justify-between items-center'>
                <div className='text-xl'>Submit</div>
                <Link href="/admin/problem/create" className='btn btn-primary btn-sm'>Add Problem</Link>
            </div>
            <div className="flex flex-col gap-3 w-full">
                {problemAll.length > 0 ? problemAll.map((_, i) => (
                    <Link href="http://localhost:3000/problem/565/statement" key={i} className="flex flex-col bg-base-200 p-5 rounded-lg hover:bg-base-300 cursor-pointer">
                        <div className="text-xl">
                            A+B Problem
                        </div>
                    </Link>
                )) : <>No problems</>}
            </div>

        </div>
    )
}
