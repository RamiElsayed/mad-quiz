//target start button
const startButton = document.getElementById("start-btn");
//target banner section
const bannerElem = document.getElementById("banner-section");
//target main element
const mainElem = document.getElementById("main");
//time left variable to store time and use as score
let timeLeft = 10;
var scoresArray = [];
var startTimer;

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
].sort(() => Math.random() - 0.5);

const removeSection = () => {
  bannerElem.remove();
};

const removeQuestionSection = () => {
  const questionSection = document.getElementById("question-container");
  questionSection.remove();
};
const removeForm = () => {
  const formSection = document.getElementById("score-form");
  formSection.remove();
};

const removeTimer = () => {
  const timerSection = document.getElementById("timer");
  timerSection.remove();
};
const finishAndRestartQuiz = () => {
  window.location.reload();
};

const restartPage = () => {
  const restartSection = document.createElement("section");
  restartSection.setAttribute("class", "restart-page");

  const restartOption = document.createElement("p");
  restartOption.setAttribute("class", "restart-option");
  restartOption.textContent =
    "you ran out of time, Click restart or the mad genuis quiz title to go back to home page";
  
  const restartButton = document.createElement("button");
  restartButton.setAttribute("class", "restart-button");
  restartButton.innerHTML = "restart";

  
  restartSection.append(restartOption);
  restartSection.append(restartButton);
  mainElem.append(restartSection);
  restartButton.addEventListener("click", finishAndRestartQuiz)
};



const saveScoreInLocalStorage = (name, score) => {
      let newScore = {
        name,
        score
      }
      localStorage.setItem("finalscore",JSON.stringify(newScore));
      var highscores = JSON.parse(localStorage.getItem("highscores"));
      if(highscores && highscores.length){
        if(highscores.length>=100){
          highscores=[];
          alert("scores are being reset")
        }
        highscores.push(newScore)
        highscores.sort((questionA, QuestionB) => {
          return QuestionB.score - questionA.score
        })
      }else{
        highscores = [newScore]
      }
      localStorage.setItem("highscores",JSON.stringify(highscores));
    
}
const storeAndshowScore = (event) => {
  event.preventDefault();
  const name = document.getElementById("form-input").value;
  if (name) {
    removeForm();

    const scoreSection = document.createElement("section");
    scoreSection.setAttribute("class", "score-data");

    const scoreCard = document.createElement("h1");
    scoreCard.setAttribute("class", "score-card");
    scoreCard.textContent = `${name}'s score: ${timeLeft}`;


    const notification = document.createElement("h4");
    notification.setAttribute("class", "notification");
    notification.textContent =
      "you can see the high scores by clicking on the high score link on the top left of this page";
    
    const finishAndRestartQuizButton = document.createElement("button");
    finishAndRestartQuizButton.setAttribute("class", "finish-quiz-button");
    finishAndRestartQuizButton.textContent = "Finish";

    scoreSection.append(scoreCard);
    scoreSection.append(notification);
    scoreSection.append(finishAndRestartQuizButton);
    mainElem.append(scoreSection);

    saveScoreInLocalStorage(name, timeLeft);
    finishAndRestartQuizButton.addEventListener("click", finishAndRestartQuiz)

  } else  {
    alert("please enter your name");
  }
};
const renderForm = () => {
  const form = document.createElement("form");
  form.setAttribute("class", "form-section");
  form.setAttribute("id", "score-form");

  const inputTitle = document.createElement("h2");
  inputTitle.setAttribute("class", "input-title");
  inputTitle.textContent = "please enter your name";

  const input = document.createElement("input");
  input.setAttribute("class", "input-field");
  input.placeholder = "your name";

  const submitButton = document.createElement("button");
  submitButton.setAttribute("class", "form-button");
  submitButton.innerHTML = "submit";

  inputTitle.append(input);
  inputTitle.append(submitButton);
  form.append(inputTitle);
  mainElem.append(form);

  submitButton.addEventListener("click", storeAndshowScore);
};


const renderTimer = () => {
  const timersection = document.createElement("section");
  timersection.setAttribute("class", "timer-section");
  timersection.setAttribute("id", "timer");

  const timerDiv = document.createElement("div");
  timerDiv.setAttribute("class", "timer-div");
  timerDiv.setAttribute("id", "timerDiv");

  startTimer = setInterval(() => {
    timerDiv.textContent = `timeleft: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(startTimer);
      removeQuestionSection();
      removeTimer();
      restartPage();
    }
    timeLeft--;
    if (questionIndex > 3) {
      clearInterval(startTimer);
      removeTimer();
      renderForm();
    }
  }, 1000);
  timerDiv.textContent = `timeleft: ${timeLeft}`;

  timersection.append(timerDiv);
  mainElem.append(timersection);
};

const isCorrectAnswer = (answer, questionIndex) => {
  return answer === questions[questionIndex].correctanswer;
};

const onAnswerSectionClick = (event) => {
  if (event.target.tagName !== "LI") return;
  removeQuestionSection();

  if (isCorrectAnswer(event.target.textContent, questionIndex)) {
    timeLeft += 2;
  } else {
    timeLeft -= 3;
  }

  if (questionIndex < 3) {
    questionIndex += 1;
    renderQuestion();
  } else {
    clearInterval(startTimer);
    removeTimer();
    renderForm();
  }
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

  section.addEventListener("click", onAnswerSectionClick);
};

const startQuiz = () => {
  removeSection();

  renderTimer();

  renderQuestion();
};

//add event listener to start button
startButton.addEventListener("click", startQuiz);
