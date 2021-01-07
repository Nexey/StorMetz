import React from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity } from 'react-native';
import fakeMeteo from "../helpers/fakeMeteo";


const DisplayError = ({message}) => {
    return (
        <Layout style={styles.container}>
            <Layout style={styles.informationContainer}>
                <Layout style={styles.title}>
                    <Text category='h1'>
                        Erreur :
                    </Text>
                </Layout>
                <Layout>
                    <Text>
                        {message}
                    </Text>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default DisplayError;

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