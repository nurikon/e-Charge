const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob




const uploadImage = (uri, imageName, mime = 'image/jpg') => {
  return new Promise((resolve, reject) => {
    const uploadUri =  uri
      let uploadBlob = null
      const imageRef = firebaseApp.storage().ref('posts').child(imageName)
      fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}























// import React from 'react';
// import { Image, StyleSheet, Button, Text, View, Alert, } from 'react-native';
// import { ImagePicker } from 'expo';
// import * as firebase from 'firebase';

// export default class HomeScreen extends React.Component {
//   static navigationOptions = {
//     header: null,
//   };

//   onChooseImagePress = async () => {
//     let result = await ImagePicker.launchCameraAsync();
//     //let result = await ImagePicker.launchImageLibraryAsync();

//     if (!result.cancelled) {
//       this.uploadImage(result.uri, "test-image")
//         .then(() => {
//           Alert.alert("Success");
//         })
//         .catch((error) => {
//           Alert.alert(error);
//         });
//     }
//   }

//   uploadImage = async (uri, imageName) => {
//     const response = await fetch(uri);
//     const blob = await response.blob();

//     var ref = firebase.storage().ref().child("images/" + imageName);
//     return ref.put(blob);
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title="Choose image..." onPress={this.onChooseImagePress} />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 50, alignItems: "center", },
// });