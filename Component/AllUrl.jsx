"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import axios from "axios";

const AllUrl = ({data,fetchUrl = () => {},isloading}) => {

  const [load,setLoad] = useState(false)
  

  const handleDelete = async (dat) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/bookmark/fetchDelete/${dat._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoad(!load)
    } catch (err) {
      console.log("Delete failed:", err.message);
      alert("Failed to delete bookmark.");
    }
  };

  useEffect(()=>{
    fetchUrl()
  },[load])

  return (
    <div className="h-[80vh] w-[98%] dark:bg-slate-600 bg-gray-500 rounded-2xl flex flex-col items-center p-2 overflow-hidden">
      {
        isloading ? (
          <p className="">Loading....</p>
        ) :(
          <div className="w-full flex-1 overflow-y-auto flex flex-col items-center gap-2 pr-1">
          {data.length > 0 ? (
            data.map((dat, i) => (
              <div
                key={i}
                className="min-h-[20vh] w-[98%] dark:bg-slate-800 bg-gray-300 rounded-xl p-2 gap-2 flex flex-col justify-between"
              >
                <div className="flex flex-col">
                  <h1 className="dark:text-white text-black text-xl uppercase ">
                    {dat.title}
                  </h1>
                  <h3 className="dark:text-white text-black text-sm ">
                    {dat.url}
                  </h3>
                </div>
                <div className=" flex gap-4">
                  <Button
                    variant={"destructive"}
                    onClick={() => handleDelete(dat)}
                    className={`cursor-pointer`}
                  >
                    Delete
                  </Button>
                  <Dialog>
                    <form>
                      <DialogTrigger asChild>
                        <Button variant="outline">Open Summary</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[90%] h-[80%] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Summary</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 items-center justify-center">
                          {/* <Image src={dat.favicon} height={100} width={100} /> */}
                          <img src={dat.favicon} alt="favicon" />
                          <p className="">{dat.summary}</p>
                        </div>
                      </DialogContent>
                    </form>
                  </Dialog>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex-1 overflow-y-auto flex flex-col items-center gap-2 pr-1 justify-center">
              <p className="text-5xl font-extrabold">No Url Saved</p>
            </div>
          )}
        </div>
        )
      }
      
    </div>
  );
};

export default AllUrl;
