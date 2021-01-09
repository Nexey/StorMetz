import React, {useEffect} from 'react';
import {Button, Icon, Layout, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {SafeAreaView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const MeteoInfo = ({navigation, favMeteoInfos, dispatch, route}) => {

    // On pourrait définir les actions dans un fichier à part
    const saveObject = async () => {
        const action = { type: 'SAVE_OBJECT', value: route.params.meteoInfoData.id };
        dispatch(action);
    }

    const unsaveObject = async () => {
        const action = { type: 'UNSAVE_OBJECT', value: route.params.meteoInfoData.id };
        dispatch(action);
    }

    const navigateBack = () => {
        navigation.goBack();
    };

    const displaySaveObject = () => {
        if (favMeteoInfos.findIndex(i => i === route.params.meteoInfoData.id) !== -1) {
            // L'object est sauvegardé
            return (
                <Button
                    title='Retirer des favoris'
                    onPress={unsaveObject}
                >
                    Retirer des favoris
                </Button>
            );
        }
        // L'object n'est pas sauvegardé
        return (
            <Button
                title='Ajouter aux favoris'
                onPress={saveObject}
            >
                Ajouter aux favoris
            </Button>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title={route.params.meteoInfoData.name} alignment='center'/>
            <Layout style={styles.container}>
                <Layout style={styles.informationContainer}>
                    <Layout style={styles.title}>
                        <Text category='h1'>
                            Nom : {route.params.meteoInfoData.name}
                        </Text>
                        <Text category='h2' status="info">
                            ID : {route.params.meteoInfoData.id}
                        </Text>
                    </Layout>
                    <Layout>
                        {displaySaveObject()}
                    </Layout>
                </Layout>
            </Layout>
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => {
    return {
        favMeteoInfos: state.favMeteoInfoID
    }
}

/*
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='MyApp' alignment='center' accessoryLeft={BackAction}/>
            <Layout style={styles.container}>
                <Layout style={styles.informationContainer}>
                    <Layout style={styles.title}>
                        <Text category='h1'>
                            {locationData.name}
                        </Text>
                    </Layout>
                    <Layout style={styles.statsContainer}>
                        <Button
                            title="Favori"
                            //onPress={testCall}
                        >Rajouter aux favoris</Button>
                    </Layout>
                    <Layout style={styles.statsContainer}>
                        <Text>
                            {locationData.weather[0].main}, {locationData.main.temp}°C
                        </Text>
                    </Layout>
                    <Layout>
                        <Layout>
                            <Layout style={styles.statsContainer}>
                                <Text>
                                    {locationData.main.temp_min}°C
                                </Text>
                                <Text style={{marginLeft: 20}}>
                                    {locationData.main.temp_max}°C
                                </Text>
                            </Layout>
                        </Layout>

                        <Layout>
                            <Layout style={styles.statsContainer}>
                                <Text>
                                    {locationDataPlus.current.clouds}%
                                </Text>
                                <Text style={{marginLeft: 20}}>
                                    {locationData.wind.speed}km/h
                                </Text>
                                <Text style={{marginLeft: 20}}>
                                    {locationData.main.humidity}%
                                </Text>
                            </Layout>
                        </Layout>
                    </Layout>
                </Layout>
            </Layout>
        </SafeAreaView>

 */

export default connect(mapStateToProps)(MeteoInfo);

const styles = StyleSheet.create({
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    informationContainer: {
        flex: 1,
        marginLeft: 0,
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    statsContainer: {
        flexDirection: 'row',
        marginTop: 12,
    },
    statContainer: {
        flexDirection: 'row',
        marginRight: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    data: {
        fontSize: 16,
    },
    cuisine: {
        fontStyle: 'italic',
    },
    stat: {
        marginLeft: 4,
    },
});