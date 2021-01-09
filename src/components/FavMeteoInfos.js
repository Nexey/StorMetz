import React, { useState, useEffect } from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';

import InfoMeteoListItem from './InfoMeteoListItem';
import {Layout, List} from "@ui-kitten/components";
import fakeObjects from "../helpers/FakeObjects";

const FavMeteoInfos = ({ navigation, favMeteoInfos }) => {
    const [objects, setObjects] = useState([]);

    const navigateToObjectDetails = async(infoMeteoData) => {
        navigation.navigate("ViewMeteoInfo", {infoMeteoData});
    };

    const amIaFavMeteoINfo = (meteoInfoID) => {
        return (favMeteoInfos.findIndex(i => i === meteoInfoID) !== -1);
    };

    //*
    useEffect(() => {
        (async () => {
            await refreshObjects();
        })();
    }, [favMeteoInfos]);
    //*/

    const getObjectById = (id) => {
        for (let test of fakeObjects) {
            if (id === test.id)
                return test;
        }
        return [];
    }

    //console.log(getObjectById(6454368));

    const refreshObjects = async () => {
        let objects = [];
        try {
            for (const id of favMeteoInfos) {
                objects.push(getObjectById(id));
            };
            setObjects(objects);
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
        return (<InfoMeteoListItem infoMeteoData={item} onClick={navigateToObjectDetails} isFav={amIaFavMeteoINfo(item.id)} />);
    }

    return (
        <Layout style={styles.container}>
            <List
                data={objects}
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