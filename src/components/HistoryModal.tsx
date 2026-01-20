type Props = {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

export default function HistoryModal({ isOpen, onClose, children }: Props) {
	if (!isOpen) {
		return null
	}

	return (
		<div className="fixed inset-0 bg-black/70 bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative overflow-y-auto max-h-[80vh]">
				<button
					className=" cursor-pointer absolute top-1 right-1 text-gray-600 hover:text-gray-800"
					onClick={onClose}
				>
					&times;
				</button>
				{children}
			</div>
		</div>
	)
}
