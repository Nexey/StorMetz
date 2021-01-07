import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import Search from "../components/Search";
import GPSLocation from "../components/GPSLocation";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='Recherche'/>
        <BottomNavigationTab title='Mes Favoris'/>
    </BottomNavigation>
);

const TabNavigator = () => (
    <Navigator
        initialRouteName="Search"
        tabBar={props => <BottomTabBar {...props} />}
    >
        <Screen name='ViewSearch' component={Search}/>
        <Screen name='ViewFavoris' component={Search}/>
        <Screen name="ViewGPSLocation" component={GPSLocation} options={{ title: 'GPS' }}/>
    </Navigator>
);

const AppNavigator = () => (
    <NavigationContainer>
        <TabNavigator/>
    </NavigationContainer>
);

export default AppNavigator;