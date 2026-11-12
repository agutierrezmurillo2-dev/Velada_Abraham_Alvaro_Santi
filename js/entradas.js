const gastos_gestion = 3.5;
const form = document.getElementById("for_entrada");
const tipo = document.getElementById("tipo");
const cantidad = document.getElementById("cantidad");
const totalel = document.getElementById("total");
const erroresel = document.getElementById("errores");
const confimacion = document.getElementById("confirmacion");
const codigoel = document.getElementById("codigo");
const resumenel = document.getElementById("resumen");

function obtenerCantidad() {
    let n = parseInt (cantidad.value, 10);
    if (isNaN(n) || n < 1 ) n = 1;
    if  (n > 5) n = 5; 
    return n;
}

function calcularTotal() {
    const precio = Number(tipo.value);
    const total = precio * obtenerCantidad() + gastos_gestion;
    totalel.textContent = total.toFixed(2).replace  (".",",") + "€";
    return total;
}

function calcularEdad(fechatexto) {
    const hoy = new Date();
    const nac = new Date(fechatexto);
    let edad = hoy.getFullYear - nac.getFullYear();
    const cumpleEsteAnio = new date(hoy.getFullYear(), nac.getMonth(), nac.getDate());
    if (hoy < cumpleEsteAnio) edad--;
    return edad;
}

function validaFormulario() {
    const errores =[];
    const f = form.elements;
    if (f.nombre.value.trim().split(/\s+/).length < 2) {
        errores.push("Escribe tu nombre y apellidos");
    }

    if (!/^[6-9]\d{8}$/.test(f.Number.value.trim())) {
        errores.push("El teléfono debe tener 9 dígitos.");
    }

    if 
}