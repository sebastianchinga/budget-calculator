type ActionsType =
    { type: 'mostrar_modal', payload: { modal: 'presupuesto' | 'gasto' } }
    |
    { type: 'cerrar_modal', payload: { modal: 'presupuesto' | 'gasto' } }


type InitialType = {
    modalPresupuesto: boolean,
    modalGasto: boolean
}

export const initialState: InitialType = {
    modalPresupuesto: false,
    modalGasto: false,
}

export const modalReducer = (state: InitialType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "mostrar_modal":
            if (action.payload.modal === 'presupuesto') {
                return {
                    modalPresupuesto: true,
                    modalGasto: false,
                }
            } else {
                return {
                    modalGasto: true,
                    modalPresupuesto: false
                }
            }
            break;
        case "cerrar_modal":
            if (action.payload.modal === 'presupuesto') {
                return {
                    modalPresupuesto: false,
                    modalGasto: false,
                }
            } else {
                return {
                    modalGasto: false,
                    modalPresupuesto: false
                }
            }
            break;

        default:
            break;
    }

    return state;
}