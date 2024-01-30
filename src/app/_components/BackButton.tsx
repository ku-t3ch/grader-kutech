"use client"
import { Tasks } from '@prisma/client'
import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function BackButton() {
    const { back } = useRouter()
    return (
        <button onClick={back} className='btn btn-primary btn-sm w-fit'><ChevronLeftIcon /> back</button>
    )
}
