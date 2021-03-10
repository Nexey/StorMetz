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

            /**
             * Les 2 cas issus de la homepage
             */

            /**
             * Cas 1 : Recherche
             */
            case "searchData":
                let endpoint = "";
                let previous = false;
                if (arr.searchData.cityName.length > 0) {
                    endpoint += arr.searchData.cityName;
                    previous = true;
                }
                if (arr.searchData.zipCode.length > 0) {
                    endpoint += (previous?",":"") + arr.searchData.zipCode;
                    previous = true;
                }
                if (arr.searchData.countryName.length > 0) {
                    endpoint += (previous?",":"") + arr.searchData.countryName;
                }
                return await callOpenWeatherMapAPI(`/weather?q=` + endpoint);
            /**
             * Cas 2 : Géolocalisation
             */
            case "coords":
                return await callOpenWeatherMapAPI(`/weather?lat=${arr.coords.lat}&lon=${arr.coords.lon}`);

            /**
             * La fonction utilisée pour afficher les favoris
             */
            case "cityID":
                return await callOpenWeatherMapAPI(`/weather?id=${arr.cityID}`);

            /**
             * La fonction utilisée pour afficher toutes les infos d'une ville
             */
            case "oneCall":
                return await callOpenWeatherMapAPI(`/onecall?lat=${arr.oneCall.lat}&lon=${arr.oneCall.lon}`);

            /**
             * La fonction oneCall ne donne pas le nom de la ville,
             * il faut donc pouvoir la récupérer si la recherche
             * s'est faite avec des coordonnées
             */
            case "nameFromCoords":
                return await callOpenWeatherMapAPIReverse(`/reverse?lat=${arr.nameFromCoords.lat}&lon=${arr.nameFromCoords.lon}&limit=1`);
            default:
                return;
        }
    }
}
