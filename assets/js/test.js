async function leer() {
    const res = await fetch('https://mindicador.cl/api');
    const monedaJSON = await res.json();
    console.log(monedaJSON);
    monedaJSON.forEach(element => {
        console.log(element);

    });

}