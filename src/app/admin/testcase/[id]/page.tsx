import BackButton from '@/app/_components/BackButton'
import { db } from '@/server/db'
import { assert } from 'console'
import React, { useState } from 'react'
import TestCaseForm from './components/TestCaseForm'

const getDetail = async (id: string) => {
    const result = await db.tasks.findUnique({
        where: {
            id: id
        }
    })
    return result
}

export default async function Problem({ params }: { params: { id: string } }) {
    const detail = await getDetail(params.id)
    return (
        <div className='w-full flex flex-col gap-3'>
            <BackButton />
            <div>
                {detail?.name}
            </div>
            <TestCaseForm code={detail?.code!} />
        </div>
    )
}