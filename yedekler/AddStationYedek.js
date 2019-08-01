import React, { Component } from 'react'
import { Dimensions , View, StyleSheet, Text, TextInput, Picker, Switch, TouchableOpacity, Image, ScrollView } from 'react-native'
import { HeaderBackButton } from 'react-navigation';
import MapView, {Marker} from 'react-native-maps';
import ImagePicker from 'react-native-image-crop-picker';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dialog, { DialogButton } from 'react-native-popup-dialog';
import RNFetchBlob from 'react-native-fetch-blob'


const { width, height} = Dimensions.get('window');

export class AddStationScreen extends Component {


constructor(props) {
  super(props);
  this.state = {
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
    headerTitle: 'AddStationScreen',
    headerStyle:{ backgroundColor: '#1273de'},
    headerTintColor: 'white',
    headerLeft: (HeaderBackButton)
  };


//*************************************************************************** */
//*********************SEND DATA TO FİREBASE********************************* */
  sendData(){
    const stationId= firebase.database().ref('stationList').push().key //firebaseden yeni bir Id oluşturup alıyoruz

    const {stationName, phoneNumber, stationType, switchValue, adress}=this.state
    const { latitude, longitude}= this.state.region
      firebase.database().ref('stationList/'+ stationId).set({
          stationName, 
          phoneNumber, 
          stationType, 
          switchValue, 
          adress,
          latitude,
          longitude,
          stationId
      }).then((data)=>{
        alert(
          'sent this station',
          [
            {text: 'OK', onPress:this.props.navigation.goBack()},
          ]
        ) 
      }).catch((error)=>{
        alert( 'can not sent') 
      })
  }
//*************************************************************************** */
//*************************************************************************** */
imgPickerCamera(){
  ImagePicker.openCamera({
    width: 300,
      height: 400,
    cropping: true,
  }).then(image => {
    const path = image.path
    const newArray = this.state.images.concat(path)
    this.setState({images:newArray})});
    this.setState({popVisible:false})
    }

imgPickerGallery(){
  ImagePicker.openPicker({
    width: 300,
     height: 400,
    cropping: true,
  }).then(image => {
    const path = image.path
    const newArray = this.state.images.concat(path)
    this.setState({images:newArray})});
    this.setState({popVisible:false})
}
//*************************************************************************** */
//*************************************************************************** */
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {  //burda cihazın mevcut konumu geliyor.
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
            .then((responseJson) => {
              this.setState({adress:responseJson.results[1].formatted_address})
            })},
      (error) => alert(JSON.stringify(error))
    );
  }
//*************************************************************************** */
//*************************************************************************** */


  render() {
    const {
      images, 
      phoneNumber, 
      stationName, 
      stationType, 
      switchValue, 
      adress
    }=this.state
    
    const {
      textInput, 
      mapcontainer, 
      imageScrollView, 
      map, 
      locationContainer, 
      adressText,  
      imageContainer,
      textInputContainer,
      selectContainer,
      sendButton
      }=styles
    const longitude = Number(this.state.region.longitude)
    const latitude = Number(this.state.region.latitude)

//*************************************************************************** */
//*************************************************************************** */
    return (
      <View style={{flex:1}}>

      <View  style={{ height:120}}>
        <ScrollView horizontal style={imageScrollView}>

          {images.map((images, i) =>{ //istasyon verilerinin içinde olduğu marker arrayini mapliyoruz.
            return(
              <View key={i} style={imageContainer}> 
                <Image style={{flex:1}} source={{uri:images}}/>
              </View>
            )})
          }
          <TouchableOpacity 
            style={[{justifyContent: 'center', alignItems:'center',}, imageContainer ]} 
            onPress={()=> this.setState({popVisible:true})}
            >
            <Icon name="add-a-photo" size={50} color="#1273de"/>
          </TouchableOpacity>

        </ScrollView>
      </View>


        <View style={textInputContainer}>
          <TextInput
            placeholder='Station Name'
            style={textInput}
            onChangeText={(text) => this.setState({stationName:text})}
            value={stationName}
          />
           <TextInput
            placeholder='Phone Number'
            style={textInput}
            onChangeText={(text) => this.setState({phoneNumber:text})}
            value={phoneNumber}
            keyboardType={'phone-pad'}
          />
        </View>


        <View style={selectContainer}>
          <Picker
            selectedValue={stationType}
            style={{ height: 50, width: 145, alignSelf:'center'}}
            onValueChange={(itemValue, itemIndex) =>
            this.setState({stationType: itemValue})
          }>
            <Picker.Item label="select Type" value="0" />
            <Picker.Item label="type-1" value="type-1" />
            <Picker.Item label="type-2" value="type-2" />
            <Picker.Item label="type-3" value="type-3" />
          </Picker>
          <View style={{width:110,flexDirection:'row',  alignItems:'center', justifyContent:'space-between'}}>
            <Text>Active</Text>
            <Switch 
            value={switchValue}
            onValueChange={()=>this.setState({switchValue:!switchValue})}
            />
          </View>
        </View>


        <View style={locationContainer}>
            <View style={mapcontainer}>
              <MapView      
                liteMode={true}  
                style={map}       
                region={{                
                  latitude:latitude,
                  longitude:longitude,
                  latitudeDelta:0.004,
                  longitudeDelta:0.004,
                }}
              >
                <Marker 
                coordinate={{
                  latitude:latitude, 
                  longitude:longitude
                }}/>
              </MapView>
            </View>

            <Text style={adressText}>
            {adress}
            </Text>
        </View>


        <TouchableOpacity style={sendButton} onPress={()=>this.sendData()}>
          <Text style={{color:'white'}}>Send to E-Charge</Text>
        </TouchableOpacity>


        <Dialog
          dialogStyle={{flexDirection:'row', justifyContent:'space-evenly'}}
          width={300} 
          height={150}
          visible={this.state.popVisible}
          onTouchOutside={() => {
            this.setState({ popVisible: false });
          }}
          >
          <DialogButton onPress={()=> this.imgPickerGallery()} bordered={true} text='Gallery'/>
          <DialogButton onPress={()=> this.imgPickerCamera()} bordered={true} text='Camera'/>
        </Dialog>

      </View>
    )
  }
}

export default AddStationScreen

const styles = StyleSheet.create({
  imageScrollView:{
    paddingTop: 10,
    paddingLeft: 10,
    borderBottomWidth:1,
    borderColor:'gray',
    
  },
  locationContainer:{
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center', 
    padding:15,
    borderBottomWidth:1,
    borderColor:'gray'
  },
  mapcontainer:{
    width:130, 
    height: 130,
    alignItems: 'center',
    justifyContent: 'center', 
    borderWidth:2, 
    borderColor: '#1273de', 
    borderRadius:5,
  },
  textInput:{
    paddingBottom:1, 
    height:40, 
    width:220, 
    borderColor: 'gray', 
    borderBottomWidth: 0.5, 
    fontSize:18
  },
  adressText:{
    textAlign:'center',
    width:200, 
    borderBottomWidth:0.5, 
    borderColor:'gray', 
    borderRadius:3, 
    padding:7
  },
  imageContainer:{
    borderRadius:3, 
    borderWidth:1, 
    borderColor:'gray', 
    width: 75, 
    height:100,
    marginRight: 10,
  },
addImageText:{
  fontSize: 13,
  flex:1,
  textAlign:'center', 
  textAlignVertical:'center'
},
textInputContainer:{
  justifyContent:'space-evenly',
  paddingLeft:15,
  height:140,
  borderBottomWidth:1,
  borderColor:'gray'
  },
  selectContainer:{ 
    flexDirection:'row', 
    justifyContent:'space-between', 
    paddingLeft:15, 
    paddingRight:15,
    height:110,
    borderBottomWidth:1,
    borderColor:'gray'
    },
    sendButton:{
      width:200, 
      height:40, 
      backgroundColor:'#1273de', 
      justifyContent:'center', 
      alignItems:'center', 
      borderRadius:10, 
      alignSelf:'center', 
      marginTop:30
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
});






