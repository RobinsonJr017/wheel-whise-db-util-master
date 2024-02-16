import "dotenv/config";
import {updateData} from "./util.js";
import {scrap} from "./scrap.js";
import * as process from "process";
import {createClient} from "@supabase/supabase-js";
import {readFile} from "fs/promises";
import {Moto} from "./types/Moto.js";
import {Database} from "./db.supabase.js";

console.log(process.env)
await updateData();
// await scrap("motos.json");
const supaClient = createClient<Database>(process.env.SUPA_URL ?? "", process.env.SUPA_SERVICE_KEY ?? "", {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
// Color Marca Transmi Freno Suspension Arranque Moto Color

const motos = JSON.parse((await readFile("./motos-scraped.json")).toString()) as unknown as Moto[];
let colors: Database["public"]["Tables"]["color"]["Insert"][];
let marcas: Database["public"]["Tables"]["motosmarca"]["Insert"][];
let transmisiones: Database["public"]["Tables"]["motostransmision"]["Insert"][];
let frenos: Database["public"]["Tables"]["motosfreno"]["Insert"][];
let suspensiones: Database["public"]["Tables"]["motossuspension"]["Insert"][];
let arranques: Database["public"]["Tables"]["motostipoarranque"]["Insert"][];
let motosData: Database["public"]["Tables"]["moto"]["Insert"][];
let motosColor: Database["public"]["Tables"]["motocolor"]["Insert"][];

colors = motos.map((moto) => {
    return moto.MotosColores.map((color) => {
        return {
            nombre_color: color.Colore.nombre_color,
            codigo_color: color.Colore.codigo_color,
            slug: color.Colore.slug,
            state: color.Colore.state,
        }
    })
}).flat()

await supaClient.from("color").upsert(colors).then((res) => {
    console.log("Colors upserted", res);
})

marcas = motos.map((moto) => {
    return {
        nombre_marca: moto.MotosMarca.nombre_marca,
        slug: moto.MotosMarca.slug,
        state: moto.MotosMarca.state,
    }
})

await supaClient.from("motosmarca").upsert(marcas).then((res) => {
    console.log("Marcas upserted", res);
})

transmisiones = motos.map((moto) => {
    return {
        nombre_transmision: moto.MotosTransmision.nombre_transmision,
        tipo_filtro: moto.MotosTransmision.tipo_filtro,
        slug: moto.MotosTransmision.slug,
    }
})

await supaClient.from("motostransmision").upsert(transmisiones).then((res) => {
    console.log("Transmisiones upserted", res);
})

frenos = motos.map((moto) => {
    return {
        nombre_freno: moto.MotosFrenoDelantero.nombre_freno ?? "",
        slug: moto.MotosFrenoDelantero.slug,
        state: moto.MotosFrenoDelantero.state,
    }
})

frenos = frenos.concat(motos.map((moto) => {
    return {
        nombre_freno: moto.MotosFrenoTrasero.nombre_freno ?? "",
        slug: moto.MotosFrenoTrasero.slug,
        state: moto.MotosFrenoTrasero.state,
    }
}))

await supaClient.from("motosfreno").upsert(frenos).then((res) => {
    console.log("Frenos upserted", res);
})

suspensiones = motos.map((moto) => {
    return {
        nombre_suspension: moto.MotosSuspensionDelantera.nombre_suspension ?? "",
        slug: moto.MotosSuspensionDelantera.slug,
        state: moto.MotosSuspensionDelantera.state,
    }
})

suspensiones = suspensiones.concat(motos.map((moto) => {
    return {
        nombre_suspension: moto.MotosSuspensionTrasera.nombre_suspension ?? "",
        slug: moto.MotosSuspensionTrasera.slug,
        state: moto.MotosSuspensionTrasera.state,
    }
}))

await supaClient.from("motossuspension").upsert(suspensiones).then((res) => {
    console.log("Suspensiones upserted", res);
})

arranques = motos.map((moto) => {
    return {
        nombre_tipo_arranque: moto.MotosTipoArranque.nombre_tipo_arranque,
        slug: moto.MotosTipoArranque.slug,
        state: moto.MotosTipoArranque.state,
    }
})

await supaClient.from("motostipoarranque").upsert(arranques).then((res) => {
    console.log("Arranques upserted", res);
})

const motoss = motos.map(async (moto) => {
    return {
        nombre: moto.nombre,
        descripcion_corta: moto.descripcion_corta,
        url_img_header: moto.url_img_header,
        modelo: moto.modelo,
        url_foto: moto.url_foto,
        precio_moto: moto.precio_moto,
        precio_papeles: moto.precio_papeles,
        id_estilo: moto.id_estilo,
        cilindraje:moto.cilindraje,
        tipo_motor: moto.tipo_motor,
        potencia_maxima_hp: moto.potencia_maxima_hp ?? 0,
        potencia_maxima_rpm: moto.potencia_maxima_rpm ?? 0,
        torque_maximo_nm: moto.torque_maximo_nm ?? 0,
        torque_maximo_rpm: moto.torque_maximo_rpm ?? 0,
        relacion_compresion: moto.relacion_compresion ?? 0,
        id_tipo_transmision: ((await supaClient.from("motostransmision").select("id").eq("slug", moto.id_tipo_transmision).single()).data?.id ?? 1),
        rueda_delantera: moto.rueda_delantera,
        rueda_trasera: moto.rueda_trasera,
        dimension_total: moto.dimension_total,
        distancia_entre_ejes: moto.distancia_entre_ejes,
        peso: moto.peso,
        id_freno_delantero: ((await supaClient.from("motosfreno").select("id").eq("slug", moto.id_freno_delantero).single()).data?.id ?? 3),
        id_freno_trasero: ((await supaClient.from("motosfreno").select("id").eq("slug", moto.id_freno_trasero).single()).data?.id ?? 3),
        id_suspension_delantera: ((await supaClient.from("motossuspension").select("id").eq("slug", moto.id_suspension_delantera).single()).data?.id ?? 2),
        id_suspension_trasera: ((await supaClient.from("motossuspension").select("id").eq("slug", moto.id_suspension_trasera).single()).data?.id ?? 2),
        id_arranque: ((await supaClient.from("motostipoarranque").select("id").eq("slug", moto.MotosTipoArranque.id).single()).data?.id ?? 1),
        certificacion: moto.certificacion,
        slug_moto: moto.slug_moto,
        seo_titulo: moto.seo_titulo ?? "",
        seo_descripcion: moto.seo_descripcion ?? "",
        id_marca: ((await supaClient.from("motosmarca").select("id").eq("slug", moto.id_marca).single()).data?.id ?? 1),
    }
})

motosData = await Promise.all(motoss);

await supaClient.from("moto").upsert(motosData).then((res) => {
    console.log("Motos upserted", res);
})

motosColor = motos.map((moto) => {
    return moto.MotosColores.map((color) => {
        return {
            id_moto: ((motosData.find((m) => m.id === moto.id)?.id) ?? 0),
            id_color: ((colors.find((c) => c.id === color.Colore.id)?.id) ?? 0),
            url_foto_color_peque: color.url_foto_color_peque,
            url_foto_color_grande: color.url_foto_color_grande,
        }
    })
}).flat()

// await supaClient.from("motocolor").upsert(motosColor).then((res) => {
//     console.log("MotosColor upserted", res);
// })



