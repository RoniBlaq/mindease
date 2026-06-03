import MoodChart from "@/components/MoodChart";
import MoodTracker from "@/components/MoodTracker";



export default function MoodPage(){

    return (
        <div className="px-2 sm:px-4">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-400">
                Mood Tracker
            </h1>
            <MoodTracker/>
            <MoodChart/>
        </div>
    )
}