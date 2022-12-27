const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weatherMsg = document.getElementById('weather-message');
const loadingMsg = document.getElementById('loading-message');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    loadingMsg.textContent = "Loading....";
    weatherMsg.textContent = "";
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
       return response.json().then((data) => {
        loadingMsg.textContent = "";
        if (data.error) {
            weatherMsg.textContent = data.error;
        } else {
            weatherMsg.textContent = `${data.location}. ${data.forecast}`;
        }
    })
    }).catch((error) => {
        loadingMsg.textContent = "";
        weatherMsg.textContent = error;
    })
})