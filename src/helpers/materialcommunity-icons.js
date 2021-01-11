import React from 'react';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function createIconsMap() {
    return new Proxy({}, {
        get(target, name) {
            return IconProvider(name);
        },
    });
}

const IconProvider = (name) => ({
    toReactElement: (props) => MaterialCommunityIcon({ name, ...props }),
});

function MaterialCommunityIcon({ name, style }) {
    const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
    return (
        <MaterialCommunityIcons name={name} size={height} color={tintColor} style={iconStyle} />
    );
}

export const MaterialCommunityIconsPack = {
    name: 'materialcommunity',
    icons: createIconsMap(),
};