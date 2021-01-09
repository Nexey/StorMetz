import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {BottomNavigation, BottomNavigationTab, Icon} from '@ui-kitten/components';
import Colors from '../definitions/Colors';
import Home from "../components/Home";
import {NavigationContainer} from "@react-navigation/native";
import MeteoInfo from "../components/MeteoInfo";
import FavMeteoInfos from "../components/FavMeteoInfos";

const SearchNavigation = createStackNavigator();
const FavNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

function searchStackScreens() {

    return (
        <SearchNavigation.Navigator
            initialRouteName="ViewSearch"
        >
            <SearchNavigation.Screen
                name="ViewSearch"
                component={Home}
                options={{ title: 'Home' }}
            />
            <SearchNavigation.Screen
                name="ViewMeteoInfo"
                component={MeteoInfo}
                options={{ title: 'My Object' }}
            />
        </SearchNavigation.Navigator>
    )
};

function favStackScreens() {
    return (
        <FavNavigation.Navigator
            initialRouteName="ViewFav"
        >
            <FavNavigation.Screen
                name="ViewFav"
                component={FavMeteoInfos}
                options={{ title: 'Favoris' }}
            />
            <FavNavigation.Screen
                name="ViewMeteoInfo"
                component={MeteoInfo}
                options={{ title: 'My Object' }}
            />
        </FavNavigation.Navigator>
    )
};

const StarIcon = (props) => (
    <Icon {...props} name='star' pack="feather" width={24} height={24}/>
);

const SearchIcon = (props) => (
    <Icon {...props} name='home' pack="feather" width={24} height={24}/>
);

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='Home' icon={SearchIcon}/>
        <BottomNavigationTab title='Mes Favoris' icon={StarIcon}>Test</BottomNavigationTab>
    </BottomNavigation>
);

function RootStack() {
    return (
        <NavigationContainer>
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
        </NavigationContainer>
    );
}

export default RootStack;