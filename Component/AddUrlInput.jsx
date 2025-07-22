'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AddUrlInput = ({fetchUrl = () => {},isloading}) => {
    const [url,setUrl] = useState();
    const [load,setLoad] = useState(false)

    const handleUrl = async()=>{

        const token = localStorage.getItem('token');
        const res = await fetch("/api/bookmark/fetch",{
            method:"POST",
            headers:{
                'Authorization':`Bearer ${token}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                url
            })
        })

        const resdata = await res.json()
        setLoad(!load)
    }

    useEffect(()=>{
        fetchUrl();
    },[load])

  return (
    <div className={`h-[20%] w-[98%] dark:bg-slate-600 bg-gray-500 rounded-2xl flex flex-col items-center justify-center `}>
        <div className="flex flex-col gap-5">
            <h1 className={`text-center`}>LinkSaver and Auto Summary</h1>
            <div className="flex w-[80vw] gap-5">
                <Input placeholder={"Enter your url"} onChange={(e)=>setUrl(e.target.value)} />
                <Button onClick={handleUrl}>
                    {
                        isloading ? (
                            <p>Loading</p>
                        ):(
                            <p>Add url</p>
                        )
                    }
                </Button>
            </div>
        </div>        
    </div>
  )
}

export default AddUrlInput