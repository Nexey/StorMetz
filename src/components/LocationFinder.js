import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import {Button, Layout} from "@ui-kitten/components";
import {getWeatherByCityName, getWeatherByLatLong} from "../api/OpenWeatherMap";

export default function LocationFinder() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [meteo, setMeteo] = useState([]);


    const requestWeather = async() => {
        try {
            const openWeatherData = await getWeatherByLatLong(location.coords.latitude, location.coords.longitude);
            openWeatherData === undefined?console.log("Nothing retrieved"):setMeteo(openWeatherData);
            console.log(openWeatherData.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <Layout style={styles.container}>
            <Layout style={{flex:1}}>
                <Text>{text}</Text>

                <Button
                    title="Rechercher"
                    onPress={() => requestWeather()}
                >Rechercher</Button>
            </Layout>
        </Layout>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        justifyContent: 'center',
    }
});