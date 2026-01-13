import type { AlertaType } from "../types"

type AlertaProps = {
    alerta: AlertaType;
}

export default function Alerta({alerta}: AlertaProps) {
    return (
        <div className={`fixed left-4 sm:left-6 top-6 ${alerta.tipo === 'error' ? 'bg-red-500' : 'bg-emerald-500'} text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg z-40 max-w-xs animate-pulse`}
        >
            <p className="text-sm sm:text-base font-medium">
                {alerta.mensaje}
            </p>
        </div>
    )
}
