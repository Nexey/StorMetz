import axios from "axios";
import React from "react";
const API_KEY = '66b84481c895aa59bb2fe44d7a263372';
const url = "https://api.openweathermap.org/data/2.5";
const urlReverse = "http://api.openweathermap.org/geo/1.0";

const callAPI = axios.create({
    baseURL: url,
    timeout: 1000,
});

const callAPIReverse = axios.create({
    baseURL: urlReverse,
    timeout: 1000,
});

async function callOpenWeatherMapAPIReverse(endpoint) {
    try {
        const res = await callAPIReverse.get(endpoint);
        return res;
    } catch (err) {
        console.log("API conection failed");
    }
}
async function callOpenWeatherMapAPI(endpoint) {
    try {
        const res = await callAPI.get(endpoint);
        return res;
    } catch (err) {
        console.log("API conection failed");
    }
}

export async function getLocationNameByLatLon(lat, lon) {
    return await callOpenWeatherMapAPIReverse(`/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
}

export async function getWeatherByLatLong(lat, lon) {
    return await callOpenWeatherMapAPI(`/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
}

export async function getWeatherByCityName(cityName = '', stateCode ='', countryCode = '') {
    return await callOpenWeatherMapAPI(`/find?q=${cityName}&units=metric&appid=${API_KEY}`);
};

export async function getWeatherOneCall(lat, lon) {
    return await callOpenWeatherMapAPI(`/onecall?lat=${lat}&units=metric&lon=${lon}&appid=${API_KEY}`);
}

export async function getWeatherByCityID(cityID = '') {
    return await callOpenWeatherMapAPI(`/weather?id=${cityID}&appid=${API_KEY}`);
};
