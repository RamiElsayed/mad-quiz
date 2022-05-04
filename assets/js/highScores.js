const mainElem = document.getElementById("main");

 window.addEventListener = ('load',() => {

 const section = document.createElement("section");
  section.setAttribute("class", "section question-container");
  section.setAttribute("id", "question-container");

const highScoresArray = JSON.parse(localStorage.getItem("highscores"));
console.log(highScoresArray);
const scoresList = document.createElement("ul");
scoresList.setAttribute("class", "highscores-list");

  for (let i = 0; i < highScoresArray.length; i++) {
    const li = document.createElement("li");
    li.setAttribute("class", "score");
    li.setAttribute("id", "score-data");
    li.textContent = highScoresArray[i];
    scoresList.append(li);
  }
  section.append(scoresList)
  mainElem.append(section);
})