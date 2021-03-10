import React from 'react';
import {Card, Icon, Layout, Text, TopNavigation} from '@ui-kitten/components';
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
    //console.log(meteoInfoData);
    return (
        <Card onPress={() => (onClick(meteoInfoData))}>
            <Layout style={{flex: 1, justifyContent:"center"}}>
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
                <Layout style={{flex:1, flexDirection: "row"}}>
                    <Layout style={{flex: 6}}>
                        <Text>
                            {meteoInfoData.weather[0].description.charAt(0).toUpperCase() + meteoInfoData.weather[0].description.slice(1)}, {~~meteoInfoData.main.temp}°C
                        </Text>
                    </Layout>
                    <Layout style={{flex: 1, flexDirection:"row"}}>
                        <Icon pack="fontawesomefive" style={{width:16, height:16}} name="long-arrow-alt-down"/>
                        <Text>
                            {~~meteoInfoData.main.temp_min}°C
                        </Text>
                    </Layout>
                    <Layout style={{flex: 1, flexDirection:"row", marginLeft:24}}>
                        <Icon pack="fontawesomefive" style={{width:16, height:16}} name="long-arrow-alt-up"/>
                        <Text>
                            {~~meteoInfoData.main.temp_max}°C
                        </Text>
                    </Layout>
                </Layout>
            </Layout>
        </Card>

    );
};

/*
Object {
  "base": "stations",
  "clouds": Object {
    "all": 90,
  },
  "cod": 200,
  "coord": Object {
    "lat": 37.3861,
    "lon": -122.0838,
  },
  "dt": 1615371770,
  "id": 5375480,
  "main": Object {
    "feels_like": 3.41,
    "humidity": 87,
    "pressure": 1014,
    "temp": 6.14,
    "temp_max": 7.78,
    "temp_min": 4.44,
  },
  "name": "Mountain View",
  "rain": Object {
    "1h": 0.44,
  },
  "sys": Object {
    "country": "US",
    "id": 5122,
    "sunrise": 1615386380,
    "sunset": 1615428653,
    "type": 1,
  },
  "timezone": -28800,
  "visibility": 8047,
  "weather": Array [
    Object {
      "description": "légère pluie",
      "icon": "10n",
      "id": 500,
      "main": "Rain",
    },
  ],
  "wind": Object {
    "deg": 190,
    "speed": 2.06,
  },
}

 */

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
