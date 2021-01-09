import React, {useEffect} from 'react';
import {Button, Icon, Layout, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {SafeAreaView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const MeteoInfo = ({navigation, favMeteoInfos, dispatch, route}) => {

    // On pourrait définir les actions dans un fichier à part
    const saveObject = async () => {
        const action = { type: 'SAVE_OBJECT', value: route.params.infoMeteoData.id };
        dispatch(action);
    }

    const unsaveObject = async () => {
        const action = { type: 'UNSAVE_OBJECT', value: route.params.infoMeteoData.id };
        dispatch(action);
    }

    const navigateBack = () => {
        navigation.goBack();
    };

    const displaySaveObject = () => {
        if (favMeteoInfos.findIndex(i => i === route.params.infoMeteoData.id) !== -1) {
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
            <TopNavigation title={route.params.infoMeteoData.name} alignment='center'/>
            <Layout style={styles.container}>
                <Layout style={styles.informationContainer}>
                    <Layout style={styles.title}>
                        <Text category='h1'>
                            Nom : {route.params.infoMeteoData.name}
                        </Text>
                        <Text category='h2' status="info">
                            ID : {route.params.infoMeteoData.id}
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