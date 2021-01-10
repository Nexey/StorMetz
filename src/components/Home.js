import React, {useEffect, useState} from 'react';
import {Button, Icon, Layout, List, TopNavigation} from '@ui-kitten/components';
import {StyleSheet, SafeAreaView, TextInput, ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import MeteoInfoListItem from "./MeteoInfoListItem";
import {connect} from 'react-redux';
import * as Location from "expo-location";
import {getWeatherByCityName, getWeatherByLatLong} from "../api/OpenWeatherMap";
import DisplayError from "./DisplayError";
import fakeMeteo from "../helpers/fakeMeteo";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const Home = ({navigation, favMeteoInfos}) => {
    const [meteoInfos, setMeteoInfos] = useState([]);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [cityName, setCityName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState([]);
    const [lastCall, setLastCall] = useState('');

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
                    await requestWeather(getWeatherByLatLong, {"lat":location.coords.latitude}, {"lon":location.coords.longitude});
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
        return await Location.getCurrentPositionAsync({});
    }

    const requestWeather = async(functionToCall, ...arr) => {
        await setIsError(false);
        await setIsLoading(true);
        try {
            const openWeatherData = await functionToCall(...arr);
            if (openWeatherData===undefined) {
                setError("Aucun résultat n'a été trouvé.");
                setIsError(true);
            }
            else {
                await setMeteoInfos([]);
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
        setLastCall("coords");
        try {
            let response = await requestLocation();
            await setLocation(response);
        } catch (error) {
            setError(error.message);
            setIsError(true);
        }
    }

    const requestWeatherByCityName = async() => {
        setLastCall("name");
        await requestWeather(getWeatherByCityName, {"cityName":cityName});
    };

    const navigateToMeteoInfoDetails = async(meteoInfoData) => {
        navigation.navigate("ViewMeteoInfo", {meteoInfoData});
    };

    const amIaFavMeteoInfo = (meteoInfoID) => {
        return (favMeteoInfos.findIndex(i => i === meteoInfoID) !== -1);
    };

    const onRefresh = async() => {
        switch(lastCall) {
            case 'name':
                await requestWeatherByCityName();
                break;
            case 'coords':
                await requestWeatherByLatLon();
                break;
            default:
                break;
        }
    };

    const renderItem = ({item}) => {
        return (<MeteoInfoListItem meteoInfoData={item} onClick={navigateToMeteoInfoDetails} isFav={amIaFavMeteoInfo(item.id)} />);
    }
    try {
        return (
            <SafeAreaView style={styles.container}>
                <TopNavigation title='MyApp' alignment='center'/>
                <Layout style={styles.searchContainer}>
                    <Layout style={styles.searchContainer}>
                        <TextInput style={styles.inputRestaurantName} placeholder="Ville"
                                   onChangeText={(text) => setCityName(text)}/>
                    </Layout>
                    <FontAwesome5.Button
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center'}}
                        name={'search'}
                        onPress={requestWeatherByCityName}
                    >
                        Rechercher
                    </FontAwesome5.Button>
                    <FontAwesome5.Button
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',}}
                        name={'map-marker-alt'}
                        onPress={requestWeatherByLatLon}
                    >
                        Me localiser
                    </FontAwesome5.Button>
                </Layout>
                {isError ?
                    (<DisplayError message={error}/>) :
                    (isLoading ?
                            (<Layout style={styles.containerLoading}>
                                <ActivityIndicator size="large" color="#0000ff"/>
                            </Layout>) :
                            <FlatList
                                data={meteoInfos}
                                keyExtractor={(item) => item.id.toString()}
                                extraData={favMeteoInfos}
                                renderItem={renderItem}
                                refreshControl={
                                    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                                }
                            />
                    )
                }
            </SafeAreaView>
        );
    } catch(error) {
        console.log(error);
    }
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