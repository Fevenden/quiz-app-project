import STORE from './store.js';
let questionNum = 0;

function startQuiz() {
  $('.questionInfo').hide()
  $('.jsBox').hide()
  $('.mainPage').on('click', '.start', function(e) {
    $('.questionInfo').show()
    $('.mainPage').hide();
    $('.questionPage').show()
    renderQuestion(questionNum)
  });
}
function addEventListeners() {
  $('body').on('submit', '.question-form', function(e){
    e.preventDefault();
    let select = $('input[name=qAns]:checked').val();
    let correctAnswer = STORE[questionNum].answer;
    console.log(select, correctAnswer)
  })
}

function renderQuestion(index) {
  //needs to generate html that will display the question. to do this I need to pull the question from the 
  //STORE
  let options = '';
  for(let i = 0; i < STORE[index].options.length; i++) {
    let item = STORE[index].options[i];
    let id = `answer${i}`;
    options += `
    <div>
      <input type="radio" name="qAns" value="${item}" id="${id}"/>
      <label for="${id}">${item}</label>
    </div>`;
  };

  let formHtml = `
  <form class="question-form">
    <legend>${STORE[index].question}</legend>
    
    <section class="js-options">${options}</section>

    <button type="submit" class="submitAns button">Submit</button>
  </form>`;
  $('.questionPage').html(formHtml);
}

function handleQuiz() {
  startQuiz();
  addEventListeners();
}

$(handleQuiz())
