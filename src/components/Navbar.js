"use client"

import Link from "next/link";

export default function Navbar({ setIsOpen }) {
    return (
        <nav className="w-full h-16 bg-white shadow-md flex items-center justify-between px-4 md:px-6">

            <div className="flex items-center gap-4">

            <button onClick={() => setIsOpen(true)} className="md:hidden text-3xl text-gray-400">
                =
            </button>
            <div className="text-lg md:text-xl font-bold text-indigo-600">
                MindEase
            </div>
            </div>
             <div className="block md:hidden text-gray-500 text-sm">
             Stress Relief Platform
             </div>
            <div className="hidden md:block md:flex gap-6 text-gray-600 font-medium">
                <Link href="/">Home</Link>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/breathing">Breathing</Link>
                 <Link href="/sounds">Relax</Link>
                <Link href="/timer">Timer</Link>
              <Link href="journal">Journal</Link>
              <Link href="/community">Community</Link>
              <Link href="/todo">TodoList</Link>
            </div>
        </nav>
    )
}