import { useState } from "react"
import useCalculator from "../hooks/useCalculator";

export default function PresupuestoForm() {

    const { dispatch } = useCalculator();
    const [presupuesto, setPresupuesto] = useState<number>(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (presupuesto === 0 || presupuesto < 0) {
            console.log('Presupuesto no tomado');
            return;    
        }

        dispatch({ type: 'agregar_presupuesto', payload: { presupuesto } });
        setPresupuesto(0);
    }

    const cerrarModal = () => {
        dispatch({type: 'cerrar-modal-presupuesto'});
        setPresupuesto(0);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium mb-2 text-slate-100">
                Cantidad
            </label>
            <div className="flex items-center gap-2">
                <span className="text-slate-400">$</span>
                <input
                    value={presupuesto}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPresupuesto(+e.target.value)}
                    name="presupuesto"
                    type="number"
                    className="flex-1 bg-slate-700 border border-slate-600 rounded px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                    onClick={cerrarModal}
                    className="flex-1 px-4 py-2 rounded-lg border border-slate-600 text-sm text-slate-100 hover:border-slate-500 transition"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="flex-1 px-4 py-2 rounded-lg font-medium text-sm text-white bg-emerald-500 hover:bg-emerald-600 transition"
                >
                    Guardar
                </button>
            </div>
        </form>
    )
}
