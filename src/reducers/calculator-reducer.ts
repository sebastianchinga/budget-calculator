import type { GastoType } from "../types";

type ActionsType =
    { type: 'agregar_gasto', payload: { newGasto: GastoType } }
    |
    { type: 'agregar_presupuesto', payload: { presupuesto: number } }

type InitialType = {
    presupuestoInicial: number,
    gastos: GastoType[],
    disponible: number
}

const obtenerGastoStorage = () => {
    const gastos = localStorage.getItem('gastos');
    return gastos ? JSON.parse(gastos) : []
}

const obtenerPresupuesto = () => {
    const presupuesto = localStorage.getItem('presupuesto');
    return presupuesto ? JSON.parse(presupuesto) : 0
}

const calcularDisponible = () => {

    // Obteniendo el presupuesto del localstorage
    const presupuesto: number = obtenerPresupuesto();

    // Obteniendo el array gastos
    const gastos: GastoType[] = obtenerGastoStorage();
    // Sumar el gasto total de todos los gastos
    const total = gastos.reduce((acc, item) => acc + item.gasto, 0);
    // Retornamos el resultado de disminuir el total de gastos al presupuesto inicial
    return presupuesto - total
}


export const initialState: InitialType = {
    // Obtener el presupuesto inicial del LocalStorage
    presupuestoInicial: obtenerPresupuesto(),
    // Obtener el array de gastos del LocalStorage
    gastos: obtenerGastoStorage(),
    // Calcular el monto disponible calculando el presupuesto del LS menos con el total de gastos del LS
    disponible: calcularDisponible()
}

export const presupuestoReducer = (state: InitialType = initialState, action: ActionsType) => {

    if (action.type === 'agregar_gasto') {
        if (state.presupuestoInicial > 0) {
            let newArray = [...state.gastos, action.payload.newGasto];
            const total = newArray.reduce((acc, item) => acc + item.gasto, 0);

            return {
                ...state,
                gastos: newArray,
                disponible: state.presupuestoInicial - total
            }
        }

        return {
            ...state,
            disponible: state.disponible
        }

    }

    if (action.type === 'agregar_presupuesto') {
        return {
            ...state,
            presupuestoInicial: action.payload.presupuesto,
            disponible: action.payload.presupuesto
        }
    }

    return state;
}