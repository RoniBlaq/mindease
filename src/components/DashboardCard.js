

export default function DashboardCard({
    title,
    value,
    icon,
}) {

    return (

        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex items-center justify-between transition hover:shadow-lg">

            <div>
                <p className="text-gray-500 text-sm">
                    {title}
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold mt-1">
                    {value}
                </h2>
            </div>

            <div className="text-3xl sm:text-4xl">
                {icon}
            </div>
        </div>
    )
}