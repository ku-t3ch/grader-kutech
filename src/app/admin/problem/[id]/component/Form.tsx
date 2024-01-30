"use client"
import { api } from '@/trpc/react';
import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProblemSchemaType, EditProblemSchemaType, editProblemZod } from '@/server/api/routers/zod/problemZod';
import toast from 'react-hot-toast';
import { Tasks } from '@prisma/client';

export default function Form({ problem }: { problem: Tasks }) {
    const { register, handleSubmit, formState: { errors } } = useForm<EditProblemSchemaType>({ resolver: zodResolver(editProblemZod) });
    const getRuntimesApi = api.piston.getRuntimes.useQuery();
    const editProblemApi = api.problem.editProblem.useMutation()

    const onSubmit = (data: AddProblemSchemaType) => {
        const key = toast.loading("Submitting...");
        const problem_language = data.problem_language.split("+++")[0]!
        const problem_language_version = data.problem_language.split("+++")[1]!

        editProblemApi.mutate({
            ...data,
            problem_id: problem.id,
            problem_language_version: problem_language_version,
            problem_language: problem_language
        }, {
            onSuccess: () => {
                toast.success("Submitted", { id: key });
            }
        })
    };

    console.log(errors);
    

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
            <div className='flex flex-col gap-1'>
                <div className='text-base'>Problem Name</div>
                <input className='input input-bordered' {...register("problem_name")} required defaultValue={problem.name} />
            </div>
            <div className='flex flex-col gap-1'>
                <div className='text-base'>Problem Statement Link</div>
                <input className='input input-bordered' {...register("problem_statement")} required defaultValue={problem.statement!} />
            </div>
            <div className='flex flex-col gap-1'>
                <div className='text-base'>Problem Language</div>
                <select className='select select-bordered' {...register("problem_language")} defaultValue={problem.language} required>
                    {getRuntimesApi.data?.map((item, id) => (
                        <option value={`${item.language}+++${item.version}`} key={id}>{item.language} {item.version}</option>
                    ))}
                </select>
            </div>
            <div className='flex flex-col gap-1'>
                <div className='text-base'>Problem Code</div>
                <textarea defaultValue={problem.code} className='rounded-md p-3 focus:outline-none h-full bg-base-300' cols={30} rows={10} {...register("problem_code")} required></textarea>
            </div>

            <button type='submit' className='btn btn-primary'>Save</button>
        </form>
    )
}