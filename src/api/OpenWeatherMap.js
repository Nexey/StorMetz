import axios from "axios";
const API_KEY = '66b84481c895aa59bb2fe44d7a263372';
const url = "https://api.openweathermap.org/data/2.5";

const callAPI = axios.create({
    baseURL: url,
    timeout: 1000,
});

export async function getWeather(cityName = "Metz", stateCode ='', countryCode = '') {
    try {
        const endpoint = `/find?q=${cityName}&units=metric&appid=${API_KEY}`;
        const res = await callAPI.get(endpoint);
        return res.data.list;
    } catch (err) {
        console.log("API conection failed");
    }
};