
import Link from "next/link"

export default function QuickAction({title, icon, href,}) {

    return (
        <Link href={href} className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center transition hover:shadow-lg hover:scale-105">

            <div className="text-3xl sm:text-4xl">
                {icon}
            </div>

            <p className="text-sm sm:text-base font-medium">
                {title}
            </p>
        </Link>
    )
}