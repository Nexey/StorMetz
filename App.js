import { StatusBar } from 'expo-status-bar';
import { default as theme } from './src/definitions/theme.json';
import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {FeatherIconsPack} from "./src/helpers/feather-icons";
import {MaterialIconsPack} from "./src/helpers/material-icons";
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import Navigation from "./src/navigation/Navigation";

export default function App() {
    return (
        <>
            <IconRegistry icons={[EvaIconsPack, FeatherIconsPack, MaterialIconsPack]} />
            <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
                <Navigation />
                <StatusBar style="auto" />
            </ApplicationProvider>
        </>
    );
}