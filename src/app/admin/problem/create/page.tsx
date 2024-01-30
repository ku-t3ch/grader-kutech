import { db } from '@/server/db'
import Link from 'next/link'
import React from 'react'
import { ChevronLeftIcon } from 'lucide-react'
import BackButton from '@/app/_components/BackButton'
import Form from './component/Form'

const getAllProblem = async () => {
    const data = await db.tasks.findMany()
    return data
}


export default async function Problem() {
    const problemAll = await getAllProblem()
    return (
        <div className='w-full flex flex-col gap-3'>
            <div className='flex justify-between'>
               <BackButton />
            </div>
            <Form />
        </div>
    )
}
