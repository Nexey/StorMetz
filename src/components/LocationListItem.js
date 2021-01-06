import React, { useState } from 'react';
import {Layout, Text, Icon, Button, ListItem} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';


const LocationListItem = ({locationMeteoData, locationMeteoData : {main, wind, weather}}) => {
    return (
            <Layout style={styles.container}>
                <Layout style={styles.informationContainer}>
                    <Layout style={styles.title}>
                        <Text category='h1'>
                            {locationMeteoData.name}
                        </Text>
                    </Layout>
                    <Layout style={styles.statsContainer}>
                        <Text>
                            {weather[0].main}, {main.temp}°C
                        </Text>
                    </Layout>
                    <Layout>
                        <Layout>
                            <Layout style={styles.statsContainer}>
                                <Text>
                                    {main.temp_min}°C
                                </Text>
                                <Text style={{marginLeft: 20}}>
                                    {main.temp_max}°C
                                </Text>
                            </Layout>
                        </Layout>

                        <Layout>
                            <Layout style={styles.statsContainer}>
                                <Text>
                                    21%
                                </Text>
                                <Text style={{marginLeft: 20}}>
                                    {wind.speed}km/h
                                </Text>
                                <Text style={{marginLeft: 20}}>
                                    {main.humidity}%
                                </Text>
                            </Layout>
                        </Layout>
                    </Layout>
                </Layout>
            </Layout>
    );
};

export default LocationListItem;

const styles = StyleSheet.create({
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