import { read } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import {rightData} from "./right-data.js"

/**
 * Skrifa HTML fyrir yfirlit í index.html
 * @param {any} data Gögn til að skrifa
 * @returns {Promise<void>}
 */
export async function writeIndexHtml(data) {
  const htmlFilePath = `./public/index.html`;

  const html = rightData(data)
    .map((item) => `<li><a href=${item.title}.html>${item.title}</a></li>`)
    .join("\n");


  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="../style.css">

  </head>
  <body>
  <nav>
    <ul>
         <li><a href=index.html>Forsíða</a></li>

      ${html}
    </ul>
    </nav>
    <main>
    <h1>Krossapróf um vefforritun</h1>
    <p>Hér er síða þar sem er birt krossapróf af námsefni í vefforritun. Hver flokkur hefur sitt eigin síðu, þar sagt það er hægt að hreyfast á milli flokka með navigation</p>
    </main>
  </body>
</html>

`;

  fs.writeFile(htmlFilePath, htmlContent, "utf8");
}