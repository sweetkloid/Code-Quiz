// pulling from the local storage and reverting it into an object into a table
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

var tableBody = document.querySelector(".table-section");
// putting the localstorage info into it's corresponding table box
for (var i = 0; i < highScores.length; i++) {
  var score = highScores[i].score;
  var initials = highScores[i].initials;

  if (!score || !initials) {
    continue; 
  }

  var row = document.createElement("tr");

  var scoreCell = document.createElement("td");
  scoreCell.textContent = score;
  row.appendChild(scoreCell);

  var initialsCell = document.createElement("td");
  initialsCell.textContent = initials;
  row.appendChild(initialsCell);
// adding rows as needed
  tableBody.appendChild(row);
}
// this links us back to the quiz game beginning
let tryBtn = document.getElementById('start-over');
tryBtn.addEventListener('click', () => {
  console.log("Clicked...");
  window.location.href = 'index.html';
})
// this allows the user to reset the table when clicked
var clearScoresBtn = document.getElementById("clear-scores");

clearScoresBtn.addEventListener("click", function() {
  localStorage.clear();
  location.reload();
});


