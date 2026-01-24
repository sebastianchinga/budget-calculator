const convertirMonto = (monto: number) => {
    return new Intl.NumberFormat('pe-PE', {
        style: "currency",
        currency: 'PEN'
    }).format(monto)
}

export default convertirMonto