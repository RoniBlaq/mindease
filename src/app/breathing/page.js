import BreathingCircle from "@/components/BreathingCircle";


export default function BreathingPage() {
    return (
        <main className="flex items-center justify-center h-screen inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('https://images.healthshots.com/healthshots/en/uploads/2022/12/12171842/10-minute-yoga.jpg')"
            
        }}>
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-black">
                Guided Breathing Exercise
            </h1>

            <p className="text-gray-600 mb-8 text-center max-w-md">
                Follow the circle. Inhale as it expands, hold, then exhale as it shrinks. Repeat until you feel relaxed.
            </p>
            <BreathingCircle />
        </div>
        </main>
    ) 
}