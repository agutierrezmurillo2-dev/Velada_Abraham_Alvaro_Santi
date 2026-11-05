const gastos_gestion = 3.5;

const form = document.querySelector("form.formulario");
const tipo = document.getElementById("tipo");
const cantidad = document.getElementById("cantidad");
const totalel = document.getElementById("total");
const erroresel = document.getElementById("errores");
const confirmacion = document.getElementById("confirmacion");
const codigoel = document.getElementById("codigo");
const resumenel = document.getElementById("resumen");

function obtenerCantidad() {
    let n = parseInt(cantidad.value, 10);
    if (isNaN(n) || n < 1) n = 1;
    if (n > 4) n = 4;
    return n;
}

function calcularTotal() {
    const precio = Number(tipo.value);
    const total = precio * obtenerCantidad() + gastos_gestion;
    totalel.textContent = total.toFixed(2).replace(".", ",") + " €";
    return total;
}

function calcularEdad(fechatexto) {
    const hoy = new Date();
    const nac = new Date(fechatexto);
    let edad = hoy.getFullYear() - nac.getFullYear();
    const cumple = new Date(hoy.getFullYear(), nac.getMonth(), nac.getDate());
    if (hoy < cumple) edad--;
    return edad;
}

function validaFormulario() {
    const errores = [];
    const f = form.elements;

    if (f.nombre.value.trim().split(/\s+/).length < 2) {
        errores.push("Escribe tu nombre y apellidos.");
    }
    if (!/^[6-9]\d{8}$/.test(f.number.value.trim())) {
        errores.push("El teléfono debe tener 9 dígitos.");
    }
    if (!f.nacimiento.value) {
        errores.push("Indica tu fecha de nacimiento.");
    } else if (calcularEdad(f.nacimiento.value) < 18) {
        errores.push("Debes ser mayor de edad para comprar las entradas.");
    }
    if (!/^\d{16}$/.test(f.tarjeta.value.trim())) {
        errores.push("El número de tarjeta debe tener 16 dígitos.");
    }
    if (!/^\d{3}$/.test(f.cvv.value.trim())) {
        errores.push("El CVV debe tener 3 dígitos.");
    }

    const hoy = new Date();
    const mesActual = hoy.getFullYear() + "-" + String(hoy.getMonth() + 1).padStart(2, "0");
    if (f.caducidad.value && f.caducidad.value < mesActual) {
        errores.push("La tarjeta está caducada.");
    }
    if (!f.condiciones.checked) {
        errores.push("Debes aceptar las condiciones.");
    }
    return errores;
}

function mostrarErrores(errores) {
    erroresel.innerHTML = "";
    errores.forEach(function (texto) {
        const p = document.createElement("p");
        p.textContent = texto;
        p.className = "error";
        erroresel.appendChild(p);
    });
}

function generarCodigo() {
    return "VEL-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

function mostrarResumen() {
    const f = form.elements;
    const datos = [
        ["Nombre", f.nombre.value.trim()],
        ["Email", f.email.value.trim()],
        ["Teléfono", f.number.value.trim()],
        ["Dirección", f.direccion.value.trim()],
        ["Entrada", tipo.options[tipo.selectedIndex].text],
        ["Entradas", obtenerCantidad()],
        ["TOTAL", totalel.textContent]
    ];

    resumenel.innerHTML = "";
    datos.forEach(function (par) {
        const li = document.createElement("li");
        li.textContent = par[0] + ": " + par[1];
        resumenel.appendChild(li);
    });

    codigoel.textContent = generarCodigo();
    confirmacion.hidden = false;
    confirmacion.scrollIntoView({ behavior: "smooth" });
}

tipo.addEventListener("change", calcularTotal);
cantidad.addEventListener("input", calcularTotal);

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const errores = validaFormulario();
    mostrarErrores(errores);

    if (errores.length === 0) {
        mostrarResumen();
        form.reset();
        calcularTotal();
    }
});

calcularTotal();