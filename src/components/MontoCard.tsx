import convertirMonto from "../helpers/convertirMonto"

type MontoCardProps = {
    title: string,
    monto: number,
    tipo: 'gastado' | 'disponible'
}
export default function MontoCard({ title, monto, tipo }: MontoCardProps) {
    return (
        <div className="p-3 sm:p-4 rounded-lg border border-slate-700 bg-slate-800">
            <p className="text-xs sm:text-sm text-slate-400 mb-1">{title}</p>
            <p className={`text-xl sm:text-3xl font-bold ${tipo === 'gastado' ? 'text-slate-100' : 'text-emerald-500'}`}>{convertirMonto(monto)}</p>
        </div>
    )
}
