"use client"; 

 import { useState, useEffect } from "react";

 export default function MoodTracker() { 
 const moods =
  [ 
    "Happy 😊", 
    "Calm 😌", 
    "Neutral 😐",
     "Stressed 😫", 
     "Tired 😴" ]; 

 const [selectedMood, setSelectedMood] = useState(""); 

 const API_BASE = "https://mindrelax.infinityfreeapp.com/mindease-api"; 
 
 const saveMood = async (mood) => 
    {

         const user = JSON.parse(localStorage.getItem("user"));
            if (!user) {
                alert("Not logged in");
                return;
            }
         await fetch( 
        `${API_BASE}/save-mood.php`,
    { method: "POST", 
    headers: 
    { "Content-Type": "application/json",

 },
  body: JSON.stringify({
    user_id: user.id, 
     mood: selectedMood,
     }),
     } 
    );
     setSelectedMood(mood);
     }; 
 return ( 
<div className="w-full max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-4 sm:p-6 text-gray-400">

 <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-400"> How are you feeling today?

 </h2> 

 <div className="grid grid-cols-2 sm:grid-cols-3 gap-3"> 
 {moods.map((mood) => (

 <button
  key={mood} 
  onClick={() => saveMood(mood)} 
 className={`p-3 rounded-lg text-sm sm:text-base font-medium
 ${ 
    selectedMood === mood 
    ? "bg-indigo-600 text-white" :
    "bg-gray-200" 
}`} 
 >
 {mood} 
 </button>
 ))}
 </div> 
 </div> 
 ); 
}

