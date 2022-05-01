//target start button
const startButton = document.getElementById("start-btn");
//target banner section
const bannerElem = document.getElementById("banner-section");
//target main element
const mainElem = document.getElementById("main");



const removeSection = () => {
  bannerElem.remove();
};

const removeQuestion = () => {

}
////declare event handler function for section clicks
const handleSectionClick = (event) => {
  const currentTarget = event.currentTarget;
  const choice = event.target;

  if (choice === "LI") {
    let value = target.getAttribute("data-value");
    timercalculation(currentTarget, value);
  }
  removeQuestion();
};
//create timer section
let timeLeft = 30;
const timercalculation = setInterval((currentTarget, value) => {
  if (currentTarget === questions[0] && !value === questions[0].choices[3]) {
    timeLeft -= 3;
  }
  if (currentTarget === questions[1] && !value === questions[1].choices[2]) {
    timeLeft -= 3;
  }
  if (currentTarget === questions[2] && !value === questions[1].choices[2]) {
    timeLeft -= 3;
  }
  if (currentTarget === questions[3] && !value === questions[1].choices[2]) {
    timeLeft -= 3;
  }
  timeLeft -= 1;
}, 1000);
const renderTimer = () => {
  const timer = document.createElement("section");
  section.setAttribute("class", "timer-section ");
  section.setAttribute("id", "timer");

  const timerDiv = document.createElement("div");
  section.setAttribute("class", "timer-div");
  section.setAttribute("id", "timerDiv");

  timerDiv.textContent = `timeleft: ${timeLeft}`;

  mainElem.append(timer);
  timer.append(timerDiv);
};
let questionIndex = 0;
const questions = [
  {
    question:
      "Who is the only human being to win 2 noble prizes in 2 different science ?",
    choices: ["albert einstein", "nicola tesla", "Graham Bill", "marie curie"],
  },
  {
    question: "the scientist with the most inventions in recent history ?",
    choices: ["Thomas Edison", "archimedes", "nicola tesla", "michael faraday"],
  },
  {
    question:
      "who's the first scientist to invent the concept of visual reflection (camera) ?",
    choices: [
      "rosalind franklin",
      "james d watson",
      "Alhazin",
      "alexander fleming",
    ],
  },
  {
    question: "who's the scientist to invent the first antibiotic in history",
    choices: ["carl yung", "carl sagan", "alexander fleming", "carl gauss"],
  },
];
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
  h2.textContent = `${questionIndex + 1}. ${currentQuestion.text}`;
  //create ul and append lis
  const ul = document.createElement("ul");
  ul.setAttribute("class", "choices-list");
  // create and append lis to ul
  const li1 = document.createElement("li");
  li1.setAttribute("class", "list-choice");
  li1.setAttribute("data-value", currentQuestion.choices[0]);
  li1.textContent = currentQuestion.choices[0];

  const li2 = document.createElement("li");
  li2.setAttribute("class", "list-choice");
  li2.setAttribute("data-value", currentQuestion.choices[1]);
  li2.textContent = currentQuestion.choices[1];

  const li3 = document.createElement("li");
  li3.setAttribute("class", "list-choice");
  li3.setAttribute("data-value", currentQuestion.choices[2]);
  li3.textContent = currentQuestion.choices[2];

  const li4 = document.createElement("li");
  li4.setAttribute("class", "list-choice");
  li1.setAttribute("data-value", currentQuestion.choices[3]);
  li1.textContent = currentQuestion.choices[3];

  //append lis to ul
  ul.append(li1, li2, li3, li4);

  //append ul and h2 to section
  section.append(h2, ul);

  //append section to main
  mainElem.append(section);

  section.addEventListener("click", handleSectionClick);
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
