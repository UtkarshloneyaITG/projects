console.log('js running')

let dataOfLeaderBoard = null;

leaderBoardRender()
async function fetchLeaderBoardData() {
  let loading = document.querySelector('.loading_screen')
  try {
    let response = await fetch('https://ai-agent-steel-ten.vercel.app/api/v1/quiz/getAllscores')
    let data = await response.json()
    dataOfLeaderBoard = data
  } catch (error) {
    console.log('error on line 8')
  } finally {
    loading.style.display = 'none';
  }
}

async function leaderBoardRender() {
  await fetchLeaderBoardData()
  console.log(dataOfLeaderBoard)
  let container = document.querySelector('.leader-board-names')

  dataOfLeaderBoard.forEach((element, index) => {
    // if (index >= 10) {
    //   return
    // }
    let div = document.createElement('div')
    div.innerHTML = `<span>${index + 1}</span><span>${element.name}</span><span>${element.score}</span>`
    container.appendChild(div)
  });
}

let questions = null

async function QuestionFetch() {  
  let loading = document.querySelector('.loading_screen')
  loading.style.display = 'block'
  try {
    let response = await fetch('https://ai-agent-steel-ten.vercel.app/api/v1/quiz/questions/all')
    let data = await response.json()
    questions = data;
    console.log(questions)
  } catch (error) {
    console.log('error on line 35')
  } finally {
    loading.style.display = 'none'
  }
}
let Qx = 0;
let score = 0;
let Pname = null
let chosenAnswer = null;
let CorrectAnswer = null;
let correctvalue = true;

async function renderQuestions() {
  await QuestionFetch()
  let QuestionNo = document.querySelector('.QuestionNo')
  QuestionNo.innerHTML = `${Qx + 1}/10`

  let optionsInQuiz = document.querySelector('.options')
  let Quizquestion = document.querySelector('.Quizquestion')

  Quizquestion.innerText = questions[Qx].question
  let p_tag = optionsInQuiz.getElementsByTagName('p')

  for (let x in questions[Qx].options) {
    p_tag[x].style.background = 'gray'
    p_tag[x].innerHTML = questions[Qx].options[x]

    p_tag[x].addEventListener('click', () => {
      for (let y = 0; y <= 3; y++) {
        p_tag[y].style.background = 'gray'
      }
      
      p_tag[x].style.background = 'green'

      let chosenAnswer = p_tag[x].innerText + ''
      let CorrectAnswer = questions[Qx].answer + ''
      if (chosenAnswer === CorrectAnswer) {
        correctvalue = true
      }
      else correctvalue = false
      console.log(correctvalue)
    })
  }
}

function submit() {
  console.log(score)
  if (correctvalue) {
    console.log(chosenAnswer == CorrectAnswer)
    score++
  }
  if (Qx == 9) {
    let data = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "name": Pname,
        "score": score
      })
    }
    SubmitScore(data)
  }
  Qx++
   renderQuestions()
}

async function SubmitScore(obj) {
  try {
    let response = await fetch('https://ai-agent-steel-ten.vercel.app/api/v1/quiz/saveScores', obj)
    console.log(obj)
    location.reload()
  } catch (error) {
    console.log('error on line 80')
  }
}
function quizPage() {
  let name = document.getElementById('input')

  if (name.value == '') {
    return;
  }
  let name_input = document.querySelector('.name_input')
  let Questionboard = document.querySelector('.Question-board')
  Questionboard.style.display = 'block'
  name_input.style.display = 'none'
  Pname = name.value
  renderQuestions()
}

function NamePage() {
  let leader_board = document.querySelector('.leader-board')
  leader_board.style.display = 'none'
  let xyz = document.querySelector('.name_input')
  xyz.style.display = 'block'
}