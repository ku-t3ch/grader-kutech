import BackButton from '@/app/_components/BackButton'
import { db } from '@/server/db'
import { assert } from 'console'
import React from 'react'

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
            <div className='flex flex-col w-full gap-3'>
                <div className='flex w-full gap-3'>
                    <textarea className="textarea textarea-bordered bg-base-200 w-full" placeholder="Input"></textarea>
                    <textarea className="textarea textarea-bordered bg-base-200  w-full" placeholder="Output" disabled></textarea>
                </div>
                <button className='btn btn-primary'>Add Test Case</button>
            </div>
        </div>
    )
}