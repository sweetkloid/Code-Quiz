
var introSection = document.querySelector("#intro-section");
var startButton = document.querySelector("#start-button");
var timerCount = document.querySelector("#timer-count");



var secondsLeft = 60;

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
 console.log(setTime);
function toggleSection() {
  var startButton = document.getElementById("start-button");
  startButton.removeEventListener("click", toggleSection);
  startButton.addEventListener("click", function() {
    startButton.style.display = "none";
    var quizBox = document.getElementById("questions");
    quizBox.style.display = "block";
    introSection.style.display = "none";
    hideAnswerButtons();
    displayQuestion();
    setTime();    
    
  });

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
  console.log(questionStorage);

  for (var i = 0; i < answerButtons.length; i++) {
    var button = answerButtons[i];
    button.textContent = question.answers[i];
    button.dataset.answerIndex = i;
    button.style.display = "inline-block";
    button.addEventListener("click", handleAnswerClick);
  }
}

 score=0;

function handleAnswerClick(event) {
  var answerIndex = event.target.dataset.answerIndex;
  var question = questionStorage[currentQuestionIndex];
  if (question.answers[answerIndex] === question.correct) {
    console.log("Correct!");
    event.target.style.backgroundColor = "green";
    secondsLeft +=10;
  } else {
    console.log("Wrong!");
    event.target.style.backgroundColor = "red";
    secondsLeft -=10; 
    secondsLeft= Math.max(0, secondsLeft);
  } if (secondsLeft ==0){
    clearInterval(timerInterval);
    endGame();
  }else{
  currentQuestionIndex++;
  if (currentQuestionIndex < questionStorage.length) {
    displayQuestion();
  } else {
    console.log("Quiz finished");
    clearInterval(timerInterval);
    endGame();
  }
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


var initials = '';

function saveScore(initials, score) {
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  var newScore = { initials: initials, score: score };
  highScores.push(newScore);
  localStorage.setItem("highScores", JSON.stringify(highScores));
}
function endGame() {

  // IF timer is not finished ---> End timer
  clearInterval(timerInterval);
  // Calculate Score
  var score = secondsLeft;
  var outroSections= document.getElementById("outro-section");
  outroSections.style.display="block";
  var usersScore= document.getElementById ("userscore");
  usersScore.textContent=score;
  var finalForm=document.getElementById("final-form");
  finalForm.addEventListener("submit", function (event){
    event.preventDefault();
    var initialsInput=document.getElementById("username");
    initials=initialsInput.value;
    saveScore(initials, score);
    window.location.href="highscores.html";
   
  });
   
  // Hide our question section
  var quizBox = document.getElementById("questions");
  //quizBox.classList.add('hide');
  quizBox.style.display = "none";
  // Unhide our Score/Form Section
  var formContainer = document.getElementById('outro-section');
  formContainer.classList.remove('hide');


}
