var introSection = document.querySelector(".intor-section");
var startButton= document.querySelector(".start-button");
var timerCount= document.querySelector(".timer-count");
var questions= document.querySelector(".questions");
var secondsLeft = 85;

startButton.addEventListener("click", function(event) {
  var element=event.target;
  if(element.matches("button")){
    function setTime() {
    console.log("Starting timer.");
    var timerInterval = setInterval(function() {
    secondsLeft--;
    timerCount.textContent = secondsLeft;
    if(secondsLeft === 0) {
     clearInterval(timerInterval);
    }

  }, 1000);
}
setTime();

}
});


var questionsStorage=[
  {
  quesions: "Which one of this is not a semantic Element?",
  listAnswers:["sections","main","div","body"],
  answer: "div",
}, {
  question: "Which language uses this comment sturcture: <!---->?",
  listAnswers:["JavaScript", "HTML", "CSS", "English"],
  answer: "HTML",
},{ 
question: "What does this funciton do: console.log()?",
listAnswers:["Sets js on fire", "logs to webpage console", "logs in css page", "converts js to HTML page"],
answer: "logs to webpage console",
}, {
  quesions: "Which one of these identifies an id attribute?",
  listAnswers:["*",".","#","id"],
  answer: "#",
}
];

document.getElementById("q4").innerHTML = `The Answer is: ${questionsStorage[3].answer}.`