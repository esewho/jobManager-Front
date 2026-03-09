import { useState } from "react"
import type { WorkspaceBackType } from "../../types/workspaceBack-type"
import { updateWorkspace } from "../../lib/lib"
import { useParams } from "react-router-dom"
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

	const handleImageChange = async (file: File | null) => {
		setImageUrl(file)
		if (file) {
			const url = URL.createObjectURL(file)
			setPreview(url)
		}
	}

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
		<form
			onSubmit={handleSubmit}
			className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-6 max-w-xl"
		>
			<header>
				<h2 className="text-xl font-semibold text-slate-900">
					Gestionar workspace
				</h2>

				<p className="text-sm text-slate-500">
					Actualiza la información de tu workspace
				</p>
			</header>

			{/* Preview imagen */}

			{preview && (
				<div className="w-28 h-20 rounded-lg overflow-hidden bg-slate-100 border">
					<img
						src={preview}
						alt="WorkspaceImage"
						className="w-full h-full object-cover"
					/>
				</div>
			)}

			{/* Input imagen */}

			<div>
				<label className="text-sm font-medium text-slate-600">Imagen</label>

				<input
					type="file"
					accept="image/*"
					className="text-sm"
					onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
				/>
			</div>

			{/* Input nombre */}

			<div>
				<label className="text-sm font-medium text-slate-600">
					Nombre del workspace
				</label>

				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
				/>
			</div>

			<button
				type="submit"
				disabled={loading}
				className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
			>
				Guardar cambios
			</button>
		</form>
	)
}
