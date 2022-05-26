
import React from 'react';
import {View,Text,Image, FlatList} from 'react-native';
import {ToasterCompat,Achromatomaly} from 'react-native-image-filter-kit';
// import ImagePicker from 'react-native-image-crop-picker';
// import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';

// import { GooglePlacesAutocomplete ,GoogleAutoComplete} from 'react-native-google-places-autocomplete';
const imageStyle = { width: 320, height: 320 }
const atx = (
    <Image
      style={imageStyle}
      source={{ uri: 'https://una.im/CSSgram/img/atx.jpg' }}
      resizeMode={'contain'}
    />
  )
  const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
  const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
   
class Testing extends React.Component{
    state={
        data:'',Img:[{name:"sd",class:"sdsds"},{name:"sd",class:"sdsds"},{name:"sd",class:"sdsds"},{name:"sd",class:"sdsds"},{name:"sd",class:"sdsds"}]
    }
  // GooglePlacesInput = () => {
  //     return (
       
  //     );
  //   }
  componentDidMount(){
    // ImagePicker.openPicker({
  
    // }).then(response => {
    //   console.log("wdsdwd",response)
    //   this.setState({Img:response.path})
    // })
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

   
  }
 

    render(){
       
        return(
           <View>
              {/* <Image style={{width:50,height:50}} source={{uri :this.state.Img}} />
               */}
             <FlatList onEndReachedThreshold={0.5}
                onEndReached={({ distanceFromEnd }) => {
                   console.log("iahdihdji")
                }}
                ref='_flatList' style={{height:50,alignSelf:'center'}}  data={this.state.Img} renderItem={({item,index})=>{
               return(
               <Text>{item.name}</Text>
               )
             }} />
             

           </View>
        )
    }
}

const mapStateToProps = (state) => ({
  // FbAccessToken:state.auth.FbAccessToken,
  // user_token : state.auth.user_token,
  // user_id: state.auth.user_id,
  // isLoading : state.add_post.isLoading,
});

const mapDispatchToProps = {
 
}

export default connect(mapStateToProps, mapDispatchToProps)(Testing);