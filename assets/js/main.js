import dataJson from './mindicador.json' assert { type: "json" }; // Importo el archivo jason local
let monedaJSON = [];
//Deje este arreglo para poder parametrizar la cantidad de monedas a mostrar en el select, el tipo de monedas a ingresar deben coincidir con la pagina mindicador.cl
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
    //Obtengo todas las monedas segun arreglo y lleno el select
    try {
        const res = await fetch('https://mindicador.cl/api');
        monedaJSON = await res.json();
        let select = document.getElementById("monedaTO");
        tipoMonedas.forEach((element) => {
            let option = document.createElement("option");
            option.value = monedaJSON[element.tipo].valor;
            option.text = monedaJSON[element.tipo].nombre;
            select.appendChild(option);
        });
    } catch (error) {
        console.log('Error fetch: ' + error.message);
        // arrojó error la lectura de la api, asi que uso el archivo local importado al inicio del archivo
        try {
            monedaJSON = dataJson;
            let select = document.getElementById("monedaTO");
            tipoMonedas.forEach((element) => {
                let option = document.createElement("option");
                option.value = monedaJSON[element.tipo].valor;
                option.text = monedaJSON[element.tipo].nombre;
                select.appendChild(option);
            });
        } catch (error) {
            console.log('Error local: ' + error.message);
        }
    }
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
    let resultado = Number(moneda) / Number(monedaDestino);
    document.getElementById("resultado").innerHTML = "Resultado: $" + Number(resultado).toFixed(2);
    getMonedaMes(); //Llamo a la funcion para obtener los valores de los 10 ultimos dias
}

async function getMonedaMes() {
    let monedaDestino = document.getElementById("monedaTO");
    let labels = [];
    let valores = [];
    let tipoMoneda = tipoMonedas[monedaDestino.selectedIndex - 1].tipo;
    let descMoneda = monedaJSON[tipoMoneda].nombre;
    try {
        const url = "https://mindicador.cl/api/" + tipoMoneda.toLowerCase();
        const res = await fetch(url);
        const monedaJSON = await res.json();
        for (let i = 0; i < 10; i++) {
            labels.push(getFormatoFecha(monedaJSON.serie[i].fecha)); //Cargo arreglo de fechas para ser usado en el grafico
            valores.push(monedaJSON.serie[i].valor); //Cargo arreglo de valores para ser usado en el grafico
        }
    } catch (error) {
        console.log('Error local: ' + error.message);
    }
    cargarChart(labels, valores, descMoneda); //Llamo a la funcion para cargar el grafico
}
function getFormatoFecha(fecha) {
    const nuevaFecha = new Date(fecha);
    const dia = nuevaFecha.getDate();
    const mes = nuevaFecha.getMonth() + 1;
    const año = nuevaFecha.getFullYear();

    return `${dia}/${mes}/${año}`;
}
let myChart;
function cargarChart(labels, valores, descMoneda) {
    const ctx = document.getElementById('myChart');

    if (myChart) {
        myChart.destroy(); //Destruyo el canvas para volver a usar el grafico
    }
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Valores ' + descMoneda + ' últimos 10 dias',
                data: valores,
                borderWidth: 1,
                Color: 'hsl(185, 41%, 84%)',
                backgroundColor: [
                    'hsl(172, 67%, 45%)'
                ]
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: 'hsl(183, 100%, 15%)',
                        font: {
                            size: 20,
                            family: 'Space Mono'
                        }
                    }
                }
            }
        }
    });

}
getMonedas()

document.getElementById("convertir").addEventListener("click", convertirMoneda); // 3. Agrega el evento click al botón del buscador


