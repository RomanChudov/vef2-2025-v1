
export function checkingQuestionFormLengd(typeData) {
    var len;
  
    try {
      len = typeData.questions.length;
    } catch (error) {
      console.error("Villa kom upp í að meta fjölda spurninga");
      return null;
    }
  
    return len;
  }