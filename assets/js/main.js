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
    document.getElementById("resultado").innerHTML = "Resultado: $" + resultado;
    getMonedaMes(); //Llamo a la funcion para obtener los valores de los 10 ultimos dias
}

async function getMonedaMes() {
    let monedaDestino = document.getElementById("monedaTO");
    let labels = [];
    let valores = [];
    let contador = 0;
    descMoneda = monedaDestino.options[monedaDestino.selectedIndex].text;
    const url = "https://mindicador.cl/api/" + descMoneda.toLowerCase();
    const res = await fetch(url);
    const monedaJSON = await res.json();

    monedaJSON.serie.forEach(element => {
        contador++;
        if (contador <= 10) {
            const d = new Date(element.fecha);
            labels.push(d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()); //Cargo arreglo de fechas para ser usado en el grafico
            valores.push(element.valor); //Cargo arreglo de valores para ser usado en el grafico
        }
    });


    cargarChart(labels, valores, descMoneda); //Llamo a la funcion para cargar el grafico
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


