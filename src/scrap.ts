import {mkdir, readFile, stat, writeFile} from "fs/promises"
import path from "path"
import {Moto} from "./types/Moto.js";
import {createWriteStream} from "fs";
import * as https from "https";
import {IMAGES_BASE_URL} from "./constants.js";
import {nanoid} from "nanoid"


export async function scrap(motosPath: string) {

    try {
        await stat(path.join(process.cwd(), "images"));
    } catch (error) {
        // @ts-ignore
        if (error?.code === "ENOENT") {
            console.log("Creating images folder")
            try {
                await mkdir(path.join(process.cwd(), "images"))
                console.log("Creating images/url_img_header folder")
                await mkdir(path.join(process.cwd(), "images", "url_img_header"))
                console.log("Creating images/url_foto folder")
                await mkdir(path.join(process.cwd(), "images", "url_foto"))
                console.log("Creating images/motos_colores folder")
                await mkdir(path.join(process.cwd(), "images", "motos_colores"))
            } catch (error) {
                console.log("Error on mkdir", error)
            }
        } else {
            console.log("Error on stat", error)
        }
    }

    const db: Moto[] = JSON.parse((await readFile(path.join(process.cwd(), motosPath))).toString())

    const photos = db.map(moto => {
        return {
            url_img_header: moto.url_img_header,
            url_foto: moto.url_foto,
            motos_colores: moto.MotosColores.map(moto_color => {
                return {
                    url_foto_color_peque: moto_color.url_foto_color_peque,
                    url_foto_color_grande: moto_color.url_foto_color_grande
                }
            })
        }
    })

    async function downloadPhotos(photos: any[], folder: string, maxRetries = 3, delay = 1000) {
        const promises = photos.map(photo => {
            return new Promise<void>(async (resolve, reject) => {
                const url = IMAGES_BASE_URL + (photo.url_img_header || photo.url_foto || photo.url_foto_color_peque || photo.url_foto_color_grande)
                const filename = url.split("/").pop()
                const file = path.join(process.cwd(), "images", folder, filename || nanoid())
                const fileStream = createWriteStream(file)
                let downloaded = 0;
                let total = 0;

                for (let i = 0; i < maxRetries; i++) {
                    try {
                        fileStream.on("open", () => {
                            https.get(url.replaceAll("\r\n", ""), (response) => {
                                total = parseInt(response.headers['content-length'] || "0", 10);
                                console.log(`Starting download of ${url}`);
                                response.on('data', (chunk) => {
                                    downloaded += chunk.length;
                                    const percentage = ((downloaded / total) * 100).toFixed(2);
                                    process.stdout.write(`\rDownload progress: ${percentage}%`);
                                });
                                response.pipe(fileStream);
                            })
                        })
                        fileStream.on("finish", () => {
                            console.log(`\nFinished download of ${url}`);
                            resolve()
                        })
                        break; // If the download is successful, break the loop
                    } catch (error) {
                        if (i < maxRetries - 1) { // If this is not the last retry
                            console.log(`Error downloading ${url}: ${error}. Retrying in ${delay}ms...`);
                            await new Promise(resolve => setTimeout(resolve, delay)); // Wait before retrying
                        } else { // If this is the last retry
                            console.log(`\nError downloading ${url}: ${error}`);
                            reject(error)
                        }
                    }
                }
            })
        })
        return Promise.all(promises)
    }

    for (const photo of photos) {
        try {
            await downloadPhotos([photo], "url_img_header")
            await downloadPhotos([photo], "url_foto")
            await downloadPhotos(photo.motos_colores, "motos_colores")
        } catch (error) {
            console.log("Error downloading photos", error)
        }
    }

    console.log("Finished downloading photos")

// Rewrite URLs in db to the location of the photos in the local filesystem
    for (const moto of db) {
        moto.url_img_header = moto.url_img_header ? path.join("images", "url_img_header", moto.url_img_header.split("/").pop() || nanoid()) : null
        moto.url_foto = moto.url_foto ? path.join("images", "url_foto", moto.url_foto.split("/").pop() || nanoid()) : null
        for (const moto_color of moto.MotosColores) {
            moto_color.url_foto_color_peque = moto_color.url_foto_color_peque ? path.join("images", "motos_colores", moto_color.url_foto_color_peque.split("/").pop() || nanoid()) : null
            moto_color.url_foto_color_grande = moto_color.url_foto_color_grande ? path.join("images", "motos_colores", moto_color.url_foto_color_grande.split("/").pop() || nanoid()) : null
        }
    }

// Save the updated db in a file called "motos-scraped.json"
    await writeFile(path.join(process.cwd(), "motos-scraped.json"), JSON.stringify(db));

    console.log("Finished downloading photos and saved the updated database to 'motos-scraped.json'");
}