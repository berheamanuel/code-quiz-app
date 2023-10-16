function displayHighscores() {
    // either get scores from localstorage or set to empty array
   var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
 
   // sort highscores by score property in descending order
   highscores.sort(function(a, b) {
     return b.score - a.score;
   });
 
   highscores.forEach(function(score) {
     // create li tag for each high score
     var newTag = document.createElement("li");
     newTag.textContent = score.initials + " - " + score.score;
 
     // display on page
     var olEl = document.querySelector("#highscores");
     olEl.appendChild(newTag);

   });
 }
 
 function clearHighscores() {
   window.localStorage.removeItem("highscores");
   window.location.reload();
 }
 
 document.getElementById("clear").addEventListener("click", clearHighscores);

 //run function when page loads
 displayHighscores();