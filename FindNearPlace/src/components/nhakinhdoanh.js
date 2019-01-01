import React, { Component } from 'react';
import { 
    View,
    Text,
    Modal,
    TouchableHighlight,
    PanResponder
} from 'react-native';
import {ID,usn,pw,Avartar,ID_Role,Sex,Email} from './login';
import {ID_RoleP} from './profile';
import RNGooglePlaces from 'react-native-google-places';

arrLocations=[];

export default class Nhakinhdoanh extends Component {
  
  _check(){
    
    try{
        fetch('http://192.168.40.2:8888/Tieu_Luan_Chuyen_Nganh/Server/CheckPlace.php',{
        method:'POST',
        body:JSON.stringify({
          Username : usn,
            
        })
        })
        .then((response)=>response.json())
        .then((responsiveJSON)=>{
            for(let i of responsiveJSON){
                //
                //alert(i.ID);
                arrLocations.push(i);
            }
        })
        .catch((e)=>{
            alert(e);
        })
    }catch{

    }
  
  }

  
  componentWillMount(){
    this._check();
    //alert(ID_Role);
  }

  _render(){
    if(ID_RoleP==1){
      return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:18,color:'red',textAlign:'center'}}>Bạn phải nâng cấp tài khoản để sử dụng chức năng này</Text>
        </View>
      )
    }
    else if(arrLocations.length ==0){
      return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <Text onPress={()=>this.props.navigation.push('addPlace')} style={{fontSize:30,color:'red'}}>Thêm địa điểm ?</Text>
        </View>
      )
    }
    
    else{ return(
        <View style={{flex:1,backgroundColor:'blue'}}>
          <Text>aaaaaaaaaaaaaaaaaa</Text>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this._render()}
      </View>
    );
  }
}