import type { GastoType } from "../types";

export type ActionsType =
    { type: 'agregar_gasto', payload: { newGasto: GastoType } }
    |
    { type: 'agregar_presupuesto', payload: { presupuesto: number } }
    |
    { type: 'eliminar_gasto', payload: { id: GastoType['id'] } }
    |
    { type: 'reiniciar_presupuesto' }
    |
    {type: 'abrir-modal-presupuesto'}
    |
    {type: 'cerrar-modal-presupuesto'}
    |
    {type: 'abrir-modal-gasto'}
    |
    {type: 'cerrar-modal-gasto'}

const obtenerPresupuesto = (): number => {
    const presupuesto = localStorage.getItem('presupuesto');
    return presupuesto ? JSON.parse(presupuesto) : 0
}

const obtenerGastos = (): GastoType[] => {
    const gastos = localStorage.getItem('gastos');
    return gastos ? JSON.parse(gastos) : []
}

const calcularDisponible = () => {
    const gastos = obtenerGastos();
    const presupuesto = obtenerPresupuesto();
    const total = gastos.reduce((total, item) => total + item.gasto , 0);
    const resultado = presupuesto - total;

    return gastos.length === 0 ? presupuesto : resultado
}

export type InitialType = {
    presupuestoInicial: number,
    gastos: GastoType[],
    disponible: number,
    modalGasto: boolean
    modalPresupuesto: boolean
}

export const initialState: InitialType = {
    // Obtener el presupuesto inicial del LocalStorage
    presupuestoInicial: obtenerPresupuesto(),
    // Obtener el array de gastos del LocalStorage
    gastos: obtenerGastos(),
    // Calcular el monto disponible calculando el presupuesto del LS menos con el total de gastos del LS
    disponible: calcularDisponible(),
    modalGasto: false,
    modalPresupuesto: false
}

export const presupuestoReducer = (state: InitialType = initialState, action: ActionsType) => {

    if (action.type === 'agregar_presupuesto') {
        return {
            ...state,
            presupuestoInicial: action.payload.presupuesto,
            disponible: action.payload.presupuesto,
            modalPresupuesto: false
        }
    }

    if (action.type === 'reiniciar_presupuesto') {

        return {
            ...state,
            presupuestoInicial: 0,
            disponible: 0,
            gastos: []
        }
    }

    if (action.type === 'abrir-modal-presupuesto') {
        return {
            ...state,
            modalPresupuesto: true
        }
    }

    if (action.type === 'cerrar-modal-presupuesto') {
        return {
            ...state,
            modalPresupuesto: false
        }
    }

    if (action.type === 'abrir-modal-gasto') {
        return {
            ...state,
            modalGasto: true
        }
    }

    if (action.type === 'cerrar-modal-gasto') {
        return {
            ...state,
            modalGasto: false
        }
    }

    if (action.type === 'agregar_gasto') {
        let newArray: GastoType[] = [];
        if (state.disponible > 0) {
            newArray = [...state.gastos, action.payload.newGasto]
        }

        return {
            ...state,
            gastos: newArray,
            disponible: state.presupuestoInicial - newArray.reduce((total, item) => total + item.gasto , 0),
            modalGasto: false
        }
    }

    if (action.type === 'eliminar_gasto') {
        const newArray = state.gastos.filter(item => item.id !== action.payload.id);

        return {
            ...state,
            gastos: newArray,
            disponible: state.presupuestoInicial - newArray.reduce((total, item) => total + item.gasto , 0)
        }
    }

    return state;
}