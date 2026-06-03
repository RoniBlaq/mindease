import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen inset-0 bg-cover bg-center bg-no-repeat"
      style={{backgroundImage: "url('/images/relaxBackground.jpg')"}}>
    
     <div className="flex flex-col items-center">
    <h1 className="text-3xl text-center text-gray-900 font-bold">
      MindEase is Starting... 
    </h1>
     <Link  className="bg-white px-4 py-2 rounded-lg text-gray-600 rounded-50" href="/dashboard">click me</Link>
     </div>
    </main>
     
  );
}
