import React from 'react';
import MeteoInfoListItem from "../components/MeteoInfoListItem";
import {amIaFavMeteoInfo} from "./favActionHelpers";
import {Image, StyleSheet} from "react-native";

export const renderMeteoItem = ({item}, onClick, favMeteoInfos) => {
    return (<MeteoInfoListItem meteoInfoDataa={item} onClick={onClick} isFav={amIaFavMeteoInfo(favMeteoInfos, item.id)} />);
}

export const getIcon = (icon_id) => (
    <Image
        style={styles.tinyLogo}
        source={{
            uri: `http://openweathermap.org/img/wn/${icon_id}@4x.png`,
            cache: 'only-if-cached',
        }}
    />
)

const styles = StyleSheet.create({
    tinyLogo: {
        width: 64,
        height: 64,
    },
});
