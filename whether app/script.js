console.log('js running')



let Country_name = document.querySelector('.Country_name')
let city = document.getElementById('city')
let cityName = document.querySelector('.cityName')
let error = document.querySelector('.error')
let Humidity = document.querySelector('.Humidity')
let preasure = document.querySelector('.Pressure')
let Wind = document.querySelector('.Wind')
let temperature = document.querySelector('.temperature')
let description = document.querySelector('.description')
let container = document.querySelector('.whether_app')
let weathericon = document.querySelector('.weather-icon')
let loader = document.querySelector('.center-loader')
let country_flag = document.querySelector('.country_flag')

let feels_like = document.querySelector('.feels_like')
let gust = document.querySelector('.gust')
let grnd_level = document.querySelector('.grnd_level')
let objWether = {}

let longitude = null;
let latitude = null;
const API_Key = '0b0ef6e434de5ce13e299c0a390b3ee3'
async function whetherReturner(cityname) {
  try {
    container.style.display = 'none'
    loader.style.display = 'flex'
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_Key}&units=metric`)
    let whetherObj = await response.json()
    objWether = whetherObj
    console.log(objWether)
    loader.style.display = 'none'
    container.style.display = 'block'
  } catch (error) {
    loader.style.display = 'none'
    console.error('error', error)
    return false
  }
  return objWether
}

async function updater(name) {
  await whetherReturner(name)
    .then((value) => {
      if (value.cod == 404) {
        error.innerText = 'please enter correct city name'
      }
      else if (value == false) {
        error.innerText = 'Somthing went wrong'
      }
      else if (value.cod == 400) {
        error.innerText = 'please enter the city name'
      }
      else {
        updaterNew()
      }
    })
    .catch((value) => {
      console.log(value)
    })
}
function getPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude
      longitude = position.coords.longitude
      console.log(position.coords.latitude, position.coords.longitude)
    })
  }
}
async function getMyPosition(lat, lon) {
  try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_Key}`)
    objWether = await response.json()
    loader.style.display = 'none'
    container.style.display = 'block'
  } catch (error) {
    console.log('something went wrong ')
  }
}

async function ShowMyLocationWhether() {
  getPosition()
  await getMyPosition(latitude, longitude)
  updaterNew()
}


function updaterNew() {
  error.innerText = ''
  let obj = objWether
  weathericon.src = `https://openweathermap.org/img/wn/${obj.weather[0].icon}.png`
  cityName.innerText = obj.name
  description.innerText = obj.weather[0].description

  temperature.innerText = `${obj.main.temp}ºC`
  Humidity.innerText = `${obj.main.humidity}%`
  preasure.innerText = `${obj.main.pressure} mb`
  Wind.innerText = `${obj.wind.speed} km/h`
  feels_like.innerText = `${obj.main.feels_like}ºC`
  gust.innerText = `${obj.wind.gust}`

  let code = obj.sys.country
  console.log(code)
  Country_name.innerText = `${countryListAlpha2[code]}`
  country_flag.src = countryFlagGetter(code)
}

function countryFlagGetter(c_code) {
  let src = (`https://flagsapi.com/${c_code}/shiny/64.png`)
  return src
}
