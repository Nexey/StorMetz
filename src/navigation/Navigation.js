import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Search from '../components/Search';
import LocationListItem from '../components/LocationListItem';

const SearchNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

import Colors from '../definitions/Colors';

function searchStackScreens() {
    return (
        <SearchNavigation.Navigator
            initialRouteName="ViewSearch"
        >
            <SearchNavigation.Screen
                name="ViewSearch"
                component={Search}
                options={{ title: 'Recherche' }}
            />
            <SearchNavigation.Screen
                name="viewLocationListItem"
                component={LocationListItem}
                options={{ title: 'ListItem' }}
            />
        </SearchNavigation.Navigator>
    );
};

function favStackScreens() {
    return (
        <SearchNavigation.Navigator
            initialRouteName="viewLocationListItem"
        >
            <SearchNavigation.Screen
                name="ViewSearch"
                component={Search}
                options={{ title: 'Recherche' }}
            />
            <SearchNavigation.Screen
                name="viewLocationListItem"
                component={LocationListItem}
                options={{ title: 'ListItem' }}
            />
        </SearchNavigation.Navigator>
    );
};

function RootStack() {
    return (
        <TabNavigation.Navigator
            tabBarOptions={{
                activeTintColor: Colors.mainGreen,
            }}>
            <TabNavigation.Screen
                name="Recherche"
                component={searchStackScreens}
            />
            <TabNavigation.Screen
                name="Favoris"
                component={favStackScreens}
            />
        </TabNavigation.Navigator>
    );
}

export default RootStack;
