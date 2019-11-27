//stars quiz
function startQuiz() {
  $('.questionInfo').hide()
  $('.jsBox').hide()
  $('.mainPage').on('click', '.start', function(e) {
    $('.questionInfo').show()
    $('.mainPage').hide();
    $('.questionPage').show()
    renderQuestion(0)
  });
}

function renderQuestion(index) {
  //needs to generate html that will display the question. to do this I need to pull the question from the 
  //STORE
  let formHtml = $(`
  <form class="question-form">
    <legend>${STORE[index].question}</legend>
    
    <section class="js-options"></section>

    <button type="button" class="submitAns button">Submit</button>
  </form>`
  );
  $('main').html(formHtml);
}

function handleQuiz() {
  startQuiz()
}

$(handleQuiz())
