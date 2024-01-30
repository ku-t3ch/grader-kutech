"use client"
import { api } from '@/trpc/react';
import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProblemSchemaType, addProblemZod } from '@/server/api/routers/zod/problem';

export default function Form() {
    const { register, handleSubmit, formState: { errors } } = useForm<AddProblemSchemaType>({ resolver: zodResolver(addProblemZod) });
    const getRuntimesApi = api.piston.getRuntimes.useQuery();
    const onSubmit = (data: AddProblemSchemaType) => {
        console.log(data);
        
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
            <div className='flex flex-col gap-1'>
                <div className='text-base'>Problem Name</div>
                <input className='input input-bordered' {...register("problem_name")} required />
            </div>
            <div className='flex flex-col gap-1'>
                <div className='text-base'>Problem Language</div>
                <select className='select select-bordered' {...register("problem_language")} defaultValue={"python"} required>
                    {getRuntimesApi.data?.map((item, id) => (
                        <option value={item.language} key={id}>{item.language} {item.version}</option>
                    ))}
                </select>
            </div>
            <div className='flex flex-col gap-1'>
                <div className='text-base'>Problem Code</div>
                <textarea className='rounded-md p-3 focus:outline-none h-full bg-base-300' cols={30} rows={10} {...register("problem_code")} required></textarea>
            </div>

            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    )
}