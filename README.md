# Intro

En esta prueba validaremos nuestros conocimientos del método fetch. 

Aplicando los conceptos y herramientas aprendidas hasta ahora, en esta prueba deberás programar un conversor de monedas a partir de un monto en pesos chilenos. Para esto será necesario consultar la api mindicador.cl usando el método fetch.


# Resolución

Para desarrollar estoy usando un macbook air con una resolución de 1440x900, sin embargo inspeccioné la pagina usando una resolución de 1366 x 768 y se ve de forma correcta. Use el navegador Chrome.

# Monedas
Dejé un json al inicio del JS, para poder parametrizas las monedas a mostrar en el select, asi se pueden mostrar mas o menos de las 3 que dejé por defecto, por ejemplo:

```json
let tipoMonedas = [
    {
        tipo: "uf",
        descripcion: "UF"
    },
    {
        tipo: "dolar",
        descripcion: "Dólar observado"
    },
    {
        tipo: "euro",
        descripcion: "Euro"
    },
    {
        tipo: "ivp",
        descipcion: "Indice de valor promedio (IVP)"
    },
    {
        tipo: "utm",
        descripcion: "Unidad Tributaria Mensual (UTM)"
    }
];
```



[link repo](https://github.com/fisaavedrae/desafio-api)

[link live app](https://desafio-api-verge.vercel.app/)

