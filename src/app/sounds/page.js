import AudioPlayer from "@/components/AudioPlayer";


export default function SoundsPage() {
    return (

         <main className="flex items-center justify-center h-screen inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/images/relaxing-desktop.jpg')"
            
        }}>
        <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-400">
                Relaxation Sounds 
            </h1>
            <AudioPlayer/>
        </div>
        </main>
    )
}