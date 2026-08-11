"use client";

import { useState, useEffect } from "react";

export default function JournalPage() {

    const [content, setContent] = useState("");
    const [entries, setEntries] = useState([]);

    const API_BASE =
         "https://mindease-api-production-65ca.up.railway.app";

         const fetchEntries = async () => {
           try{
            const res = await fetch(
                `${API_BASE}/get-entries.php`
            );
            const data = await res.json();
            console.log("ENTRIES:", data);

            setEntries(data);
        } catch (error) {
        console.error("FETCH ERROR:", error);
    }
         };

         useEffect(() => {
            fetchEntries();
         }, []);

         const saveEntry = async () => {

            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) {
                alert("Not logged in");
                return;
            }
            
            if (!content.trim()) return;
          try{
           const res = await 
           fetch( `${API_BASE}/save-entry.php`,
                {
      method: "POST",
     headers: {
  "Content-Type":"application/json",
                    },
                    body: JSON.stringify({
                       user_id: user.id, 
                      content: content,
                    }),
                }
            );
            const data = await res.json();
       console.log("ENTRY RESPONSE:", data); 
       if (data.status === "success") {
            setContent("");
            fetchEntries();
       } else {
        alert(data.status);
       }
    } catch (error) {
        console.error("POST ERROR:",error);
    }
         };

         return (
            <div className="w-full max-w-2xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-400">
                    Private Journal
                </h1>

                <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 mb-6">

                    <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your thoughts..." className="w-full h-32 sm:h-40 p-3 border rounded-lg resize-none mb-4 text-gray-400"/>

                        <button onClick={saveEntry} className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-lg">
                            Save Entry
                        </button>
                </div>

                <div className="space-y-4">
                    {entries.map((entry) => (

                        <div key={entry.id} className="bg-white shadow rounded-xl p-4">
                            <p className="text-gray-700 mb-2 break-words">
                                {entry.content}
                            </p>

                            <span className="text-xs text-gray-400">
                                {entry.created_at}
                            </span>
                        </div>
                    ))}
                </div>
            </div> 
         )
}