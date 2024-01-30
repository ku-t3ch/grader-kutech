import BackButton from '@/app/_components/BackButton'
import React from 'react'

export default function Problem({ params }: { params: { id: string } }) {
    return (
        <div className='w-full flex flex-col gap-3'>
            <BackButton />
            <div>Problem{params.id}</div>
        </div>
    )
}