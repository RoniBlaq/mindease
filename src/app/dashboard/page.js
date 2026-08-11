"use client"; 

import { useEffect, useState } from "react"; 
import { getUser } from "@/lib/auth";
import DashboardCard from "@/components/DashboardCard"; 
import QuickAction from "@/components/QuickAction";

export default function Dashboard() {
    
    const [userName, setUserName] = useState(""); 
    
    useEffect(() => { 
        const user = getUser();
         if (!user) { 
            window.location.href = "/login"; 
        } else { 
            setUserName(user.name);

             fetch(
            `https://mindease-api-production-65ca.up.railway.app/dashboard/stats.php?user_id=${user.id}`
         )
         .then(res => res.json())
         .then(data => {

              console.log("STATS:", data)

            setStats(data);
    })
    .catch(error => {
        console.error(error);
    });
         } 

        }, []); 
        const [stats, setStats] =
        useState({
            journal: 0,
            mood: 0,
            focus: 0,
            community: 0,
        })
        return (
            
            <div className="space-y-8"> 
            <div className=" bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-6 sm:p-8 shadow-lg ">
                 <h1 className=" text-2xl sm:text-3xl font-bold mb-2 ">
                     Welcome back, {userName} 
                     </h1>
                      <p className=" text-sm sm:text-base opacity-90 "> 
                        Take a deep breath. You`re doing great today. 
                        </p> 
                        </div>
                        
                        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-500"> 
                            <DashboardCard title="Today's Mood" value={stats.mood} icon="💭" /> 
                            <DashboardCard title="Journal Entries" value={stats.journal} icon="📓" /> 
                           
                            <DashboardCard title="Focus Sessions" value={stats.focus} icon="⏱" /> 
                            
                            <DashboardCard title="Community Posts" value={stats.community} icon="💬" /> 
                            
                            </div> 

                            <div>
                                
                                 <h2 className=" text-xl sm:text-2xl text-gray-500 font-bold mb-4 "> 
                                    Quick Actions </h2> 
                                    
                     <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 text-gray-400"> 
                                        
                     <QuickAction title="Breathing" icon="🧘" href="/breathing" /> 

                    <QuickAction title="Focus Timer" icon="⏱" href="/timer" /> 
                                        
                     <QuickAction title="Write Journal" icon="📓" href="/journal" /> 
                                        
                      <QuickAction title="Track Mood" icon="😊" href="/mood" /> 
         </div> 
             </div> 
                   </div> 
                            ); 
                         }