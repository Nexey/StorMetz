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
    const [isRefreshing, setRefreshing] = useState(false);
    const [meteo, setMeteo] = useState([]);
    const [cityName, setCityName] = useState('');

    useEffect(() => {
        console.log(meteo);
    }, [meteo]);

    const requestWeather = async() => {
        try {
            const openWeatherData = await getWeather(cityName);
            openWeatherData === undefined?console.log("Nothing retrieved"):setMeteo(openWeatherData);
        } catch (error) {
            console.log(error.message);
        }
    };

    const afficherPremierElement = () => {
        return(
            meteo.length === 0 ?
                (<></>) :
                (
                    /*
                    <FlatList
                        data={meteo}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                        //*/
                            <LocationListItem locationMeteoData={meteo[0]} />
                        /*
                        )}
                    />
                // */
                )
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
                onPress={() => requestWeather(cityName)}
                accessoryLeft={SearchIcon}
            >Rechercher</Button>
            <Button
                title="Localiser"
                onPress={() => { console.log('Coucou'); }}
                accessoryLeft={MapIcon}
            >Me localiser</Button>
            <Layout style={{flex:5}}/>
            {afficherPremierElement()}
        </Layout>
    );
};

/*

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