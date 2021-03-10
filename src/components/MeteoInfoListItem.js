import React from 'react';
import {Card, Layout, Text, TopNavigation} from '@ui-kitten/components';
import {Image, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import Flag from "react-native-flags";
/*
                        <Image
                            style={styles.tinyLogo}
                            source={{
                                uri: `http://openweathermap.org/img/wn/${meteoInfoData.weather[0].icon}@4x.png`,
                            }}
                        />
                        <Text>
                            {meteoInfoData.weather[0].description.charAt(0).toUpperCase() + meteoInfoData.weather[0].description.slice(1)}
                        </Text>
*/
const MeteoInfoListItem = ({onClick, meteoInfoData, meteoInfoData : {main, id}, isFav = false}) => {
    return (
        <Card onPress={() => (onClick(meteoInfoData))}>
            <Layout>
                <Layout>
                    <Layout>
                        <Layout style={{flex: 1, flexDirection: "row", justifyContent:"center"}}>
                            <Layout style={{flex: 3, flexDirection: "row"}}>
                                <Layout>
                                    <Flag
                                        code={meteoInfoData.sys.country}
                                        size={48}
                                    />
                                </Layout>
                                <Layout>
                                    <Text category='h1' status="info">
                                        {meteoInfoData.name}
                                    </Text>
                                </Layout>
                            </Layout>
                        </Layout>
                    </Layout>
                </Layout>
            </Layout>
        </Card>

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
    tinyLogo: {
        width: 64,
        height: 64,
    },
});
