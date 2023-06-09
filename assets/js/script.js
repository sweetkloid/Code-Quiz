// crabbing variable from html so we can manipulate them in js
var introSection = document.querySelector("#intro-section");
var startButton = document.querySelector("#start-button");
var timerCount = document.querySelector("#timer-count");
var questionBox=document.querySelector("#questions-box");



var secondsLeft = 60;

var timerInterval;
// this is how we create a working timer
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
 console.log(setTime); //making sure we run correctly
//  this is making the start button work with the rest of the program
function toggleSection() {
  var startButton = document.getElementById("start-button");
  startButton.removeEventListener("click", toggleSection); //removing the start button on click
  startButton.addEventListener("click", function() { //startomg the next functions
    startButton.style.display = "none"; //hiding the button with js to css
    var quizBox = document.getElementById("questions");
    quizBox.style.display = "block"; //startomg the questions with manipulation to css
    introSection.style.display = "none";
    hideAnswerButtons();
    displayQuestion();
    setTime();    //running the function
     
  });

}

//creating functions so we can manipulate what we show and hide as we rotate between questions
  function hideAnswerButtons() {
    var answerButtons = document.querySelectorAll("#questions button.answer"); 
    answerButtons.forEach(function(button) {
      button.style.display = "none";
    });
  }

//same as above but revers
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
//rotating between arrays
  for (var i = 0; i < answerButtons.length; i++) {
    var button = answerButtons[i];
    button.textContent = question.answers[i];
    button.dataset.answerIndex = i;
    button.style.display = "inline-block";
    button.addEventListener("click", handleAnswerClick);
  }
  
}


 score=0;
//what happens when the user interacts with the questions buttons
function handleAnswerClick(event) {
    
  var answerIndex = event.target.dataset.answerIndex;
  var question = questionStorage[currentQuestionIndex];
  if (question.answers[answerIndex] === question.correct) {
    console.log("Correct!");

    score+=10;
    var messageBox = document.querySelector("#message-box");
    setTimeout(function(){
      messageBox.textContent="";
    },1000);
    messageBox.textContent = "Correct!";
    console.log(questionBox);
  } else {
    console.log("Wrong!");
    secondsLeft -=10; //time deduction for wrong answers
    secondsLeft= Math.max(0, secondsLeft);
    timerCount.textContent = secondsLeft;
    var messageBox = document.querySelector("#message-box");
    setTimeout(function(){
      messageBox.textContent="";
    },1000);
    messageBox.textContent = "Wrong!";
  } if (secondsLeft ==0){
    clearInterval(timerInterval);
    endGame();
  }else{
  currentQuestionIndex++;
  if (currentQuestionIndex < questionStorage.length) {
    setTimeout(displayQuestion, 1000);
  } else {
    console.log("Quiz finished"); //making sure our code loads
    clearInterval(timerInterval);
    endGame(); //running the functions
  }
}
}
//object that holds our arrays that have their own arrays that we pull through
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


//taking the results and moving into the outro screen that then leads us to the highscore page
var initials = '';

function saveScore(initials, score) {
  //reading the highscores from localstorage
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  var newScore = { initials: initials, score: score };
  highScores.push(newScore);
  //taking the answers and converting them to localstorage
  localStorage.setItem("highScores", JSON.stringify(highScores));
}
function endGame() {

  // IF timer is not finished ---> End timer
  clearInterval(timerInterval);
  // Calculate Score
  var score = secondsLeft;
  var outroSections= document.getElementById("outro-section");
  outroSections.style.display="block"; //making sure we can see the new page
  var usersScore= document.getElementById ("userscore");
  usersScore.textContent= "Your score is: " + score; //adding message to score
  var finalForm=document.getElementById("final-form");
  finalForm.addEventListener("submit", function (event){
    event.preventDefault();
    var initialsInput=document.getElementById("username");
    initials=initialsInput.value; //moving the values into their appropriate labels
    saveScore(initials, score);
    window.location.href="highscores.html"; //moving us to the highscore page
   
  });
   
  // Hide our question section
  var quizBox = document.getElementById("questions");
  //quizBox.classList.add('hide');
  quizBox.style.display = "none";
  // Unhide our Score/Form Section
  var formContainer = document.getElementById('outro-section');
  formContainer.classList.remove('hide');


}
