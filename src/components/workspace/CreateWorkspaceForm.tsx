import { useState } from "react"
import { toast } from "react-toastify"
import { createWorkspace } from "../../lib/lib"
import type { CreateWorkspacePayload } from "../../types/createWorkspace-type"
import { useNavigate } from "react-router-dom"
import AppLayout from "../../layouts/AppLayout"

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
		} catch (error: any) {
			toast.error(error.message)
			console.error("Error to create")
		}
	}

	return (
		<AppLayout>
			<div className="flex flex-col h-screen bg-light justify-center items-center">
				<form
					onSubmit={handleSubmit}
					className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-6 "
				>
					<h2 className="text-xl font-semibold text-center mb-6 ">
						Create your Workspace!
					</h2>

					<div>
						<label
							htmlFor="payload"
							className="block text-sm font-medium text-gray-500 mb-4"
						>
							Workspace Name
						</label>
						<input
							type="text"
							id="payload"
							className="w-full px-2 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={payload?.name}
							placeholder="My Company"
							onChange={(e) =>
								setPayload((prev) => ({ ...prev, name: e.target.value }))
							}
						/>
					</div>

					<div>
						<label
							htmlFor="payload"
							className="block text-sm font-medium text-gray-500 mb-4"
						>
							Workspace Image
						</label>
						<input
							type="file"
							name="image"
							onChange={(e) =>
								setPayload((prev) => ({
									...prev,
									image: e.target.files?.[0] ?? null,
								}))
							}
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-900 transition duration-300 cursor-pointer "
						onClick={() => navigate("/workspace")}
					>
						Create
					</button>
				</form>
			</div>
		</AppLayout>
	)
}
