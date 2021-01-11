import React from 'react';
import { View } from 'react-native';
import {Text, withStyles} from '@ui-kitten/components';

const AwesomeView = (props) => {
    const { eva, style, ...restProps } = props;

    return (
        <View {...restProps} style={[eva.style.awesome, style]} >
            <Text>
                Hello
            </Text>
            <Text>
                Hello
            </Text>
            <Text>
                Hello
            </Text>
            <Text>
                Hello
            </Text>
            <Text>
                Hello
            </Text>
            <Text>
                Hello
            </Text>
        </View>
    );
};

export const ThemedAwesomeView = withStyles(AwesomeView,
    (theme) => ({
        awesome: {
            backgroundColor: theme['color-primary-500'],
        },
    })
);