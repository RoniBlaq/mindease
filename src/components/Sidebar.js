"use client"

import Link from "next/link";

import { logout } from "@/lib/auth";

export default function Sidebar({ isOpen, setIsOpen }) {
    return (
        <>
        {isOpen && (
            <div className="fixed insert-0 bg-black/40 z-40 md:hidden" onClick={() => setIsOpen(false)}/>
        )}
        <aside className={`fixed top-0 left-0 h-screen w-64 bg-indigo-600 text-white   z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>

            <div className="flex items-center justify-between p-6 border-b border-indigo-500">
            <h2 className="text-2xl font-bold">
                MindEase
            </h2>
            <button onClick={() => setIsOpen()}
            className="text-2xl md:hidden">X</button>
           </div>
            <nav className="flex flex-col gap-4 p-6 text-lg">
                <Link href="/">Home</Link>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/breathing">Breathing</Link>
                <Link href="/sounds">Relaxation Sounds</Link>
                <Link href="/timer">Focus Timer</Link>
               <Link href="/mood" onClick={() => setIsOpen(false)}>Mood Tracker</Link>
              <Link href="/community">Community</Link>
              <Link href="/todo">TodoList</Link>
              
              <button onClick={logout} className=" md:block bg-red-500 text-white px-4 py-2 rounded-lg">Logout</button>
            </nav>
        </aside>
        </>
    )
}