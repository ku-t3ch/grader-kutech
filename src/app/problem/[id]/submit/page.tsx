import React from 'react'
import axios from 'axios'
import { RuntimesResponeInterface } from '@/interface/RuntimesResponeInterface'
import { env } from '@/env'

const getRuntime = async () => {
    const { data } = await axios.get<RuntimesResponeInterface[]>(`${env.PISTON_API}/api/v2/runtimes`)
    return data
}

export default async function Problem() {
    const data = await getRuntime()
    console.log(data);

    return (
        <div className='bg-base-200 w-full h-[80vh] p-5 flex flex-col gap-3'>
            <div className='flex justify-between items-center'>
                <div className='text-xl'>Submit</div>
                <select className="select select- select-bordered w-full max-w-xs">
                    <option disabled selected>Language</option>
                    {data.map((item, id) => (
                        <option value={item.language} key={id}>{item.language} {item.version}</option>
                    ))}
                </select>
            </div>
            <textarea className='rounded-md p-3 focus:outline-none h-full' name="" id="" cols="30" rows="10">

            </textarea>
            <div className='w-full'>
                <button className='btn btn-primary w-full'>Submit</button>
            </div>
        </div>
    )
}
