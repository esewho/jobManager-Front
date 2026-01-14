import Navbar from "../components/Nabvar"

type props = {
	children: React.ReactNode
}
export default function AppLayout({ children }: props) {
	return (
		<div className="min-h-screen bg-gray-1000">
			<Navbar />
			<main className="p-6">{children}</main>
		</div>
	)
}
