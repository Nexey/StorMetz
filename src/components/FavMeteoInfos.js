import React, { useState, useEffect } from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';

import MeteoInfoListItem from './MeteoInfoListItem';
import {Layout, List} from "@ui-kitten/components";
import {getWeatherByCityID, getWeatherByCityName} from "../api/OpenWeatherMap";

const FavMeteoInfos = ({ navigation, favMeteoInfos }) => {
    const [meteoInfos, setMeteoInfos] = useState([]);

    const navigateToObjectDetails = async(meteoInfoData) => {
        navigation.navigate("ViewMeteoInfo", {meteoInfoData});
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
            const openWeatherData = await getWeatherByCityID({"cityID":id});
            if (openWeatherData===undefined)
                console.log("Nothing retrieved");
            else {
                await setMeteoInfos(meteoInfos => [...meteoInfos, openWeatherData.data]);
            }
            //await setMeteoInfos(openWeatherData.data);
        } catch (error) {
            console.log("erreur ptdr");
        }
        return [];
    }

    const refreshFavMeteoInfos = async () => {
        let objects = [];
        await setMeteoInfos([]);
        try {
            for (const id of favMeteoInfos) {
                objects.push(getObjectById(id));
            }
            await setMeteoInfos(objects);
        } catch (error) {
            console.log("erreur xD");
        }
    };
    /*
    const navigateToRestaurantDetails = (restaurantID) => {
        navigation.navigate("ViewRestaurant", { restaurantID });
    };

    const amIaFavRestaurant = (restaurantID) => {
        if (favRestaurants.findIndex(i => i === restaurantID) !== -1) {
            return true;
        }
        return false;
    };
    */

    const renderItem = ({item}) => {
        return (<MeteoInfoListItem meteoInfoData={item} onClick={navigateToObjectDetails} isFav={amIaFavMeteoINfo(item.id)} />);
    }

    return (
        <Layout style={styles.container}>
            <List
                data={meteoInfos}
                extraData={favMeteoInfos}
                renderItem={renderItem}
            />
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        favMeteoInfos: state.favMeteoInfoID
    }
}
export default connect(mapStateToProps)(FavMeteoInfos);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        marginTop: 16,
    },
});