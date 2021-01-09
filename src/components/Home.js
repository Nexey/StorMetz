import React, {useEffect, useState} from 'react';
import {Button, Icon, Layout, List, Text, TopNavigation} from '@ui-kitten/components';
import {StyleSheet, SafeAreaView, TextInput} from 'react-native';
import MeteoInfoListItem from "./MeteoInfoListItem";
import fakeObjects from "../helpers/FakeObjects";
import {connect} from 'react-redux';
import * as Location from "expo-location";
import {getWeatherByCityName, getWeatherByLatLong} from "../api/OpenWeatherMap";


const Home = ({navigation, favMeteoInfos}) => {
    const [meteoInfos, setMeteoInfos] = useState([]);
    const [isError, setIsError] = useState(false);
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
                    try {
                        let openWeatherData = await getWeatherByLatLong(location.coords.latitude, location.coords.longitude);
                        await setMeteoInfos([]);
                        if (openWeatherData === undefined)
                            console.log("Nothing retrieved");
                        else {
                            await setMeteoInfos(meteoInfos => [...meteoInfos, openWeatherData.data]);
                            setIsLoading(false);
                        }
                    } catch (error) {
                        console.log(error.message);
                        setIsError(true);
                    }
                    setIsLoading(false);
                }
            }
        })();
    }, [location]);

    const requestLocation = async() => {
        if (location.length === 0) {
            let {status} = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
        }
        return await Location.getCurrentPositionAsync({});
    }

    const requestWeatherByLatLon = async() => {
        setIsLoading(true);
        try {
            let response = await requestLocation();
            await setLocation(response);
        } catch (error) {
            console.log(error.message);
            setIsError(true);
        }
    }

    const requestWeatherByCityName = async() => {
        setIsLoading(true);
        try {
            const openWeatherData = await getWeatherByCityName(cityName);
            await setMeteoInfos([]);
            if (openWeatherData===undefined)
                console.log("Nothing retrieved");
            else {
                await setMeteoInfos(meteoInfos => [...meteoInfos, ...openWeatherData.data.list]);
            }
        } catch (error) {
            console.log(error.message);
            setIsError(true);
        }
        setIsLoading(false);
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
            <List
                data={meteoInfos}
                extraData={favMeteoInfos}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
};

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