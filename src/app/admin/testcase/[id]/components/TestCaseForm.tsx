"use client"
import { api } from '@/trpc/react'
import { XIcon } from 'lucide-react'
import React, { useState } from 'react'


type TestCase = {
    input: string
    output: string
}
export default function TestCaseForm({ code }: { code: string }) {
    const executeCodeApi = api.piston.executeCode.useMutation()
    const [TestCases, setTestCases] = useState<TestCase[]>()
    const handleAddTestCase = () => {
        setTestCases(pre => [...pre ?? [], {
            input: "",
            output: ""
        }])
    }

    const handleInput = (i: number, value: string) => {
        setTestCases(pre => {
            if (!pre) return
            pre[i]!.input = value
            return [...pre]
        })
    }

    const handleRemove = (i: number) => {
        setTestCases(pre => {
            if (!pre) return
            pre.splice(i, 1)
            return [...pre]
        })
    }

    const getOutput = async () => {
       const result = await executeCodeApi.mutateAsync({
            files: [
                {
                    content: code,
                    name: "main.py"
                }
            ],
            language: 'python',
            version: '3.9.4',
            stdin:"2\n6"
        },
        {
            
        })
        console.log(result);
        
    }

    return (
        <div className='flex flex-col w-full gap-3'>
            <div className='flex flex-col gap-3'>
                {TestCases?.map((item, i) => (
                    <div className='flex w-full gap-3' key={i}>
                        <textarea className="textarea textarea-bordered bg-base-200 w-full"
                            onChange={(e) => {
                                handleInput(i, e.target.value)
                            }}
                            placeholder="Input" defaultValue={item.input}></textarea>
                        <textarea className="textarea textarea-bordered bg-base-200  w-full" placeholder="Output" disabled defaultValue={item.output}></textarea>
                        <button
                            onClick={() => handleRemove(i)}
                            className='btn btn-error h-full'
                        >
                            <XIcon />
                        </button>
                    </div>
                ))}
            </div>
            <button className='btn btn-success btn-sm' onClick={handleAddTestCase}>Add Test Case</button>
            <button onClick={getOutput} className='btn btn-info btn-sm'>Get Output</button>
        </div>
    )
}
