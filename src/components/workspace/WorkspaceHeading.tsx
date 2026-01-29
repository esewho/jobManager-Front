import type { ReactNode } from "react"

interface WorkspaceHeadingProps {
	icon: ReactNode
	title: string
	description: string
}

export function WorkspaceHeading({
	icon,
	title,
	description,
}: WorkspaceHeadingProps) {
	return (
		<div className="flex flex-col items-center text-center gap-4 px-4">
			<div className="w-16 h-16 bg-[#137fec]/10 rounded-2xl flex items-center justify-center text-[#137fec] mb-2">
				{icon}
			</div>
			<div className="flex flex-col gap-3">
				<h1 className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em]">
					{title}
				</h1>
				<p className="text-gray-500 text-lg font-normal leading-normal max-w-lg mx-auto">
					{description}
				</p>
			</div>
		</div>
	)
}
