// import { db } from '@/server/db'
import Link from 'next/link'
import React from 'react'
import { ChevronLeftIcon } from 'lucide-react'
import BackButton from '@/app/_components/BackButton'
import Form from './component/Form'
import { db } from '@/server/db'
import { unstable_noStore } from 'next/cache'

const getProblemById = async (id: string) => {
    const data = await db.tasks.findUnique({
        where: {
            id: id
        }
    })
    return data
}


export default async function Problem({ params }: { params: { id: string } }) {
    unstable_noStore()
    const problem = await getProblemById(params.id)
    return (
        <div className='w-full flex flex-col gap-3'>
            <div className='flex justify-between'>
                <BackButton />
            </div>
            <Form problem={problem!} />
        </div>
    )
}
