import React, { Component } from 'react'
import {View, FlatList, Dimensions } from 'react-native'
import * as geolib from 'geolib'
import { HeaderBackButton } from 'react-navigation';
import LocationContainer from '../components/LocationContainer';

const { width } = Dimensions.get('window');

export class StationListScreen extends Component {
    state={
        stationsWithDistance:[]
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Size en yakın istasyonlar',
            headerStyle:{ backgroundColor: '#1273de'},
            headerTintColor: 'white',
            headerLeft: (HeaderBackButton)
        }
    }

    componentWillMount(){
        const stations = this.props.navigation.getParam('firstTenStation');
        const myLocation = this.props.navigation.getParam('myLocation');
        const stationsWithDistance= []

        stations.map(station =>{
            const distance= geolib.getDistance( myLocation, station);
            station.distance= (distance/1000).toFixed(1);
            stationsWithDistance.push(station);
        })
        this.setState({ stationsWithDistance })
    }


    render() {
        return (
            <View>
                <FlatList
                    data={this.state.stationsWithDistance}
                    renderItem={({item}) => 
                        <LocationContainer
                            onPress={() => this.props.navigation.navigate(
                                'StationScreen',
                                {
                                    stationId:item.stationId, 
                                    imagesLenght:item.imagesLenght
                                }
                            )}
                            width={width/3.73} 
                            height={width/3.73}
                            region={{ 
                                latitude: item.latitude,
                                longitude:item.longitude,
                                latitudeDelta:0.02,
                                longitudeDelta:0.02
                            }}
                            markerCoordinate={{
                                latitude:item.latitude,
                                longitude:item.longitude
                            }}
                            adress={item.adress}
                            distanceContainer={true}
                            distanceValue={item.distance}
                        />
                    }
                />
            </View>
        )
    }
}

export default StationListScreen
