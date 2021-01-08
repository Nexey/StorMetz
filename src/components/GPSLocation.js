import React from 'react';
import {Button, Icon, Layout, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {SafeAreaView, StyleSheet } from 'react-native';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
);

const GPSLocation = ({navigation, route, route : {params, params : {locationData, locationDataPlus}} }) => {
    //console.log(JSON.stringify(locationDataPlus));

    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );

    return (
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