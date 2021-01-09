import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity } from 'react-native';

const InfoMeteoListItem = ({onClick, infoMeteoData, infoMeteoData : {main, id}, isFav = false}) => {
    return (
        <TouchableOpacity onPress={() => (onClick(infoMeteoData))}>
            <Layout style={styles.container}>
                <Layout style={styles.informationContainer}>
                    <Layout style={styles.title}>
                        <Text category='h1'>
                            {infoMeteoData.name}
                        </Text>
                    </Layout>
                </Layout>
            </Layout>
        </TouchableOpacity>
    );
};

export default InfoMeteoListItem;

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