"use client";
import { useState, useRef } from "react";

const sounds = [
    {
        name: "Rain",
        file: "/sounds/rain.mp3",

    },

    {
        name: "Ocean",
        file: "/sounds/ocean.mp3",

    },

    {
        name: "Forest",
        file: "/sounds/forest.mp3",

    },
];

export default function AudioPlayer() {
    const audioRef = useRef(null);

    const [currentSound, setCurrentSound ] = useState(sounds[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const changeSound = (sound) => {
        setCurrentSound(sound);
        setIsPlaying(false);

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.load();
        }
    };

    const handleVolume = (e) => {
        const value = e.target.value;

        setVolume(value);

        if (audioRef.current) {
            audioRef.current.volume = value;
        }
    };

    return(
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl mx-auto text-gray-400">
            <h2 className="text-2xl font-bold mb-4">
                Relaxation Sounds
            </h2>
            <div className="flex flex-wrap gap-3 mb-6">
            {sounds.map((sound) =>(
                <button key={sound.name} onClick={() => changeSound(sound)} className={`px-4 py-2 rounded-lg font-medium
                    ${
                        currentSound.name === sound.name ? "bg-indigo-600 text-white" : "bg-gray-200"
                    }`}>
                        {sound.name}
                    </button>
            ))}
            </div>
            <audio ref={audioRef} loop>
                <source src={currentSound.file} type="audio/mp3"/>
            </audio>

            <div className="flex items-center gap-4">
                <button onClick={togglePlay} className="bg-indigo-600 text-white px-6 px-2 rounded-lg">
                    {isPlaying ? "pause" : "play"}
                </button>
                <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolume} className="w-full"/>
            </div>
        </div>
    );
}