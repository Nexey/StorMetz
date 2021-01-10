import React, {useEffect, useState} from 'react';
import {Button, Icon, Layout, List, TopNavigation} from '@ui-kitten/components';
import {StyleSheet, SafeAreaView, TextInput} from 'react-native';

const AppLoading = () => {
    const SearchIcon = (props) => (
        <Icon {...props} name='search-outline' />
    );

    const MapIcon = (props) => (
        <Icon {...props} name='location-pin' pack="material"/>
    );

    return (
        <SafeAreaView style={styles.container}>
            <TopNavigation title='MyApp' alignment='center'/>
            <Layout style={styles.searchContainer}>
                <Layout style={styles.searchContainer}>
                    <TextInput style={styles.inputRestaurantName} placeholder="Ville" />
                </Layout>
                <Button
                    title="Rechercher"
                    accessoryLeft={SearchIcon}
                >Rechercher</Button>
                <Button
                    title="Localiser"
                    accessoryLeft={MapIcon}
                >Me localiser</Button>
            </Layout>
        </SafeAreaView>
    );
}

export default AppLoading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        marginTop: 16,
    },
    searchContainer: {
        marginBottom: 16,
    },
});