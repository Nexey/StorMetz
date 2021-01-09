import React, {useState} from 'react';
import {Layout, List, Text, TopNavigation} from '@ui-kitten/components';
import {StyleSheet, SafeAreaView} from 'react-native';
import InfoMeteoListItem from "./InfoMeteoListItem";
import fakeObjects from "../helpers/FakeObjects";
import {connect} from 'react-redux';


const Home = ({navigation, favMeteoInfos}) => {
    const [objects, setObjects] = useState(fakeObjects);

    const navigateToMeteoInfoDetails = async(infoMeteoData) => {
        navigation.navigate("ViewMeteoInfo", {infoMeteoData});
    };

    const amIaFavMeteoInfo = (meteoInfoID) => {
        return (favMeteoInfos.findIndex(i => i === meteoInfoID) !== -1);
    };

    const renderItem = ({item}) => {
        return (<InfoMeteoListItem infoMeteoData={item} onClick={navigateToMeteoInfoDetails} isFav={amIaFavMeteoInfo(item.id)} />);
    }

    return (
        <SafeAreaView style={styles.container}>
            <TopNavigation title='MyApp' alignment='center'/>
            <Layout style={styles.searchContainer}>
                <Text status="danger" category='h1'>HOME</Text>
            </Layout>
            <List
                data={objects}
                extraData={favMeteoInfos}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => {
    return {
        favMeteoInfos: state.favMeteoInfoID
    }
}

export default connect(mapStateToProps)(Home);

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