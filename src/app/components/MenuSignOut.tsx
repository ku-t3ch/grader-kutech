"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

export default function MenuSignOut() {
    return (
        <li><a onClick={() => signOut()}>SignOut</a></li>
    )
}
