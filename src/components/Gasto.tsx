import convertirMonto from "../helpers/convertirMonto"
import formatearFechas from "../helpers/formatearFechas"
import type { ActionsType } from "../reducers/calculator-reducer"
import type { GastoType } from "../types"

type GatoProps = {
    gasto: GastoType,
    dispatch: React.Dispatch<ActionsType>
}

export default function Gasto({ gasto, dispatch }: GatoProps) {

    return (
        <div className="p-3 sm:p-4 rounded-lg border border-slate-700 bg-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 hover:border-slate-600 transition">
            <div className="flex-1 min-w-0">
                <p className="font-medium text-sm sm:text-base truncate text-slate-100">
                    {gasto.nombre}
                </p>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    {formatearFechas(gasto.fecha)}
                </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                <p className="text-base sm:text-lg font-bold text-emerald-500">-{convertirMonto(gasto.gasto)}</p>
                <button
                    onClick={() => dispatch({ type: "eliminar_gasto", payload: { id: gasto.id } })}
                    className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm font-medium transition"
                >
                    Eliminar
                </button>
            </div>

        </div>
    )
}
