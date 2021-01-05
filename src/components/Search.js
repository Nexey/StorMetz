import React from 'react';
import { Layout, Button, Icon } from '@ui-kitten/components';
import { StyleSheet, TextInput } from 'react-native';
import { FeatherIconsPack } from '../helpers/feather-icons'; // <-- Import Feather icons
import { MaterialIconsPack } from '../helpers/material-icons'; // <-- Import Material icons

const SearchIcon = (props) => (
    <Icon  {...props} name='search-outline' />
);
const MapIcon = (props) => (
    <Icon  {...props} name='location-pin' pack="material"/>
);

const Search = () => {
    return (
        <Layout style={styles.container}>
            <Layout style={{flex:1}}>
                <Layout style={{flex:1}}/>
                <TextInput style={{flex: 1}} placeholder="Ville" />
                <Layout style={{flexDirection: 'row', flex:1}}>
                    <TextInput style={{flex: 1}} placeholder="Code postal" />
                    <TextInput style={{flex: 1}} placeholder="Pays" />
                </Layout>
            </Layout>
            <Button
                title="Rechercher"
                onPress={() => { console.log('Coucou'); }}
                accessoryLeft={SearchIcon}
            >Rechercher</Button>
            <Button
                title="Localiser"
                onPress={() => { console.log('Coucou'); }}
                accessoryLeft={MapIcon}
            >Me localiser</Button>
            <Layout style={{flex:5}}/>
        </Layout>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});