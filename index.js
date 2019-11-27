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
    <img class="correctImg image" src="images/correctImg.jpg" alt="hand drawn nord giving thumbs up"/>
    <button type="button" class="next button">Next question</button>
  `;
  $('.feedBack').html(correctHtml);
}

//display feedback for incorrect answer
function handleIncorrect() {
  $('.jsBox').hide();
  $('.feedBack').show();
  let incorrectHtml = `
    <h2>Incorrect!</h2>
    <p>Even a Greybeard can't have all the answers.</p>
    <img class="wrongImg image" src="images/incorrectImg.jpg" alt="A skull from Skyrim."/>
    <button type="button" class="next button">Next question</button>
  `;
  $('.feedBack').html(incorrectHtml);
}

//determins if selected answer is correct or not.
function handleSubmitClick() {
  $('body').on('submit', '.question-form', function(e){
    e.preventDefault();
    let select = $('input[name=qAns]:checked').val();
    let correctAnswer = STORE[questionNum].answer;
    console.log(select, correctAnswer)
    if(select === correctAnswer){
      handleCorrect();
    } else {
      handleIncorrect();
    }
  })
}

function handleNextClick() {
   $('.feedBack').on('click', '.next', function(e) {
    questionNum += 1;
    $('.feedBack').hide();
    $('.questionPage').show();
    renderQuestion(questionNum);
    updateQuestionInfo()
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
      <input type="radio" name="qAns" value="${item}" id="${id}"/>
      <label class="answer" for="${id}">${item}</label>
    </div>`;
  };

  let formHtml = `
  <form class="question-form">
    <legend class="question">${STORE[index].question}</legend>
    
    <section class="js-options">${options}</section>

    <button type="submit" class="submitAns button">Submit</button>
  </form>`;
  $('.questionPage').html(formHtml);
}

function handleQuiz() {
  startQuiz();
  handleSubmitClick();
  handleNextClick();
}

$(handleQuiz())
