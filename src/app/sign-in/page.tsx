"use client"
import React from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation';

export default function page() {
    const param = useSearchParams();

    return (
        <div className='flex min-h-screen justify-center items-center'>
            <div className='flex flex-col gap-2 max-w-sm px-5 md:px-3 w-full'>
                <h1>Sign in</h1>
                <button onClick={() => signIn('google', {
                    callbackUrl: param.get("callbackUrl") ?? "/",
                })} className='btn btn-primary'>Sign in with Google</button>
            </div>
        </div>
    )
}
