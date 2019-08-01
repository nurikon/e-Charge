import React, { Component } from 'react';
import {  
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import * as firebase from 'firebase';
import MapView, {Marker} from 'react-native-maps';
import RightIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MarkerIcon from 'react-native-vector-icons/FontAwesome5';


const { width, height} = Dimensions.get('window');


class MapScreen extends Component {
  state={
    markerIcon:'',
    stations:[],
    region: {
      latitude:'',
      longitude: '',
      latitudeDelta:'',
      longitudeDelta:''
    }, 
  }

  static navigationOptions = {
    headerTitle: 'e Şarj',
    headerStyle:{ backgroundColor: '#1273de'},
    headerRight: (
      <RightIcon 
        onPress={() => alert('This is a button!')}
        style={{marginRight:width*0.025}}
        name="ios-list-box" 
        size={width*0.085}
        color="white"
      />
    )
  }

//***************************************************************************************** */
//*******************************COMPONENT DİD MOUNT************************************** *

  componentDidMount() {
    //cihazın mevcut konumu alınıyor.
    navigator.geolocation.getCurrentPosition(
      (position) => {  
        const {latitude, longitude}= position.coords
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta:0.2,
            longitudeDelta:0.2}
          })
        },
      (error) => {//konuma erişemezse error çalışır
      alert('Lütfen telefonunuzun konum verisini açtıktan sonra uygulamayı yeniden başlatınız')    
      }
    );

    //marker iconları için uri alınıyor
    MarkerIcon.getImageSource('charging-station', width*0.075, 'green')
    .then((source)=>   
      this.setState({ markerIcon: source.uri })
    );

    //firebase database'den tüm istasyonların json arrayi geliyor
    firebase.database().ref('stationList').once('value').then(snapshot => {
      this.setState({stations:Object.values(snapshot.val())})
    })
  }

//***************************************************************************************** */
//*******************************************RENDER**************************************** */


  render() {
    const {markerIcon, stations }= this.state
    const {latitude, longitude, longitudeDelta, latitudeDelta } = this.state.region
    const {myLocationSet, addStationIcon}= styles

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          showsMyLocationButton={true}
          showsUserLocation={true}
          region={{  //region; map açılış anı için merkez nokta değerleri
            latitude:Number(latitude),
            longitude:Number(longitude),
            latitudeDelta:Number(latitudeDelta), //delta haritaya zoom yapma değeri
            longitudeDelta:Number(longitudeDelta),
          }}
        >

          {
            stations.map((stations) =>{//istasyon verilerinin içinde olduğu marker arrayini mapliyoruz.
              return  <Marker
                image={markerIcon}
                key={stations.stationId}
                title={stations.stationName}
                description={stations.stationType}
                coordinate={{
                  latitude:Number(stations.latitude),
                  longitude: Number(stations.longitude),
                }}
                onCalloutPress={() => this.props.navigation.navigate(
                  'StationScreen',
                  {
                    stationId: stations.stationId, 
                    imagesLenght:stations.imagesLenght
                  }
                )}
              />
            })
          }

        </MapView>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AddStationScreen')}
          style={addStationIcon}
        >
          <Icon name="add-location" size={width*0.13} color="#1273de"/>
          <Text style={{color:'#1273de'}}>İstasyon ekle</Text>
        </TouchableOpacity> 

        <TouchableOpacity
            onPress={()=> this.setState({
              region: {
                latitude,
                longitude,
                latitudeDelta,
                longitudeDelta
              }
              })
            }
            style={myLocationSet}
        >
          <Icon name="my-location" size={width*0.09} color="black"/>
        </TouchableOpacity> 

      </View>
    );
  }
}
  
export default MapScreen;

const styles = StyleSheet.create({

  myLocationSet:{
    justifyContent:'center',
    alignItems:'center',
    position: 'absolute',
    bottom: '4%',
    left:'2%'
  },

  addStationIcon:{
    justifyContent:'center',
    alignItems:'center',
    position: 'absolute',
    bottom: '2%',
    right:'2%'
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

});
