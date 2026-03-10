import { useEffect, useState } from "react"
import type { WorkspaceBackType } from "../../types/workspaceBack-type"
import { deleteWorkspace, updateWorkspace } from "../../lib/lib"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type Props = {
	workspace: WorkspaceBackType
	onUpdated: () => void
}

export default function ManageWorkspace({ workspace, onUpdated }: Props) {
	const [name, setName] = useState(workspace.name)
	const [imageUrl, setImageUrl] = useState<File | null>(null)
	const [preview, setPreview] = useState<string | null>(workspace.imageUrl)
	const [loading, setLoading] = useState<boolean>(false)

	const navigate = useNavigate()
	useEffect(() => {
		if (workspace.imageUrl) {
			setPreview(`${API_URL}${workspace.imageUrl}`)
		}
	}, [workspace])

	const handleImageChange = async (file: File | null) => {
		setImageUrl(file)
		if (file) {
			const url = URL.createObjectURL(file)
			setPreview(url)
		}
	}

	const handleDelete = async () => {
		if (!workspace.id) return

		const confirmed = confirm(
			"¿Estás seguro que quieres eliminar el workspace?",
		)
		if (!confirmed) return
		try {
			await deleteWorkspace(workspace.id)
			toast.success("Workspace eliminado correctamente")
			navigate("/")
		} catch (error: any) {
			toast.error(error.message || "Error al eliminar workspace")
		}
	}

	const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

	const imageSrc = preview
		? preview
		: workspace.imageUrl
			? `${API_URL}${workspace.imageUrl}`
			: null

	console.log(imageSrc)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			setLoading(true)
			const formData = new FormData()
			formData.append("name", name)

			if (imageUrl) {
				formData.append("image", imageUrl)
			}
			await updateWorkspace(workspace.id, formData)
			toast.success("Workspace updated!")
			onUpdated()
		} catch (error: any) {
			toast.error(error.message || "Failed to update workspace")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="w-full flex justify-center">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-sm p-10 space-y-10"
			>
				<header className="space-y-2 border-b border-slate-200 pb-6">
					<h1 className="text-2xl font-semibold text-slate-900">
						Configuración del Workspace
					</h1>

					<p className="text-sm text-slate-500">
						Cambia el nombre o la imagen de tu workspace.
					</p>
				</header>

				<section className="flex items-center gap-10">
					<div className="w-36 h-24 rounded-xl overflow-hidden border bg-slate-100 shadow-sm">
						{imageSrc ? (
							<img
								src={imageSrc}
								alt="Workspace"
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="flex items-center justify-center h-full text-xs text-slate-400">
								Sin imagen
							</div>
						)}
					</div>

					<div className="space-y-2">
						<label className="text-sm font-medium text-slate-700 p-2">
							Cambiar imagen
						</label>

						<input
							type="file"
							accept="image/*"
							className="text-sm file:mr-4 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-slate-900 file:text-white hover:file:bg-slate-700"
							onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
						/>

						<p className="text-xs text-slate-400">PNG o JPG recomendados.</p>
					</div>
				</section>

				<section className="space-y-3">
					<label className="text-sm font-medium text-slate-700 px-3">
						Nombre del workspace
					</label>

					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full max-w-lg rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
					/>
				</section>

				<div className="flex justify-end pt-6 border-t border-slate-200">
					<button
						type="submit"
						disabled={loading}
						className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-50"
					>
						Guardar cambios
					</button>
				</div>
				<div className="border-t border-red-200 pt-6 mt-10">
					<h3 className="text-sm font-semibold text-red-600 mb-2">
						Zona peligrosa
					</h3>

					<button
						type="button"
						onClick={handleDelete}
						className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm mt-2 "
					>
						Eliminar workspace
					</button>
				</div>
			</form>
		</div>
	)
}
