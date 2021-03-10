import React from 'react';
import MeteoInfoListItem from "../components/MeteoInfoListItem";
import {amIaFavMeteoInfo} from "./favActionHelpers";

export const renderItem = ({item}, onClick, favMeteoInfos) => {
    return (<MeteoInfoListItem meteoInfoData={item} onClick={onClick} isFav={amIaFavMeteoInfo(favMeteoInfos, item.id)} />);
}