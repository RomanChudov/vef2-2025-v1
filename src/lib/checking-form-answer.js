
export function checkingQuestionFormAnswers(typeData, len) {
  var rightForm = [];

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
        console.error(`Fjöldi spurninga er eki 4`)
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
        if (!correct0 || !correct1 || !correct2 || !correct3) {
          // console.log("Spurning á rétta form");
          rightForm[i] = true;
        } else {
          console.error(
            `Það vantar villuust svar í ${typeData.questions[i][question]}`
          );
          break;
        }
      } else {
        console.error(
          `Það vantar rétt svar í ${typeData.questions[i][question]}`
        );

        break;
      }
    } catch (error) {
      rightForm[i] = false;
      console.error("Spruning á villust form");
    }
  }
  return rightForm;
}