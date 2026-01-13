export type GastoType = {
    id: number | null,
    nombre: string,
    gasto: number,
    fecha: Date
}

export type AlertaType = {
    tipo?: 'error' | 'exito',
    mensaje: string
}