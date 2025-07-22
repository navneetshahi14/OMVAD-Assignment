"use client";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useUrl } from "@/context/UrlContext";

const Header = () => {
  const navigate  = useRouter()

  const {theme,setTheme,token,setToken} = useUrl()
  console.log(theme)

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [token]);

  const signOut = () =>{
    localStorage.removeItem("token")
    navigate.refresh()
  }

  return (
    <>
      <div className="w-full flex items-center px-5 justify-between h-[10vh] gap-5 dark:bg-slate-700 bg-gray-300 ">
        <h1 className="">Link Saver</h1>
        {token ? <Button onClick={signOut} >SignOut</Button> : <></>}

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </>
  );
};

export default Header;
