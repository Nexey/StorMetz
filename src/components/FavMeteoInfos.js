import React, { useState, useEffect } from 'react';
import {StyleSheet, SafeAreaView, ActivityIndicator, FlatList} from 'react-native';
import {connect} from 'react-redux';

import MeteoInfoListItem from './MeteoInfoListItem';
import {Layout, List} from "@ui-kitten/components";
import {getWeather} from "../api/OpenWeatherMap";
import DisplayError from "./DisplayError";
import {mapStateToProps} from "../helpers/favActionHelpers";
import {renderMeteoItem} from "../helpers/utilHelpers";

const FavMeteoInfos = ({ navigation, favMeteoInfos }) => {
    const [meteoInfos, setMeteoInfos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isError, setIsError] = useState(false);

    const navigateToObjectDetails = async(coord, name, country, id) => {
        navigation.navigate("ViewMeteoInfo", {coord, name, country, id});
    };

    const amIaFavMeteoINfo = (meteoInfoID) => {
        return (favMeteoInfos.findIndex(i => i === meteoInfoID) !== -1);
    };

    useEffect(() => {
        (async () => {
            await refreshFavMeteoInfos();
        })();
    }, [favMeteoInfos]);

    const getObjectById = async(id) => {
        try {
            const openWeatherData = await getWeather({"cityID":id});
            if (openWeatherData===undefined)
                console.log("Nothing retrieved");
            else {
                await setMeteoInfos(meteoInfos => [...meteoInfos, openWeatherData.data]);
            }
        } catch (error) {
            setError("Erreur lors de la récupération des données d'un favori.")
            setIsError(true);
        }
    }

    const refreshFavMeteoInfos = async () => {
        await setIsError(false);
        await setIsLoading(true);
        await setMeteoInfos([]);
        try {
            for (const id of favMeteoInfos) {
                await getObjectById(id);
            }
        } catch (error) {
            setError("Les favoris n'ont pas pu être récupérés.")
            setIsError(true);
        }
        await setIsLoading(false);
    };

    return (
        <Layout style={styles.container}>
            {isError ?
                (<DisplayError message={error}/>) :
                (isLoading ?
                    (<Layout style={styles.containerLoading}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </Layout>) :
                    <List
                        data={meteoInfos}
                        extraData={favMeteoInfos}
                        renderItem={(item) => renderMeteoItem(item, navigateToObjectDetails, favMeteoInfos)}
                    />
                )
            }
        </Layout>
    );
};

export default connect(mapStateToProps)(FavMeteoInfos);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        marginTop: 16,
    },
});
