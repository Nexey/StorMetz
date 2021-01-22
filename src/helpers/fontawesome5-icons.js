import React from 'react';
import { StyleSheet } from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

function createIconsMap() {
    return new Proxy({}, {
        get(target, name) {
            return IconProvider(name);
        },
    });
}

const IconProvider = (name) => ({
    toReactElement: (props) => FontAwesome5Icon({ name, ...props }),
});

function FontAwesome5Icon({ name, style }) {
    const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
    return (
        <FontAwesome5 name={name} size={height} color={tintColor} style={iconStyle} />
    );
}

export const FontAwesome5IconsPack = {
    name: 'fontawesomefive',
    icons: createIconsMap(),
};