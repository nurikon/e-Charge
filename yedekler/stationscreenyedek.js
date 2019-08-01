// import React, { Component } from 'react'
// import {  View, Text, StyleSheet, TouchableOpacity, Linking, Image} from 'react-native'
// import { HeaderBackButton } from 'react-navigation';
// import MapView, {Marker} from 'react-native-maps';
// import { showLocation } from 'react-native-map-link';
// import * as firebase from 'firebase';
// import Icon from 'react-native-vector-icons/Ionicons';

// export class StationScreen extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       img:'',
//       images:[image1='1',image2='2',image3='3', image4='4',image5='5'],
//       stationValue:{
//         adress: '',
//         latitude:'',
//         longitude: '',
//         phoneNumber:'',
//         stationId: '',
//         stationName:'',
//         stationType:'',
//         switchValue:''
//       }
//     }
//   }


//   static navigationOptions = {
//     headerTitle: 'stationScreen',
//     headerStyle:{ backgroundColor: '#1273de'},
//     headerTintColor: 'white',
//     headerLeft: (HeaderBackButton)
//   };


// //***************************************************************************************** */
// //*****************************HARİTALARDA ROTA OLUŞTURMA********************************** */


// openLocation(){
//   const {latitude, longitude} = this.state.stationValue
//   showLocation({ //fonk. çalışınca telefonun default navigation app ini açar. ve verilen kordinatlara rota oluşturur.
//     latitude: Number(latitude),
//     longitude: Number(longitude),
//   })
// }


// //***************************************************************************************** */
// //*******************************COMPONENT WİLL MOUNT************************************** */


// componentWillMount(){

//   const stationId = this.props.navigation.getParam('stationId');
//   this.setState({stationId}); //mapscreenden gelirken stationId yi getiriyoruz ona göre firebaseden veri çekeceğiz

//   firebase.database().ref('stationList').orderByChild("stationId").equalTo(stationId).once('value',  snapshot => {
//     snapshot.forEach(data =>{ //stationId ye göre sorgu yapıp istasyonun içeriğini getiriyoruz.
//       this.setState({stationValue: data.val()}) //gelen istasyon verisini satate'e set ediyoruz.  
//   })})

//   firebase.storage().ref('-Lkikq3xCRkhQxHMgNho').child('1').getDownloadURL().then((Response) => {
//     this.setState({img: Response})
//   }).catch(function(error) {
  
//   });

//   // const ref = firebase.storage().ref('-Lkikq3xCRkhQxHMgNho').getDownloadURL();
//   // console.log(ref)
//   // const ref = firebase.storage().ref(stationId)
//   // console.log(ref)
// }


// //***************************************************************************************** */
// //*******************************************RENDER**************************************** */

// render() {
//   console.log(this.state.img)
//   const {
//     upperImageContainer,
//     imageContainer,
//     addImageText,
//     locationContainer,
//     mapcontainer,  
//     map,
//     adressText,
//     textInfo,
//     textInfoContainer,
//     circleView
//     }=styles

//   const { 
//     latitude, 
//     longitude, 
//     adress, 
//     stationType, 
//     phoneNumber, 
//     stationName, 
//     switchValue
//   }=this.state.stationValue

//   return (
//     <View style={{flex:1}}>


//       <View style={upperImageContainer}>
//           {/* {this.state.images.map((images, i) =>{ //istasyon verilerinin içinde olduğu marker arrayini mapliyoruz.
//             return(
//               <TouchableOpacity key={i} style={imageContainer}> 
//                 <Text style={addImageText}>{images}</Text>
//               </TouchableOpacity>
//           )})}   */}
//           <TouchableOpacity style={imageContainer}> 
//               <Image style={{flex:1}} source={{ uri: this.state.img }} />
//           </TouchableOpacity>
//       </View>


//       <View style={locationContainer}>
//         <TouchableOpacity onPress={()=>this.openLocation()} style={mapcontainer}>
//           <MapView      
//             liteMode={true} //harita görünmünü sabitliyor. bu sayede resim gibi oluyor.   
//             style={map}       
//             region={{                
//               latitude:Number(latitude),   
//               longitude:Number(longitude),    
//               latitudeDelta:0.004,    
//               longitudeDelta:0.004,
//             }}
//           >
//             <Marker
//               coordinate={{
//                 latitude: Number(latitude),
//                 longitude: Number(longitude),
//               }}
//             />
//           </MapView>
//         </TouchableOpacity>
//         <Text style={adressText}>
//           {adress}
//         </Text>
//       </View>


//       <View style={textInfoContainer}>
//         <Text style={textInfo}>{stationType}</Text>
//         {switchValue ?
//         <View style={{flexDirection:'row',  alignItems:'center',}}>
//           <View style={[circleView, {backgroundColor:'green'}]}/><Text style={textInfo} >Active</Text>
//         </View>
//           :
//         <View style={{flexDirection:'row',  alignItems:'center',}}>
//         <View style={[circleView, {backgroundColor:'gray'}]}/><Text style={textInfo} >Deactive</Text>
//         </View>
//         }
//       </View>


//       <View style={textInfoContainer}>
//         <TouchableOpacity style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} onPress={()=> Linking.openURL(`tel:${phoneNumber}`)}>   
//           <Icon name="md-call" style={{marginRight:5}} size={30} color="black"/>
//           <Text style={textInfo}>{phoneNumber}</Text>
//         </TouchableOpacity> 
//         <Text style={textInfo}>{stationName}</Text>
//       </View>


//     </View>
//   )
// }
// }



// export default StationScreen

// const styles = StyleSheet.create({
// map: {
//   ...StyleSheet.absoluteFillObject,
// },
// upperImageContainer:{
//   justifyContent:'center', 
//   alignItems:'center',
//   flexDirection:'row',
//   paddingTop: 15,
//   paddingBottom:15,
//   borderBottomWidth:1,
//   borderColor:'gray',
// },
// imageContainer:{
//   width: 75, 
//   height:100,
//   margin:3,
//   borderWidth:1,
//   borderRadius:3,
//   borderColor:'gray', 
// },
// mapcontainer:{
//   width:150, 
//   height: 150,
//   alignItems: 'center',
//   justifyContent: 'center', 
//   borderWidth:2, 
//   borderColor: '#1273de', 
//   borderRadius:5,
// },
// textInfoContainer:{
//   alignItems:'center',
//   flexDirection:'row',
//   justifyContent:'space-evenly',
//   height:80,
//   borderBottomWidth:1,
//   borderColor:'gray'
//   },
// textInfo:{
//   textAlign:'center', 
//   borderColor: 'gray', 
//   borderBottomWidth: 0.5, 
//   fontSize:18,
//   paddingBottom:1, 
// },
// circleView:{ 
//     width:20, 
//     height:20, 
//     borderRadius:10,
//     marginRight:10
// },
// locationContainer:{
//     flexDirection:'row', 
//     justifyContent:'space-between', 
//     alignItems:'center', 
//     padding:15,
//     borderBottomWidth:1,
//     borderColor:'gray'
//   },
 
 
// adressText:{
//     textAlign:'center',
//     width:200, 
//     borderBottomWidth:0.5, 
//     borderColor:'gray', 
//     borderRadius:3, 
//     padding:7
//   },
// addImageText:{
//   flex:1,
//   textAlign:'center', 
//   textAlignVertical:'center'
// },
//   selectContainer:{ 
//     flexDirection:'row', 
//     justifyContent:'space-between', 
//     paddingLeft:15, 
//     paddingRight:15,
//     height:110,
//     borderBottomWidth:1,
//     borderColor:'gray'
//     },

// });





 