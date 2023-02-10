var timeEl = document.getElementById("time");
var timer;
var currentQuestionIndex = 0;
var startScreen = document.getElementById("startscreen");
var endScreen = document.getElementById("endscreen");
var secondsLeft = 75;
var startButton = document.getElementById("start_quiz");
var questionsEl  = document.getElementById("container");
var choices = document.getElementById("choices");
var checkAnswerEl = document.getElementById("checkAnswer");
var currentQuestion;
var finalScore = document.getElementById("score");

function quizStart() {
    startScreen.setAttribute("class","hide")
    questionsEl.removeAttribute("class")
    timer = setInterval(setTime,1000);
    timeEl.textContent = secondsLeft;
    nextQuestion()
}

function nextQuestion() {
    var title = document.getElementById("question_title");
    currentQuestion = questions[currentQuestionIndex];
    title.textContent = currentQuestion.title;
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

function clickButton () {
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
    var scoreEl = document.getElementById("score");
    scoreEl.textContent = timer;
  
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
 
function highScores () {
    
}

startButton.onclick = quizStart


