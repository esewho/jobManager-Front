import { useState } from "react"
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
export default function AuthLandingPage() {
	const [mode, setMode] = useState<"login" | "register">("login")

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
			{/* Glow background */}
			<div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
			<div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

			<div className="relative z-10 w-full max-w-md">
				<div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
					{/* Tabs */}
					<div className="flex mb-6 bg-slate-100 rounded-xl p-1">
						<button
							onClick={() => setMode("login")}
							className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
								mode === "login"
									? "bg-white shadow text-slate-900"
									: "text-slate-500"
							}`}
						>
							Login
						</button>

						<button
							onClick={() => setMode("register")}
							className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
								mode === "register"
									? "bg-white shadow text-slate-900"
									: "text-slate-500"
							}`}
						>
							Register
						</button>
					</div>

					<div className="relative h-[260px] overflow-hidden">
						<div
							className={`absolute w-full transition-all duration-500 ${
								mode === "login" ? "left-0" : "-left-full"
							}`}
						>
							<LoginForm onSwitch={() => setMode("register")} />
						</div>

						<div
							className={`absolute w-full transition-all duration-500 ${
								mode === "register" ? "left-0" : "left-full"
							}`}
						>
							<RegisterForm onSwitch={() => setMode("login")} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
