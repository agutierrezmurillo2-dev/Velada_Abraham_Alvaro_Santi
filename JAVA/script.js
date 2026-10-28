function actualizarContador() {

    const fechaEvento = new Date("June 29, 2027 00:00:00");

    const fechaActual = new Date();

    const diferencia = fechaEvento - fechaActual;

    const dias = Math.floor(diferencia / 86400000);

    const horas = Math.floor((diferencia % 86400000) / 3600000);

    const minutos = Math.floor((diferencia % 3600000) / 60000);

    const segundos = Math.floor((diferencia % 60000) / 1000);

    document.getElementById("contador").textContent =
         dias + " días |" +
         horas + " horas |" +
         minutos + " minutos |" +
         segundos + " segundos";

}

actualizarContador();
setInterval(actualizarContador, 1000);