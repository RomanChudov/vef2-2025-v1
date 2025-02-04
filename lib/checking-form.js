import { checkingQuestionFormLengd } from "./checking-form-lengd.js";
import { checkingQuestionFormAnswers } from "./checking-form-answer.js";

export function checkingQuestionForm(typeData) {
    var len = checkingQuestionFormLengd(typeData);
  
    var rightForm = [];
    var correctData = [];
    var h = 0;
  
    rightForm = checkingQuestionFormAnswers(typeData, len);
  
    for (let k = 0; k < len; k++) {
      if (rightForm[k] == true) {
        correctData[h] = typeData.questions[k];
        h++;
      }
    }
    return correctData;
  }