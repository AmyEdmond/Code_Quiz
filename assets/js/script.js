var timeEl = document.getElementById("timer");
var currentQuestionIndex = 0;
var startScreen = document.getElementById("startscreen");
var endScreenEl = document.getElementById("endScreen");
var secondsLeft = 75;
var startButton = document.getElementById("start_quiz");
var questionsEl  = document.getElementById("questions");
var choices = document.getElementById("choices");
var checkAnswerEl = document.getElementById("checkAnswer");
var currentQuestion;
var finalScores = document.getElementById("lastScores");
var viewHighscoreEl = document.getElementById("viewHighscores");
var backbuttonEl = document.getElementById("backbutton");
var clearButtonEl = document.getElementById("clearButton");
var initialsEl = document.getElementById("addInitials");


function quizStart() {
    startScreen.setAttribute("class","hide")
    questionsEl.removeAttribute("class")
    timer = setInterval(setTime,1000);
    timeEl.textContent = secondsLeft;
    nextQuestion()
}

function nextQuestion() {
    var titleEl = document.getElementById("title");
    currentQuestion = questions[currentQuestionIndex];
    titleEl.textContent = currentQuestion.title;
    choices.innerHTML ="";

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i];
        var choiceNode = document.createElement('button');
        choiceNode.setAttribute('class', 'choice');
        choiceNode.setAttribute('value', choice);
    
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
        checkAnswerEl.textContent = "Wrong!"
     } else{
        checkAnswerEl.textContent = "Correct!"
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
    endScreenEl.setAttribute("class","hide")
    endScreenEl.removeAttribute("class");
    finalScores.textContent = timer;
    questionsEl.setAttribute("class", "hide");
}

 
function setTime() {
  // Sets interval in variable
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if(secondsLeft <= 0) {
      // Stops execution of action at set interval
      quizEnd();
    }
}

function saveScores() {
    var initials = initialsEl.value.trim();
    if (initials !== "") {
        var highScores = JSON.parse(window.localStorage.getItem("highscores")) || []; 
        var addScores = { username: initials, Scores: secondsLeft};
        initials.value = '';


        highScores.push(addScores);
        window.localStorage.setItem("highScores", JSON.stringify(highScores))

        window.location.href = "viewHighScores";
    }
}


submitInitials.onclick = saveScores;
 
startButton.onclick = quizStart;

