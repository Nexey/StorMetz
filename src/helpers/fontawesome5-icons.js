import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
        <Icon name={name} size={height} color={tintColor} style={iconStyle} />
    );
}

export const FontAwesome5IconsPack = {
    name: 'fontawesome5',
    icons: createIconsMap(),
};