import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { CalendarDay } from "../../../types/calendarDay-type"
import type { DayDetail } from "../../../types/dayDetail-type"
import { getDayDetail, getHistoryCalendar } from "../../../lib/lib"
import { toast } from "react-toastify"

import CalendarHistory from "./CalendarHistory"

export default function HistoryCalendarPage() {
	const { workspaceId } = useParams()

	const today = new Date()

	const [month, setMonth] = useState(today.getMonth() + 1)
	const [year, setYear] = useState(today.getFullYear())

	const [calendar, setCalendar] = useState<CalendarDay[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	const [selectedDay, setSelectedDay] = useState<DayDetail | null>(null)

	const handlePrevMonth = () => {
		if (month === 1) {
			setMonth(12)
			setYear((y) => y - 1)
		} else {
			setMonth((m) => m - 1)
		}
	}

	const handleNextMonth = () => {
		if (month === 12) {
			setMonth(1)
			setYear((y) => y + 1)
		} else {
			setMonth((m) => m + 1)
		}
	}

	const fetchCalendar = async () => {
		if (!workspaceId) return
		try {
			setLoading(true)
			if (loading === true) {
				toast.loading("Cargando historial")
			}
			const data = await getHistoryCalendar(workspaceId, month, year)
			setCalendar(data)
			toast.success("Historial cargado")
		} catch (error: any) {
			console.error(error.message || "Failed to get calendar in client")
			toast.error("Error al cargar historial")
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchCalendar()
	}, [workspaceId, month, year])

	const handleDayClick = async (date: string) => {
		if (!workspaceId) return

		try {
			setLoading(true)
			if (loading === true) {
				toast.loading("Cargando detalle")
			}
			const detail = await getDayDetail(workspaceId, date)
			setSelectedDay(detail)
			console.log(detail)
		} catch (error: any) {
			console.error(error.message || "Error al cargar detalle del dia")
			toast.error("Error cargando detalle del día")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-slate-50 p-6">
			{/* Header */}
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Historial</h1>

				<div className="flex gap-2">
					<button
						onClick={handlePrevMonth}
						className="px-3 py-1 bg-white border rounded"
					>
						←
					</button>

					<span className="px-4 py-1 font-medium">
						{month} / {year}
					</span>

					<button
						onClick={handleNextMonth}
						className="px-3 py-1 bg-white border rounded"
					>
						→
					</button>
				</div>
			</div>

			<CalendarHistory
				data={calendar}
				month={month}
				year={year}
				onDayClick={handleDayClick}
				loading={loading}
			/>
		</div>
	)
}
