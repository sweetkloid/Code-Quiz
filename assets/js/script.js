var introSection = document.querySelector("#intro-section");
var startButton = document.querySelector("#start-button");
var timerCount = document.querySelector(".timer-count");



var secondsLeft = 75;

var timerInterval;

function setTime() {
  if (!timerInterval) {
    console.log("Starting timer.");
    timerInterval = setInterval(function() {
      secondsLeft--;
      timerCount.textContent = secondsLeft;
      if (secondsLeft === 0) {
        clearInterval(timerInterval);
      }
    }, 1000);
  }
}

function toggleSection() {
  var startButton = document.getElementById("start-button");
  startButton.removeEventListener("click", toggleSection);
  startButton.addEventListener("click", function() {
    startButton.style.display = "none";
    var quizSection = document.getElementById("questions");
    quizSection.style.display = "block";
    introSection.style.display = "none";
    hideAnswerButtons();
    displayQuestion();
    setTime();    
    
  });
  var questionSection = document.getElementById("questions");
questionSection.style.display = "none";
var answerSection = document.querySelector(".answer-container");
answerSection.style.display = "none";
}


  function hideAnswerButtons() {
    var answerButtons = document.querySelectorAll("#questions button.answer"); 
    answerButtons.forEach(function(button) {
      button.style.display = "none";
    });
  }


function showAnswerButtons() {
  var answerButtons = document.querySelectorAll("#questions button.answer");
  answerButtons.forEach(function(button) {
    button.style.display = "block";
  });
}
function displayQuestion() {
  var question = questionStorage[currentQuestionIndex];
  var questionText = document.getElementById("questions-box");
  console.log(questionText);
  var answerButtons = document.querySelectorAll("#questions button.answer");
  questionText.textContent = question.question;
  var answerSection = document.querySelector(".answer-container");
  answerSection.style.display = "flex";
  console.log(questionStorage);
  for (var i = 0; i < answerButtons.length; i++) {
    var button = answerButtons[i];
    button.textContent = question.answers[i];
    button.dataset.answerIndex = i;
    button.style.display = "inline-block";
    button.addEventListener("click", handleAnswerClick);
  }
}

function handleAnswerClick(event) {
  var answerIndex = event.target.dataset.answerIndex;
  var question = questionStorage[currentQuestionIndex];
  if (question.answers[answerIndex] === question.correct) {
    console.log("Correct!");
  } else {
    console.log("Incorrect!");
    secondsLeft -= 10;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questionStorage.length) {
    displayQuestion();
  } else {
    console.log("Quiz complete!");
  }
}

var currentQuestionIndex = 0;
var questionStorage = [
  {
    question: "Which one of this is not a semantic Element?",
    answers: ["sections", "main", "div", "body"],
    correct: "div",
  },
  {
    question: "Which language uses this comment sturcture: <!---->?",
    answers: ["JavaScript", "HTML", "CSS", "English"],
    correct: "HTML",
  },
  {
    question: "What does this funciton do: console.log()?",
    answers: ["Sets js on fire", "logs to webpage console", "logs in css page", "converts js to HTML page"],
    correct: "logs to webpage console",
  },
  {
    question: "Which one of these identifies an id attribute?",
    answers: ["*", ".", "#", "id"],
    correct: "#",
  }
];
