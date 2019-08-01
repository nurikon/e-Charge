// import React, { Component } from 'react';
// import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
// import * as firebase from 'firebase';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import RNFetchBlob from 'react-native-fetch-blob';
// import Dialog, { DialogButton } from 'react-native-popup-dialog';



// export class Deneme extends Component {


// constructor(props) {
//   super(props);
//   this.state = {
//     imagesNumber:'',
//     sendingNumber:'',
//     popVisible: false,
//     images:[],
//     sendingImg:false,
//   }
// }




// //*************************************************************************** */
// //*********************SEND DATA TO FİREBASE********************************* *
//     this.setState({sendingImg:true})
    
//     const stationId= firebase.database().ref('stationList').push().key //firebaseden yeni bir Id oluşturup alıyoruz
//     const uri = this.state.images
//     this.setState({imagesNumber:uri.length})
//     const Blob = RNFetchBlob.polyfill.Blob
//     const fs = RNFetchBlob.fs
//     window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
//     window.Blob = Blob

    
//     if (uri.length === 0){
//       this.setState({sendingImg:false})
//       null
//     }else{
//       uri.forEach((element, index )=> {
//       console.log(element, index)
//       this.setState({sendingNumber:index})
        
//       uploadImage = () => {
//       return new Promise((resolve, reject) => {
//         const pictureNumber = index.toString()
//         const uploadUri =element
//           let uploadBlob = null
//           const imageRef = firebase.storage().ref(stationId).child(pictureNumber)
          
//           fs.readFile(uploadUri, 'base64')
//           .then((data) => {
//             return Blob.build(data, { type: `${'image/jpg'};BASE64` })
//           })
//           .then((blob) => {
//             uploadBlob = blob
//             return imageRef.put(blob, { contentType: 'image/jpg' })
//           })
//           .then(() => {
//             uploadBlob.close()
//             return imageRef.getDownloadURL()
//           })
//           .then((url) => {
//             this.setState({sendingImg:false})
//             console.log(url)
//             resolve(url)
//           })
//           .catch((error) => {
//             console.log(error)
//             reject(error)
//           })
//       })
//     }

//     uploadImage();

//       })
//     }
  

  
  
// //*************************************************************************** */
// //*************************************************************************** */

// imgPickerCamera(){
//   ImagePicker.openCamera({
//     width: 300,
//     height: 400,
//     cropping: true,
//   }).then(image => {
//     const path = image.path
//     const newArray = this.state.images.concat(path)
//     this.setState({images:newArray})});
//     this.setState({popVisible:false})
//     }

// imgPickerGallery(){
//   ImagePicker.openPicker({
//     width: 300,
//     height: 400,
//     cropping: true,
//   }).then(image => {
//     const path = image.path
//      const newArray = this.state.images.concat(path)
//     this.setState({images:newArray})});
//     this.setState({popVisible:false})
// }
// //*************************************************************************** */
// //*************************************************************************** */
//   componentWillMount() {
//   }
// //*************************************************************************** */
// //*************************************************************************** */


//   render() {
    
//     const { 
//       imageScrollView, 
//       imageContainer,
//       sendButton
//       }=styles

// //*************************************************************************** */
// //*************************************************************************** */
//     return (
//       <View style={{flex:1}}>

//         <View style={{flex:1, }}>
//           <View  style={{ height:120}}>

//           <ScrollView horizontal style={imageScrollView}>

//           {this.state.images.map((images, i) =>{ //istasyon verilerinin içinde olduğu marker arrayini mapliyoruz.
//             return(
//               <View key={i} style={imageContainer}> 
//                 <Image style={{flex:1}} source={{uri:images}}/>
//               </View>
//             )})
//           }
//           <TouchableOpacity 
//             style={[{justifyContent: 'center', alignItems:'center',}, imageContainer ]} 
//             onPress={()=> this.setState({popVisible:true})}
//             >
//             <Icon name="add-a-photo" size={50} color="#1273de"/>
//           </TouchableOpacity>

//         </ScrollView>
//           </View>

//           <TouchableOpacity style={sendButton} onPress={()=>this.sendData()}>
//             <Text style={{color:'white'}}>Send to E-Charge</Text>
//           </TouchableOpacity>
//         </View>

//         <Dialog
//           dialogStyle={{justifyContent:'space-evenly'}}
//           width={300} 
//           height={150}
//           visible={this.state.sendingImg}
//           >
//           <ActivityIndicator size="large" color="#0000ff" />
//           <Text>{this.state.sendingNumber}/{this.state.imagesNumber}</Text>
//         </Dialog>

//         <Dialog
//           dialogStyle={{flexDirection:'row', justifyContent:'space-evenly'}}
//           width={300} 
//           height={150}
//           visible={this.state.popVisible}
//           onTouchOutside={() => {
//             this.setState({ popVisible: false });
//           }}
//           >
//           <DialogButton onPress={()=> this.imgPickerGallery()} bordered={true} text='Gallery'/>
//           <DialogButton onPress={()=> this.imgPickerCamera()} bordered={true} text='Camera'/>
//         </Dialog>


//       </View>
//     )
//   }
// }

// export default Deneme;

// const styles = StyleSheet.create({
//   imageScrollView:{
//     paddingTop: 10,
//     paddingLeft: 10,
//     borderBottomWidth:1,
//     borderColor:'gray',
//   },
//   imageContainer:{
//     borderRadius:3, 
//     borderWidth:1, 
//     borderColor:'gray', 
//     width: 75, 
//     height:100,
//     marginRight: 10,
//   },
//   sendButton:{
//     width:200, 
//     height:40, 
//     backgroundColor:'#1273de', 
//     justifyContent:'center', 
//     alignItems:'center', 
//     borderRadius:10, 
//     alignSelf:'center', 
//     marginTop:30
//   },

// });



// alert(
//   'sent this station',
//   [
//     {text: 'OK', onPress:this.props.navigation.goBack()},
//   ]
// )




