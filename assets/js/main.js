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
    getMonedaMes()
}

async function getMonedaMes() {
    let monedaDestino = document.getElementById("monedaTO");
    let labels = [];
    let valores = [];
    descMoneda = monedaDestino.options[monedaDestino.selectedIndex].text;
    const url = "https://mindicador.cl/api/" + descMoneda.toLowerCase();
    const res = await fetch(url);
    const monedaJSON = await res.json();

    //console.log(monedaJSON);

    let contador = 0;
    monedaJSON.serie.forEach(element => {

        contador++;
        if (contador <= 10) {
            const d = new Date(element.fecha);
            //console.log(d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear());
            labels.push(d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear());
            valores.push(element.valor);
        }
    });
    console.log(contador);
    cargarChart(labels, valores, descMoneda);
}

function cargarChart(labels, valores, descMoneda) {
    console.log(labels);
    console.log(valores);

    var options = {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Valores ' + descMoneda,
            style: {
                fontSize: '24px',
                fontWeight: 'bold',
                fontFamily: 'Space Mono, monospace',
                color: '#263238'
            },
        },
        series: [{
            name: 'Valores ' + descMoneda,
            data: valores
        }],
        xaxis: {
            categories: labels
        }
    }

    var chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();
    chart.render();

}
getMonedas()

document.getElementById("convertir").addEventListener("click", convertirMoneda); // 3. Agrega el evento click al botón del buscador


