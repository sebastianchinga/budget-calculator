import type { GastoType } from "../types"

type GatoProps = {
    gasto: GastoType
}

export default function Gasto({gasto}: GatoProps) {
    const {} = gasto
    return (
        <div className="p-3 sm:p-4 rounded-lg border border-slate-700 bg-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 hover:border-slate-600 transition">
            <div className="flex-1 min-w-0">
                <p className="font-medium text-sm sm:text-base truncate text-slate-100">
                    {gasto.nombre}
                </p>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    {gasto.fecha}
                </p>
            </div>
            <p className="text-base sm:text-lg font-bold text-emerald-500">
                -{gasto.gasto}
            </p>
        </div>
    )
}
