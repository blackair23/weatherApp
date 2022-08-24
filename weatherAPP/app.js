document.getElementById('submitBtn').addEventListener('click', dataFetch);
document.getElementById('submitBtn').addEventListener('click', fiveDaysForecast);

startingData();

async function dataFetch() {
    let city = document.getElementById('input').value;
    // document.getElementById('input').value = '';
    let units = 'metric';
    let cityRes = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=ad3d6293ab4a5e965ae1ff713dc7618c`);
    let cityData = await cityRes.json();
    // console.log(cityData);
    let latitude = cityData[0].lat;
    let lontitude = cityData[0].lon;
    let country = cityData[0].country;
    let cityName = cityData[0].name;


    // document.getElementById('mainWeather').innerHTML ='';
    spinner();
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${lontitude}&appid=ad3d6293ab4a5e965ae1ff713dc7618c&units=metric`);
    let data = await res.json();
    // console.log(res.weather);
    console.log(data);

    document.getElementById('frozenEffect').innerHTML = `
        <div id="mainWeather">
            <h2>${cityName}, ${country}</h2>
            <img id="img"src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather img">
            <p>${data.weather[0].main}</p>
            <h2>${Math.round(data.main.temp)}&degC</h2>
            <h3>Feels Like: ${Math.round(data.main.feels_like)}&degC</h3>
            <p>Min.: <strong>${Math.round(data.main.temp_min)}&degC</strong>  Max.: <strong>${Math.round(data.main.temp_max)}&degC</strong></p>
        </div>
        <div id="days">
            <h2>Weather Details</h2>
            <p>Cloudy: ${data.clouds.all}%</p>
            <p>Wind: ${data.wind.speed}km/h</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <div id="container">

            </div>
        </div>
        `
    

}

function spinner() {
    document.getElementById('frozenEffect').innerHTML = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
}

async function startingData() {
    let city = 'Sofia';
    let units = 'metric';
    let cityRes = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=ad3d6293ab4a5e965ae1ff713dc7618c`);
    let cityData = await cityRes.json();
    // console.log(cityData);
    let latitude = cityData[0].lat;
    let lontitude = cityData[0].lon;
    let country = cityData[0].country;
    let cityName = cityData[0].name;


    // document.getElementById('mainWeather').innerHTML ='';
    spinner();
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${lontitude}&appid=ad3d6293ab4a5e965ae1ff713dc7618c&units=metric`);
    let data = await res.json();
    // console.log(res.weather);
    // console.log(data);

    document.getElementById('frozenEffect').innerHTML = `
        <div id="mainWeather">
            <h2>${cityName}, ${country}</h2>
            <img id="img"src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather img">
            <p>${data.weather[0].main}</p>
            <h2>${Math.round(data.main.temp)}&degC</h2>
            <h3>Feels Like: ${Math.round(data.main.feels_like)}&degC</h3>
            <p>Min.: <strong>${Math.round(data.main.temp_min)}&degC</strong>  Max.: <strong>${Math.round(data.main.temp_max)}&degC</strong></p>
        </div>
        <div id="days">
            <h2>Weather Details</h2>
            <p>Cloudy: ${data.clouds.all}%</p>
            <p>Wind: ${data.wind.speed}km/h</p>
            <p>Humidity: ${data.main.humidity}%</p>
        </div>
        `
    

}

async function fiveDaysForecast() {
    let city = document.getElementById('input').value;
    document.getElementById('input').value = '';
    let units = 'metric';
    let cityRes = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=ad3d6293ab4a5e965ae1ff713dc7618c`);
    let cityData = await cityRes.json();

    let latitude = cityData[0].lat;
    let lontitude = cityData[0].lon;
    let country = cityData[0].country;
    let cityName = cityData[0].name;

    spinner();

    let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${lontitude}&appid=ad3d6293ab4a5e965ae1ff713dc7618c&units=metric`);
    let data = await res.json();

    // console.log('wather',data.list[0].weather[0].main);
    // console.log('temp', data.list[0].main.temp);
    // console.log('icon', data.list[0].weather[0].icon);
    // console.log('min',data.list[0].main.temp_min, 'max', data.list[0].main.temp_max);

    for (let i = 0; i < data.list.length; i++) {
        if(i == 8 || i == 16 || i == 24 || i == 32 || i == 39){
            let day = data.list[i].dt_txt;
            let date = new Date(day);
            let weekday = date.toLocaleDateString("en-US", { weekday: 'short' }); 
            let div = document.createElement('div'); 
            div.className = 'forcast';
            div.innerHTML = `
                <h4>${weekday}</h4>
                <img id="smallImg"src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" alt="weather img">
                <p><strong>${Math.round(data.list[i].main.temp)}&degC</strong></p>
                `;
            document.getElementById('container').appendChild(div);

        }

    }
  

}