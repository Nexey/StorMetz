import React, {useEffect, useState} from 'react';
import {Button, Icon, Layout, List, Text, TopNavigation} from '@ui-kitten/components';
import {StyleSheet, SafeAreaView, TextInput, ActivityIndicator} from 'react-native';
import MeteoInfoListItem from "./MeteoInfoListItem";
import {connect} from 'react-redux';
import * as Location from "expo-location";
import {getWeatherByCityName, getWeatherByLatLong} from "../api/OpenWeatherMap";
import DisplayError from "./DisplayError";


const Home = ({navigation, favMeteoInfos}) => {
    const [meteoInfos, setMeteoInfos] = useState([]);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [cityName, setCityName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState([]);

    const SearchIcon = (props) => (
        <Icon {...props} name='search-outline' />
    );

    const MapIcon = (props) => (
        <Icon {...props} name='location-pin' pack="material"/>
    );

    useEffect(() => {
        (async () => {
            if (location !== undefined) {
                if (location.length !== 0) {
                    await requestWeather(getWeatherByLatLong, location.coords.latitude, location.coords.longitude);
                    setIsLoading(false);
                }
            }
        })();
    }, [location]);

    const requestLocation = async() => {
        setIsLoading(true);
        if (location.length === 0) {
            let {status} = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setError('Les permissions pour accéder aux données de localisation ont été refusées');
                return;
            }
        }
        setIsLoading(false);
        return await Location.getCurrentPositionAsync({});
    }

    const requestWeather = async(functionToCall, param1 = '', param2 = '') => {
        setIsLoading(true);
        setIsError(false);
        await setMeteoInfos([]);
        try {
            const openWeatherData = await functionToCall(param1, param2);
            if (openWeatherData===undefined) {
                setError("Aucun résultat n'a été trouvé.");
                setIsError(true);
            }
            else {
                "list" in openWeatherData["data"] ?
                    await setMeteoInfos(openWeatherData["data"]["list"]) :
                    await setMeteoInfos(meteoInfos => [...meteoInfos, openWeatherData["data"]]);
            }
        } catch (error) {
            setError(error.message);
            setIsError(true);
        }
        setIsLoading(false);
    }

    const requestWeatherByLatLon = async() => {
        try {
            let response = await requestLocation();
            await setLocation(response);
        } catch (error) {
            setError(error.message);
            setIsError(true);
        }
    }

    const requestWeatherByCityName = async() => {
        await requestWeather(getWeatherByCityName, cityName);
    };

    const navigateToMeteoInfoDetails = async(meteoInfoData) => {
        navigation.navigate("ViewMeteoInfo", {meteoInfoData});
    };

    const amIaFavMeteoInfo = (meteoInfoID) => {
        return (favMeteoInfos.findIndex(i => i === meteoInfoID) !== -1);
    };

    const renderItem = ({item}) => {
        return (<MeteoInfoListItem meteoInfoData={item} onClick={navigateToMeteoInfoDetails} isFav={amIaFavMeteoInfo(item.id)} />);
    }

    return (
        <SafeAreaView style={styles.container}>
            <TopNavigation title='MyApp' alignment='center'/>
            <Layout style={styles.searchContainer}>
                <Layout style={styles.searchContainer}>
                    <TextInput style={styles.inputRestaurantName} placeholder="Ville" onChangeText={(text) => setCityName(text)}/>
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
            </Layout>
            {isError ?
                (<DisplayError message={error} />) :
                (isLoading ?
                    (<Layout style={styles.containerLoading}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </Layout>) :
            <List
                data={meteoInfos}
                extraData={favMeteoInfos}
                renderItem={renderItem}
            />
                )
            }
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => {
    return {
        favMeteoInfos: state.favMeteoInfoID
    }
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        marginTop: 16,
    },
    searchContainer: {
        marginBottom: 16,
    },
});