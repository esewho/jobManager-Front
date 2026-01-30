import { useState } from "react"
import { toast } from "react-toastify"
import { createWorkspace } from "../../lib/lib"
import type { CreateWorkspacePayload } from "../../types/createWorkspace-type"
import { useNavigate } from "react-router-dom"
import AppLayout from "../../layouts/AppLayout"
import { LucideUpload } from "lucide-react"

export default function CreateWorkspaceForm() {
	const [payload, setPayload] = useState<CreateWorkspacePayload>({
		name: "",
		image: null,
	})
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!payload.name.trim()) return toast.error("Please fill all the fields")

		try {
			await createWorkspace(payload)
			console.log(payload.image)
			toast.success("Workspace created succesfully!")
			navigate("/")
		} catch (error: any) {
			toast.error(error.message)
			console.error("Error to create")
		}
	}

	return (
		<AppLayout>
			<div className="flex justify-center">
				<form
					onSubmit={handleSubmit}
					className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl space-y-6"
				>
					{/* Header */}
					<div className="text-center">
						<h2 className="text-2xl font-bold text-slate-900">
							Create your Workspace
						</h2>
						<p className="mt-1 text-sm text-slate-500">
							Set up your organization in seconds
						</p>
					</div>

					{/* Workspace name */}
					<div className="space-y-2">
						<label className="text-sm font-medium text-slate-600">
							Workspace name
						</label>
						<input
							type="text"
							className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
							placeholder="My Company"
							value={payload.name}
							onChange={(e) =>
								setPayload((prev) => ({ ...prev, name: e.target.value }))
							}
						/>
					</div>

					{/* Image upload */}
					<div className="space-y-2">
						<label className="text-sm font-medium text-slate-600">
							Workspace image
						</label>

						<label
							htmlFor="image-upload"
							className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-blue-500 hover:bg-blue-50"
						>
							{payload.image ? (
								<img
									src={URL.createObjectURL(payload.image)}
									alt="Workspace preview"
									className="h-32 w-full rounded-lg object-cover"
								/>
							) : (
								<>
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-3">
										<span className="material-symbols-outlined">
											<LucideUpload />
										</span>
									</div>
									<p className="text-sm font-medium text-slate-700">
										Click to upload image
									</p>
									<p className="text-xs text-slate-500">PNG, JPG up to 5MB</p>
								</>
							)}

							<input
								id="image-upload"
								type="file"
								accept="image/*"
								className="hidden"
								onChange={(e) =>
									setPayload((prev) => ({
										...prev,
										image: e.target.files?.[0] ?? null,
									}))
								}
							/>
						</label>
					</div>

					{/* Submit */}
					<button
						type="submit"
						className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
					>
						Create workspace
					</button>
				</form>
			</div>
		</AppLayout>
	)
}
