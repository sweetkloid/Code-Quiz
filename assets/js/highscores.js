
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

var tableBody = document.querySelector(".table-section");

for (var i = 0; i < highScores.length; i++) {
  var score = highScores[i].score;
  var initials = highScores[i].initials;
  
  if (!score || !initials) {
    continue; // skip this object
  }

  var row = document.createElement("tr");

  var scoreCell = document.createElement("td");
  scoreCell.textContent = score;
  row.appendChild(scoreCell);

  var initialsCell = document.createElement("td");
  initialsCell.textContent = initials;
  row.appendChild(initialsCell);

  tableBody.appendChild(row);
}

let tryBtn = document.getElementById('start-over');
tryBtn.addEventListener('click', () => {
  console.log("Clicked...");
  window.location.href = 'index.html';
})


// As long as there is DATA IN LOCAL STORAGE we can grab it in any VIEW
let savedData = localStorage.getItem('highscores');
console.log("Local Storage: ", savedData);


