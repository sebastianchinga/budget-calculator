const formatearFechas = (fecha: Date): string => new Date(fecha).toLocaleDateString('es-PE');

export default formatearFechas;