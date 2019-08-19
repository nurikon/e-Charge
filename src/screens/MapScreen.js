import React, { Component } from 'react';
import {  
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  Dimensions,
} from 'react-native';
import * as firebase from 'firebase';
import * as geolib from 'geolib'
import MapView, {Marker} from 'react-native-maps';
import RightIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MarkerIcon from 'react-native-vector-icons/FontAwesome5';


const { width } = Dimensions.get('window');


class MapScreen extends Component {
  state={
    markerIcon:'',
    stations:[],
    myLocation: {
      latitude:'',
      longitude: ''
    }, 
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'e Şarj',
      headerStyle:{ backgroundColor: '#1273de'},
      headerRight: (
        <RightIcon 
          onPress={navigation.getParam('goToListScreen')}
          style={{marginRight:width*0.025}}
          name="ios-list-box" 
          size={width*0.085}
          color="white"
        />
      )
    }
  }


  _goToListScreen=()=>{
    const myLocation= this.state.myLocation
    const stations=this.state.stations
    //istasyonlar yakından uzağa sıralanıyor
    const orderStations= geolib.orderByDistance(myLocation, stations);
   
    //en yakın 7 istasyonu alıyoruz.
    let firstTenStation = []
    if(orderStations.length<10){
      for(i=0; i<orderStations.length; i++ ){
        firstTenStation.push(orderStations[i])
      }
    }else{
      for(i=0; i<10; i++ ){
        firstTenStation.push(orderStations[i])
      }
    }

    this.props.navigation.navigate(
      'ListScreen',
      {
        firstTenStation,
        myLocation
      }
    )
  }

//***************************************************************************************** */
//*******************************COMPONENT DİD MOUNT************************************** *

  componentWillMount() {

    //marker iconları için uri alınıyor
    MarkerIcon.getImageSource('charging-station', width*0.075, 'green')
    .then((source)=>   
      this.setState({ markerIcon: source.uri })
    );
    
    //cihazın mevcut konumu alınıyor.
    navigator.geolocation.getCurrentPosition((position) => {  
        const {latitude, longitude}= position.coords
        this.setState({
          myLocation: { latitude, longitude }
          })
        },
      (error) => {//konuma erişemezse error çalışır
      alert('Lütfen telefonunuzun konum verisini açtıktan sonra uygulamayı yeniden başlatınız')    
      }
    );

    //firebase database'den tüm istasyonların json arrayi geliyor.
    firebase.database().ref('stationList').once('value').then(snapshot => {
      const stations=Object.values(snapshot.val())
      this.setState({stations})
    })

    //headerRight butonuyla bir fonksiyon çalıştırmak için 
    //getParam ile header dan buraya set param ile buradan fonksiyona yönlendirme yapıyoruz.
    this.props.navigation.setParams({ goToListScreen: this._goToListScreen});
  }

//***************************************************************************************** */
//*******************************************RENDER**************************************** */


  render() {
    const {markerIcon, stations }= this.state
    const {latitude, longitude} = this.state.myLocation
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
            latitudeDelta:0.2, //delta haritaya zoom yapma değeri
            longitudeDelta:0.2
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
              myLocation: {
                latitude,
                longitude,
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
