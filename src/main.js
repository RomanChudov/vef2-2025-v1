// import { read } from "node:fs";
import fs from "node:fs/promises";
// import path from "node:path";

// import { replaceHtmlEntities } from "./lib/replace-string.js";
// import { rettSvar } from "./lib/rett-svar.js";
import { readJson } from "./lib/read-json.js";
import { rightData } from "./lib/right-data.js";
import { writeIndexHtml } from "./lib/write-index.js";
import { parseIndexJson } from "./lib/parse-index.js";
import { jsTrouble } from "./lib/js-trouble.js";
// import { checkingQuestionFormLengd } from "./lib/checking-form-lengd.js";
// import { checkingQuestionFormAnswers } from "./lib/checking-form-answer.js";
import { checkingQuestionForm } from "./lib/checking-form.js";
import { correctStringData } from "./lib/correct-stringData.js";
import { krossaprof } from "./lib/krossaprof.js";

const INDEX_PATH = "./data/index.json";

// async function navigator(INDEX_PATH) {
//   const indexJson = await readJson(INDEX_PATH);
//   const indexData = parseIndexJson(indexJson);

//   const navi = rightData(indexData)
//     .map((item) => `<li><a href=${item.title}.html>${item.title}</a></li>`)
//     .join("\n");

//   return navi;
// }

async function writeQuestion(type) {
  const typeJson = await readJson(`./data/${type}.json`);
  const typeData = parseIndexJson(typeJson);

  type = jsTrouble(type);

  const htmlFilePath = `./public/${type}.html`;
  console.log(`Building ${type} html file`);

  var correctData = checkingQuestionForm(typeData);
  correctData = correctStringData(correctData);

  const html = krossaprof(correctData);

  const indexJson = await readJson(INDEX_PATH);
  const indexData = parseIndexJson(indexJson);

  const navi = rightData(indexData)
    .map((item) => `<li><a href=${item.title}.html>${item.title}</a></li>`)
    .join("\n");

  // const navi = navigator(INDEX_PATH);

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="../style.css">

      <title>Document</title>
    </head>
    <body>
  
    <nav>
    <ul>
     <li><a href=index.html>Forsíða</a></li>
      ${navi}
    </ul>
    </nav>
    <main>   
    <form>    
    ${html} 
    </form>
  </main>

    </body>

  </html>
  
  `;

  fs.writeFile(htmlFilePath, htmlContent, "utf8");
}

/**
 * Keyrir forritið okkar:
 * 1. Sækir gögn
 * 2. Staðfestir gögn (validation)
 * 3. Skrifar út HTML
 */
async function main() {
  writeQuestion("html");
  writeQuestion("js");
  writeQuestion("css");

  const indexJson = await readJson(INDEX_PATH);
  const indexData = parseIndexJson(indexJson);

  writeIndexHtml(indexData);
}

main();
