import React, {useState, useEffect} from 'react';
import {Layout, Button, Icon, ListItem, Text} from '@ui-kitten/components';
import { StyleSheet, TextInput } from 'react-native';
import {FlatList, VirtualizedList} from "react-native-web";
import {getWeatherByCityName, getWeatherByLatLong} from "../api/OpenWeatherMap";
import LocationListItem from "./LocationListItem";
import fakeMeteo from "../helpers/fakeMeteo";
import * as Location from "expo-location";


const SearchIcon = (props) => (
    <Icon {...props} name='search-outline' />
);
const MapIcon = (props) => (
    <Icon {...props} name='location-pin' pack="material"/>
);


const Search = () => {

    const [isRefreshing, setRefreshing] = useState(false);
    const [meteo, setMeteo] = useState(fakeMeteo);
    const [cityName, setCityName] = useState('');
    const [location, setLocation] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect( () => {
        if (location.length !== 0) {
            const test = async() => {
                try {
                    let openWeatherData = await getWeatherByLatLong(location.coords.latitude, location.coords.longitude);

                    openWeatherData === undefined ?
                        console.log("Nothing retrieved"):
                        await setMeteo(meteo => [...meteo, openWeatherData.data]);
                        //await meteo.push(openWeatherData.data);
                } catch (error) {
                    console.log(error.message);
                }
            }
            test();
        }
    }, [location]);

    const requestWeatherByLatLon = async() => {
        try {
            let {status} = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let locationTemp = await Location.getCurrentPositionAsync({});
            await setLocation(locationTemp);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        console.log(JSON.stringify(meteo));
    }, [meteo]);

    const requestWeatherByCityName = async() => {
        try {
            const openWeatherData = await getWeatherByCityName(cityName);

            //console.log(JSON.stringify(openWeatherData.data.list));
            openWeatherData === undefined ?
                console.log("Nothing retrieved"):
                await setMeteo(meteo => [...meteo, ...openWeatherData.data.list]);
            //let newList = null;
            //openWeatherData.data.list.forEach(city => setMeteo([...meteo, ...city]));

            /*
            for(const data in openWeatherData.data.list) {
                console.log(openWeatherData.data.list[data]);
                //newList = [...newList, ...openWeatherData.data.list[index]];
            }
            console.log(newList);
             /:*/

            //setMeteo(newList);
            //console.log(newList);
            //const newList = meteo.concat(openWeatherData.data.list);
            //await setMeteo(newList);
        } catch (error) {
            console.log(error.message);
        }
    };

    function renderItem({item}) {
        //console.log(item);
        //return ( <></> );
        return (<LocationListItem locationMeteoData={item} />);
    };

    const afficherPremierElement = () => {
        //console.log(meteo.length);
        if (meteo.length !== 0) {
            return (
                <LocationListItem locationMeteoData={meteo[meteo.length - 1]}/>
            );
        }
        if (false)
            return(
                //<LocationListItem locationMeteoData={meteo} />
                <FlatList
                    data={meteo}
                    extraData={meteo}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => renderItem(item)}
                />
            );
    };

    return (
        <Layout style={styles.container}>
            <Layout style={{flex:1}}>
                <Layout style={{flex:1}}/>
                <TextInput style={{flex: 1}} placeholder="Ville" onChangeText={(text) => setCityName(text)}/>
                <Layout style={{flexDirection: 'row', flex:1}}>
                    <TextInput style={{flex: 1}} placeholder="Code postal" />
                    <TextInput style={{flex: 1}} placeholder="Pays" />
                </Layout>
            </Layout>
            <Button
                title="Rechercher"
                onPress={requestWeatherByCityName}
                accessoryLeft={SearchIcon}
            >Rechercher</Button>
            <Button
                title="Localiser"
                onPress={requestWeatherByLatLon}
                accessoryLeft={MapIcon}
            >Me localiser</Button>
            <Button
                title="Reset"
                onPress={() => (setMeteo(fakeMeteo))}
            >Reset données</Button>
            <Layout style={{flex:5}}/>
            {afficherPremierElement()}
        </Layout>
    );
};

/*

            {afficherPremierElement()}
            <FlatList
                data={meteo}
                key="id"
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <LocationListItem restaurantData={item} />
                )}

                refreshing={isRefreshing}
                onEndReachedThreshold={0.5}
            />
            <LocationListItem locationMeteoData={meteo[0]} />
            <LocationListItem locationMeteoData={meteo[0]} />
            <FlatList
                data={meteo}
                keyExtractor={(item, index) => 'key'+index}
                renderItem={({ item }) => (
                    <LocationListItem restaurantData={item} />
                )}
                onEndReachedThreshold={0.5}
            />
    const renderItem = ({ item }) => (
        <LocationListItem locationMeteoData={item} />
    );

    const renderMeteoData = () => {
        console.log("oui");
        Object.keys(meteo).map(function(keyName, keyIndex) {
            console.log(keyName);
        })
    };

    <LocationListItem locationMeteoData={meteo[0]} />
    <FlatList
        data={meteo}
        renderItem={({item}) => (
            <LocationListItem locationMeteoData={item} />
        )}
        keyExtractor={item => item.id.toString()}
    />
VirtualizedList
    <FlatList
        data={meteo}
        renderItem={renderItem}
        keyExtractor={item => item.id}
    />
    <FlatList
        data={(meteo)}
        keyExtractor={(item) => item["id"]}
        renderItem={item => <Text>{item["name"]}</Text>}
    />
    <FlatList
        data={meteo}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <LocationListItem locationMeteoData={item} />
        )}
    />
 */
export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        justifyContent: 'center',
    }
});