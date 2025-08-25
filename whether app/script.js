console.log('js running')
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
let objWether = {}

async function whetherReturner(cityname) {
  try {
    container.style.display = 'none'
    loader.style.display = 'flex'
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=a173a9475981faa920d7213a714f3194&units=metric`)
    let whetherObj = await response.json()
    objWether = whetherObj
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

}