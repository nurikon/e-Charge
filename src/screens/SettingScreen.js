import React, { Component } from 'react';
import { Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export class SettingsScreen extends Component {
  render() {
    return (
        <View style={{flex:1}}>
          <View style={{height: 60, backgroundColor: '#1273de', paddingLeft:15, justifyContent:'center'}}>
             <AntDesign 
              name="arrowleft" 
              color="white" 
              style={{fontSize: 25, width:25}}
              onPress={()=>this.props.navigation.goBack()} />
          </View>
          <Text> SettingsScreen </Text>
         
        </View>
    )
  }
}
export default SettingsScreen;









  