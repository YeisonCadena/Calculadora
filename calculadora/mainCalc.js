const display = document.getElementById("display");
let textoActual = "";
let operator = "";
let textoPrevio = "";
let calculo = false;

function entradaNumero(number) {
    if (calculo) {
        textoActual = "";
        calculo = false;
    }

    // Permitir la coma decimal solo una vez
    if (number === "," && textoActual.includes(",")) return;

    textoActual += number;
    display.value = formatearNumero(textoActual);
}

function entradaOperator(op) {
    if (textoActual === "") return;
    if (textoPrevio !== "") igual();
    
    operator = op;
    textoPrevio = textoActual;
    textoActual = "";

    display.value = formatearNumero(textoPrevio) + " " + operator + " ";
}

function limpiar() {
    textoActual = textoPrevio = operator = "";
    display.value = "";
}

function igual() {
    if (!operator || textoActual === "") return;

    const prev = parseFloat(textoPrevio.replace(/\./g, "").replace(",", "."));
    const curr = parseFloat(textoActual.replace(/\./g, "").replace(",", "."));
    let result;

    switch (operator) {
        case "+": result = prev + curr; break;
        case "-": result = prev - curr; break;
        case "*": result = prev * curr; break;
        case "/": result = (curr === 0) ? "Error" : prev / curr; break;
        default: return;
    }

    display.value = (result !== "Error") ? formatearNumero(result.toString()) : result;
    textoActual = (result !== "Error") ? result.toString() : "";
    textoPrevio = operator = "";
    calculo = true;
}

function formatearNumero(numero) {
    const numeroLimpio = numero.replace(/\./g, "");
    const [parteEntera, parteDecimal] = numeroLimpio.split(',');

    const parteFormateada = new Intl.NumberFormat('es-ES').format(parteEntera);
    return parteDecimal ? `${parteFormateada},${parteDecimal}` : parteFormateada;
}

// Manejo de eventos
document.querySelectorAll('.number, .operator').forEach(button =>
    button.addEventListener('click', e => {
        if (e.target.classList.contains('number')) {
            entradaNumero(e.target.value);
        } else {
            entradaOperator(e.target.value);
        }
    })
);

document.getElementById("=").addEventListener('click', igual);
document.getElementById("AC").addEventListener('click', limpiar);
