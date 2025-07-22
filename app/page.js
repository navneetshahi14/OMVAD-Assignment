'use client'
import AddUrlInput from "@/Component/AddUrlInput";
import AllUrl from "@/Component/AllUrl";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [token,setToken] = useState("")
  const [loading,setloading] = useState(false)

  useEffect(()=>{
    setToken(localStorage.getItem("token"))
  },[])

  const [data, setData] = useState([]);
  
  const fetchAllUrl = async () => {
    setloading(true)
    const token = localStorage.getItem("token");
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get("/api/bookmark/fetchAll", header);
    setData(res.data);
    // console.log(data);
    setloading(false);
  };

    useEffect(() => {
      fetchAllUrl();
    }, []);
  

  const navigate = useRouter()
  return (
    <>
      <div className="dark:bg-slate-800 bg-gray-300 h-[90vh] w-full flex items-center justify-center ">
        {
          token ? (
          <div className="h-[95%] w-[98%] dark:bg-slate-700 rounded-2xl p-2 flex flex-col gap-5 items-center justify-center ">
              <AddUrlInput fetchUrl={()=>fetchAllUrl()} isloading={loading} />
              <AllUrl data={data} fetchUrl={()=>fetchAllUrl()}  isloading={loading}/>
          </div>
          ):(
            <div className="h-[95%] w-[98%] dark:bg-slate-700 rounded-2xl p-2 flex flex-col gap-5 items-center justify-center ">
              <h1 className="text-5xl font-bold text-center">
                LinkSaver
              </h1>
              <p className="text-xl dark:text-white text-gray-900"  >Save Your link and auto summarize</p>
              <div className="flex items-center justify-center p-2 w-[90%] lg:w-[50%] gap-5 ">
                <Button className={`dark:bg-white bg-black dark:text-black text-white`} onClick={()=>navigate.push('/signup')}>Join Now</Button>
                <Button className={`dark:bg-white bg-black dark:text-black text-white`} onClick={()=>navigate.push('/signin')}>SignIn</Button>
              </div>
            </div>
          )
        }
      </div>
    </>
  );
}
