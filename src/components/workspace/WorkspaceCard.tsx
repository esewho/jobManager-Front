import { useNavigate } from "react-router-dom"
import type { WorkspaceType } from "../../types/workspace-type"

type Props = {
	workspace: WorkspaceType
	onEnter?: () => void
}
const BACKEND_URL = "http://localhost:3000"
const FRONTEND_URL = "http://localhost:5173"

export default function WorkspaceCard({ workspace, onEnter }: Props) {
	const navigate = useNavigate()
	const handleClick = () => {
		navigate(`${FRONTEND_URL}/workspace-dashboard/${workspace.id}/admin`)
	}
	return (
		<button
			onClick={handleClick}
			className="flex flex-col gap-4 p-5 bg-gray-500/10 rounded-xl border border-slate-200  shadow-sm hover:shadow-lg hover:border-blue-400 cursor-pointer  transition-shadow"
		>
			{/* Image */}
			<div
				className="w-full aspect-video bg-center bg-cover rounded-lg overflow-hidden"
				style={{
					backgroundImage: workspace.imageUrl
						? `${BACKEND_URL}(${workspace.imageUrl})`
						: undefined,
				}}
			>
				{!workspace.imageUrl && (
					<div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400">
						No image
					</div>
				)}
			</div>

			<div className="flex flex-col flex-1">
				<div className="flex justify-between items-start mb-1">
					<p className="text-slate-900 text-lg font-bold leading-normal">
						{workspace.name}
					</p>
					<span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
						Activo
					</span>
				</div>

				<div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-4">
					<span className="material-symbols-outlined text-sm">groups</span>
					<span>{workspace._count?.users ?? 0} Usuarios</span>
				</div>

				<button
					onClick={onEnter}
					className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg h-10 px-4 bg-blue-600 text-white text-sm font-bold hover:bg-blue-800 transition-colors"
				>
					<span>Entrar</span>
					<span className="material-symbols-outlined text-sm"></span>
				</button>
			</div>
		</button>
	)
}
