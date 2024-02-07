import {writeFile} from "fs/promises";

export const getMotos = async () => await fetch("https://gateway.supre.com.co/api/official-site/catalogo-de-motos/''/''/''/''/''/''/''/''/''/''/''/''/''/''/''/precio:asc/", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "es-419,es-US;q=0.9,es;q=0.8",
        "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://supre.com.co/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
});

export const getMarcas = async () => await fetch("https://gateway.supre.com.co/api/official-site/catalogo-de-motos/marcas/", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "es-419,es-US;q=0.9,es;q=0.8",
        "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://supre.com.co/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
});

export const getEstilos = async () => await fetch("https://gateway.supre.com.co/api/official-site/catalogo-de-motos/estilos/", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "es-419,es-US;q=0.9,es;q=0.8",
        "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://supre.com.co/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
});

export const getTipoDeTransmision = async () => await fetch("https://gateway.supre.com.co/api/official-site/catalogo-de-motos/tipotransmision/", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "es-419,es-US;q=0.9,es;q=0.8",
        "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://supre.com.co/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
});

export const getTipoDeArranque = async () => await fetch("https://gateway.supre.com.co/api/official-site/catalogo-de-motos/tipoarranque/", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "es-419,es-US;q=0.9,es;q=0.8",
        "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://supre.com.co/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
});

export const getFrenoDelantero = async () => await fetch("https://gateway.supre.com.co/api/official-site/catalogo-de-motos/frenodelantero/", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "es-419,es-US;q=0.9,es;q=0.8",
        "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://supre.com.co/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
});

export const getFrenoTrasero = async () => await fetch("https://gateway.supre.com.co/api/official-site/catalogo-de-motos/frenotrasero/", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "es-419,es-US;q=0.9,es;q=0.8",
        "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://supre.com.co/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
});

export async function updateData() {

    console.log("Updating data...")
    const motos = (await getMotos()).json();
    await writeFile("./motos.json", JSON.stringify(motos, null, 2))
    console.log("Motos updated!")
    const estilos = (await getEstilos()).json();
    await writeFile("./estilos.json", JSON.stringify(estilos, null, 2))
    console.log("Estilos updated!")
    const frenoDelantero = (await getFrenoDelantero()).json();
    await writeFile("./frenoDelantero.json", JSON.stringify(frenoDelantero, null, 2))
    console.log("Freno delantero updated!")
    const frenoTrasero = (await getFrenoTrasero()).json();
    await writeFile("./frenoTrasero.json", JSON.stringify(frenoTrasero, null, 2))
    console.log("Freno trasero updated!")
    const marcas = (await getMarcas()).json();
    await writeFile("./marcas.json", JSON.stringify(marcas, null, 2))
    console.log("Marcas updated!")
    const tipoDeArranque = (await getTipoDeArranque()).json();
    await writeFile("./tipoDeArranque.json", JSON.stringify(tipoDeArranque, null, 2))
    console.log("Tipo de arranque updated!")
    const tipoDeTransmision = (await getTipoDeTransmision()).json();
    await writeFile("./tipoDeTransmision.json", JSON.stringify(tipoDeTransmision, null, 2))
    console.log("Tipo de transmision updated!")
    console.log("Done!")
}