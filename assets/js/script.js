var timeEl = document.getElementById("timer");
var currentQuestionIndex = 0;
var startScreenEl = document.getElementById("startscreen");
var endScreenEl = document.getElementById("endScreen");
var secondsLeft = 75;
var startButton = document.getElementById("start_quiz");
var questionsEl  = document.getElementById("questions");
var titleEl = document.getElementById("title");
var choices = document.getElementById("choices");
var checkAnswerEl = document.getElementById("checkAnswer");
var currentQuestion;
var finalScores = document.getElementById("scores");
var viewHighscoreEl = document.getElementById("viewHighscores");
var backbuttonEl = document.getElementById("backbutton");
var clearButtonEl = document.getElementById("clearButton");
var initialsEl = document.getElementById("addInitials");
var lastScoresEl = document.getElementById("lastScores");
var storedScoresEl = document.getElementById("storedScores");


function quizStart() {
    startScreenEl.setAttribute("class","hide")
    questionsEl.removeAttribute("class")
    timer = setInterval(setTime,1000);
    timeEl.textContent = secondsLeft;
    nextQuestion()
}

function nextQuestion() {
    currentQuestion = questions[currentQuestionIndex];
    titleEl.textContent = currentQuestion.title;
    choices.innerHTML ="";

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i];
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);
    
        choiceNode.textContent = choice;
        choiceNode.onclick = clickButton;
        // display on the page
        choices.appendChild(choiceNode);
      }
    

}

function clickButton (e) {
    if (currentQuestion.answer !== e.target.value) {
        secondsLeft -=15
        if (secondsLeft < 0) {
            secondsLeft = 0;
        }
    
        timeEl.textContent = secondsLeft;
        checkAnswerEl.textContent = "Wrong!";

     } else{

        checkAnswerEl.textContent = "Correct!";
    }

    checkAnswerEl.setAttribute("class", "checkAnswer");
    setTimeout(function() {
    checkAnswerEl.setAttribute("class", "hide");
     }, 1000); 

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        nextQuestion();

    }
  
}

function quizEnd() {
    clearInterval(timer);
    questionsEl.setAttribute("class","hide")
    endScreenEl.removeAttribute("class");
    finalScores.textContent = secondsLeft;
    }

 
function setTime() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if(secondsLeft <= 0) {
            // Stops execution of action at set interval
        quizEnd();
    }
}

function totalScore() {
    if (secondsLeft < 0) {
        secondsLeft === 0;
    }
    console.log(secondsLeft);
    return score = secondsLeft;
    
}


function saveScores() {
    var initials = initialsEl.value;
        if (initials !== "") {
            var finalScore = {
                initials: initials, 
                scores: finalScores.textContent
            
            };
            var scores = localStorage.getItem("scores");
            if (scores === null) {
              scores = [];
            } else {
              scores = JSON.parse(scores);
            }
            scores.push(finalScore);
            var newScore = JSON.stringify(scores);
            localStorage.setItem("scores", newScore); 
           
        } 
        displayScores();
}


function displayScores() {
    startScreenEl.setAttribute("class","hide");
    endScreenEl.setAttribute("class","hide");
    lastScoresEl.removeAttribute ("class");
    var scores = localStorage.getItem("scores");
            if (scores === null) {
              scores = [];
            } else {
              scores = JSON.parse(scores);
            }
    for (var i = 0; i < scores.length; i++) {
        storedScoresEl.innerHTML = localStorage.scores + localStorage.getItem(localStorage.scores);
       //retourne le code avec les "" et {} storedScoresEl.innerHTML = localStorage.scores + localStorage.getItem(localStorage.scores);
        
        
}
}

function clearScores() {
    storedScoresEl.setAttribute("class","hide");
    window.localStorage.clear(scores);

}

viewHighscoreEl.onclick = displayScores;
clearButtonEl.onclick = clearScores;
submitInitials.onclick = saveScores;
startButton.onclick = quizStart;

