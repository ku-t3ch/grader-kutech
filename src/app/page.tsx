import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreatePost } from "@/app/_components/create-post";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { signOut, useSession } from "next-auth/react";

export default async function Home() {
    noStore();
    return (
        <main className="max-w-7xl mx-auto flex flex-col gap-5">
            <div className="text-2xl">Problem</div>
            <div className="flex flex-col gap-3">
                {[...new Array(10)].map((_, i) => (
                    <Link href="http://localhost:3000/problem/565/statement" key={i} className="flex flex-col bg-base-200 p-5 rounded-lg hover:bg-base-300 cursor-pointer">
                        <div className="text-xl">
                            A+B Problem
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
