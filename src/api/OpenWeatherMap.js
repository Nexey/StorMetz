const API_KEY = '66b84481c895aa59bb2fe44d7a263372';
const API_NAME = 'DEFAULT';

export async function getWeather(cityName = '', stateCode ='', countryCode = '') {
    try {

        let url = `http://api.openweathermap.org/data/2.5/find?q=${cityName}&appid=` + API_KEY;
        await console.log(url);
        const response = JSON.stringify(await fetch(url).then((response) => response.json()));
        return response;
    } catch (error) {
        console.log(`Error with function getRestaurants ${error.message}`);
        throw error;
    }
};