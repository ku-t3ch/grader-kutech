import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreatePost } from "@/app/_components/create-post";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { signOut, useSession } from "next-auth/react";
import { db } from "@/server/db";
import { getAllProblem } from "@/utils/problemDb";



export default async function Home() {
    noStore();
    const result = await getAllProblem();
    return (
        <main className="max-w-7xl mx-auto flex flex-col gap-5">
            <div className="text-2xl">Problem</div>
            <div className="flex flex-col gap-3">
                {result.map((item, i) => (
                    <Link href={`/problem/${item.id}/statement`} key={i} className="flex flex-col bg-base-200 p-5 rounded-lg hover:bg-base-300 cursor-pointer">
                        <div className="text-xl">
                            {item.name}
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
