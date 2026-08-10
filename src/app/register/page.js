"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getUser } from "@/lib/auth"


export default function RegisterPage() {

    useEffect(() => {
         const user = getUser();

         if (user) {
            window.location.href = "/";
         }
    }, []);

    const API_BASE =
    "mindease-api-production-65ca.up.railway.app"; 
    
    const [form, setForm] =
    useState({
        name: "",
        email:"",
        password:"",
    });
  
     const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
     };
   
         const [showPassword, setShowPassword] = useState (false);


     const handleSubmit = async () => {
         try{
            const res = await fetch(
            `${API_BASE}/auth/register.php`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                    "application/json",
                },
                body: JSON.stringify(form),
            });

        const data = await res.json();
         console.log(data);

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

        else if (data.status === "exist") {

            alert("Email already exists.");
        }

        else {
            alert("Registration successful.");
        }
         }
         catch (error) {
            console.error("REGISTER ERROR:", error);
            alert("error.message");
         }

        
     };

     return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4 text-gray-400">
           
           <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8">
           <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Create Account
           </h1>
           <div className="space-y-4">

            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-3 border rounded-lg" required/>

           <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="w-full p-3 border rounded-lg required"/>

           <div className="relative"> 
            <input type={ showPassword ? 
                "text" : "password" } 
                name="password" 
                placeholder="Password" 
                onChange={handleChange} 
                className=" w-full p-3 border rounded-lg pr-12 " required/>
                
                 <button 
                 type="button" onClick={() => 
                 setShowPassword( !showPassword )
                  } 
                  className=" absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 " >
                     {showPassword ? "🙈" : "👁️"} 
                     </button> 
                     </div>
           <button onClick={handleSubmit} className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium">
            Register
           </button>

           <p className="text-center text-sm">
            Already have an account?
            <Link href="/login"
             className="text-indigo-600 ml-1">Login</Link>
           </p>
           </div>
           </div>
        </div>
     )
}