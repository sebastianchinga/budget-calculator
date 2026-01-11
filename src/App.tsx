import { useEffect, useMemo, useReducer, useState } from "react"
import Gasto from "./components/Gasto"
import { initialState, presupuestoReducer } from "./reducers/calculator-reducer"
import { useModal } from "./hooks/useModal";
import convertirMonto from "./helpers/convertirMontos";
import type { GastoType } from "./types";
import generarId from "./helpers/generarId";

function App() {

  const [budget, dispatch] = useReducer(presupuestoReducer, initialState);
  const { modal, abrirModal, cerrarModal } = useModal();
  const [gasto, setGasto] = useState<GastoType>({ id: generarId(), nombre: '', gasto: 0, fecha: new Date })

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(budget.gastos))
    localStorage.setItem('presupuesto', JSON.stringify(budget.presupuestoInicial))
  }, [budget.gastos, budget.presupuestoInicial])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    cerrarModal("presupuesto")
  }

  const handleGasto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'agregar_gasto', payload: { newGasto: gasto } })
    setGasto({ id: generarId(), nombre: '', gasto: 0, fecha: new Date() })
    cerrarModal("gasto");
  }

  const calcularPorcentaje = useMemo(() => {
    const total = budget.gastos.reduce((ac, item) => ac + item.gasto, 0);
    return budget.gastos.length > 0 ? (total / budget.presupuestoInicial) * 100 : 0
  }, [budget.gastos])

  return (
    <>

      {/* Layout Principal */}
      <div className="min-h-screen p-4 sm:p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">
              Control de Gastos
            </h1>
            <p className="text-sm sm:text-base text-slate-400">
              Gestiona tu presupuesto y monitorea tus gastos
            </p>
          </div>
          {/* Presupuesto Inicial */}
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-lg border border-slate-700 bg-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6">
              <div>
                <p className="text-xs sm:text-sm text-slate-400 mb-2">
                  Presupuesto Inicial
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-5xl font-bold text-emerald-500">
                    {convertirMonto(budget.presupuestoInicial)}
                  </span>
                  <span className="text-slate-400 text-sm sm:text-base">PEN</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">

                <button
                  onClick={() => abrirModal('presupuesto')}
                  className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base text-white bg-emerald-500 transition-all hover:bg-emerald-600"
                >
                  Establecer Presupuesto
                </button>
                <button
                  onClick={() => dispatch({ type: "reiniciar_presupuesto" })}
                  className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base text-white bg-red-500 transition-all hover:bg-red-600"
                >
                  Reiniciar
                </button>
              </div>

            </div>
            {/* Barra de progreso */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2 text-xs sm:text-sm">
                <span className="text-slate-400">Gastado vs Presupuesto</span>
                <span className="font-medium text-slate-100">{convertirMonto(budget.gastos.reduce((acc, item) => acc + item.gasto, 0))} / {convertirMonto(budget.presupuestoInicial)}</span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${calcularPorcentaje}%` }} />
              </div>
            </div>
          </div>
          {/* Total gastado y Disponible */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-4 mb-6 sm:mb-8">
            <div className="p-3 sm:p-4 rounded-lg border border-slate-700 bg-slate-800">
              <p className="text-xs sm:text-sm text-slate-400 mb-1">Total Gastado</p>
              <p className="text-xl sm:text-3xl font-bold text-slate-100">{convertirMonto(budget.gastos.reduce((acc, item) => acc + item.gasto, 0))}</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg border border-slate-700 bg-slate-800">
              <p className="text-xs sm:text-sm text-slate-400 mb-1">Disponible</p>
              <p className="text-xl sm:text-3xl font-bold text-emerald-500">{convertirMonto(budget.disponible)}</p>
            </div>
          </div>
          {/* Título de Lista de Gastos */}
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              Mis Gastos
            </h2>
          </div>
          {/* Lista de Gastos */}
          <div className="space-y-3 pb-20">
            {/* Gasto 1 */}
            {budget.gastos.map(gasto => (
              <Gasto key={gasto.id} gasto={gasto} dispatch={dispatch} />
            ))}
          </div>
          {/* Botón Agregar Gasto (Flotante) */}
          <button onClick={() => budget.disponible > 0 && abrirModal('gasto')} className="fixed bottom-6 right-4 sm:right-6 w-12 sm:w-14 h-12 sm:h-14 rounded-full shadow-lg flex items-center justify-center text-lg sm:text-xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition z-40">
            +
          </button>
        </div>
      </div>

      {/* Modal para establecer presupuesto */}
      <div id="budgetModal" className={`${modal.modalPresupuesto ? 'flex' : 'hidden'} fixed inset-0 bg-black/50 items-center justify-center p-4 z-50`}>
        <div className="bg-slate-800 rounded-lg p-6 sm:p-8 w-full max-w-sm border border-slate-700">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 text-slate-100">
            Establecer Presupuesto Inicial
          </h3>
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium mb-2 text-slate-100">
              Cantidad
            </label>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">$</span>
              <input
                value={budget.presupuestoInicial}
                onChange={e => dispatch({ type: 'agregar_presupuesto', payload: { presupuesto: Number(e.target.value) } })}
                name="presupuesto"
                type="number"
                className="flex-1 bg-slate-700 border border-slate-600 rounded px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => cerrarModal('presupuesto')}
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

        </div>
      </div>

      {/* Modal para agregar gasto */}
      <div id="expenseModal" className={`${modal.modalGasto ? 'flex' : 'hidden'} fixed inset-0 bg-black/50 items-center justify-center p-4 z-50`}>
        <div className="bg-slate-800 rounded-lg p-6 sm:p-8 w-full max-w-sm border border-slate-700">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 text-slate-100">
            Agregar Gasto
          </h3>
          <form onSubmit={handleGasto}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-slate-100">
                Nombre del Gasto
              </label>
              <input
                value={gasto.nombre}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGasto({ ...gasto, nombre: e.target.value })}
                type="text"
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGasto({ ...gasto, gasto: Number(e.target.value) })}
                  type="number"
                  className="flex-1 bg-slate-700 border border-slate-600 rounded px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => cerrarModal("gasto")}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-600 text-sm text-slate-100 hover:border-slate-500 transition"
              >
                Cancelar
              </button>
              <button type="submit" className="flex-1 px-4 py-2 rounded-lg font-medium text-sm text-white bg-emerald-500 hover:bg-emerald-600 transition">
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>


    </>
  )
}

export default App
