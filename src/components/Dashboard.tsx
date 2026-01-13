import AppLayout from "../layouts/AppLayout"
import DashboardHeader from "./DashboardHeader"

export default function Dashboard() {
	return (
		<AppLayout>
			<div className="space-y-6">
				<DashboardHeader />
			</div>
		</AppLayout>
	)
}
