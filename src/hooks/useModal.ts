import { useReducer } from "react"
import { initialState, modalReducer } from "../reducers/modal-reducer";

export const useModal = () => {
    const [modal, dispatch] = useReducer(modalReducer, initialState);

    const abrirModal = (modal: 'presupuesto' | 'gasto'): void => {
        
        dispatch({ type: 'mostrar_modal', payload: { modal } })
    };

    const cerrarModal = (modal: 'presupuesto' | 'gasto'): void => {
        
        dispatch({ type: 'cerrar_modal', payload: { modal } })
    };

    return {
        modal,
        abrirModal,
        cerrarModal
    }
}
