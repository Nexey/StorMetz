import React, {useEffect, useRef, useState} from 'react';
import {Button, Icon, Layout, List, Spinner, TopNavigation} from '@ui-kitten/components';
import {StyleSheet, SafeAreaView, TextInput, RefreshControl, Keyboard, Animated} from 'react-native';
import MeteoInfoListItem from "./MeteoInfoListItem";
import {connect} from 'react-redux';
import * as Location from "expo-location";
import {getWeather} from "../api/OpenWeatherMap";
import DisplayError from "./DisplayError";
import {ThemeContext} from "../definitions/theme-context";
import {mapStateToProps, amIaFavMeteoInfo} from "../helpers/favActionHelpers";
import {renderItem} from "../helpers/utilHelpers";


const Home = ({navigation, favMeteoInfos}) => {
    const themeContext = React.useContext(ThemeContext);
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
    const [meteoInfos, setMeteoInfos] = useState([]);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [cityName, setCityName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState([]);
    const [lastCall, setLastCall] = useState('');

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
    }, [fadeAnim])

    const SearchIcon = (props) => (
        <Icon {...props} name='search-outline' />
    );

    const BookmarkIcon = (props) => (
        <Icon {...props} name='bookmark' pack="materialcommunity" />
    );

    const BookmarkOutlineIcon = (props) => (
        <Icon {...props} name='bookmark-outline' pack="materialcommunity" />
    );

    const LocationPinIcon = (props) => (
        <Icon {...props} name='location-pin' pack="material"/>
    );

    useEffect(() => {
        (async () => {
            if (location !== undefined) {
                if (location.length !== 0) {
                    await requestWeather( {"coords":{"lat":location.coords.latitude, "lon":location.coords.longitude}});
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

    const requestWeather = async(arr) => {
        Keyboard.dismiss();
        //*
        await setIsError(false);
        await setIsLoading(true);
        try {
            const openWeatherData = await getWeather(arr);
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
        //*/
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
        await requestWeather( {"cityName":cityName});
    };

    const navigateToMeteoInfoDetails = async(meteoInfoData) => {
        navigation.navigate("ViewMeteoInfo", {meteoInfoData});
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

    try {
        return (
            <SafeAreaView style={styles.container}>
                <TopNavigation title='MyApp' alignment='center'/>
                <Animated.View
                        style={{
                            opacity: fadeAnim,
                        }}
                    >
                    <Button onPress={themeContext.toggleTheme}>TOGGLE THEME</Button>

                    <Layout style={styles.searchContainer}>
                        <Layout style={styles.searchContainer}>
                            <TextInput
                                placeholder="Ville"
                                onChangeText={(text) => setCityName(text)}
                                onSubmitEditing={requestWeatherByCityName}
                            />
                        </Layout>
                        <Button
                            accessoryLeft={SearchIcon}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',}}
                            name={'map-marker-alt'}
                            onPress={requestWeatherByCityName}
                        >
                            Rechercher
                        </Button>
                        <Button
                            accessoryLeft={LocationPinIcon}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',}}
                            name={'map-marker-alt'}
                            onPress={requestWeatherByLatLon}
                        >
                            Me localiser
                        </Button>
                    </Layout>
                    {isError ?
                    (<DisplayError message={error}/>) :
                    (isLoading ?
                    (<Layout style={styles.containerLoading}>
                        <Spinner size="giant"/>
                    </Layout>)
                        :
                    <List
                        data={meteoInfos}
                        keyExtractor={(item) => item.id.toString()}
                        extraData={favMeteoInfos}
                        renderItem={(item) => renderItem(item, navigateToMeteoInfoDetails, favMeteoInfos)}
                        refreshControl={
                            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                        }
                    />
                    )
                }
                </Animated.View>
            </SafeAreaView>
        );
    } catch(error) {
        console.log(error);
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
    containerLoading: {
        flex: 1,
        alignItems: 'center',
    },
    tinyIcon: {
        height:32,
        width:32,
        tintColor:'#32988c'
    },
    button: {
        margin: 2,
    },
});
