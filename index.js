import STORE from './store.js';
let questionNum = 0;
let score = 0;

function startQuiz() {
  $('.questionInfo').hide();
  $('.jsBox').hide();
  $('.mainPage').on('click', '.start', function(e) {
    $('.questionInfo').show();
    $('.mainPage').hide();
    $('.questionPage').show();
    renderQuestion(questionNum)
    updateQuestionInfo()
  });
}

//displays feedback for a correct answer
function handleCorrect() {
  score += 1
  updateQuestionInfo()
  $('.jsBox').hide();
  $('.feedBack').show();
  let correctHtml = `
    <h2>Correct!</h2>
    <p>Not bad, for a milk drinker.</p>
    <img class="correctImg image" src="images/correctImg.jpg" alt="Hand-drawn nord giving a thumbs up"/>
    <button type="button" class="next button">Next</button>
  `;
  $('.feedBack').html(correctHtml);
}

//display feedback for incorrect answer
function handleIncorrect() {
  $('.jsBox').hide();
  $('.feedBack').show();
  let correctAns = STORE[questionNum].answer
  let incorrectHtml = `
    <h2>Incorrect! The correct answer was:</h2>
    <p>"${correctAns}"</p>
    <img class="wrongImg image" src="images/incorrectImg.jpg" alt="A skull from Skyrim."/>
    <button type="button" class="next button">Next</button>
  `;
  $('.feedBack').html(incorrectHtml);
}

//determins if selected answer is correct or not.
function handleSubmitClick() {
  $('body').on('submit', '.question-form', function(e){
    e.preventDefault();
    let select = $('input[name=qAns]:checked').val();
    let correctAnswer = STORE[questionNum].answer;
    if(select === correctAnswer){
      handleCorrect();
    } else (
      handleIncorrect()
    )
  })
}

//restarts the quiz
function handleRestartClick() {
  $('.finalPage').on('click', '.restart', function(e) {
    score = 0;
    questionNum = 0;
    $('.jsBox').hide();
    $('.mainPage').show();
  }) 
}

//will determine if user passed or failed and display corresponding page.
function generateFinalPage() {
  let passed =`
    <h2>Your score is ${score}/5!</h2>
    <p>You passed! feel free to try again, click the button below</p>
    <img class="passedImg image" id="passedImg" src="images/skyrimspecialedition-1280-1510795773755.jpg" alt="Hero from Skyrim">
    <button type="button" class="restart button">Try again</button>
  `;
  let failed =`
    <h2>You scored ${score}/5!</score></h2> 
    <p>You Failed! feel free to try again, click the button below</p>
    <img class="failedImg image" src="images/youFailed.jpg" alt="A dragon from Skyrim breathing fire">
    <button type="button" class="restart button">Try again</button>
  `;
  if (score >= 3) {
    console.log('passed');
    $('.finalPage').html(passed);
  } else {
    console.log('failed');
    $('.finalPage').html(failed);
  };
}

//will display next question or final page if all questions have been answered.
function handleNextClick() {
   $('.feedBack').on('click', '.next', function(e) {
    questionNum += 1;
    $('.feedBack').hide();
    
    if (questionNum < STORE.length) {
      $('.questionPage').show();
      renderQuestion(questionNum);
      updateQuestionInfo();
    } else {
      $('.questionInfo').hide()
      $('.finalPage').show();
      generateFinalPage();
    }
  });
}

function updateQuestionInfo() {
  let qInfoHtml = `
    <li class="headerList">Question: ${questionNum + 1}/5</li>
    <li class="headerList">Score: ${score}/5</li>
  `;
  $('.questionInfo').html(qInfoHtml)
}


function renderQuestion(index) {
  let options = '';
  for(let i = 0; i < STORE[index].options.length; i++) {
    let item = STORE[index].options[i];
    let id = `answer${i}`;
    options += `
    <div>
      <input type="radio" name="qAns" value="${item}" id="${id}" required="required"/>
      <label class="answer" for="${id}">${item}</label>
    </div>`;
  };

  let formHtml = `
  <form class="question-form">
    <fieldset>
      <legend class="question">${STORE[index].question}</legend>
      
      <section class="js-options">${options}</section>

      <div class="pickOne"></div>

      <button type="submit" class="submitAns button">Submit</button>
    </fieldset>
  </form>`;
  $('.questionPage').html(formHtml);
}

function handleQuiz() {
  startQuiz();
  handleSubmitClick();
  handleNextClick();
  handleRestartClick();
}

$(handleQuiz())