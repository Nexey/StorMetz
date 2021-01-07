import React, {useState, useEffect} from 'react';
import {Layout, Button, Icon, List, TopNavigation} from '@ui-kitten/components';
import {StyleSheet, TextInput, SafeAreaView, ActivityIndicator} from 'react-native';
import {getWeatherByCityName, getWeatherByLatLong, getWeatherOneCall} from "../api/OpenWeatherMap";
import LocationListItem from "./LocationListItem";
import fakeMeteo from "../helpers/fakeMeteo";
import * as Location from "expo-location";
import DisplayError from "./DisplayError";
//import moment from "moment";

const SearchIcon = (props) => (
    <Icon {...props} name='search-outline' />
);
const MapIcon = (props) => (
    <Icon {...props} name='location-pin' pack="material"/>
);

const Search = ({navigation}) => {
    const [meteo, setMeteo] = useState([]);
    const [cityName, setCityName] = useState('');
    const [location, setLocation] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        if (location.length !== 0) {
            const test = async() => {
                try {
                    let openWeatherData = await getWeatherByLatLong(location.coords.latitude, location.coords.longitude);
                    await setMeteo([]);
                    if (openWeatherData===undefined)
                        console.log("Nothing retrieved");
                    else {
                        await setMeteo(meteo => [...meteo, openWeatherData.data]);
                        setIsLoading(false);
                    }
                } catch (error) {
                    console.log(error.message);
                    setIsError(true);
                }
            }
            test();
        }
    }, [location]);

    const requestWeatherByLatLon = async() => {
        setIsLoading(true);
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
        setIsLoading(true);
        try {
            const openWeatherData = await getWeatherByCityName(cityName);
            //console.log(JSON.stringify(openWeatherData.data.list));
            await setMeteo([]);
            if (openWeatherData===undefined)
                console.log("Nothing retrieved");
            else {
                await setMeteo(meteo => [...meteo, ...openWeatherData.data.list]);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error.message);
            setIsError(true);
        }
    };

    const navigateToLocationDetails = async(locationData) => {
        const locationDataPlus = await getWeatherOneCall(locationData.coord.lat, locationData.coord.lon);
        navigation.navigate("ViewGPSLocation", {locationData, locationDataPlus});
    };

    const renderItem = ({item}) => {
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
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='MyApp' alignment='center'/>
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
                        onPress={() => (setMeteo(fakeMeteo), setIsLoading(false))}
                    >Reset données</Button>
                    <Layout style={{flex:5}}/>
                    {isError ?
                        (<DisplayError message='Impossible de récupérer les données du restaurants' />) :
                        (isLoading ?
                            (<Layout style={styles.containerLoading}>
                                <ActivityIndicator size="large" />
                            </Layout>) :
                        afficherPremierElement()
                        )
                    }
                </Layout>
        </SafeAreaView>
    );
};

export default Search;

const styles = StyleSheet.create({
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        margin: 15,
        justifyContent: 'center',
    }
});