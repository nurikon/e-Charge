import React, { Component } from 'react';
import { Dimensions, View, ActivityIndicator } from 'react-native';
import Dialog, { DialogButton } from 'react-native-popup-dialog';

const { width} = Dimensions.get('window');

export class MyDialogs extends Component {
    render() {
        return (
            <View>
                <Dialog
                    dialogStyle={{justifyContent:'space-evenly'}}
                    width={width/1.37} 
                    height={width/2.74}
                    visible={this.props.ActivityIndicatorVisible}
                >
                    <ActivityIndicator size="large" color="#0000ff" />
                </Dialog>


                <Dialog
                    dialogStyle={{flexDirection:'row', justifyContent:'space-evenly'}}
                    width={width/1.37} 
                    height={width/2.74}
                    visible={this.props.popVisible}
                    onTouchOutside={this.props.onTouchOutside}
                    >
                    <DialogButton onPress={this.props.onPressGallery} bordered={true} text='Gallery'/>
                    <DialogButton onPress={this.props.onPressCamera} bordered={true} text='Camera'/>
                </Dialog>
            </View>
        )
    }
}

export default MyDialogs
