import axios from "axios";
import React from "react";
const API_KEY =     '66b84481c895aa59bb2fe44d7a263372';
const url =         "https://api.openweathermap.org/data/2.5";
const urlReverse =  "http://api.openweathermap.org/geo/1.0";

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

export async function getLocationNameByLatLon(...arr) {
    let params = {"lat":"", "lon":""};
    arr.forEach(arg => {
        if ("lat" in arg)
            params.lat = arg.lat;
        if ("lon" in arg)
            params.lon = arg.lon
    });

    return await callOpenWeatherMapAPIReverse(`/reverse?lat=${params.lat}&lon=${params.lon}&limit=1&appid=${API_KEY}`);
}

export async function getWeatherByLatLong(...arr) {
    let params = {"lat":"", "lon":""};
    arr.forEach(arg => {
        if ("lat" in arg)
            params.lat = arg.lat;
        if ("lon" in arg)
            params.lon = arg.lon
    });

    return await callOpenWeatherMapAPI(`/weather?lat=${params.lat}&lon=${params.lon}&units=metric&appid=${API_KEY}`);
}

export async function getWeatherByCityName(...arr) {
    let params = {"cityName":""};
    arr.forEach(arg => {
        if ("cityName" in arg)
            params.cityName = arg.cityName;
    });

    return await callOpenWeatherMapAPI(`/find?q=${params.cityName}&units=metric&appid=${API_KEY}`);
};

export async function getWeatherOneCall(...arr) {
    let params = {"lat":"", "lon":""};
    arr.forEach(arg => {
        if ("lat" in arg)
            params.lat = arg.lat;
        if ("lon" in arg)
            params.lon = arg.lon
    });

    return await callOpenWeatherMapAPI(`/onecall?lat=${params.lat}&units=metric&lon=${params.lon}&appid=${API_KEY}`);
}

export async function getWeatherByCityID(...arr) {
    console.log(arr);
    let params = {"cityID":""};
    arr.forEach(arg => {
        if ("cityID" in arg)
            params.cityID = arg.cityID;
    });

    return await callOpenWeatherMapAPI(`/weather?id=${params.cityID}&appid=${API_KEY}`);
};
