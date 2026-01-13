import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ToastContainer } from "react-toastify"

import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
	<>
		<ToastContainer position="bottom-center" />
		<StrictMode>
			<App />
		</StrictMode>
	</>
)
