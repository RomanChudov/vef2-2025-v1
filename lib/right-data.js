export function rightData(data) {
    const l = [];
    var i = 0;
    for (let x in data) {
      if (
        data[x].title === "HTML" ||
        data[x].title === "CSS" ||
        data[x].title === "JavaScript"
      ) {
        l[i] = data[x];
        i = i + 1;
      }else{
        console.error(`${data[x].title} er óviðegandi flokkur`)
      }
    }
    return l;
  }