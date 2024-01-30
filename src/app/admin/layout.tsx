import { db } from "@/server/db";
import Link from "next/link";
export default function AdminLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: { id: string }
}) {
    

    return (
        <section className="flex gap-5 h-full w-full">
            <div className="flex flex-col max-w-xs w-full gap-3">
                <div className="text-xl">Admin Dashboard</div>
                <div className="w-full h-[1px] bg-white"></div>
                <div className="flex flex-col gap-2">
                    <Link href={`/admin/problem`} className="btn btn-primary btn-sm btn-outline">Problem</Link>
                    <Link href={`/admin/testcase`} className="btn btn-primary btn-sm btn-outline">Test Case</Link>
                    <Link href={`/admin/user`} className="btn btn-primary btn-sm btn-outline">User</Link>
                </div>
            </div>
            {children}
        </section>
    )
}