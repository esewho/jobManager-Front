import { useState } from "react"
import { checkIn, checkOut } from "../lib/lib"

export default function ActionCards() {
	const [loading, setLoading] = useState(false)

	const handleCheckIn = async () => {
		setLoading(true)
		await checkIn()
		setLoading(false)
		window.location.reload()
	}

	const handleCheckOut = async () => {
		setLoading(true)
		await checkOut()
		setLoading(false)
		window.location.reload()
	}

	return (
		<div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
			<h2 className="text-lg font-semibold">Acciones</h2>

			<button
				onClick={handleCheckIn}
				disabled={loading}
				className="bg-stone-900 text-white py-2 rounded cursor-pointer"
			>
				Check-in
			</button>

			<button
				onClick={handleCheckOut}
				disabled={loading}
				className="bg-gray-300 text-stone-900 py-2 rounded cursor-pointer"
			>
				Check-out
			</button>
		</div>
	)
}
