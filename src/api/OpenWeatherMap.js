import axios from "axios";
import React from "react";
const API_KEY =     '66b84481c895aa59bb2fe44d7a263372';
const url_end =     `&units=metric&lang=fr&appid=${API_KEY}`;
const url =         "https://api.openweathermap.org/data/2.5";

const callAPI = axios.create({
    baseURL: url,
    timeout: 1000,
});

const urlReverse =  "http://api.openweathermap.org/geo/1.0";

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
        console.log(err.message + "\nAPI conection failed");
    }
}

/* Input : Object
 * Exemple :
 * Object {
 *   "coords": Object {
 *     "lat": 37.4219968,
 *     "lon": -122.0840006,
 *   },
 * }
 *
 */
export async function getWeather(arr) {
    const keys = Object.keys(arr);
    if (keys.length === 1) {
        const param = keys.pop();
        switch(param) {
            case "coords":
                return await callOpenWeatherMapAPI(`/weather?lat=${arr.coords.lat}&lon=${arr.coords.lon}`);
            case "cityName":
                return await callOpenWeatherMapAPI(`/weather?q=${arr.cityName}`);
            case "cityID":
                return await callOpenWeatherMapAPI(`/weather?id=${arr.cityID}`);
            case "oneCall":
                return await callOpenWeatherMapAPI(`/onecall?lat=${arr.oneCall.lat}&lon=${arr.oneCall.lon}`);
            case "nameFromCoords":
                return await callOpenWeatherMapAPIReverse(`/reverse?lat=${arr.nameFromCoords.lat}&lon=${arr.nameFromCoords.lon}&limit=1`);
            default:
                return;
        }
    }
}
