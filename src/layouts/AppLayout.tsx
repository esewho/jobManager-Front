type props = {
	children: React.ReactNode
}
export default function AppLayout({ children }: props) {
	return (
		<div className="min-h-screen bg-gray-1000">
			<header className="h-14 bg-white shadow px-6 flex items-center">
				<h1 className="font-semibold">JobManager</h1>
			</header>
			<main className="p-6">{children}</main>
		</div>
	)
}
