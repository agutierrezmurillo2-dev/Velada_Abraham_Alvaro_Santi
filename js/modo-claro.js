const botonModo = document.getElementById("modo-btn");

console.log(botonModo);
botonModo.addEventListener("click", function() {
    console.log("Has pulsado el boton");

    document.body.classList.toggle("modo-claro");
});
