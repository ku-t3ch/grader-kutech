import Link from "next/link"

export default function ProblemLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: { id: string }
}) {
    const { id } = params

    return (
        <section className="flex gap-5 h-full w-full">
            <div className="flex flex-col max-w-xs w-full gap-3">
                <div className="text-xl">A+B Problem</div>
                <div className="w-full h-[1px] bg-white"></div>
                <div className="flex flex-col gap-2">
                    <Link href={`/problem/${id}/statement`} className="btn btn-primary btn-sm btn-outline">Statement</Link>
                    <Link href={`/problem/${id}/submit`} className="btn btn-primary btn-sm btn-outline">Submit</Link>
                    <Link href={`/problem/${id}/my-submission`} className="btn btn-primary btn-sm btn-outline">My Submissions</Link>
                </div>
            </div>
            {children}
        </section>
    )
}