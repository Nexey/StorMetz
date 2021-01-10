import axios from "axios";
import React from "react";
const API_KEY =     '66b84481c895aa59bb2fe44d7a263372';
const url_end =     `&units=metric&lang=fr&appid=${API_KEY}`;

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

let params = {"lat":"", "lon":"","cityID":"","cityName":""};

async function callOpenWeatherMapAPIReverse(endpoint) {
    try {
        const res = await callAPIReverse.get(endpoint + url_end);
        return res;
    } catch (err) {
        console.log("API conection failed");
    }
}
async function callOpenWeatherMapAPI(endpoint) {
    try {
        const res = await callAPI.get(endpoint + url_end);
        return res;
    } catch (err) {
        console.log("API conection failed");
    }
}

export async function getLocationNameByLatLon(...arr) {
    arr.forEach(arg => {
        if ("lat" in arg)
            params.lat = arg.lat;
        if ("lon" in arg)
            params.lon = arg.lon
    });

    return await callOpenWeatherMapAPIReverse(`/reverse?lat=${params.lat}&lon=${params.lon}&limit=1`);
}

export async function getWeatherByLatLong(...arr) {
    arr.forEach(arg => {
        if ("lat" in arg)
            params.lat = arg.lat;
        if ("lon" in arg)
            params.lon = arg.lon
    });

    return await callOpenWeatherMapAPI(`/weather?lat=${params.lat}&lon=${params.lon}`);
}

export async function getWeatherByCityName(...arr) {
    arr.forEach(arg => {
        if ("cityName" in arg)
            params.cityName = arg.cityName;
    });

    return await callOpenWeatherMapAPI(`/find?q=${params.cityName}`);
};

export async function getWeatherOneCall(...arr) {
    arr.forEach(arg => {
        if ("lat" in arg)
            params.lat = arg.lat;
        if ("lon" in arg)
            params.lon = arg.lon
    });

    return await callOpenWeatherMapAPI(`/onecall?lat=${params.lat}&lon=${params.lon}`);
}

export async function getWeatherByCityID(...arr) {
    arr.forEach(arg => {
        if ("cityID" in arg)
            params.cityID = arg.cityID;
    });

    return await callOpenWeatherMapAPI(`/weather?id=${params.cityID}`);
};
