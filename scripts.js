questions=[
{
  "category":"Science: Computers",
  "type":"multiple",
  "difficulty":"medium",
  "question":"What does CPU stand for?",
  "correct_answer":"Central Processing Unit",
  "incorrect_answers":["Central Process Unit",
  "Computer Personal Unit","Central Processor Unit"]
},
{
  "category":"Science: Computers",
  "type":"multiple",
  "difficulty":"easy",
  "question":"According to the International System of Units, how many bytes are in a kilobyte of RAM?",
  "correct_answer":"1000",
  "incorrect_answers":["512","1024","500"]},
  {
    "category":"Science: Computers",
    "type":"multiple",
    "difficulty":"easy",
    "question":"The programming language &#039;Swift&#039; was created to replace what other programming language?",
    "correct_answer":"Objective-C",
    "incorrect_answers":["C#","Ruby","C++"]
},
{
  "category":"Science: Computers",
  "type":"multiple",
  "difficulty":"easy",
  "question":"HTML is what type of language?",
  "correct_answer":"Markup Language",
  "incorrect_answers":["Macro Language","Programming Language","Scripting Language"]
},
{
  "category":"Science: Computers",
  "type":"boolean",
  "difficulty":"hard",
  "question":"The programming language &quot;Python&quot; is based off a modified version of &quot;JavaScript&quot;.",
  "correct_answer":"False",
  "incorrect_answers":["True"]},
{
  "category":"Science: Computers",
  "type":"multiple",
  "difficulty":"hard",
  "question":"What is the domain name for the country Tuvalu?",
  "correct_answer":".tv",
  "incorrect_answers":[".tu",".tt",".tl"]},
{
  "category":"Science: Computers",
  "type":"boolean",
  "difficulty":"easy",
  "question":"RAM stands for Random Access Memory.",
  "correct_answer":"True",
  "incorrect_answers":["False"]},
{
  "category":"Science: Computers",
  "type":"boolean",
  "difficulty":"hard",
  "question":"In most programming languages,the operator ++ is equivalent to the statement &quot;+= 1&quot;.",
  "correct_answer":"True",
  "incorrect_answers":["False"]},
{
  "category":"Science: Computers",
  "type":"boolean",
  "difficulty":"medium",
  "question":"The NVidia GTX 1080 gets its name because it can only render at a 1920x1080 screen resolution.",
  "correct_answer":"False",
  "incorrect_answers":["True"]},
{
   "category":"Science: Computers",
  "type":"boolean",
  "difficulty":"medium",
  "question":"The Python programming language gets its name from the British comedy group &quot;Monty Python.&quot;",
  "correct_answer":"True",
  "incorrect_answers":["False"]
}]
  let display = document.getElementById("display");
  let playerName = "";
  let currentDifficulty="easy";
  let currentScore = 0;
  let currentQuestion = 1;
  let totalQuestions=1;
  let initialScreen = document.getElementById("initial-screen");
  let duringGameScreen = document.getElementById("during-game");
  let currentScoreElement = document.getElementById("current-score");
  let playerNameElement = document.getElementById("name-of-player");
  let currentQuestionElement = document.getElementById("current-question");
  let displayQuestionElement = document.getElementById("display-question");
  let previousAnswerParentDiv = document.getElementById("previous-answer");
  let endOfGameDiv = document.getElementById("end-of-game")

  let dropdown = document.getElementById('my-dropdown'); //difficulty event listener;
  dropdown.addEventListener('change',function() {
    currentDifficulty = dropdown.options[dropdown.selectedIndex].value;
    console.log(currentDifficulty)
  });
  let numberDropdown = document.getElementById('number-of-questions'); //number of questions event listener;
  numberDropdown.addEventListener('change',function() {
    totalQuestions = numberDropdown.options[numberDropdown.selectedIndex].value;
  });

  let textbox = document.getElementById('player-name'); //text-box event listener
  textbox.addEventListener('change', function() {
    playerName = textbox.value;
    
  });
  
function startGame(){
    initialScreen.classList.add("hidden");
    duringGameScreen.classList.toggle("hidden");
    playerNameElement.innerText+=" "+ playerName;
    updateCurrentScore();
    currentQuestionElement.innerText += " "+currentQuestion;
    let currentGameQuestions = fillQuestions();
    displayQuestion(currentGameQuestions);
}
function updateCurrentScore(){
  currentScoreElement.innerText="Score: "+currentScore;
}
function updateCurrentQuestion(){
  currentQuestionElement.innerText="Question: "+currentQuestion;
}

let previousAnswer;
let previousAnswerCorrect;
function displayQuestion(currentGameQuestions){ //once you click the submit button in this function it calls this function again and clears all the elements created
    let answerArray=[];
    if (currentQuestion!==1){
      previousAnswerParentDiv.innerHTML="";
      let previousAnswerDiv=document.createElement('div');
      previousAnswerDiv.innerHTML="<p>"+previousAnswerCorrect+"</p>";
      previousAnswerDiv.classList.add("previous-answer");
      previousAnswerParentDiv.appendChild(previousAnswerDiv);
    }
    let question = document.createElement('div');
    question.classList.add("question");
    let currentQuestionObject = getRandom(currentGameQuestions);
    console.log(currentQuestionObject);
    question.innerHTML="<p>"+currentQuestionObject.question+"</p>";
    answerArray.push(currentQuestionObject.correct_answer);
    for(let i=0;i<currentQuestionObject.incorrect_answers.length;i++){
      answerArray.push(currentQuestionObject.incorrect_answers[i]);
    }
    displayQuestionElement.appendChild(question);
    let numberOfAnswers=answerArray.length;
    for(let i=0;i<numberOfAnswers;i++){
      let randomAnswer = getRandom(answerArray);
      let answerElement = document.createElement('div');
      answerElement.classList.add('answer');
      answerElement.innerHTML="<p>"+randomAnswer+"</p>";
      displayQuestionElement.appendChild(answerElement);
    }
    updateAnswerDivs();
    let br = document.createElement("br");
    displayQuestionElement.appendChild(br);  
    let submitDiv=document.createElement('div');
    submitDiv.classList.add("submit");
    submitDiv.innerHTML="<p>Submit</p>";
    displayQuestionElement.appendChild(submitDiv);
    submitDiv.addEventListener("click", function() {
      if(selectedAnswer===undefined||selectedAnswer===null){
      }else if(selectedAnswer===currentQuestionObject.correct_answer){
        currentScore+=1;
        updateCurrentScore();
        if(currentQuestion==totalQuestions){
          endGame();
          return;
        }else{
          displayQuestionElement.innerHTML="";
          previousAnswerCorrect="Previous Answer Correct!";
          previousAnswer=currentQuestionObject.selectedAnswer;
          selectedAnswer=null;
          currentQuestion+=1;
          updateCurrentQuestion();
          displayQuestion(currentGameQuestions);
        }

      }else{
        if(currentQuestion==totalQuestions){
          endGame();
          return;
        }else{currentQuestion+=1;
          updateCurrentQuestion();
          displayQuestionElement.innerHTML="";
          previousAnswerCorrect="Previous Answer Wrong!";
          previousAnswer=currentQuestionObject.selectedAnswer;
          selectedAnswer=null;
          displayQuestion(currentGameQuestions);}
      }
    });

}
let answerone;
let answertwo;
let answerthree;
let answerfour;
let selectedAnswer;

function updateAnswerDivs(){
  answerone = document.querySelectorAll(".answer")[0];
  answertwo = document.querySelectorAll(".answer")[1];
  answerthree = document.querySelectorAll(".answer")[2];
  answerfour = document.querySelectorAll(".answer")[3];
  answerone.addEventListener("click", function() {
    this.style.backgroundColor = "red";
    answertwo.style.backgroundColor = "#FCE700";
    if(answerthree!==undefined){
      answerthree.style.backgroundColor = "#FCE700";
      answerfour.style.backgroundColor = "#FCE700";
    }
    selectedAnswer=this.innerText;
  });
  answertwo.addEventListener("click", function() {
    this.style.backgroundColor = "red";
    answerone.style.backgroundColor = "#FCE700";
    if(answerthree!==undefined){
      answerthree.style.backgroundColor = "#FCE700";
      answerfour.style.backgroundColor = "#FCE700";
    }
    selectedAnswer=this.innerText;
  });
  if(answerthree!==undefined){
    answerthree.addEventListener("click", function() {
      this.style.backgroundColor = "red";
      answertwo.style.backgroundColor = "#FCE700";
      answerone.style.backgroundColor = "#FCE700";
      answerfour.style.backgroundColor = "#FCE700";
      selectedAnswer=this.innerText;
    });
    answerfour.addEventListener("click", function() {
      this.style.backgroundColor = "red";
      answertwo.style.backgroundColor = "#FCE700";
      answerthree.style.backgroundColor = "#FCE700";
      answerone.style.backgroundColor = "#FCE700";
      selectedAnswer=this.innerText;
    });
  }
}
const getRandom = function (range) {
    const randIndex = Math.floor(Math.random() * range.length);
    const random = range.splice(randIndex, 1)[0];
    return random;
};

const fillQuestions = function () {
  const arr = [];
  for (let i = 0; i < questions.length; i++) {
    if(questions[i].difficulty.toLowerCase()===currentDifficulty.toLowerCase()){
      arr.push(questions[i]);
    }
  }
  console.log(arr);
  return arr;
};

function endGame(){
  duringGameScreen.innerHTML="";
  let finalScoreDiv=document.createElement('div');
  finalScoreDiv.innerHTML="<h2>Congratulations "+playerName+"! Your final score was "+currentScore+" out of "+totalQuestions+"</h2>";
  finalScoreDiv.classList.add("final-score");
  endOfGameDiv.appendChild(finalScoreDiv); 
}
