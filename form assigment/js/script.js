console.log('js running')

const userInfo = {
  fname: null,
  lname: null,
  email: null,
  phone: null,
  gender: null,
  class: null,
  address: null,
  hobby: null,
  password: null
}

let firstName = document.getElementById('fname');
let lastName = document.getElementById('lname');
let email = document.getElementById('email')
let phone = document.getElementById('phone')
let class_p = document.getElementById('class')
let hobbys = document.querySelector('.hobbys')
let password_d = document.getElementById('password')
let conformPassword = document.getElementById('conform-password')
let radio = document.querySelector('.radiocontainer')
let address = document.getElementById('address')
function hobbyChecker() {
  let value = false
  let inputs = hobbys.getElementsByTagName('input')
  Array.from(inputs).forEach(element => {
    if (element.checked == true) {
      value = true
    }
  });
  return value
}
function hobbyreturner(){
 let value = []
  let inputs = hobbys.getElementsByTagName('input')
  Array.from(inputs).forEach(element => {
    if (element.checked == true) {
      value.push(element.value)
    }
  });
  return value
}
function grnderreturner(){
 let value = null;
  let inputs = radio.getElementsByTagName('input')
  Array.from(inputs).forEach(element => {
    if (element.checked == true) {
      value = element.value
    }
  });
  return value
}
function fnameChecker(fname) {
  let rex = /[^a-zA-Z]/.test(fname)
  return fname.trim().length >= 6 && !rex
}
function lastNameChecker(lname) {
  let rex = /[^a-zA-Z]/
  return lname.trim().length >= 5 && !rex.test(lname)
}
function emailChecker(email) {
  let at_inEmail = /^[a-zA-Z1-9]+@[a-zA-Z]+\.[a-zA-Z1-9]{2,}$/.test(email)
  return at_inEmail 
}
function emailAtchecker(email){
  return /.@/.test(email)
}
function phoneNumberChecker(number) {
  let Pnumber = /\D/.test(number)
  return number.trim().length == 10 && !Pnumber
}
function passwordChecker(pass) {
    let rex = /[1-9]/.test(pass)
    let word = /[a-zA-Z]/.test(pass)
  return pass.length > 8 && rex && word
}

function required(value) {
  return value.trim().length > 0
}
function ratioInputchecker() {
  let value = false
  let inputs = radio.getElementsByTagName('input')
  Array.from(inputs).forEach(element => {
    if (element.checked == true) {
      value = true
    }
  });
  return value
}


function formSubmit() {
  let fnameError = document.getElementById('fnameError')
  let lnameError = document.getElementById('lnameError')
  let emailerror = document.getElementById('emailError')
  let phoneerror = document.getElementById('phoneError')
  let classerror = document.getElementById('classError')
  let hobbyError = document.getElementById('hobbyError')
  let passWordError = document.getElementById('passwordError')
  let conformpasswordError = document.getElementById('conformpasswordError')
  let radioerror = document.getElementById('radioError')
  let addressError = document.getElementById('addressError')

  fnameError.innerText = firstName.value.trim().length > 5? fnameChecker(firstName.value) ? '':'please enter valid name'  : 'Please enter name length of > 5'
  lnameError.innerText = lastName.value.trim().length >4 ? lastNameChecker(lastName.value) ? '' : 'pease enter valid last name' : 'please enter last name length >4'
  emailerror.innerText = email.value.length > 0 ? (emailAtchecker(email.value) ? (emailChecker(email.value) ? '' : 'please enter valid email' ): "you email missing '@'" ):'please enter your email'
  phoneerror.innerText = phoneNumberChecker(phone.value) ? '' : 'please enter valid phone number'
  classerror.innerText = class_p.value != 'selectclass' ? '' : 'please select class'
  hobbyError.innerText = hobbyChecker() ? '' : 'please select at least one hobby'
  passWordError.innerText = password_d.value.length > 7 ? passwordChecker(password_d.value) ? '' : 'Password must contain one char and number' : 'your password is too short > 8'
  conformpasswordError.innerText = password_d.value == conformPassword.value ? '' : 'your password dont match'
  radioerror.innerText = ratioInputchecker() ? '' : 'please select  gender'
  addressError.innerText = address.value.trim().length > 0 ? '' :' please enter your address'
 
  if (fnameChecker(firstName.value) && lastNameChecker(lastName.value) && emailChecker(email.value) && phoneNumberChecker(phone.value) && class_p.value != 'selectclass' && hobbyChecker()
    && passwordChecker(password_d.value) && password_d.value == conformPassword.value && ratioInputchecker() && address.value.trim().length > 0 ) {
    userInfo.fname = firstName.value
    userInfo.lname = lastName.value
    userInfo.email = email.value
    userInfo.phone = phone.value
    userInfo.gender = grnderreturner()
    userInfo.class = class_p.value
    userInfo.address = address.value.trim()
    userInfo.hobby = hobbyreturner()
    userInfo.password = password_d.value

    localStorage.setItem('data',JSON.stringify(userInfo))
  }
}
