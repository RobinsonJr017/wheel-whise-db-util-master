import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Moto } from "./types/Moto.js";
import { createWriteStream } from "node:fs";
import * as https from "node:https";
import { IMAGES_BASE_URL } from "./constants.js";
import { nanoid } from "nanoid";

export async function scrap(motosPath: string) {
  try {
    await stat(path.join(process.cwd(), "images"));
  } catch (error) {
    // @ts-ignore
    if (error?.code === "ENOENT") {
      console.log("Creating images folder");
      try {
        await mkdir(path.join(process.cwd(), "images"));
        console.log("Creating images/url_img_header folder");
        await mkdir(path.join(process.cwd(), "images", "url_img_header"));
        console.log("Creating images/url_foto folder");
        await mkdir(path.join(process.cwd(), "images", "url_foto"));
        console.log("Creating images/motos_colores folder");
        await mkdir(path.join(process.cwd(), "images", "motos_colores"));
      } catch (error) {
        console.log("Error on mkdir", error);
      }
    } else {
      console.log("Error on stat", error);
    }
  }

  const db: Moto[] = JSON.parse(
    (await (await readFile(path.join(process.cwd(), motosPath))).toString()).replaceAll("–", "-")
  );

  const photos = db.map((moto) => {
    return {
      url_foto: { photo: moto.url_foto, id: moto.id}
    };
  });

  async function downloadPhotos(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    photos: any[],
    folder: string,
    maxRetries = 3,
    delay = 1000
  ) {
    for (const photo of photos) {
      // biome-ignore lint/suspicious/noAsyncPromiseExecutor: <explanation>
      await new Promise<void>(async (resolve, reject) => {
        const url =
        IMAGES_BASE_URL +
        (photo.url_img_header ||
          photo.url_foto.photo ||
          photo.url_foto_color_peque ||
          photo.url_foto_color_grande);
          const filename = url.replaceAll("\r\n", "").split("/").pop();
          const file = path.join(
            process.cwd(),
            "images",
            folder,
            `${photo.url_foto.id}.png` || filename || nanoid()
          );
          const fileStream = createWriteStream(file);
          
          for (let i = 0; i < maxRetries; i++) {
            try {
              fileStream.on("open", () => {
                function downloadWithRetry(url: string, retries = 5) {
                  const request = https.get(
                    url.replaceAll("\r\n", ""),
                    (response) => {
                      const total = Number.parseInt(
                        response.headers["content-length"] || "0",
                        10
                      );
                      let downloaded = 0;
                      console.log(`Starting download of ${url}`);
                      response.on("data", (chunk) => {
                        downloaded += chunk.length;
                        const percentage = ((downloaded / total) * 100).toFixed(
                          2
                        );
                        process.stdout.write(
                          `\rDownload progress: ${percentage}%`
                        );
                      });
                      response.pipe(fileStream);
                    }
                );

                request.on("error", (err: any) => {
                  if (err.code === "ECONNRESET") {
                    console.log(
                      "TCP Connection was abruptly closed. Retrying..."
                    );
                    if (retries > 0) {
                      downloadWithRetry(url, retries - 1);
                    } else {
                      console.log("Failed to download after several attempts.");
                    }
                  } else {
                    // Handle other errors
                  }
                });
                
                fileStream.on("finish", () => {
                  console.log(`\nFinished download of ${url}`);
                });
              }

              // Call the function with the URL
              downloadWithRetry(url);
            });

            fileStream.on("finish", () => {
              console.log(`\nFinished download of ${url}`);
              resolve();
            });
            break; // If the download is successful, break the loop
          } catch (error) {
            if (i < maxRetries - 1) {
              // If this is not the last retry
              console.log(
                `Error downloading ${url}: ${error}. Retrying in ${delay}ms...`
              );
              await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
            } else {
              // If this is the last retry
              console.log(`\nError downloading ${url}: ${error}`);
              reject(error);
            }
          }
        }
      });
    }
  }
  
  for (const photo of photos) {
    try {
      await downloadPhotos([photo], "url_foto")
    } catch (error) {
      console.log("Error downloading photos", error);
    }
  }

  console.log("Finished downloading photos");

  // Rewrite URLs in db to the location of the photos in the local filesystem
  for (const moto of db) {
    moto.url_img_header = moto.url_img_header
      ? path.join(
          "images",
          "url_img_header",
          moto.url_img_header.split("/").pop() || nanoid()
        )
      : null;
    moto.url_foto = moto.url_foto
      ? path.join(
          "images",
          "url_foto",
          moto.url_foto.split("/").pop() || nanoid()
        )
      : null;
    for (const moto_color of moto.MotosColores) {
      moto_color.url_foto_color_peque = moto_color.url_foto_color_peque
        ? path.join(
            "images",
            "motos_colores",
            moto_color.url_foto_color_peque.split("/").pop() || nanoid()
          )
        : null;
      moto_color.url_foto_color_grande = moto_color.url_foto_color_grande
        ? path.join(
            "images",
            "motos_colores",
            moto_color.url_foto_color_grande.split("/").pop() || nanoid()
          )
        : null;
    }
  }

  // Save the updated db in a file called "motos-scraped.json"
  await writeFile(
    path.join(process.cwd(), "motos-scraped.json"),
    JSON.stringify(db)
  );

  console.log(
    "Finished downloading photos and saved the updated database to 'motos-scraped.json'"
  );
}

await scrap("motos.json");