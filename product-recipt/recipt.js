
  let obj = localStorage.getItem('recipt')
  let object = JSON.parse(obj)
  console.log(object)

  let name = document.getElementById('recipt-name')
  let date = document.getElementById('recipt-date')
  let phone = document.getElementById('recipt-phone')
  let address = document.getElementById('recipt-address')
  let product = document.querySelector('.recipt-products')
  let email = document.getElementById('recipt-email')
  let total = document.getElementById('recipt-total')

let totals = 0
  name.innerText = object.name
  date.innerText = object.date
  phone.innerText = object.Phone
  address.innerText = object.address
  email.innerText = object.Email
 
  // let products = object
  
  object.products.forEach(element => {
    let p = document.createElement('p')
    p.innerHTML = `<span>${element.product} : ${element.price}₹ ✕ ${element.Qunt} = ${element.total} ₹</span>`
    product.appendChild(p)
   totals += Number.parseInt(element.total)
    total.innerText = totals + '₹'
  });