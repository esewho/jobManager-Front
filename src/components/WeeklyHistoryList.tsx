import { useState, useEffect } from "react"
import type { HistoryCardData } from "../types/HistoryCardData-type"
import HistoryCard from "./HistoryCard"
import { getWeeklyHistory } from "../lib/lib"
import { ClipLoader } from "react-spinners"

export default function WeeklyHistoryList() {
	const [data, setData] = useState<HistoryCardData[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getWeeklyHistory().then((history) => {
			setData(history)
			setLoading(false)
		})
	}, [])
	if (loading) {
		return (
			<div className="flex justify-center items-center h-48">
				<ClipLoader size={40} color="#0c0c0c" />
			</div>
		)
	}
	return (
		<div className="space-y-4">
			{data.map((day) => (
				<HistoryCard key={day.date} day={day} />
			))}
		</div>
	)
}
