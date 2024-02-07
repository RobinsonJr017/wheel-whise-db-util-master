import {updateData} from "./util.js";
import {scrap} from "./scrap.js";

await updateData();
await scrap("motos.json");