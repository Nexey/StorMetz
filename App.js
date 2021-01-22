import { StatusBar } from 'expo-status-bar';
import { default as theme } from './src/definitions/theme.json';
import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Button, IconRegistry, Text} from '@ui-kitten/components';
import {FeatherIconsPack} from "./src/helpers/feather-icons";
import {MaterialIconsPack} from "./src/helpers/material-icons";
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {PersistGate} from 'redux-persist/integration/react';
import { Store, Persistor } from './src/store/config';
import AppNavigator from "./src/navigation/Navigation";
import {FontAwesome5IconsPack} from "./src/helpers/fontawesome5-icons";
import {Provider} from "react-redux";
import AppLoading from "./src/components/AppLoading";
import { ThemeContext } from './src/definitions/theme-context';
import { default as mapping } from "./mapping.json";
import {MaterialCommunityIconsPack} from "./src/helpers/materialcommunity-icons";

export default function App() {

    const [theme, setTheme] = React.useState('light');


    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
    };


    return (
        <>
            <IconRegistry icons={[EvaIconsPack, FeatherIconsPack, MaterialIconsPack, FontAwesome5IconsPack, MaterialCommunityIconsPack]} />
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <ApplicationProvider
                    {...eva}
                    theme={eva[theme]}
                    customMapping={mapping}
                >
                    <Provider store={Store} >
                        <PersistGate loading={null} persistor={Persistor}>
                            <AppNavigator/>
                            <StatusBar style="auto" />
                        </PersistGate>
                    </Provider>
                </ApplicationProvider>
            </ThemeContext.Provider>
        </>
    );
}
