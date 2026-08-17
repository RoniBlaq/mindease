"use client"
 import { useState } from "react";
 import { usePathname } from "next/navigation";
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"



export default function LayoutWrapper({ children }) {

    const pathname = usePathname();

     const hideLayout =
     pathname === "/login" ||
     pathname === "/register";

  const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex min-h-screen">
           {!hideLayout && (
              <Sidebar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            /> 
           )}
          
            <div className="flex flex-col flex-1 min-h-screen md:ml-64">
                {!hideLayout && (
                   <Navbar 
                setIsOpen={setIsOpen}
                />
                )}
                
                <main className="p-4 md:p-6 bg-gray-100 flex-1">
                    {children}
                </main>
            </div>
        </div>
    )
}