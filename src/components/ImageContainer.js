import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width} = Dimensions.get('window');

class ImageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isButtonVisible:''
    };
  }

  componentDidMount(){
    this.setState({isButtonVisible:this.props.isButtonVisible})
  }

  render() {
    const {imageScrollView, imageContainer}=styles

    return (

        <View>
            <ScrollView horizontal style={imageScrollView}>
                {
                    //istasyon verilerinin içinde olduğu marker arrayini mapliyoruz.
                    this.props.images.map((image, i) =>{
                        return(
                            <TouchableOpacity  key={i} style={imageContainer}>
                                <Image style={{flex:1}} source={{ uri:image }} />
                            </TouchableOpacity>
                        )
                    })
                }
                {this.state.isButtonVisible ?
                    <TouchableOpacity 
                            style={[{justifyContent: 'center', alignItems:'center',}, imageContainer ]} 
                            onPress={this.props.onPress}
                        >
                        <Icon name="add-a-photo" size={width/8.22} color="#1273de"/>
                    </TouchableOpacity>
                : null
                }
            </ScrollView>
        </View> 
    );
  }
}

export default ImageContainer;

const styles = StyleSheet.create({


    imageScrollView:{
      paddingTop: width/41,
      paddingLeft: width/41,
      paddingBottom:width/41,
      borderBottomWidth:1,
      borderColor:'gray',
    },
  
    imageContainer:{
      borderRadius:3, 
      borderWidth:1, 
      borderColor:'gray', 
      width: width*0.183, 
      height:width*0.244,
      marginRight: width/41,
    },

});

