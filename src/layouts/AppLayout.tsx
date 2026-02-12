import Navbar from "../components/Nabvar"

type props = {
	children: React.ReactNode
}
export default function AppLayout({ children }: props) {
	return (
		<div className="min-h-screen flex flex-col bg-gray-1000">
			<Navbar />
			<main className="flex-1 flex items-center justify-center overflow-x-hidden">
				{children}
			</main>
		</div>
	)
}
