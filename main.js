const api = {
    key:"89dcb4f3336e610bba7280ed9f1c4314",
    base:"http://api.openweathermap.org/data/2.5/"
};

const searchBox=document.getElementById("search-box");

searchBox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if (evt.keyCode == 13){
        getResults(searchBox.value);
    }
}

function getResults(query){
    console.log(query);
    console.log(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather =>{
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>º</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow= document.querySelector('.hi-low');
    hilow.innerText=`${Math.round(weather.main.temp_min)}ºC / ${Math.round(weather.main.temp_max)} ºC`
}

function dateBuilder(d){
    let months = ['January', 'February', 'March', 'April', 'May','June','July','August','September', 'October','November','December'];
    let days =['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday'];

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();

    return `${day} ${month} ${year}`;
}