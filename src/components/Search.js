import React, {useState, useEffect} from 'react';
import {Layout, Button, Icon, List} from '@ui-kitten/components';
import { StyleSheet, TextInput } from 'react-native';
import {getWeatherByCityName, getWeatherByLatLong} from "../api/OpenWeatherMap";
import LocationListItem from "./LocationListItem";
import fakeMeteo from "../helpers/fakeMeteo";
import * as Location from "expo-location";
//import moment from "moment";

const SearchIcon = (props) => (
    <Icon {...props} name='search-outline' />
);
const MapIcon = (props) => (
    <Icon {...props} name='location-pin' pack="material"/>
);

const Search = ({navigation}) => {
    const [meteo, setMeteo] = useState(fakeMeteo);
    const [cityName, setCityName] = useState('');
    const [location, setLocation] = useState([]);

    useEffect( () => {
        if (location.length !== 0) {
            const test = async() => {
                try {
                    let openWeatherData = await getWeatherByLatLong(location.coords.latitude, location.coords.longitude);
                    await setMeteo([]);
                    openWeatherData === undefined ?
                        console.log("Nothing retrieved"):
                        await setMeteo(meteo => [...meteo, openWeatherData.data]);
                } catch (error) {
                    console.log(error.message);
                }
            }
            test();
        }
    }, [location]);

    const requestWeatherByLatLon = async() => {
        try {
            let {status} = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                //setErrorMsg('Permission to access location was denied');
                return;
            }
            let locationTemp = await Location.getCurrentPositionAsync({});
            await setLocation(locationTemp);
        } catch (error) {
            console.log(error.message);
        }
    }
    /*
    useEffect(() => {
        console.log(JSON.stringify(meteo));
    }, [meteo]);
    //*/

    const requestWeatherByCityName = async() => {
        try {
            const openWeatherData = await getWeatherByCityName(cityName);
            //console.log(JSON.stringify(openWeatherData.data.list));
            await setMeteo([]);
            openWeatherData === undefined ?
                console.log("Nothing retrieved"):
                await setMeteo(meteo => [...meteo, ...openWeatherData.data.list]);
        } catch (error) {
            console.log(error.message);
        }
    };

    const navigateToLocationDetails = (locationData) => {
        navigation.navigate("ViewGPSLocation", {locationData});
    };

    function renderItem({item}) {
        /*
        let date = moment()
            .utcOffset('+01:00')
            .format('hh:mm:ss');
        console.log(date + ' ' + item);
        */

        return (<LocationListItem locationMeteoData={item} onClick={navigateToLocationDetails} />);
    }

    const afficherPremierElement = () => {
        if (meteo.length !== 0)
            return(
                <List
                    data={meteo}
                    renderItem={renderItem}
                />
            );
    };

    return (
        <Layout style={styles.container}>
            <Layout style={{flex:1}}>
                <Layout style={{flex:1}}/>
                <TextInput style={{flex: 1}} placeholder="Ville" onChangeText={(text) => setCityName(text)}/>
                <Layout style={{flexDirection: 'row', flex:1}}>
                    <TextInput style={{flex: 1}} placeholder="Code postal" />
                    <TextInput style={{flex: 1}} placeholder="Pays" />
                </Layout>
            </Layout>
            <Button
                title="Rechercher"
                onPress={requestWeatherByCityName}
                accessoryLeft={SearchIcon}
            >Rechercher</Button>
            <Button
                title="Localiser"
                onPress={requestWeatherByLatLon}
                accessoryLeft={MapIcon}
            >Me localiser</Button>
            <Button
                title="Reset"
                onPress={() => (setMeteo(fakeMeteo))}
            >Reset données</Button>
            <Layout style={{flex:5}}/>
            {afficherPremierElement()}
        </Layout>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        justifyContent: 'center',
    }
});