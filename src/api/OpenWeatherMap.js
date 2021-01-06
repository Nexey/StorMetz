const API_KEY = '66b84481c895aa59bb2fe44d7a263372';

export async function getWeather(cityName = '', stateCode ='', countryCode = '') {
    try {
        let url = `http://api.openweathermap.org/data/2.5/find?q=${cityName}&appid=` + API_KEY;
        return await fetch(url).then((response) => response.json());
    } catch (error) {
        console.log(`Error with function getWeather ${error.message}`);
        throw error;
    }
};