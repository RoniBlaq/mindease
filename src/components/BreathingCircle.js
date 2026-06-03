"use client";

import {useState, useEffect } from "react";

export default function BreathingCircle() {
    const [phase, setPhase] = useState("Ready");
    const [isRunning, setIsRunning] = useState(false);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        let timer;

        if (isRunning) {
            startCycle();
        }

        function startCycle() {
            setPhase("Inhale");
            setScale(1.5);

            timer = setTimeout(() => {

                setPhase("Hold");
                setScale(1.5);

                timer =setTimeout(() => {
                    setPhase("Exhale");
                    setScale(1);

                    timer = setTimeout(() => {
                        startCycle();
                    }, 6000);
                }, 4000);
            }, 4000);
        }
        return () => clearTimeout(timer);
    }, [isRunning]);

    return(
        
        <div className="flex flex-col items-center gap-6">
            <div className="w-28 h-28 sm:w-36 sm:h-36  md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-indigo-500 transition-all duration-[4000ms] flex items-center justify-center text-white text-sm sm:text-lg md:text-xl font-bold"
            style={{ transform: `scale(${scale})`,
        }}>
            {phase}
        </div>

        <div className="flex gap-4">
            <button onClick={() => setIsRunning(true)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg">
                Start
            </button>

            <button onClick={() => {
                setIsRunning(false);
                setPhase("Ready");
               setScale(1);
            }}
            className="bg-gray-400 text-indigo-500 px-6 py-2 rounded-lg">
                Stop
            </button>
        </div>
        </div>
       
    )
}

