"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getUser } from "@/lib/auth"


export default function LoginPage() {

  useEffect(() => {
         const user = getUser();
         if (user) {
            window.location.href = "/";
         }
    }, []);

    const API_BASE = 
    "https://mindrelax.infinityfreeapp.com/mindease-api";

    const [email, setEmail] =
       useState("");
       
       const [password, setPassword] = useState("");
         const [showPassword, setShowPassword] = useState (false);

        
       const handleLogin = async () => {
            
        try {
             const res = await fetch(
            `${API_BASE}/auth/login.php`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
        );

        const data = await res.json();
        
        console.log("Response:",data);

       if (data.status === "success") { 
        
        localStorage.setItem( 
            "user", 
            JSON.stringify({
                 id: data.user_id,
                  name: data.name,
                 })
                 );
                  window.location.href = "/";
                 }

                 else if (data.status === "wrong_password") {

                    alert("wrong password");
                 }

                 else if (data.status === "not_found") {

                    alert("user not found.");
                 }
                }
                 catch (error) {
                    console.error(error);
                    alert("Login failed");
                 }
        
       
       };

       return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from indigo-500 to-purple-600 p-4 text-gray-400">
            <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
                Welcome Back
            </h1>

            <div className="space-y-4">
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)
                }
                className="w-full p-3 border rounded-lg" required/>

               <div className="relative"> 
                <input type={ showPassword ? "text" : "password" } name="password"
                placeholder="Password" value={password}
               onChange={(e) => setPassword(e.target.value)}
                className=" w-full p-3 border rounded-lg pr-12 " required/> 
                <button type="button" onClick={() => 
                    setShowPassword( !showPassword ) 
                    } 
                    className=" absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 " > 
                    {showPassword ? "🙈" : "👁️"}
                     </button> 
                     </div>
                <button type="button" onClick={handleLogin} className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium">
                    Login
                </button>

                <p className="text-center text-sm">
                    don`t habe an account?
                    <Link href="/register" className="text-indigo-600 ml-1">
                    Register
                    </Link>
                </p>
            </div>
            </div>
        </div>
       )
}