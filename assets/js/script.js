var timeEl = document.getElementById("time");
var timer;
var currentQuestionIndex = 0;
var startScreen = document.getElementById("startscreen");
var endScreen = document.getElementById("endScreen");
var secondsLeft = 75;
var startButton = document.getElementById("start_quiz");
var questionsEl  = document.getElementById("questions");
var choices = document.getElementById("choices");
var checkAnswerEl = document.getElementById("checkAnswer");
var currentQuestion;
var highScores = document.getElementById("score");
var viewHighscoreEl = document.getElementById("viewHighscores");
var backbuttonEl = document.getElementById("backbutton");
var clearButtonEl = document.getElementById("clearButton");


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
    endScreen.setAttribute("class","hide")
    endScreen.removeAttribute("class");
  
    // show score
    var highScores = document.getElementById("score");
    highScores.textContent = timer;
  
    // hide questions element
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
    var initials = initials.value.trim();
    if (initials) {
        var highScores = JSON.parse(window.localStorage.getItem("highscores")) || []; 
        var saveScores = { username: initials, saveScores: scores};
        initials.value = '';


        highScores.push(saveScores);
        localStorage.setItem("highScores", JSON.stringify(highScores))

        window.location.href = "viewHighscores";
    }
}


submitInitials.onclick = saveScores;
 
startButton.onclick = quizStart;

