import React, {useState, useEffect} from 'react';
import {Layout, Button, Icon, ListItem, Text} from '@ui-kitten/components';
import { StyleSheet, TextInput } from 'react-native';
import {FlatList, VirtualizedList} from "react-native-web";
import {getWeather} from "../api/OpenWeatherMap";
import LocationListItem from "./LocationListItem";
import fakeMeteo from "../helpers/fakeMeteo";

const SearchIcon = (props) => (
    <Icon  {...props} name='search-outline' />
);
const MapIcon = (props) => (
    <Icon  {...props} name='location-pin' pack="material"/>
);


const Search = () => {
    const [meteo, setMeteo] = useState(fakeMeteo);
    const [cityName, setCityName] = useState('');

    const test = () => {
        console.log(meteo);
    }

    useEffect(() => {
        test();
    }, [meteo]);

    useEffect(() => {
        console.log(cityName);
    }, [cityName]);

    const requestWeather = async() => {
        try {
            const openWeatherMapSearchResult = await getWeather(cityName);
            setMeteo(openWeatherMapSearchResult['list']);
        } catch (error) {
            console.log(error.message);
        }
    }

    const renderItem = ({ item }) => (
        <LocationListItem locationMeteoData={item} />
    );

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
                onPress={() => requestWeather(cityName)}
                accessoryLeft={SearchIcon}
            >Rechercher</Button>
            <Button
                title="Localiser"
                onPress={() => { console.log('Coucou'); }}
                accessoryLeft={MapIcon}
            >Me localiser</Button>
            <Layout style={{flex:5}}/>
            <LocationListItem locationMeteoData={meteo[0]} />
        </Layout>
    );
};

/*
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
        justifyContent: 'center',
    }
});