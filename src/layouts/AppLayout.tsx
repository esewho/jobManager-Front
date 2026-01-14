type props = {
	children: React.ReactNode
}
export default function AppLayout({ children }: props) {
	const accessToken = localStorage.getItem("accessToken")
	return (
		<div className="min-h-screen bg-gray-1000">
			<header className="h-14 bg-white shadow px-6 flex items-center space-around">
				<h1 className="font-semibold">JobManager</h1>
				<button
					onClick={() => localStorage.removeItem("accessToken")}
					className="text-sm text-blue-600 hover:underline"
				>
					<a href="/auth/login">Logout</a>
				</button>
			</header>
			<main className="p-6">{children}</main>
		</div>
	)
}
