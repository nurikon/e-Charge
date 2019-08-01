import React, { Component } from 'react'
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  TextInput,
  Picker,
  Switch,
  TouchableOpacity
} from 'react-native'
import { HeaderBackButton } from 'react-navigation';
import ImagePicker from 'react-native-image-crop-picker';
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import MyDialogs from '../components/MyDialogs';
import LocationContainer from '../components/LocationContainer';
import ImageContainer from '../components/ImageContainer';


const { width } = Dimensions.get('window');


export class AddStationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sendingImg:false,
      popVisible: false,
      images:[],
      stationName:'',
      phoneNumber:'',
      stationType:'',
      switchValue:false,
      adress:'',
      region: {
        latitude:'',
        longitude: ''
      },
    }
  }

  static navigationOptions = {
    headerTitle: 'Yeni bir istasyon ekleyin',
    headerStyle:{ backgroundColor: '#1273de'},
    headerTintColor: 'white',
    headerLeft: (HeaderBackButton)
  };

  //*************************************************************************** */
  //*********************firebase'e datalar gönderiliyor ********************** */

  sendData(){
    const stationId= firebase.database().ref('stationList').push().key //firebaseden yeni bir Id oluşturup alıyoruz
    const uri = this.state.images
    const {stationName, phoneNumber, stationType, switchValue, adress}=this.state
    const { latitude, longitude}= this.state.region
    this.setState({sendingImg:true})

    firebase.database().ref('stationList/'+ stationId).set({
      stationName, 
      phoneNumber, 
      stationType, 
      switchValue, 
      adress,
      latitude,
      longitude,
      stationId,
      imagesLenght:uri.length

    }).then(()=>{
      if (uri.length === 0){
        this.setState({sendingImg:false})
      }else{
        uri.forEach((element, index )=> {
          this.sendStorage(element, index, stationId);
        })
      }
    }).catch((error)=>{
      alert( 'can not sent') 
    })
  }


  sendStorage = (element, index, stationId) => {
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob

    return new Promise((resolve, reject) => {
      const pictureNumber = index.toString()
      const uploadUri =element
      let uploadBlob = null
      const imageRef = firebase.storage().ref(stationId).child(pictureNumber)

      fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${'image/jpg'};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: 'image/jpg' })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        this.setState({sendingImg:false})
        alert(
          'YENİ BİR İSTASYON EKLEDİNİZ. TEŞEKKÜR EDERİZ..',
          [
            {text: 'OK', onPress:this.props.navigation.goBack()},
          ]
        ) 
        console.log(url)
        resolve(url)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  }

  //*************************************************************************** */
  //**************image picker kamera ve gallery yöneticisi******************** */

  imgPickerCamera(){
    ImagePicker.openCamera({
      width: width/1.37,
      height: width/1.03,
      cropping: true,
    }).then(image => {
      const path = image.path
      const newArray = this.state.images.concat(path)
      this.setState({images:newArray})
    });
    this.setState({popVisible:false})
  }

  imgPickerGallery(){
    ImagePicker.openPicker({
      width: width/1.37,
      height: width/1.03,
      cropping: true,
    }).then(image => {
      const path = image.path
      const newArray = this.state.images.concat(path)
      this.setState({images:newArray})
    });
    this.setState({popVisible:false})
  }

  //*************************************************************************** */
  //*************************componentWillMount******************************** */

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {//burda cihazın mevcut konumu geliyor.
      const latitude=position.coords.latitude
      const longitude=position.coords.longitude
      this.setState({
        region: {
          latitude,
          longitude
        },
      });


      fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=' + 'AIzaSyB9eDSkQshvWtzb06KBxS7rv7wGFjegHeg')
      .then((response) => response.json())
      .then((responseJson) => { //google maps ten adres istiyoruz.
        this.setState({adress:responseJson.results[1].formatted_address})
      })
    },
      (error) => alert(JSON.stringify(error))
    );
  }

  //*************************************************************************** */
  //********************************render************************************* */


  render() {
    const {
      images, 
      phoneNumber, 
      stationName, 
      stationType, 
      switchValue, 
      adress,
      sendingImg,
      popVisible
    }=this.state

    const {
      textInputContainer,
      textInput, 
      selectContainer,
      switchView,
      sendButton
    }=styles

    const longitude = Number(this.state.region.longitude)
    const latitude = Number(this.state.region.latitude)

    //*************************************************************************** */
    //*****************************component************************************* */

    return (
      <View style={{flex:1}}>

        <ImageContainer
          images={images}
          isButtonVisible={true}
          onPress={()=> this.setState({popVisible:true})}
        />

        <View style={textInputContainer}>
          <TextInput
            placeholder='İstasyon Adı'
            style={textInput}
            onChangeText={(text) => this.setState({stationName:text})}
            value={stationName}
          />
          <TextInput
            placeholder='Telefon Numarası'
            style={textInput}
            onChangeText={(text) => this.setState({phoneNumber:text})}
            value={phoneNumber}
            keyboardType={'phone-pad'}
          />
        </View>


        <View style={selectContainer}>
          <Picker
            selectedValue={stationType}
            style={{ height: width/8.22, width: width/2.83, alignSelf:'center'}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({stationType: itemValue})
            }
          >
            <Picker.Item label="Tür Seç" value="0" />
            <Picker.Item label="type-1" value="type-1" />
            <Picker.Item label="type-2" value="type-2" />
            <Picker.Item label="type-3" value="type-3" />
          </Picker>
          <View style={switchView}>
            <Text>Aktif</Text>
            <Switch 
              value={switchValue}
              onValueChange={()=>this.setState({switchValue:!switchValue})}
            />
          </View>
        </View>

        <LocationContainer
          activeOpacity={1}
          region={{                
              latitude,
              longitude,
              latitudeDelta:0.004,
              longitudeDelta:0.004,
              }}
          markerCoordinate={{
              latitude:latitude, 
              longitude:longitude
            }}
          adress={adress}
          width={width/3.16}
          height={width/3.16}
        />

        <TouchableOpacity style={sendButton} onPress={()=>this.sendData()}>
          <Text style={{color:'white'}}>e-Şarj'a Gönder</Text>
        </TouchableOpacity>

        <MyDialogs 
          ActivityIndicatorVisible={sendingImg}
          popVisible={popVisible}
          onPressGallery={()=> this.imgPickerGallery()}
          onPressCamera={()=> this.imgPickerCamera()}
          onTouchOutside={() => {
              this.setState({ popVisible: false });
            }} 
        />

      </View>
    )
  }
}

export default AddStationScreen

const styles = StyleSheet.create({

  textInputContainer:{
    justifyContent:'space-evenly',
    paddingLeft:width/27.40,
    height:width/2.94,
    borderBottomWidth:1,
    borderColor:'gray'
  },

  textInput:{
    paddingBottom:1, 
    height:width/10.28, 
    width:width/1.87, 
    borderColor: 'gray', 
    borderBottomWidth: 0.5, 
    fontSize:width/22.83
  },

  selectContainer:{ 
    flexDirection:'row', 
    justifyContent:'space-between', 
    paddingLeft:width/27.40, 
    paddingRight:width/27.40,
    height:width/3.74,
    borderBottomWidth:1,
    borderColor:'gray'
  },

  switchView:{
    width:width/3.74,
    flexDirection:'row',  
    alignItems:'center', 
    justifyContent:'space-between'
  },

  sendButton:{
    width:width/2.06, 
    height:width/10.28, 
    backgroundColor:'#1273de', 
    justifyContent:'center', 
    alignItems:'center', 
    borderRadius:width/41.1, 
    alignSelf:'center', 
    marginTop:width/13.70
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

});










