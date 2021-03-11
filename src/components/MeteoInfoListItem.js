import React from 'react';
import {Card, Icon, Layout, Text, TopNavigation} from '@ui-kitten/components';
import {Image, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import Flag from "react-native-flags";

const MeteoInfoListItem = ({onClick, meteoInfoDataa, isFav = false}) => {
    return (
        <Card onPress={() => (onClick(meteoInfoDataa.coord, meteoInfoDataa.name, meteoInfoDataa.sys.country, meteoInfoDataa.id))}>
            <Layout style={styles.informationContainer}>
                <Layout style={styles.containerNom}>
                    <Layout>
                        <Flag
                            code={meteoInfoDataa.sys.country}
                            size={48}
                        />
                    </Layout>
                    <Layout>
                        <Text category='h1' status="info">
                            {meteoInfoDataa.name}
                        </Text>
                    </Layout>
                </Layout>
                <Layout style={styles.containerInformationsMeteo}>
                    <Layout style={styles.containerClimat}>
                        <Text>
                            {meteoInfoDataa.weather[0].description.charAt(0).toUpperCase() + meteoInfoDataa.weather[0].description.slice(1)}, {~~meteoInfoDataa.main.temp}°C
                        </Text>
                    </Layout>
                    <Layout style={styles.containerTempMin}>
                        <Icon pack="fontawesomefive" style={styles.tinyLogo} name="long-arrow-alt-down"/>
                        <Text>
                            {~~meteoInfoDataa.main.temp_min}°C
                        </Text>
                    </Layout>
                    <Layout style={styles.containerTempMax}>
                        <Icon pack="fontawesomefive" style={styles.tinyLogo} name="long-arrow-alt-up"/>
                        <Text>
                            {~~meteoInfoDataa.main.temp_max}°C
                        </Text>
                    </Layout>
                </Layout>
            </Layout>
        </Card>

    );
};

export default MeteoInfoListItem;

const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
        marginLeft: 0,
        justifyContent: 'center',
    },
    containerNom: {
        flex: 3,
        flexDirection: "row"
    },
    containerInformationsMeteo:{
        flex:1,
        flexDirection: "row"
    },
    containerClimat: {
        flex: 6
    },
    containerTempMin: {
        flex: 1,
        flexDirection:"row"
    },
    containerTempMax: {
        flex: 1,
        flexDirection:"row",
        marginLeft:24
    },
    tinyLogo: {
        width: 16,
        height: 16,
    },
});
