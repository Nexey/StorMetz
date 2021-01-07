import React, {useState, useEffect} from 'react';
import {Button, Icon, Layout, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import {getWeatherOneCall} from "../api/OpenWeatherMap";
import DisplayError from "./DisplayError";

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
);

const GPSLocation = ({navigation, route, route : {params, params : {locationData}} }) => {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [locationDataPlus, setLocationDataPlus] = useState(null);

    /*
    useEffect(() => {
        console.log(JSON.stringify(locationDataPlus) + ' ' + 'test');
    }, [locationDataPlus])
    */

    useEffect(() => {
        const test = async() => {
            await testCall();
        }
        test()
    }, []); // Uniquement à l'initialisation

    const testCall = async() => {
        try {
            let test = await getWeatherOneCall(locationData.coord.lat, locationData.coord.lon);
            setLocationDataPlus(test);
            setIsLoading(false);
        } catch (error) {
            setIsError(true);
        }
    }

    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='MyApp' alignment='center' accessoryLeft={BackAction}/>
            {isError ?
                (<DisplayError message='Impossible de récupérer les données du restaurants' />) :
                (isLoading ?
                        (<Layout style={styles.containerLoading}>
                            <ActivityIndicator size="large" />
                        </Layout>) :
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
                                                21%
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
                )}
        </SafeAreaView>
    );
};

export default GPSLocation;

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
});