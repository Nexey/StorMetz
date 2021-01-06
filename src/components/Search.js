import React, {useState, useEffect} from 'react';
import {Layout, Button, Icon, ListItem, Text} from '@ui-kitten/components';
import { StyleSheet, TextInput } from 'react-native';
import {FlatList} from "react-native-web";
import {getWeather} from "../api/OpenWeatherMap";

const SearchIcon = (props) => (
    <Icon  {...props} name='search-outline' />
);
const MapIcon = (props) => (
    <Icon  {...props} name='location-pin' pack="material"/>
);

const KELVIN = 273.15;

const Search = () => {
    const [meteo, setMeteo] = useState([]);

    const test = () => {
        console.log(meteo);
    }

    useEffect(() => {
        test();
    }, [meteo]);

    const requestWeather = async() => {
        try {
            const openWeatherMapSearchResult = await getWeather("Metz");
            setMeteo(openWeatherMapSearchResult['list']);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Layout style={styles.container}>
            <Layout style={{flex:1}}>
                <Layout style={{flex:1}}/>
                <TextInput style={{flex: 1}} placeholder="Ville" />
                <Layout style={{flexDirection: 'row', flex:1}}>
                    <TextInput style={{flex: 1}} placeholder="Code postal" />
                    <TextInput style={{flex: 1}} placeholder="Pays" />
                </Layout>
            </Layout>
            <Button
                title="Rechercher"
                onPress={requestWeather}
                accessoryLeft={SearchIcon}
            >Rechercher</Button>
            <Button
                title="Localiser"
                onPress={() => { console.log('Coucou'); }}
                accessoryLeft={MapIcon}
            >Me localiser</Button>
            <Layout style={{flex:5}}/>
            <Layout>
            </Layout>
        </Layout>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});