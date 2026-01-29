import { useEffect, useState } from "react"
import WorkspaceCard from "./workspace/WorkspaceCard"
import CreateWorkspaceForm from "./workspace/CreateWorkspaceForm"
import { getAllWorkspaces } from "../lib/lib"
import type { WorkspaceType } from "../types/workspace-type"
import { CircleQuestionMark, LucideCirclePlus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import AppLayout from "../layouts/AppLayout"
export default function WorkspacesPage() {
	const [data, setData] = useState<WorkspaceType[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const navigate = useNavigate()

	useEffect(() => {
		const fetchWorkspaces = async () => {
			try {
				const workspaces = await getAllWorkspaces()
				setData(workspaces)
			} finally {
				setIsLoading(false)
			}
		}

		fetchWorkspaces()
	}, [])

	if (isLoading) {
		return <p className="p-10">Loading...</p>
	}

	return (
		<AppLayout>
			<main className="flex flex-1 justify-center py-8">
				<div className="flex flex-col max-w-[1200px] flex-1 px-4 md:px-10">
					<div className="flex flex-wrap justify-between items-end gap-3 mb-8">
						<div className="flex min-w-72 flex-col gap-2">
							<h1 className="text-4xl font-black tracking-tight">
								Bienvenido, Administrador
							</h1>
							<p className="text-slate-500">
								Selecciona una organización para gestionar tus operaciones.
							</p>
						</div>
					</div>
					{/* Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
						{data.map((workspace) => (
							<WorkspaceCard
								key={workspace.id}
								workspace={workspace}
								onEnter={() => console.log("Entrar a workspace", workspace.id)}
							/>
						))}

						<div
							onClick={() => navigate("/workspace-create")}
							className="flex flex-col items-center justify-center gap-4 p-5  rounded-xl border-2 border-dashed border-blue-500 transition-colors cursor-pointer min-h-[300px]"
						>
							<div className="flex items-center justify-center size-12 rounded-full text-primary">
								<span className="material-symbols-outlined text-3xl">
									<LucideCirclePlus />
								</span>
							</div>
							<div className="text-center">
								<p className="text-base font-bold">Añadir Workspace</p>
								<p className="text-slate-500 text-sm">Crea un nuevo negocio</p>
							</div>
						</div>
					</div>
					{data.length === 0 && <CreateWorkspaceForm />}

					<div className=" w-full mt-20 bg-blue-200  rounded-2xl p-4 border border-blue-800">
						<div className="flex flex-col md:flex-row md:items-center md:justify-between">
							<div className="flex items-start gap-4">
								<div className="w-6 h-6">
									<CircleQuestionMark />
								</div>
								<div className="flex flex-col gap-1">
									<p className="text-slate-900 text-lg font-bold leading-tight">
										¿Necesitas ayuda configurando una nueva organización?
									</p>
									<p className="text-slate-800  text-base font-normal">
										Nuestro equipo de soporte está disponible para ayudarte a
										importar tus datos de empleados masivamente.
									</p>
								</div>
							</div>
							<button className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-6 bg-primary text-white text-sm bg-blue-600 hover:bg-blue-800 font-bold  transition-all shadow-lg shadow-primary/20">
								<span className="truncate">Contactar Soporte</span>
							</button>
						</div>
					</div>
				</div>
			</main>
		</AppLayout>
	)
}
