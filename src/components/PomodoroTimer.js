"use client";

import { useState, useEffect, useRef } from "react";

export default function PomodoroTimer() {
    const focusTime = 25 * 60;
    const breakTime = 5 * 60;

    const [timeLeft, setTimeLeft] = useState(focusTime);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState("Focus");

    const audioRef = useRef(null);

    useEffect(() => {
        let timer;

        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        if (timeLeft === 0) {
if (audioRef.current) {
    audioRef.current.play();
}

if(mode === "Focus") {
    setMode("Break");
    setTimeLeft(breakTime);
} else {
    setMode("Focus");
    setTimeLeft(focusTime);
}
     setIsRunning(false);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);
     const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        return `${minutes}:${seconds <10 ? "0" : ""}${seconds}`;
     };

     const resetTimer = () => {
        setIsRunning(false);

        if (mode === "Focus") {
            setTimeLeft(focusTime);
        } else {
            setTimeLeft(breakTime);
        }
     };

     const switchMode = (newMode) => {
        setMode(newMode);
        setIsRunning(false);

        if (newMode === "Focus") {
            setTimeLeft(focusTime);
        } else {
            setTimeLeft(breakTime);
        }
     };

     return (
        <div className="w-full max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-4 sm:p-6">
            <audio ref={audioRef}>
                <source src="/sounds/alert.mp3" type="audio/mp3" />
            </audio>
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-400">
                Pomodoro Timer
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mb-6">

                <button onClick={() => switchMode("Focus")} className={`px-4 py-2 rounded-lg font-medium w-full sm:w-auto ${mode === "Focus" ? "bg-indigo-600 text-white" : "bg-gray-400"}`}>
                    Focus
                </button>

                                <button onClick={() => switchMode("Break")} className={`px-4 py-2 rounded-lg font-medium w-full sm:w-auto ${mode === "Break" ? "bg-indigo-600 text-white" : "bg-gray-400"}`}>
                   Break
                </button>
            </div>

            <div className="flex justify-center mb-8">

                <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-bold">
                    {formatTime()}
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
                <button onClick={() => setIsRunning(true)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg w-full sm:w-auto">
                    Start
                </button>

                  <button onClick={() => setIsRunning(false)}
                className="px-6 py-2 bg-yellow-500 text-white rounded-lg w-full sm:w-auto">
                    Pause
                </button>

                  <button onClick={resetTimer}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg w-full sm:w-auto">
                    Reset
                </button>
            </div>

        </div>
     )
}