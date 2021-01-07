import React from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity } from 'react-native';
import fakeMeteo from "../helpers/fakeMeteo";


const LocationListItem = ({onClick, locationMeteoData, locationMeteoData : {main, weather}}) => {
    return (
        <TouchableOpacity onPress={() => (onClick(locationMeteoData))}>
            <Layout style={styles.container}>
                <Layout style={styles.informationContainer}>
                    <Layout style={styles.title}>
                        <Text category='h1'>
                            {locationMeteoData.name}
                        </Text>
                    </Layout>
                    <Layout style={styles.statsContainer}>
                        <Button
                            title="Favori"
                            onPress={() => (console.log("favori"))}
                        >Rajouter aux favoris</Button>
                    </Layout>
                    <Layout style={styles.statsContainer}>
                        <Text>
                            {weather[0].main}, {main.temp}°C
                        </Text>
                    </Layout>
                </Layout>
            </Layout>
        </TouchableOpacity>
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