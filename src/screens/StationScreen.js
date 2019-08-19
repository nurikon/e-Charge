import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions
} from 'react-native';
import * as firebase from 'firebase';
import { HeaderBackButton } from 'react-navigation';
import { showLocation } from 'react-native-map-link';
import Icon from 'react-native-vector-icons/Ionicons';
import LocationContainer from '../components/LocationContainer';
import ImageContainer from '../components/ImageContainer';


const { width } = Dimensions.get('window');


export class StationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imagesLenght:'',
      storeImg:[],
      stationValue:{
        adress: '',
        latitude:'',
        longitude: '',
        phoneNumber:'',
        stationId: '',
        stationName:'',
        stationType:'',
        switchValue:'',
      }
    }
  }

  
  static navigationOptions = {
    headerTitle:'İstasyon',
    headerStyle:{ backgroundColor: '#1273de'},
    headerTintColor: 'white',
    headerLeft: (HeaderBackButton)
  };

//***************************************************************************************** */
//*****************************HARİTALARDA ROTA OLUŞTURMA********************************** */

//fonk. çalışınca telefonun default navigation app ini açar. ve verilen kordinatlara rota oluşturur.
openLocation(){
  const {latitude, longitude} = this.state.stationValue
  showLocation({ 
    latitude: Number(latitude),
    longitude: Number(longitude),
  })
}

//***************************************************************************************** */
//*******************************COMPONENT WİLL MOUNT************************************** */


componentWillMount(){

    //mapscreenden gelirken stationId ve imagesLenght getiriyoruz ona göre firebasedenistekte bulunacağız
    const stationId = this.props.navigation.getParam('stationId');
    const imagesLenght = this.props.navigation.getParam('imagesLenght');
    this.setState({stationId, imagesLenght}); 

    //stationId ye göre sorgu yapıp istasyonun içeriğini getiriyoruz.
    firebase.database().ref('stationList').orderByChild("stationId").equalTo(stationId).once('value',  snapshot => {
      snapshot.forEach(data =>{
        this.setState({stationValue: data.val()})
      })
    })

    //firebase storage dan istasyon resimlerini getiriyoruz 
    for(i=0; i<imagesLenght; i++)
      {
        const index= i.toString()
        firebase.storage().ref(stationId).child(index).getDownloadURL().then((Response) => {
          const image = Response
          const newArray= this.state.storeImg.concat(image)
          this.setState({storeImg:newArray})
        }).catch(function(error) {
        console.log(error)
        });
      }
  }



//***************************************************************************************** */
//*******************************************RENDER**************************************** */

  render() {
    const {textInfoContainer, textInfo, circleView}=styles
    const { 
      latitude, 
      longitude, 
      adress, 
      stationType, 
      phoneNumber, 
      stationName, 
      switchValue
    }=this.state.stationValue


    return (

      <View style={{flex:1}}>
        <ImageContainer
          images={this.state.storeImg}
        />

        <LocationContainer
          activeOpacity={0.2}
          region={{                
              latitude:Number(latitude),
              longitude:Number(longitude),
              latitudeDelta:0.004,
              longitudeDelta:0.004,
              }}
          markerCoordinate={{
              latitude: Number(latitude), 
              longitude:Number(longitude)
            }}
          adress={adress}
          width={width*0.365}
          height={width*0.365}
          onPress={()=>this.openLocation()}
        />

        <View style={textInfoContainer}>
          <Text style={textInfo}>{stationType}</Text>
          {switchValue ?
            <View style={{flexDirection:'row',  alignItems:'center'}}>
              <View style={[circleView, {backgroundColor:'green'}]}/>
              <Text style={textInfo} >Aktif</Text>
            </View>
            :
            <View style={{flexDirection:'row',  alignItems:'center',}}>
              <View style={[circleView, {backgroundColor:'gray'}]}/>
              <Text style={textInfo} >Kapalı</Text>
            </View>
          }
        </View>


        <View style={textInfoContainer}>
          <TouchableOpacity 
            style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} 
            onPress={()=> Linking.openURL(`tel:${phoneNumber}`)}>

            <Icon name="md-call" style={{marginRight:5}} size={width/13.7} color="black"/>
            <Text style={textInfo}>{phoneNumber}</Text>

          </TouchableOpacity> 
          
          <Text style={textInfo}>{stationName}</Text>
        </View> 


      </View>
    )
  }
}

export default StationScreen

const styles = StyleSheet.create({

  textInfoContainer:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-evenly',
    height:width*0.196,
    borderBottomWidth:1,
    borderColor:'gray'
  },

  textInfo:{
    textAlign:'center', 
    borderColor: 'gray', 
    borderBottomWidth: 0.5, 
    fontSize:width/22.83,
    paddingBottom:1, 
  },

  circleView:{ 
    width:width/20.55, 
    height:width/20.55, 
    borderRadius:width/41.1,
    marginRight:width/41.1
  },

});





 