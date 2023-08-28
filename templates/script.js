async function fetchCityNames(query){
    const username = 'delifted';
    const url = `http://api.geonames.org/searchJSON?name_startsWith=${query}&maxRows=10&username=${username}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data.geonames.map(city => city.name);
    } catch (error) {
        console.error('Error fetching names:', error);
        return [];
    }
}


const cityInput = document.getElementById('city-input');

const awesomplete = new Awesomplete(cityInput, { list: [] });
cityInput.addEventListener('input', async function() {
    const cityNames = await fetchCityNames(this.value);
    awesomplete.list = cityNames;
});


const apiKey = 'e3a2ab92e171cef94c6dde17fcd27765';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

    async function checkWeather(city){
        const resp = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (resp.status ==  404){
            document.querySelector('.error').style.display = 'block';
            document.querySelector('.weather').style.display = 'none';
        }
        else{
            var data = await resp.json();

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°c';
            document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
            document.querySelector(".wind").innerHTML = data.wind.speed + ' km/h';
            document.querySelector(".country").innerHTML = data.sys.country;

            if(data.weather[0].main == 'Clouds'){
            weatherIcon.src = "images/clouds.png";
            }
            else if(data.weather[0].main == 'Clear'){
            weatherIcon.src = "images/clear.png";
            }
            else if(data.weather[0].main == 'Rain'){
            weatherIcon.src = "images/rain.png";
            }
            else if(data.weather[0].main == 'Drizzle'){
            weatherIcon.src = "images/drizzle.png";
            }
            else if(data.weather[0].main == 'Mist'){
            weatherIcon.src = "images/mist.png";
            }

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const searchBtn = document.querySelector('.search button');
        const cityInput = document.getElementById('city-input');

        searchBtn.addEventListener('click', async () => {
            const selectedCity = cityInput.value;
            console.log('Button clicked. City:', selectedCity);
            checkWeather(selectedCity);
        });
    })    
      
