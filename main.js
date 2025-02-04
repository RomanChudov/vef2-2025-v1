import { read } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

const INDEX_PATH = "./data/index.json";

function replaceHtmlEntities(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Les skrá og skilar gögnum eða null.
 * @param {string} filePath Skráin sem á að lesa
 * @returns {Promise<unknown | null>} Les skrá úr `filePath` og skilar innihaldi. Skilar `null` ef villa kom upp.
 */
async function readJson(filePath) {
  console.log("starting to read", filePath);
  let data;
  try {
    data = await fs.readFile(path.resolve(filePath), "utf-8");
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }

  try {
    const parsed = JSON.parse(data);
    return parsed;
  } catch (error) {
    console.error("error parsing data as json");
    return null;
  }
}

function rightData(data) {
  const l = [];
  var i = 0;
  for (let x in data) {
    console.log(data[x].title);
    if (
      data[x].title === "HTML" ||
      data[x].title === "CSS" ||
      data[x].title === "JavaScript"
    ) {
      l[i] = data[x];
      i = i + 1;
    }
  }
  console.log(l);
  return l;
}

// function writeQuest(type) {
//   const JSfilePath = `./data/${type}.json`;
//   if (JSfilePath) {
//     const file = parseIndexJson(readJson(JSfilePath));
//     console.log(file);
//     return file.questions;
//   }
// }

/**
 * Skrifa HTML fyrir yfirlit í index.html
 * @param {any} data Gögn til að skrifa
 * @returns {Promise<void>}
 */
async function writeIndexHtml(data) {
  const htmlFilePath = `dist/index.html`;

  const html = rightData(data)
    .map((item) => `<li><a href=${item.title}.html>${item.title}</a></li>`)
    .join("\n");

  // var questJSFilePath;

  // if (name == "HTML" || name == "CSS" || name == "JavaScript") {
  //   var questJSFilePath = `./data/${name}.json`;
  //   // console.log(questJSFilePath);
  // } else if (name == "index") {
  //   var questJSFilePath = null;
  // }

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
  <nav>
    <ul>
      ${html}
    </ul>
    </nav>
  </body>
</html>

`;

  fs.writeFile(htmlFilePath, htmlContent, "utf8");
}

/**
 *
 * @param {unknown} data
 * @returns {any}
 */
function parseIndexJson(data) {
  return data;
}

async function writeQuestion(type) {
  var typeExtra;
  if (type == "js") {
    typeExtra = "JavaScript";
  } else {
    typeExtra = type;
  }

  const htmlFilePath = `dist/${typeExtra}.html`;
  console.log(type);

  const typeJson = await readJson(`./data/${type}.json`);

  const typeData = parseIndexJson(typeJson);

  console.log(typeData);

  var len;

  try {
    len = typeData.questions.length;
  } catch (error) {
    console.error("Villa kom upp í að meta fjölda spurninga");
    return null;
  }

  var rightForm = [];
  var correctData = [];
  var h = 0;

  for (let i = 0; i < len; i++) {
    var answer0;
    var answer1;
    var answer2;
    var answer3;
    var correct0;
    var correct1;
    var correct2;
    var correct3;

    try {
      if (typeData.questions[i]["answers"].length != 4) {
        break;
      }

      answer0 = typeData.questions[i]["answers"][0]["answer"];
      correct0 = typeData.questions[i]["answers"][0]["correct"];

      answer1 = typeData.questions[i]["answers"][1]["answer"];
      correct1 = typeData.questions[i]["answers"][1]["correct"];

      answer2 = typeData.questions[i]["answers"][2]["answer"];
      correct2 = typeData.questions[i]["answers"][2]["correct"];

      answer3 = typeData.questions[i]["answers"][3]["answer"];
      correct3 = typeData.questions[i]["answers"][3]["correct"];

      if (correct0 || correct1 || correct2 || correct3) {
        console.log("bla");
        if (!correct0 || !correct1 || !correct2 || !correct3) {
          console.log("Spurning á rétta form");
          rightForm[i] = true;
        }
      } else {
        break;
      }
    } catch (error) {
      rightForm[i] = false;
      console.error("Spruning á villust form");
    }
  }
  for (let k = 0; k < len; k++) {
    if (rightForm[k] == true) {
      correctData[h] = typeData.questions[k];
      console.log(correctData[h]);
      h++;
    }
  }

  for (let m = 0; m < correctData.length; m++) {
    correctData[m]["question"] = replaceHtmlEntities(
      correctData[m]["question"]
    );
    correctData[m]["answers"][0]["answer"] = replaceHtmlEntities(
      correctData[m]["answers"][0]["answer"]
    );
    correctData[m]["answers"][1]["answer"] = replaceHtmlEntities(
      correctData[m]["answers"][1]["answer"]
    );
    correctData[m]["answers"][2]["answer"] = replaceHtmlEntities(
      correctData[m]["answers"][2]["answer"]
    );
    correctData[m]["answers"][3]["answer"] = replaceHtmlEntities(
      correctData[m]["answers"][3]["answer"]
    );
  }

  // const html = rightData(data)
  //   .map((item) => `<li><a href=${item.title}.html>${item.title}</a></li>`)
  //   .join("\n");

  // console.log(correctData[0])
  const html = correctData
    .map(
      (item) => `
      <p>${item.question}</p><br />
      <input type="radio" id="${item.answers[0]["answer"]}" name="answers" value="0"><br />
      <label for="html">"${item.answers[0]["answer"]}"</label><br />


      <input type="radio" id="1" name="answers" value="1"><br />
      <label for="html">"${item.answers[1]["answer"]}"</label><br />

       
      <input type="radio" id="2" name="answers" value="2"><br />
      <label for="html">${item.answers[2]["answer"]}</label><br />

            
      <input type="radio" id="3" name="answers" value="3"><br />
      <label for="html">${item.answers[3]["answer"]}</label><br />

      `
    )
    .join("\n");
  // correctData.map((item) => console.log(item.question))

  const indexJson = await readJson(INDEX_PATH);
  const indexData = parseIndexJson(indexJson);

  const navi = rightData(indexData)
    .map((item) => `<li><a href=${item.title}.html>${item.title}</a></li>`)
    .join("\n");

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
  
    <nav>
    <ul>
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
