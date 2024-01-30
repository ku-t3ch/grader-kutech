import { getServerAuthSession } from '@/server/auth';
import Link from 'next/link';
import React from 'react'
import MenuSignOut from './MenuSignOut';

export default async function Header() {
    const session = await getServerAuthSession();
    return (
        <div className="navbar bg-base-200">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
                        <li><Link href={"/"}>Home</Link></li>
                        {session?.user.isAdmin && <li><Link href={"/admin"}>Admin</Link></li>}
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <Link href="/" className="btn btn-ghost text-xl">Grader KU Tech</Link>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="avatar" role="button">
                            <div className="w-8 rounded-full ring  ring-offset-base-100 ring-offset-2">
                                <img src={session?.user.image} />
                            </div>
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
                        <li><a>{session?.user.email}</a></li>
                        <MenuSignOut />
                    </ul>
                </div>

            </div>
        </div>
    )
}
