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
import {renderMeteoItem} from "../helpers/utilHelpers";


const Home = ({navigation, favMeteoInfos}) => {
    const themeContext = React.useContext(ThemeContext);
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
    const [meteoInfos, setMeteoInfos] = useState([]);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [cityName, setCityName] = useState('');
    const [countryName, setCountryName] = useState('');
    const [zipCode, setZipCode] = useState('');
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

    const requestWeatherBySearch = async() => {
        setLastCall("search");
        const searchData = {"searchData":{"cityName":"","countryName":"","zipCode":""}};
        if (cityName.length > 0)
            searchData.searchData.cityName = cityName;
        if (countryName.length > 0) {
            const lookup = require('country-code-lookup')
            try {
                const isoCode = lookup.byCountry(countryName);
                searchData.searchData.countryName = isoCode.iso2;
            }
            catch(err) {
                console.log(err.message);
            }
        }
        if (zipCode.length > 0)
            searchData.searchData.zipCode = zipCode;

        //console.log(searchData);
        await requestWeather(searchData);
    }

    const navigateToMeteoInfoDetails = async(meteoInfoData) => {
        navigation.navigate("ViewMeteoInfo", {meteoInfoData});
    };

    const onRefresh = async() => {
        switch(lastCall) {
            case 'coords':
                await requestWeatherByLatLon();
                break;
            case "search" :
                await requestWeatherBySearch();
                break;
            default:
                break;
        }
    };

    try {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Layout>
                    <TopNavigation title="StorMetz" alignment='center'/>
                </Layout>
                <Animated.View
                    style={{
                        opacity: fadeAnim, padding: 15, flex: 1
                    }}
                >
                    {/*<Button onPress={themeContext.toggleTheme}>TOGGLE THEME</Button>*/}

                    {/* Text inputs */}
                    <Layout style={{justifyContent: "space-between"}}>
                        <Layout style={{alignItems: "flex-start", width: 50, borderBottomWidth:2, marginHorizontal: 5}}>
                            <TextInput
                                placeholder="Ville"
                                onChangeText={(text) => setCityName(text)}
                                onSubmitEditing={requestWeatherBySearch}
                                style={{height:48}}
                            />
                        </Layout>
                        <Layout style={{flexDirection: "row", paddingBottom:15}}>
                            <Layout style={{alignItems: "flex-start", width: 50, flex:2, borderBottomWidth:2, marginHorizontal: 5}}>
                                <TextInput
                                    placeholder="Pays"
                                    onChangeText={(text) => setCountryName(text)}
                                    onSubmitEditing={requestWeatherBySearch}
                                    style={{height:48}}
                                />
                            </Layout>
                            <Layout style={{flex:1}}/>
                            <Layout style={{alignItems: "flex-start", width: 50, flex:2, borderBottomWidth:2, marginHorizontal: 5}}>
                                <TextInput
                                    placeholder="Code postal"
                                    onChangeText={(text) => setZipCode(text)}
                                    onSubmitEditing={requestWeatherBySearch}
                                    style={{height:48}}
                                />
                            </Layout>
                        </Layout>
                    </Layout>

                    <Layout style={{paddingBottom:15}}>
                        <Button
                            accessoryLeft={SearchIcon}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',}}
                            name={'map-marker-alt'}
                            onPress={requestWeatherBySearch}
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
                    <Layout>
                        {isError ?
                            (<DisplayError message={error}/>)
                            :
                            (isLoading ?
                                    (<Layout style={styles.containerLoading}>
                                        <Spinner size="giant"/>
                                    </Layout>)
                                    :
                                    <List
                                        data={meteoInfos}
                                        keyExtractor={(item) => item.id.toString()}
                                        extraData={favMeteoInfos}
                                        renderItem={(item) => renderMeteoItem(item, navigateToMeteoInfoDetails, favMeteoInfos)}
                                        refreshControl={
                                            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                                        }
                                    />
                            )
                        }
                    </Layout>
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
