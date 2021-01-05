import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import Search from "../components/Search";
import LocationListItem from "../components/LocationListItem";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='Search'/>
        <BottomNavigationTab title='Item'/>
    </BottomNavigation>
);

const TabNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name='Search' component={Search}/>
        <Screen name='Item' component={LocationListItem}/>
    </Navigator>
);

const AppNavigator = () => (
    <NavigationContainer>
        <TabNavigator/>
    </NavigationContainer>
);

export default AppNavigator;