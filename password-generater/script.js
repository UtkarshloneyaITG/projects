console.log('js running')

let up = false;
let lp = false;
let s = false;
let num = false
let pLength = document.getElementById('pLength')
let uppercase = document.getElementById('upperCase')
let lowecase = document.getElementById('lowerCase')
let number = document.getElementById('number')
let symbol = document.getElementById('symbol')
let strength = document.getElementById('strength')
let length = pLength.value
let arrOfpassword = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','!',"@",'#','$','%','^','&','*','(',')']
let pass = []
let warning = document.getElementById('warning')
function generatePassword(){
  length = pLength.value
  if(pLength.value < 4){
    warning.innerText = 'please enter valid length 4-32'
    return
  }
  else{
    warning.innerText = ''
  }
   if(pLength.value > 32){
    warning.innerText = 'please enter valid length 4-32'
    return
  }
  else{
    warning.innerText = ''
  }
  if(lp || up || s || num){
    warning.innerText = ''
  }
  else{
    warning.innerText = 'please select at lest one type'
    return;
  }
  pass = []
  let x = 0
  while(x  != length){
    let randomNumber = Math.floor(Math.random()*arrOfpassword.length) + 1

    if(randomNumber > 0 && randomNumber < 9 && num){
      pass.push(arrOfpassword[randomNumber])
      x++
    }
    else if(randomNumber > 9 && randomNumber <  36 && up){
      pass.push(arrOfpassword[randomNumber])
      x++
    }
    else if(randomNumber > 37 && randomNumber <  61&& lp){
      pass.push(arrOfpassword[randomNumber])
      x++
    }
    else if(randomNumber > 61 && randomNumber <  71&& s){
      pass.push(arrOfpassword[randomNumber])
      x++
    }
    console.log(pass)
  }
  passwordChecker()
}

uppercase.addEventListener('change', ()=>{
  if(uppercase.checked)up = true
  else up = false
})

lowecase.addEventListener('change', ()=>{
  if(lowecase.checked)lp = true
  else lp = false
})
number.addEventListener('change', ()=>{
  if(number.checked)num = true
  else num = false
})
symbol.addEventListener('change', ()=>{
  if(symbol.checked)s = true
  else s = false
})

function validationPassword(input,password,condition1,condition2,condition3,condition4){
  length = input.value;
  if(length < 4){
    return false
  }
  let overall = false
  
  if(condition1){
    let rex = /[0-9]/.test(password)
    overall = rex
    if(overall == false){
      return false
    }
  }
  if(condition2){
    let rex2 = /[A-Z]/.test(password)
     overall = rex2
     if(overall == false){
      return false
    }
  }
   if(condition3){
    let rex3 = /[a-z]/.test(password)
     overall = rex3
     if(overall == false){
      return false
    }
  }
  if(condition4){
    let rex4 = /[!@#$%^&*()]/.test(password)
     overall = rex4
     if(overall == false){
      return false
    }
  }
  return overall
}
let password_show = document.getElementById('password_show')
function passwordChecker(){
   let passwrod = ''
  for(let x of pass){
   passwrod += x 
  }
  console.log(passwrod);
if(!validationPassword(pLength,passwrod,num,up,lp,s)){
  pass = []
  passwrod = ''
  generatePassword()
}
else {
  stren()
 password_show.value = passwrod;
}
}

function stren(){
  if(pLength.value < 8 ){
    strength.innerText = 'weak'
  }
   if(length >8){
    strength.innerText = 'mediam'
  }
  if (length < 8 &&(( up && lp )|| (lp && num) || (num && s) || (s && up) || (s && lp))){
    strength.innerText = 'mediam'
  }
else if(length > 8 && up && lp || lp && num || num && s || s && up || s && lp ){
    strength.innerText = 'hard'
  }
 
 

}
function copy(){
let value =  password_show.value
if(value !== ''){
navigator.clipboard.writeText(value)
alert('password copied')
}
else{
  
}
}