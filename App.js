import { StatusBar } from 'expo-status-bar';
import { default as theme } from './src/definitions/theme.json';
import React from 'react';
import * as eva from '@eva-design/eva';
import {ActivityIndicator} from 'react-native';
import {ApplicationProvider, IconRegistry, Text} from '@ui-kitten/components';
import {FeatherIconsPack} from "./src/helpers/feather-icons";
import {MaterialIconsPack} from "./src/helpers/material-icons";
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {PersistGate} from 'redux-persist/integration/react';

import { Store, Persistor } from './src/store/config';
import AppNavigator from "./src/navigation/Navigation";
import {FontAwesome5IconsPack} from "./src/helpers/fontawesome5-icons";
import {Provider} from "react-redux";
import AppLoading from "./src/components/AppLoading";

export default function App() {
    return (
        <>
            <IconRegistry icons={[EvaIconsPack, FeatherIconsPack, MaterialIconsPack, FontAwesome5IconsPack]} />
            <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
                <Provider store={Store} >
                    <PersistGate loading={<AppLoading/>} persistor={Persistor}>
                        <AppNavigator/>
                        <StatusBar style="auto" />
                    </PersistGate>
                </Provider>
            </ApplicationProvider>
        </>
    );
}