import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ToastContainer } from "react-toastify"
import { BrowserRouter } from "react-router-dom"

import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
	<>
		<ToastContainer position="bottom-center" />
		<BrowserRouter>
			<StrictMode>
				<App />
			</StrictMode>
		</BrowserRouter>
	</>
)
