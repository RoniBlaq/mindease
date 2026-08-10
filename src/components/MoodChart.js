"use client"; 

import { useEffect, useState } from "react"; 

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from "chart.js";

import { Bar } from "react-chartjs-2"; ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend ); 

export default function MoodChart() { 
    
    const [chartData, setChartData] = useState(null); 
    const API_BASE = "mindease-api-production-65ca.up.railway.app"; 
    useEffect(() => {
         fetch( `${API_BASE}/get-moods.php` ) 
         .then((res) => res.json()) 
         .then((data) => { 
            const moodCounts = {};
        
        data.forEach((item) =>
            
            { const mood = item.mood; 
                
                moodCounts[mood] = (moodCounts[mood] || 0) + 1; }); 
                
                const labels = Object.keys(moodCounts);
                
                const values = Object.values(moodCounts); 
                
                setChartData({ labels, datasets: [ { label: "Mood Count", data: values, backgroundColor: "rgba(99,102,241,0.5)", }, ], }); });
            
            }, []); 
            
            if (!chartData) 
                
                return <p>Loading chart...</p>; 
                
                
                return ( 
                
                <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-4 sm:p-6 mt-6 text-gray-400"> 
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center"> Mood History 
                    </h2>
                    
                     <div className="w-full overflow-x-auto"> 
                        
                        <Bar data={chartData} />
                         </div>
                          </div>
                           );
                         }
