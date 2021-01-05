import React from 'react';
import {Layout, Text, Icon, ApplicationProvider} from '@ui-kitten/components';
import { StyleSheet, Image, TextInput } from 'react-native';

import Colors from '../definitions/Colors';
import { FeatherIconsPack } from '../helpers/feather-icons';


const ArrowDownward = (props) => (
    <Icon name='arrow-downward' {...props} />
);
const ArrowUpward = (props) => (
    <Icon name='arrow-upward' {...props} />
);
const LocationListItem = () => {
    return (
        <Layout style={styles.container}>
            <Layout style={styles.informationContainer}>
                <Text style={styles.title}>
                    Metz
                </Text>
                <Text style={[styles.data, styles.cuisine]}>
                    Pluie, 13°C
                </Text>
                <Layout style={styles.statsContainer}>
                    <Layout style={styles.statContainer}>
                        <Text
                            style={[styles.data, styles.stat]}
                        >
                            7°C
                        </Text>
                    </Layout>
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
        flex:1
    },
    informationContainer: {
        flex: 1,
        marginLeft: 12,
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
    thumbnail: {
        width: 128,
        height: 128,
        borderRadius: 12,
        backgroundColor: Colors.mainGreen,
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
    icon: {
        tintColor: Colors.mainGreen,
    },
    stat: {
        marginLeft: 4,
    },
});
