//target start button
const startButton = document.getElementById("start-btn");
//target banner section
const bannerElem = document.getElementById("banner-section");
//target main element
const mainElem = document.getElementById("main");

//question index and questions array
let questionIndex = 0;
const questions = [
  {
    question:
      "Who is the only human being to win 2 noble prizes in 2 different science ?",
    choices: ["albert einstein", "nicola tesla", "Graham Bill", "marie curie"],
    correctanswer: "marie curie",
  },
  {
    question: "the scientist with the most inventions in recent history ?",
    choices: ["Thomas Edison", "archimedes", "nicola tesla", "michael faraday"],
    correctanswer: "nicola tesla",
  },
  {
    question:
      "who's the first scientist to invent the concept of visual reflection (camera) ?",
    choices: [
      "rosalind franklin",
      "james d watson",
      "alhazin",
      "alexander fleming",
    ],
    correctanswer: "alhazin",
  },
  {
    question: "who's the scientist to invent the first antibiotic in history",
    choices: ["carl yung", "carl sagan", "alexander fleming", "carl gauss"],
    correctanswer: "alexander fleming",
  },
];
const removeSection = () => {
  bannerElem.remove();
};

const removeQuestionSection = () => {
  const questionSection = document.getElementById("question-container");
  questionSection.remove();
};

const removeTimer = () => {
  const timerSection = document.getElementById("timer");
  timerSection.remove();
};
let timeLeft = 20;
const restartPage = () => {
  const restartSection = document.createElement("section");
  restartSection.setAttribute("class", "restart-page");

  const restartOption = document.createElement("p");
  restartOption.setAttribute("class", "restart-option");
  restartOption.textContent =
    "you ran out of time, Click restart or the mad genuis quiz title to go back to home page";

  restartSection.append(restartOption);
  mainElem.append(restartSection);
};
const renderForm =(score) => {
  const form = document.createElement("form");
  form.setAttribute("class", "form-section");

  const inputTitle = document.createElement("h2");
  inputTitle.setAttribute("class", "input-title");
  inputTitle.textContent = "please enter your name"

  const input = document.createElement("input");
  input.setAttribute("class", "input-field");
  input.placeholder("your name");

  
  localStorage(score);
}
var startTimer;
const renderTimer = () => {
  const timersection = document.createElement("section");
  timersection.setAttribute("class", "timer-section ");
  timersection.setAttribute("id", "timer");

  const timerDiv = document.createElement("div");
  timerDiv.setAttribute("class", "timer-div");
  timerDiv.setAttribute("id", "timerDiv");

  startTimer = setInterval(() => {
    timerDiv.textContent = `timeleft: ${timeLeft}`;
    if (timeLeft <= 0 ) {
      clearInterval(startTimer);
      removeQuestionSection();
      removeTimer();
      restartPage();
    }
  
    timeLeft--;
    if (questionIndex > 3) {
      clearInterval(startTimer);
      renderForm(timeLeft);
    }
  }, 1000);
  timerDiv.textContent = `timeleft: ${timeLeft}`;

  timersection.append(timerDiv);
  mainElem.append(timersection);
};

const chosenAnswer = (event) => {
  //target
  var targetAnswer = event.target;
  //validate answer
  if (targetAnswer.tagName === "LI" && targetAnswer.textContent !== questions[questionIndex].correctanswer && questionIndex < 3) {
      timeLeft -= 1;
  }
  removeQuestionSection();
  questionIndex += 1;
  renderQuestion();
};

const renderQuestion = () => {
  //get the question

  const currentQuestion = questions[questionIndex];

  // create section
  const section = document.createElement("section");
  section.setAttribute("class", "section question-container");
  section.setAttribute("id", "question-container");

  //create h2
  const h2 = document.createElement("h2");
  h2.setAttribute("class", "question-title");
  h2.textContent = `${questionIndex + 1}. ${currentQuestion.question}`;
  //create ul and append lis
  const ul = document.createElement("ul");
  ul.setAttribute("class", "choices-list");

  for (let i = 0; i < currentQuestion.choices.length; i++) {
    const li = document.createElement("li");
    li.setAttribute("class", "list-choice");
    li.setAttribute("id", "list-choice");
    li.textContent = currentQuestion.choices[i];
    ul.append(li);
  }

  //append ul and h2 to section
  section.append(h2, ul);

  //append section to main
  mainElem.append(section);

  section.addEventListener("click", chosenAnswer);
};

const handleStartButtonClick = () => {
  //remove section
  removeSection();
  //render timer
  renderTimer();
  //render question
  renderQuestion();
};

//add event listener to start button
startButton.addEventListener("click", handleStartButtonClick);
