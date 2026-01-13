import { useState } from "react";
import type { AlertaType } from "../types";

const useAlerta = () => {
    const [alerta, setAlerta] = useState<AlertaType>({
        mensaje: ''
    });

    const mostrarAlerta = ({tipo, mensaje}: AlertaType) => {
        setAlerta({mensaje, tipo})
    }

    const ocultarAlerta = () => {
        setAlerta({mensaje: ''});
    }

    return {
        alerta,
        mostrarAlerta,
        ocultarAlerta
    }
}

export default useAlerta;