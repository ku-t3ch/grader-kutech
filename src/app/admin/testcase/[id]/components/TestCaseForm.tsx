"use client"
import { api } from '@/trpc/react'
import { Tasks } from '@prisma/client'
import { XIcon } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid';


type TestCase = {
    input: string
    output: string
    id: string
}

export default function TestCaseForm({ detail }: { detail: Tasks }) {
    const executeCodeApi = api.piston.executeCode.useMutation()
    const testCaseSaveApi = api.problem.saveTestCaseProblem.useMutation()
    const [key, setkey] = useState(0)
    const [TestCases, setTestCases] = useState<TestCase[]>(detail.testCase as TestCase[])
    const handleAddTestCase = () => {
        setTestCases(pre => [...pre ?? [], {
            input: "",
            output: "",
            id: uuidv4()
        }])
    }

    const handleInput = (item: TestCase, value: string) => {
        setTestCases(pre => {
            if (!pre) return pre
            pre.find(i => i.id === item.id)!.input = value
            return [...pre]
        })
    }

    const handleRemove = (item: TestCase) => {
        setTestCases(pre => {
            if (!pre) return pre
            return pre.filter(i => i.id !== item.id)
        })
    }

    const getOutput = async () => {
        if (!TestCases) return
        if (TestCases?.length <= 0) return
        const keyLoading = toast.loading("Loading...")
        console.log(TestCases);

        await Promise.all(
            TestCases.map(async (item) => {
                const result = await executeCodeApi.mutateAsync({
                    files: [
                        {
                            content: detail.code,
                            name: "main"
                        }
                    ],
                    language: detail.language,
                    version: detail.version,
                    stdin: item.input
                }
                )
                setTestCases(pre => {
                    if (!pre) return pre
                    pre.find(i => i.id === item.id)!.output = result.run.output
                    return [...pre]
                })
            })
        )
        setkey(key => key + 1)
        toast.success("Done", {
            id: keyLoading
        })
    }

    const onSaveTestCase = () => {
        const key = toast.loading("Saving...")
        testCaseSaveApi.mutate({
            problem_id: detail.id,
            test_case: TestCases?.map(item => ({
                input: item.input,
                output: item.output,
                id: item.id
            }))!
        }, {
            onSuccess: () => {
                toast.success("Saved", {
                    id: key
                })
            },
            onError: () => {
                toast.error("Failed", {
                    id: key
                })
            }
        })
    }



    return (
        <>
            <div className='flex justify-between items-center'>
                <div>{detail?.name}</div>
                <button onClick={onSaveTestCase} className='btn btn-primary'>Save</button>
            </div>
            <div className='flex flex-col w-full gap-3'>
                <div className='flex flex-col gap-3' key={key}>
                    {TestCases?.map((item, i) => (
                        <div className='flex w-full gap-3' key={item.id}>
                            <textarea className="textarea textarea-bordered bg-base-200 w-full"
                                onChange={(e) => {
                                    handleInput(item, e.target.value)
                                }}
                                placeholder="Input" defaultValue={item.input}></textarea>
                            <textarea className="textarea textarea-bordered bg-base-200  w-full" placeholder="Output" disabled defaultValue={item.output}></textarea>
                            <button
                                onClick={() => handleRemove(item)}
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
        </>
    )
}
