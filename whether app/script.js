console.log('js running')
let city = document.getElementById('city')
let cityName = document.querySelector('.cityName')
let error = document.querySelector('.error')
let Humidity = document.querySelector('.Humidity')
let preasure = document.querySelector('.Pressure')
let Wind = document.querySelector('.Wind')
let temperature = document.querySelector('.temperature')
let description = document.querySelector('.description')
let objWether = {}

async function whetherReturner(cityname) {
  try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=a173a9475981faa920d7213a714f3194&units=metric`)
    let whetherObj = await response.json()
    objWether = whetherObj
  } catch (error) {
    console.error(error);
    return error
  }

}

async function updater(name) {
  await whetherReturner(name)

  if(city.value === '') {
    error.innerText = 'please enter city name'
    return
  }
  else error.innerText = ''

  let obj = objWether
  cityName.innerText = obj.name
  description.innerText = obj.weather[0].description
  temperature.innerText = `${obj.main.temp}ºC`
  Humidity.innerText = `${obj.main.humidity}%`
  preasure.innerText =`${obj.main.pressure} mb`
  Wind.innerText = `${obj.wind.speed} km/h`
  console.log(obj)
}