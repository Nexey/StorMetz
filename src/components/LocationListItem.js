import React, { useState } from 'react';
import {Layout, Text, Icon, Button} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import {FlatList} from "react-native-web";
import Colors from "../definitions/Colors";
import {getWeather} from "../api/OpenWeatherMap";

const ArrowDownward = (props) => (
    <Icon name='arrow-downward' {...props} />
);
const ArrowUpward = (props) => (
    <Icon name='arrow-upward' {...props} />
);


const LocationListItem = () => {
    const [meteo, setMeteo] = useState([]);

    const requestWeather = async() => {
        try {
            const openWeatherMapSearchResult = await getWeather("Metz");
            console.log(openWeatherMapSearchResult);
        } catch (error) {
            console.log("Erreur api");
        }
    }

    return (
        <Layout style={styles.container}>
            <Layout style={styles.informationContainer}>
                <Layout style={styles.title}>
                    <Text category='h1'>
                        Metz
                    </Text>
                </Layout>
                <Layout style={styles.statsContainer}>
                    <Text>
                        Pluie
                    </Text>
                    <Text>
                        ,
                    </Text>
                    <Text style={{marginLeft: 5}}>
                        13°C
                    </Text>
                </Layout>
                <Layout>
                    <Layout>
                        <Layout style={styles.statsContainer}>
                            <Text>
                                7°C
                            </Text>
                            <Text style={{marginLeft: 20}}>
                                16°C
                            </Text>
                        </Layout>
                    </Layout>

                    <Layout>
                        <Layout style={styles.statsContainer}>
                            <Text>
                                21%
                            </Text>
                            <Text style={{marginLeft: 20}}>
                                6km/h
                            </Text>
                            <Text style={{marginLeft: 20}}>
                                35%
                            </Text>
                        </Layout>
                    </Layout>
                </Layout>
                <Layout>
                    <Button
                        title="Rechercher"
                        onPress={requestWeather}
                    >Rechercher</Button>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default LocationListItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    informationContainer: {
        flex: 1,
        marginLeft: 0,
        justifyContent: 'center',
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