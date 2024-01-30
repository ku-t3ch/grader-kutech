import { db } from '@/server/db'
import { getProblemById } from '@/utils/problemDb'
import React from 'react'

export default async function Problem({ params }: { params: { id: string } }) {
    const data = await getProblemById(params.id)
    return (
        <div className='w-full'>
            <embed width="100%" className='h-[90vh]' src={data?.statement!} type="" />
        </div>
    )
}
