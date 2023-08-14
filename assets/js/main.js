//Deje este json para poder parametrizar la cantidad de monedas a mostrar en el select
let tipoMonedas = [
    {
        tipo: "uf",
        descripcion: "UF"
    },
    {
        tipo: "dolar",
        descripcion: "Dolar"
    },
    {
        tipo: "euro",
        descripcion: "Euro"
    }
];

async function getMonedas() {
    fetch('https://mindicador.cl/api').then(function (response) {
        return response.json();
    }).then(function (dailyIndicators) {
        let select = document.getElementById("monedaTO");
        tipoMonedas.forEach((element) => {
            let option = document.createElement("option");

            option.value = dailyIndicators[element.tipo].valor;
            option.text = element.descripcion;
            select.appendChild(option);
        })
    }).catch(function (error) {
        console.log('Requestfailed', error);
    });
}
function convertirMoneda() {
    let moneda = document.getElementById("monedaIN").value;
    let monedaDestino = document.getElementById("monedaTO").value;
    if (moneda == "" || moneda <= 0) {
        alert("Debe ingresar un valor mayor a 0");
        return;
    }
    if (monedaDestino == -1) {
        alert("Seleccione una moneda");
        return;
    }
    let resultado = Number(moneda) * Number(monedaDestino);
    console.log("moneda: " + moneda + " monedaDestino: " + monedaDestino + " resultado: " + resultado);
    document.getElementById("resultado").innerHTML = "Resultado: $" + resultado;
}

getMonedas()

document.getElementById("convertir").addEventListener("click", convertirMoneda); // 3. Agrega el evento click al botón del buscador


