const mainElem = document.getElementById("main");

 window.addEventListener = ('load',() => {

 const highScoresSection = document.createElement("highScoresSection");
  highScoresSection.setAttribute("class", "highScoresSection");

const highScoresArray = JSON.parse(localStorage.getItem("highscores"));
console.log(highScoresArray);
const scoresList = document.createElement("ul");
scoresList.setAttribute("class", "highscores-list");

  for (let i = 0; i < highScoresArray.length; i++) {
    const li = document.createElement("li");
    li.setAttribute("class", "score");
    li.textContent = `${highScoresArray[i].name} ${highScoresArray[i].score}`;
    scoresList.append(li);
  }
  highScoresSection.append(scoresList)
  mainElem.append(highScoresSection);
})