import { replaceHtmlEntities } from "./replace-string.js";

export function correctStringData(correctData){

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
  
    return correctData
  
  }