import { useMemo } from "react";
import Gasto from "./components/Gasto";
import GastoForm from "./components/GastoForm";
import MontoCard from "./components/MontoCard";
import PresupuestoForm from "./components/PresupuestoForm";
import convertirMonto from "./helpers/convertirMonto";
import useCalculator from "./hooks/useCalculator"

function App() {

  const { state, dispatch } = useCalculator();

  const totalGastado = useMemo(() => state.gastos.reduce((acc, item) => acc + item.gasto, 0), [state.gastos]);

  const calcularPorcentaje = useMemo(() => {
    const total = state.gastos.reduce((ac, item) => ac + item.gasto, 0);
    return state.gastos.length > 0 ? (total / state.presupuestoInicial) * 100 : 0
  }, [state.gastos])


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
                    {convertirMonto(state.presupuestoInicial)}
                  </span>
                  <span className="text-slate-400 text-sm sm:text-base">PEN</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">

                <button
                  onClick={() => dispatch({ type: 'abrir-modal-presupuesto' })}
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
                <span className="font-medium text-slate-100">{convertirMonto(totalGastado)} / {convertirMonto(state.presupuestoInicial)}</span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${calcularPorcentaje}%` }} />
              </div>
            </div>
          </div>
          {/* Total gastado y Disponible */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-4 mb-6 sm:mb-8">
            <MontoCard title="Total Gastado" tipo="gastado" monto={totalGastado} />
            <MontoCard title="Disponible" tipo="disponible" monto={state.disponible} />
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
            {state.gastos.map(gasto => (
              <Gasto key={gasto.id} gasto={gasto} dispatch={dispatch} />
            ))}
          </div>
          {/* Botón Agregar Gasto (Flotante) */}
          <button
            onClick={() => dispatch({ type: 'abrir-modal-gasto' })}
            className="fixed bottom-6 right-4 sm:right-6 w-12 sm:w-14 h-12 sm:h-14 rounded-full shadow-lg flex items-center justify-center text-lg sm:text-xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition z-40">
            +
          </button>

          {/* Mostrar alerta */}

        </div>
      </div>

      {/* Modal para establecer presupuesto */}
      <div id="budgetModal" className={`${state.modalPresupuesto ? 'flex' : 'hidden'} fixed inset-0 bg-black/50 items-center justify-center p-4 z-50`}>
        <div className="bg-slate-800 rounded-lg p-6 sm:p-8 w-full max-w-sm border border-slate-700">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 text-slate-100">
            Establecer Presupuesto Inicial
          </h3>
          <PresupuestoForm />

        </div>
      </div>

      {/* Modal para agregar gasto */}
      <div id="expenseModal" className={`${state.modalGasto ? 'flex' : 'hidden'} fixed inset-0 bg-black/50 items-center justify-center p-4 z-50`}>
        <div className="bg-slate-800 rounded-lg p-6 sm:p-8 w-full max-w-sm border border-slate-700">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 text-slate-100">
            Agregar Gasto
          </h3>
          <GastoForm />
        </div>
      </div>


    </>
  )
}

export default App
