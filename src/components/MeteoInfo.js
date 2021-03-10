import React, {useEffect, useState} from 'react';
import {Button, Icon, Layout, List, Spinner, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {Image, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import {getWeather} from "../api/OpenWeatherMap";
import {saveObject, unsaveObject, mapStateToProps} from "../helpers/favActionHelpers";
import Flag from "react-native-flags";
import moment from "moment";
import DisplayError from "./DisplayError";

const MeteoInfo = ({navigation, favMeteoInfos, dispatch, route, route: {params}}) => {
    const [allInfo, setAllInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const displaySaveObject = (id) => {
        if (favMeteoInfos.findIndex(i => i === id) !== -1) {
            // L'object est sauvegardé
            return (
                <Button style={styles.button}
                        onPress={() => unsaveObject(id, dispatch)}
                        title='Retirer des favoris'
                        appearance='ghost'
                        status='info'
                        accessoryLeft={BookmarkIcon}
                        size='medium'
                />
            );
        }
        // L'object n'est pas sauvegardé
        return (
            <Button style={styles.button}
                    onPress={() => saveObject(id, dispatch)}
                    title='Ajouter aux favoris'
                    appearance='ghost'
                    status='info'
                    accessoryLeft={BookmarkOutlineIcon}
                    size='medium'
            />
        );
    }

    useEffect(() => {
        (async () => {
            await fetchAllInfo();
        })();
    }, []);

    const fetchAllInfo = async() => {
        setIsLoading(true);
        try {
            const response = await getWeather({"oneCall": route.params.meteoInfoData.coord});
            response.data.hourly = response.data.hourly.splice(0, 24);
            await setAllInfo(response.data);
            //console.log(JSON.stringify(response.data.hourly))
        }
        catch (err) {
            setIsError(true);
        }
        setIsLoading(false);
    }

    const BookmarkIcon = (props) => (
        <Icon {...props} style={[props.style, { width: 32, height: 32 }]} name='bookmark' pack="materialcommunity" />
    );

    const BookmarkOutlineIcon = (props) => (
        <Icon {...props} style={[props.style, { width: 32, height: 32 }]} name='bookmark-outline' pack="materialcommunity" />
    );

    const convertirTimeStampEnHeure = (timestamp, timezone_offset) => {
        return moment
            .unix(timestamp + timezone_offset)
            .subtract(1, "h")
            .format("HH:mm");
    };

    const renderPrevisionHoraire = ({ item }) => {
        const heure = convertirTimeStampEnHeure(item.dt, allInfo.timezone_offset);
        return (
            <Layout style={{alignItems:"center"}}>
                <Text>{heure}</Text>
                {getIcon(item.weather[0].icon)}
                <Text>{~~item.temp}°C</Text>
            </Layout>
        );
    };

    const getIcon = (icon_id) => (
        <Image
            style={styles.tinyLogo}
            source={{
                uri: `http://openweathermap.org/img/wn/${icon_id}@4x.png`,
            }}
        />
    )



    return (
        <SafeAreaView style={{flex: 1}}>
            <Layout style={{flex: 1, padding: 15}}>
                <Layout style={{flex: 1, flexDirection: "row", justifyContent:"center", borderWidth: 2, borderColor: 'black'}}>
                    <Layout style={{flex: 5, flexDirection: "row"}}>
                        <Layout>
                            <Flag
                                code={route.params.meteoInfoData.sys.country}
                                size={48}
                            />
                        </Layout>
                        <Layout>
                            <Text category='h1' status="info">
                                {route.params.meteoInfoData.name}
                            </Text>
                        </Layout>
                    </Layout>
                    <Layout style={{flex: 1}}>
                        {displaySaveObject(route.params.meteoInfoData.id)}
                    </Layout>
                </Layout>
                <Layout style={{flex: 1, flexDirection: "row", borderWidth: 2, borderColor: 'black'}}>
                    {getIcon(route.params.meteoInfoData.weather[0].icon)}
                    <Text>
                        {route.params.meteoInfoData.weather[0].description.charAt(0).toUpperCase() + route.params.meteoInfoData.weather[0].description.slice(1)}
                    </Text>
                </Layout>
                <Layout style={{flex:4, borderWidth: 2, borderColor: 'black', alignItems: "center"}}>
                    {isError ?
                        (<DisplayError message={error}/>)
                        :
                        (isLoading ?
                            (<Layout style={styles.containerLoading}>
                                <Spinner size="giant"/>
                            </Layout>)
                            :
                            <List
                                horizontal={true}
                                data={allInfo.hourly}
                                renderItem={(item) => renderPrevisionHoraire(item)}
                            />
                        )
                    }
                </Layout>
            </Layout>
        </SafeAreaView>
    );
};

/*
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='MyApp' alignment='center' accessoryLeft={BackAction}/>
            <Layout style={styles.container}>
                <Layout style={styles.informationContainer}>
                    <Layout style={styles.title}>
                        <Text category='h1'>
                            {locationData.name}
                        </Text>
                    </Layout>
                    <Layout style={styles.statsContainer}>
                        <Button
                            title="Favori"
                            //onPress={testCall}
                        >Rajouter aux favoris</Button>
                    </Layout>
                    <Layout style={styles.statsContainer}>
                        <Text>
                            {locationData.weather[0].main}, {locationData.main.temp}°C
                        </Text>
                    </Layout>
                    <Layout>
                        <Layout>
                            <Layout style={styles.statsContainer}>
                                <Text>
                                    {locationData.main.temp_min}°C
                                </Text>
                                <Text style={{marginLeft: 20}}>
                                    {locationData.main.temp_max}°C
                                </Text>
                            </Layout>
                        </Layout>

                        <Layout>
                            <Layout style={styles.statsContainer}>
                                <Text>
                                    {locationDataPlus.current.clouds}%
                                </Text>
                                <Text style={{marginLeft: 20}}>
                                    {locationData.wind.speed}km/h
                                </Text>
                                <Text style={{marginLeft: 20}}>
                                    {locationData.main.humidity}%
                                </Text>
                            </Layout>
                        </Layout>
                    </Layout>
                </Layout>
            </Layout>
        </SafeAreaView>

 */

export default connect(mapStateToProps)(MeteoInfo);

const styles = StyleSheet.create({
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    informationContainer: {
        flex: 1,
        marginLeft: 0,
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    statsContainer: {
        flexDirection: 'row',
        marginTop: 12,
    },
    statContainer: {
        flexDirection: 'row',
        marginRight: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    data: {
        fontSize: 16,
    },
    cuisine: {
        fontStyle: 'italic',
    },
    stat: {
        marginLeft: 4,
    },
    tinyLogo: {
        width: 64,
        height: 64,
    },
    button: {
        height: 64
    },
});
