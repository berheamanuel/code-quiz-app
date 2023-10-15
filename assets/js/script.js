
// list of questions

var questions = [
    {
        title: "Commonly used data types Do Not Include:",
        choices: [
            "1. strings",
            "2. booleans",
            "3. alerts",
            "4. numbers"
        ],
        answer: "3. alerts"
    },
    {
        title: "The condition in an if/else statment is enclosed with ________.",
        choices: [
            "1. quotes",
            "2. curly brackets",
            "3. paranthesis",
            "4. square brackets"
        ],
        answer: "3. paranthesis"
    },
    {
        title: "Arrays in JavaScript can be used to store ___________.",
        choices: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above"
        ],
        answer: "4. all of the above"
    },
    {
        title: "String values must be enclosed within ________ when being assigned to variables.",
        choices: [
            "1. commas",
            "2. curly brackets",
            "3. quotes",
            "4. parenthesis"
        ],
        answer: "3. quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: [
            "1. javaScript",
            "2. terminal/bash",
            "3. for loops",
            "4. consol.log"
        ],
        answer: "4. consol.log"
    },

];


// selecting DOM elements 
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choices = document.querySelector("#choices");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");


// questions variables
var activeQuestionIndex = 0;
var secondsLeft = questions.length * 15;
var timerId;

// questions variables
var activeQuestionIndex = 0;
var secondsLeft = questions.length * 15;
var timerId;

// WHEN start button clicked timer starts and question displeyed:
    // creat event event litsiner   
     // creat function to unhide questions disply and to activate the timer
        // creat and call a function to start answering questions
function startQuiz() {

     // hide info section
     var startInfoEl = document.querySelector("#start-info");
     startInfoEl.setAttribute("class", "hide");

     // disply question section
     questionsEl.removeAttribute("class");

    // start timer
    timerId = setInterval(setTime, 1000);

     // disply timer
     timerEl.textContent = secondsLeft;

     startQuestion();

}
// WHEN first question answered another question presented 
    
function startQuestion() {

    // get first question
    var activeQuestion = questions[activeQuestionIndex];

    // update title with active question
    var titleEl = document.querySelector("#question-title")
    titleEl.textContent = activeQuestion.title;

    // clear previous choices
    choicesEl.innerHTML = "";

    // loop over choices
    activeQuestion.choices.forEach(function(choice, i) {

        // creat button for each chice
        var choiceButton = document.createElement("button");
        choiceButton.setAttribute("class", "choice");
        choiceButton.setAttribute("value", choice);

        choiceButton.textContent = i + choice;

        // click event for each choice
        choiceButton.addEventListener("click", choiceClick);

        // disply on the page
        choicesEl.appendChild(choiceButton);
    });
}

// WHEN  question answer incorrectly time is subtracted from the clock
    // check if the quesion is answered incorrectlly
        // deduct time from the clock
        // disply new time and 'wrong!'
     // else
        //disply 'correct!' below the question
function choiceClick() {
    // check if the quesion is answered incorrectlly
    if (this.value !== questions[activeQuestionIndex].answer) {
        // diduct time
        secondsLeft -= 15;

        if(secondsLeft < 0) {
            secondsLeft = 0;
        }
        // displying updated time on the page
        timerEl.textContent = secondsLeft;
        feedbackEl.textContent = "Wrong!";
        feedbackEl.style.color = "red";
        feedbackEl.style.fontSize = "300%";
    } else {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "green";
        feedbackEl.style.fontSize = "300%";
    }

    // displying coorect/wrong 
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    // next question disply
    activeQuestionIndex++;

// WHEN all questions are answered or the timer reaches 0 the game is over
    // check if user ran out of time or all questions are answered
    // clear interval
    // hide questions section
    // show the final score


    // check for last question
    if (activeQuestionIndex === questions.length) {
        endQuestion();        
    } else {
        startQuestion();
    }
}

// function to end the quiz
function endQuestion() {
    // stop timer
    clearInterval(timerId);

    // disply input for initials
    var inputEl = document.querySelector('#save-score');
    inputEl.removeAttribute("class");

    // disply final score
    var finalScoreEl = document.querySelector("#final-score");
    finalScoreEl.textContent = secondsLeft;

    // hide questions section
    questionsEl.setAttribute("class", "hide");
}

function setTime() {

    // update time
    secondsLeft --;
    timerEl.textContent = secondsLeft;    

    // check if user ran out of time
    if (secondsLeft <= 0) {
       endQuestion();               
    }
}
// WHEN the game is over save initials and score
    //save to localstorage using JSON.stringfy()

// function to save highscore
function saveHighscore() {

    var initials = initialsEl.value.trim();

    if (initials !== "") {
        // get saved scores from localstorage or set to empty array
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        // set new score object for current user
        var newScore = {
            score: secondsLeft,
            initials: initials
        };

        // save the score to localstorage
        highscores.push(newScore);
        window.localStorage.setItem("highscore", JSON.stringify(highscores));
    
          // redirect to next page
        window.location.href = "score.html";
    }
}

initialsEl.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
});


// submit initials
submitBtn.addEventListener("click", saveHighscore);

// start quiz
startBtn.addEventListener("click", startQuiz);

