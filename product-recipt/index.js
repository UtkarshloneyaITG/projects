console.log('js running')
let name = document.getElementById('name')
let email = document.getElementById('email')
let phoneNumber = document.getElementById('phone-number')
let address = document.getElementById('address')

function emailChecker(email) {
  let at_inEmail = /^[a-zA-Z1-9]+@[a-zA-Z]+\.[a-zA-Z1-9]{2,}$/.test(email)
  return at_inEmail
}

function fnameChecker(fname) {
  let rex = /[^a-zA-Z]/.test(fname)
  return fname.trim().length >= 6 && !rex
}
function emailAtchecker(email) {
  return /.@/.test(email)
}
function phoneNumberChecker(number) {
  let Pnumber = /\D/.test(number)
  return number.trim().length == 10 && !Pnumber
}
let arrayOfproducts = []
let productsWithPrice = {
  Tshirt: 400,
  hoddies: 900,
  cap: 200,
  shoes: 1200,
  bag: 700
}
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth()
let days = date.getDate();
let hours = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getMinutes();
let reciptObj = {
  date : `${days}/${month}/${year} , ${hours}:${minutes}:${seconds}`,
  name : null,
  Phone : null,
  Email : null,
  address : null,
  products : null,
}
const container = document.getElementById('more-product')
function productadd() {

  let product = document.createElement('div')
  product.innerHTML = `
               <div>
                <select name="products" id="products">
                  <option value="select">--Select Products--</option>
                  <option value='Tshirt'>T-shirt - 400₹</option>
                  <option value='Hoddies'>Hoddies - 900₹</option>
                  <option value='cap'>cap - 200₹</option>
                  <option value='shoes'>shoes - 1200₹</option>
                  <option value='bag'>bag - 700₹</option>
                </select>
                <input type="number" placeholder="Quantaty">
              </div>
              `
  container.appendChild(product)
}
function play() {
  let fnameError = document.getElementById('nameError')
  let emailerror = document.getElementById('emailError')
  let phoneerror = document.getElementById('phoneError')
  let addressError = document.getElementById('addressError')

  fnameError.innerText = name.value.trim().length > 5 ? fnameChecker(name.value) ? '' : 'please enter valid name' : 'Please enter name length of > 5'
  emailerror.innerText = email.value.length > 0 ? (emailAtchecker(email.value) ? (emailChecker(email.value) ? '' : 'please enter valid email') : "you email missing '@'") : 'please enter your email'
  phoneerror.innerText = phoneNumberChecker(phoneNumber.value) ? '' : 'please enter valid phone number'
  addressError.innerText = address.value.trim().length > 0 ? '' : 'please enter address'

  if(fnameChecker(name.value) && emailChecker(email.value) && phoneNumberChecker(phoneNumber.value) && address.value.trim().length > 0 ){
  productobjectcreater()
    reciptObj.name =  name.value
    reciptObj.Phone = phoneNumber.value
    reciptObj.Email = email.value
    reciptObj.address = address.value
    reciptObj.products = arrayOfproducts
    console.log(reciptObj)
    localStorage.setItem('recipt',JSON.stringify(reciptObj))
    window.location.href = 'http://127.0.0.1:5500/product-recipt/recipt.html'
  }
  
}
function productobjectcreater() {
  let select = container.getElementsByTagName('select')
  let quantaty = container.getElementsByTagName('input')

  Array.from(select).forEach((e, i) => {
    if (e.value == 'select' || quantaty[i].value == 0) {
      return;
    }
    let obj = {
      product: e.value,
      price: productsWithPrice[e.value],
      Qunt: quantaty[i].value,
      total: quantaty[i].value * productsWithPrice[e.value]
    }
    arrayOfproducts.push(obj)
  })
  console.log(arrayOfproducts)
}


