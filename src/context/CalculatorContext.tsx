import { createContext, useReducer, type ReactNode } from "react";
import { initialState, presupuestoReducer, type ActionsType, type InitialType } from "../reducers/calculator-reducer";

type CalculatorProvidertProps = {
    children: ReactNode
}

type CalculatorContextProps = {
    state: InitialType
    dispatch: React.ActionDispatch<[action: ActionsType]>
}

export const CalculatorContext = createContext<CalculatorContextProps>(null!);

export const CalculatorProvider = ({ children }: CalculatorProvidertProps) => {

    const [state, dispatch] = useReducer(presupuestoReducer, initialState);

    return (
        <CalculatorContext.Provider value={{
            state,
            dispatch
        }}>
            {children}
        </CalculatorContext.Provider>
    )
}