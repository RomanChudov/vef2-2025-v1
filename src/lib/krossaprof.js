import { rettSvar } from "./rett-svar.js";

export function krossaprof(correctData){
    const html = correctData
      .map(
        (item) => `
        <h2>Spurning${correctData.indexOf(item)+1} </h2>

        <p>${item.question}</p><br />


        <input type="radio" id="${
          item.answers[0]["answer"]
        }" name="answers" value="0"><br />
        <label for="html">${item.answers[0]["answer"]}</label><br />
        
        <script>
        document.getElementById("${
          item.answers[0]["answer"]
        }").addEventListener("click", myFunction0);
        function myFunction0() {
        alert ("${rettSvar(item.answers[0]["correct"])}");
        }
        </script>
  
  
        <input type="radio" id="${
          item.answers[1]["answer"]
        }" name="answers" value="1"><br />
        <label for="html">${item.answers[1]["answer"]}</label><br />
        
  
        <script>
        document.getElementById("${
          item.answers[1]["answer"]
        }").addEventListener("click", myFunction1);
        function myFunction1() {
        alert ("${rettSvar(item.answers[1]["correct"])}");
        }
        </script>
  
         
        <input type="radio" id="${
          item.answers[2]["answer"]
        }" name="answers" value="2"><br />
        <label for="html">${item.answers[2]["answer"]}</label><br />
        
        <script>
        document.getElementById("${
          item.answers[2]["answer"]
        }").addEventListener("click", myFunction2);
        function myFunction2() {
        alert ("${rettSvar(item.answers[2]["correct"])}");
        }
        </script>
  
         
              
        <input type="radio" id="${
          item.answers[3]["answer"]
        }" name="answers" value="3"><br />
        <label for="html">${item.answers[3]["answer"]}</label><br />
        
        <script>
        document.getElementById("${
          item.answers[3]["answer"]
        }").addEventListener("click", myFunction3);
        function myFunction3() {
        alert ("${rettSvar(item.answers[3]["correct"])}");
        }
        </script>
  
         
        `
      )
      .join("\n");
  
      return html
  
  }