import { useState } from "react";
import useCalculator from "../hooks/useCalculator"
import type { GastoType } from "../types";
import generarId from "../helpers/generarId";

export default function GastoForm() {
    const { dispatch } = useCalculator();
    const [gasto, setGasto] = useState<GastoType>({
        id: generarId(),
        nombre: '',
        gasto: 0,
        fecha: new Date()
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (gasto.nombre.trim() == '' || gasto.gasto <= 0) {
            console.log('Los datos no son válidos');
            return;
        }
        
        dispatch({ type: 'agregar_gasto', payload: { newGasto: gasto } })
        setGasto({
            id: generarId(),
            nombre: '',
            gasto: 0,
            fecha: new Date()
        })
    }

    const cerrarModal = () => {
        dispatch({ type: 'cerrar-modal-gasto' });
        setGasto({
            id: generarId(),
            nombre: '',
            gasto: 0,
            fecha: new Date()
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGasto({
            ...gasto,
            [e.target.name]: e.target.name === 'gasto' ? e.target.valueAsNumber : e.target.value
        })

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-slate-100">
                    Nombre del Gasto
                </label>
                <input
                    value={gasto.nombre}
                    onChange={handleChange}
                    type="text"
                    name="nombre"
                    placeholder="Ej: Supermercado"
                    className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-slate-100">
                    Monto
                </label>
                <div className="flex items-center gap-2">
                    <span className="text-slate-400">$</span>
                    <input
                        value={gasto.gasto}
                        name="gasto"
                        onChange={handleChange}
                        type="number"
                        className="flex-1 bg-slate-700 border border-slate-600 rounded px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={cerrarModal}
                    className="flex-1 px-4 py-2 rounded-lg border border-slate-600 text-sm text-slate-100 hover:border-slate-500 transition"
                >
                    Cancelar
                </button>
                <button type="submit" className="flex-1 px-4 py-2 rounded-lg font-medium text-sm text-white bg-emerald-500 hover:bg-emerald-600 transition">
                    Agregar
                </button>
            </div>
        </form>
    )
}
