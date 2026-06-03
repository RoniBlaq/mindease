import PomodoroTimer from "@/components/PomodoroTimer";


export default function TimerPage() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-400">
                Focus Timer
            </h1>

            <p className="text-gray-600 text-center ,max-w-md mb-6 px-2">
                Use this pomodoro technique to stay focused. 
                work for 25 minutes, then take a short break.
            </p>

            <PomodoroTimer />
        </div>
    )
}