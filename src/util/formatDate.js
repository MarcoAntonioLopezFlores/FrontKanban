const formatDate=(cadena)=>{
    const fecha = new Date(cadena);
    const dia = fecha.getDate() < 10 ? "0" + (fecha.getDate()) : fecha.getDate();
    const mes = fecha.getMonth() + 1 < 10 ? "0" + (fecha.getMonth() + 1) : fecha.getMonth() + 1
    const anio = fecha.getFullYear()

    return dia + "/" + mes + "/" + anio
}

export default formatDate