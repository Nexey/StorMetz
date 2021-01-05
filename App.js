import { StatusBar } from 'expo-status-bar';
import { default as theme } from './theme.json';
import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Button, Icon, IconRegistry} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import Home from './src/components/Home';

const FacebookIcon = (props) => (
    <Icon name='facebook' {...props} />
);

export const LoginButton = () => (
    <Button accessoryLeft={FacebookIcon}>Login with Facebook</Button>
);

export default function App() {
    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
                <Home/>
                <LoginButton/>
                <StatusBar style="auto" />
            </ApplicationProvider>
        </>
    );
}