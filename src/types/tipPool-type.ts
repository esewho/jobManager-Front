import type { ShiftType } from "./shift-type"
import type { TipDistributionType } from "./tipDistribution-type"

export type TipPoolType = {
	date: string
	shift: ShiftType
	totalAmount: number
	distributions: TipDistributionType[]
}
