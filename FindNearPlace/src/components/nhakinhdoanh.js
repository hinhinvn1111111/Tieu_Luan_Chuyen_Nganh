import React, { Component } from 'react';
import { 
    View,
    Text,
    Modal,
    TouchableHighlight,
    PanResponder,
    YellowBox
} from 'react-native';
import {ID,usn,pw,Avartar,ID_Role,Sex,Email} from './login';
import {ID_RoleP} from './profile';
import RNGooglePlaces from 'react-native-google-places';
import {connect} from 'react-redux';
import {DangNhap} from '../redux/dispatch';
import Place_NhaKinhDoanh from './place_nhakinhdoanh';

YellowBox.ignoreWarnings(['Require cycle:']);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);
console.disableYellowBox=true;

class Nhakinhdoanh extends Component {
  constructor(props){
    super(props);
    this.state = {
      id_role : 0,
      key : 0,
      arrCheckLG : []
    }
  }
  _check(){
    arrLocations=[];
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
    arr = [];
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
              arr.push(i);
              this.setState({arrCheckLG:arr});
          }
      })
      .catch((e)=>{
          alert(e);
      })
    }catch{

    }
    
  }

  _render(){

    if(ID_Role==1){
      return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:18,color:'red',textAlign:'center'}}>Bạn phải nâng cấp tài khoản để sử dụng chức năng này</Text>
        </View>
      )
    }
    else {
      //alert(this.state.arrCheckLG.length);
      if(this.state.arrCheckLG.length === 0){
        return(
          <View key={this.props.key} style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text onPress={()=>this.props.navigation.push('addPlace')} style={{fontSize:30,color:'red'}}>Thêm địa điểm ?</Text>
          </View>
        )
      }
      else{
        
          this.props.navigation.navigate('place_nhakinhdoanh');
        
      }
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
function mapStateToProps(state){
  return { 
      arrLG : state.arrLogin,
      key1 : state.changIDViewMap
  };
}

export default connect(mapStateToProps,{DangNhap})(Nhakinhdoanh);