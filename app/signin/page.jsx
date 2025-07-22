'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'


const page = () => {

    const navigate = useRouter()

    const [email,setEmail] = useState()
    const [password,setPassword] = useState()

    const handleSignIn = async() =>{
        try{

            const res = await signInWithEmailAndPassword(auth,email,password);
            const user = res.user

            const response = await fetch('/api/auth/signin',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    uid:user.uid,
                    email:user.email
                })
            })

            const resData = await response.json();
            localStorage.setItem("token",resData.token)
            navigate.push("/")

        }catch(err){
            console.log(err.message)
        }
    }


  return (
    <>
        <div className="h-[90vh] dark:bg-slate-800 bg-gray-700 w-full flex items-center justify-center ">
            <div className="lg:w-1/3 w-[90%] min-h-1/2 dark:border-gray-50 border-[1px] rounded-xl shadow-xl flex items-center justify-center flex-col py-2 relative">
                <h1 className="absolute top-[10%] uppercase">SignIn</h1>
                <div className="w-[90%] h-[90%] flex flex-col gap-5">
                    <Input placeholder={"Email"}  type={'email'} onChange={(e)=>setEmail(e.target.value)} />
                    <Input placeholder={"Password"}  type={'password'} onChange={(e)=>setPassword(e.target.value)} />
                    <Button onClick={handleSignIn}>
                        SignIn
                    </Button>
                </div>
                <div className="p-2">
                    Don't have account <span className='cursor-pointer dark:text-blue-500 text-blue-800' onClick={()=>navigate.push('/signup')}>SignUp</span>
                </div>
            </div>            
        </div>
    </>
  )
}

export default page 