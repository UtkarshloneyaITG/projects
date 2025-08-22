console.log('js running');
let roll = 0
let src = null;
let bigDice = document.getElementById('big-diceImage')
let dice = document.getElementById('dice')
let button = document.getElementById('button')
let randomNumber = 0

function randomDiceFliper() {
  button.disabled = true
  roll++
  dice.classList.toggle('animetion')
  randomNumber = Math.floor(Math.random() * 6) + 1
  setTimeout(() => {
    button.disabled = false
    let src = `media/dice-six-faces-${randomNumber}.png`
    bigDice.src = src
    createDiceLog()

  }, 1000)

}

function createDiceLog() {
  console.log(src)
  dice.classList.toggle('animetion')
  const logContainer = document.querySelector('.dice-log')
  let div = document.createElement('div')
  div.setAttribute('class', 'dice-log--log')
  div.innerHTML = ` <p>Roll : ${roll}</p>
            <div>
            <img src="media/dice-six-faces-${randomNumber}.png" alt="" width="100%" height="100%">
            </div>`
  logContainer.appendChild(div)

}