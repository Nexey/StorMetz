import axios from "axios";
const API_KEY = '66b84481c895aa59bb2fe44d7a263372';
const url = "https://api.openweathermap.org/data/2.5";

const callAPI = axios.create({
    baseURL: url,
    timeout: 1000,
});

async function callOpenWeatherMapAPI(endpoint) {
    try {
        const res = await callAPI.get(endpoint);
        return res;
    } catch (err) {
        console.log("API conection failed");
    }
}

export async function getWeatherByLatLong(lat, lon) {
    return await callOpenWeatherMapAPI(`/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
}

export async function getWeatherByCityName(cityName = '', stateCode ='', countryCode = '') {
    return await callOpenWeatherMapAPI(`/find?q=${cityName}&units=metric&appid=${API_KEY}`);
};