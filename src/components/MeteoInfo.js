import React, {useEffect, useState, useRef, PureComponent} from 'react';
import {Button, Icon, Layout, List, Spinner, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {Image, SafeAreaView, StyleSheet, Dimensions, FlatList, Animated} from 'react-native';
import { connect } from 'react-redux';
import {getWeather} from "../api/OpenWeatherMap";
import {saveObject, unsaveObject, mapStateToProps} from "../helpers/favActionHelpers";
import Flag from "react-native-flags";
import moment from "moment";
import DisplayError from "./DisplayError";


const MeteoInfo = ({navigation, favMeteoInfos, dispatch, route}) => {
    const [allInfo, setAllInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [scrollOffset, setScrollOffset] = useState(0)
    const scrollRef = useRef();
    const screenWidth = Dimensions.get("window").width;
    const [error, setError] = useState("");

    const displaySaveObject = (id) => {
        if (favMeteoInfos.findIndex(i => i === id) !== -1) {
            // L'object est sauvegardé
            return (
                <Button style={styles.button}
                        onPress={() => unsaveObject(id, dispatch)}
                        title='Retirer des favoris'
                        appearance='ghost'
                        status='info'
                        accessoryLeft={BookmarkIcon}
                        size='medium'
                />
            );
        }
        // L'object n'est pas sauvegardé
        return (
            <Button style={styles.button}
                    onPress={() => saveObject(id, dispatch)}
                    title='Ajouter aux favoris'
                    appearance='ghost'
                    status='info'
                    accessoryLeft={BookmarkOutlineIcon}
                    size='medium'
            />
        );
    }

    useEffect(() => {
        console.log(route);
        (async () => {
            await fetchAllInfo();
            setIsLoading(false);
        })();
    }, []);

    const fetchAllInfo = async() => {
        try {
            const response = await getWeather({"oneCall": route.params.coord});
            response.data.hourly = response.data.hourly.splice(0, 24);
            response.data.daily = response.data.daily.splice(0, 7);
            response.data.name = route.params.name;
            response.data.country = route.params.country;
            response.data.id = route.params.id;
            await setAllInfo(response.data);
        }
        catch (err) {
            setIsError(true);
            setError(err.message);
        }
    }

    const BookmarkIcon = (props) => (
        <Icon {...props} style={[props.style, { width: 32, height: 32 }]} name='bookmark' pack="materialcommunity" />
    );

    const BookmarkOutlineIcon = (props) => (
        <Icon {...props} style={[props.style, { width: 32, height: 32 }]} name='bookmark-outline' pack="materialcommunity" />
    );

    const convertirTimeStampEnHeure = (timestamp, timezone_offset) => {
        return moment
            .unix(timestamp + timezone_offset)
            .subtract(1, "h")
            .format("HH:mm");
    };

    const convertirTimeStampEnJour = (timestamp) => {
        return moment
            .unix(timestamp)
            .format("dddd");
    };

    class PrevisionHoraire extends PureComponent {
        constructor(props) {
            super(props);
            this.heure = convertirTimeStampEnHeure(this.props.item.dt, allInfo.timezone_offset);
            this.icon = getIcon(this.props.item.weather[0].icon);
        }

        render() {
            return (
                <Layout style={{alignItems:"center"}}>
                    <Text>{this.heure}</Text>
                    {this.icon}
                    <Text>{~~this.props.item.temp}°C</Text>
                </Layout>
            );
        }
    }
    class PrevisionJournalière extends PureComponent {
        constructor(props) {
            super(props);
            this.icon = getIcon(this.props.item.item.weather[0].icon);
            this.jour = convertirTimeStampEnJour(this.props.item.item.dt);
        }

        render() {
            return (
                <Layout style={{alignItems:"center", flexDirection:"row"}}>
                    <Layout style={{flex:2, alignItems:"center", flexDirection:"row"}}>
                        <Text>{this.jour}</Text>
                    </Layout>
                    <Layout style={{flex:1, alignItems:"center", flexDirection:"row"}}>
                        {this.icon}
                    </Layout>
                    <Layout style={{flex:1}}/>
                    <Layout style={{flex:1, alignItems:"center", flexDirection:"row"}}>
                        <Icon pack="fontawesomefive" style={{width:16, height:16}} name="umbrella"/>
                        <Text>{~~this.props.item.item.humidity}%</Text>
                    </Layout>
                    <Layout style={{flex:1}}/>
                    <Layout style={{flex:3, alignItems:"center", flexDirection:"row"}}>
                        <Layout style={{flex:1, alignItems:"center", flexDirection:"row"}}>
                            <Icon pack="fontawesomefive" style={{width:16, height:16}} name="long-arrow-alt-down"/>
                            <Text>{~~this.props.item.item.temp.min}°C</Text>
                        </Layout>
                        <Layout style={{flex:1, alignItems:"center", flexDirection:"row"}}>
                            <Icon pack="fontawesomefive" style={{width:16, height:16}} name="long-arrow-alt-up"/>
                            <Text>{~~this.props.item.item.temp.max}°C</Text>
                        </Layout>
                    </Layout>
                </Layout>
            );
        }
    }

    const renderPrevisionHoraire = ({ item }) => {
        return (
            <PrevisionHoraire item={item}/>
        )
    };

    function renderPrevisionJournaliere(item) {
        return (
            <PrevisionJournalière item={item}/>
        )
    }

    const getIcon = (icon_id) => (
        <Image
            style={styles.tinyLogo}
            source={{
                uri: `http://openweathermap.org/img/wn/${icon_id}@4x.png`,
            }}
        />
    )

    const scrollRight = async() => {
        scrollRef.current?.scrollToOffset({offset:scrollOffset + ~~(screenWidth * 0.2), animated: true });
    }
    const scrollLeft = async() => {
        scrollRef.current?.scrollToOffset({offset:scrollOffset - ~~(screenWidth * 0.2), animated: true });
    }
    const ChevronRight = (props) => (
        <Icon {...props} name='chevron-right' pack="feather"/>
    );
    const ChevronLeft = (props) => (
        <Icon {...props} name='chevron-left' pack="feather"/>
    );

    //*
    return (
        <SafeAreaView style={{flex: 1}}>
            {isError ?
                (<DisplayError message={error}/>)
                :
                (isLoading ?
                    (<Layout style={styles.containerLoading}>
                        <Spinner size="giant"/>
                    </Layout>)
                    :
                    <Layout style={{flex: 1, padding: 15}}>
                        <Layout style={{flex: 1, flexDirection: "row", justifyContent:"center", borderWidth: 2, borderColor: 'black'}}>
                            <Layout style={{flex: 5, flexDirection: "row"}}>
                                <Layout>
                                    <Flag
                                        code={allInfo.country}
                                        size={48}
                                    />
                                </Layout>
                                <Layout>
                                    <Text category='h1' status="info">
                                        {allInfo.name}
                                    </Text>
                                </Layout>
                            </Layout>
                            <Layout style={{flex: 1}}>
                                {displaySaveObject(allInfo.id)}
                            </Layout>
                        </Layout>
                        <Layout style={{flex: 1, flexDirection: "row", borderWidth: 2, borderColor: 'black'}}>
                            <Layout style={{flex:1}}>
                                {getIcon(allInfo.current.weather[0].icon)}
                            </Layout>
                            <Layout style={{flex: 1}}>
                                <Text>
                                    {allInfo.current.weather[0].description.charAt(0).toUpperCase() + allInfo.current.weather[0].description.slice(1)}, {allInfo.current.temp}°C
                                </Text>
                            </Layout>
                            <Layout style={{flex: 1}}>
                                <Layout>
                                    <Layout>
                                        <Text>
                                            {allInfo.daily[0].temp.min}°C
                                        </Text>
                                        <Text style={{marginLeft: 20}}>
                                            {allInfo.daily[0].temp.max}°C
                                        </Text>
                                    </Layout>
                                </Layout>

                                <Layout>
                                    <Layout>
                                        <Text>
                                            {allInfo.current.clouds}%
                                        </Text>
                                        <Text style={{marginLeft: 20}}>
                                            {allInfo.current.wind_speed}km/h
                                        </Text>
                                        <Text style={{marginLeft: 20}}>
                                            {allInfo.current.humidity}%
                                        </Text>
                                    </Layout>
                                </Layout>
                            </Layout>
                        </Layout>
                        <Layout style={{flex:2, borderWidth: 2, borderColor: 'black', alignItems:"center", flexDirection:"row"}}>
                            <Layout style={{flex:1}}>

                                <Button
                                    accessoryLeft={ChevronLeft}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',}}
                                    onPress={scrollLeft}
                                />
                            </Layout>
                            <Layout style={{flex:5}}>
                                <List
                                    horizontal={true}
                                    data={allInfo.hourly}
                                    renderItem={(item) => renderPrevisionHoraire(item)}
                                    ref={scrollRef}
                                    onScroll={e=>{
                                        setScrollOffset(e.nativeEvent.contentOffset.x);
                                    }}
                                />
                            </Layout>
                            <Layout style={{flex:1}}>
                                <Button
                                    accessoryLeft={ChevronRight}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',}}
                                    onPress={scrollRight}
                                />
                            </Layout>
                        </Layout>
                        <Layout style={{flex:1}}>
                            <Text>Prévisions 7 jours</Text>
                        </Layout>
                        <Layout style={{flex:3, borderWidth: 2, borderColor: 'black', alignItems:"center", flexDirection:"row"}}>
                            <Layout style={{flex:1}}>
                                <List
                                    data={allInfo.daily}
                                    renderItem={(item) => renderPrevisionJournaliere(item)}
                                />
                            </Layout>
                        </Layout>
                    </Layout>
                )
            }
        </SafeAreaView>
    );

    //*/
};

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
    tinyLogo: {
        width: 64,
        height: 64,
    },
    button: {
        height: 64
    },
});
