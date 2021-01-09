import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigation, BottomNavigationTab, Icon} from '@ui-kitten/components';
import Home from "../components/Home";
import MyObject from "../components/MeteoInfo"
import FavObjects from "../components/FavMeteoInfos";

const { Navigator, Screen } = createBottomTabNavigator();

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

const TabNavigator = () => (
    <Navigator
        initialRouteName="ViewHome"
        tabBar={props => <BottomTabBar {...props} />}
    >
        <Screen name='ViewHome' component={Home}/>
        <Screen name='ViewFavoris' component={FavObjects}/>
        <Screen name='ViewMyObject' component={MyObject}/>
    </Navigator>
);

const AppNavigator = () => (
    <NavigationContainer>
        <TabNavigator/>
    </NavigationContainer>
);

export default AppNavigator;