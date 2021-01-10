import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity } from 'react-native';
import ReactCountryFlag from "react-country-flag";
import Flag from "react-native-flags";

const MeteoInfoListItem = ({onClick, meteoInfoData, meteoInfoData : {main, id}, isFav = false}) => {
    return (
        <TouchableOpacity onPress={() => (onClick(meteoInfoData))}>
            <Layout style={styles.container}>
                <Layout style={styles.informationContainer}>
                    <Layout style={styles.title}>
                        <Layout style={styles.statContainer}>
                            <Flag
                                code={meteoInfoData.sys.country}
                                size={32}
                            />
                            <Text category='h1' status="info">
                                {meteoInfoData.name}
                            </Text>
                        </Layout>
                    </Layout>
                </Layout>
            </Layout>
        </TouchableOpacity>
    );
};

export default MeteoInfoListItem;

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
        fontSize: 24,
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