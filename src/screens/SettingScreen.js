import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width} = Dimensions.get('window');

export class SettingsScreen extends Component {
  render() {
    return (
        <View style={{flex:1}}>
          <View style={{height: width/7.47, backgroundColor: '#1273de', paddingLeft:width/27.4, justifyContent:'center'}}>
             <AntDesign 
              name="arrowleft" 
              color="white" 
              style={{fontSize: width/16.44, width:width/16.44}}
              onPress={()=>this.props.navigation.goBack()} />
          </View>
          <Text> SettingsScreen </Text>
         
        </View>
    )
  }
}
export default SettingsScreen;









  