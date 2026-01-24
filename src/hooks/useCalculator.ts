import { useContext } from "react";
import { CalculatorContext } from "../context/CalculatorContext";

const useCalculator = () => {
    return useContext(CalculatorContext);
}

export default useCalculator