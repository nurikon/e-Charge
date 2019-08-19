import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const { width } = Dimensions.get('window');

class LocationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {width, height}= this.props
    const {
        mapcontainer,
        map, 
        locationContainer, 
        adressText,
        distanceText,  
      }=styles


    return (

        <View style={locationContainer}>
            <TouchableOpacity
                activeOpacity={this.props.activeOpacity}
                onPress={this.props.onPress}
                style={[
                    mapcontainer,
                    { width:width, height:height }
                ]}>
                <MapView      
                    liteMode={true}  
                    style={map}       
                    region={this.props.region}
                >
                    <Marker coordinate={this.props.markerCoordinate}/>
                </MapView>
            
            </TouchableOpacity>

            <View 
            style={{alignItems:'center'}}
            >
                <Text style={adressText}>{this.props.adress}</Text>
                {
                    this.props.distanceContainer?
                    <Text style={distanceText}>{this.props.distanceValue} km</Text>
                    : null
                }
                

            </View>
            

        </View>

    );
  }
}

export default LocationContainer;


const styles = StyleSheet.create({

    adressText:{
        textAlign:'center',
        width:width/2.06, 
        borderBottomWidth:0.5, 
        borderColor:'gray', 
        borderRadius:3, 
        padding:width/58.71
    },
    distanceText:{
        width:width/4.11,
        textAlign:'center', 
        borderBottomWidth:0.5, 
        borderColor:'gray', 
        borderRadius:3, 
        padding:width/58.71
    },

    locationContainer:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center', 
        padding:width/27.40,
        borderBottomWidth:1,
        borderColor:'gray'
    },

    mapcontainer:{
        alignItems: 'center',
        justifyContent: 'center', 
        borderWidth:2, 
        borderColor: '#1273de', 
        borderRadius:5,
    },

    map: {
        ...StyleSheet.absoluteFillObject,
    },

  });