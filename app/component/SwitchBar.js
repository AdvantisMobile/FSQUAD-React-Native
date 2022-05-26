// **************************************
// **************************************
// **************************************
// // Devloped by Manish Garkar 
//    Team :- tek4pro it solutions 
// // Mr Abhishek Gupta //
// **************************************
// **************************************
// **************************************


import React from 'react';
import {TouchableOpacity,Image} from 'react-native';
const colorYellow = "#FDBA12";

class Manish extends React.Component{
    render(){
        return(
            <TouchableOpacity onPress={this.props.onPress} style={{width:40,height:20,marginTop:6,backgroundColor:this.props.color ,borderRadius:20,alignItems: this.props.position == "left" ? 'flex-start' : 'flex-end'}} >
              <Image style={{width:20,height:20}} source={this.props.source} />
           </TouchableOpacity>
        )
    }
}

export default Manish;