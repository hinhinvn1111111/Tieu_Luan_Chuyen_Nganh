import React, { Component } from 'react';
import { 
    View,
    Text,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Platform,
    StatusBar,
    
} from 'react-native';
import {connect} from 'react-redux';
import {DangKi} from '../redux/dispatch';

StatusBar.setHidden(true);
const {width,height} = Dimensions.get('window');

//var icpw = require('../Image/pw.png');

var usn = "";
var pw = "";
var pw2 = "";


var _renderTextInputUSN = ()=>{
    if(Platform.OS == 'android'){
        return <View style={{width:width*0.7,height:height/12,flexDirection:'row',backgroundColor:'rgba(0,0,0,0.3)',justifyContent:'center',alignItems:'center'}}>
            <Image style={{flex:1,width:30,height:40}} source={{uri:'https://png.icons8.com/office/2x/administrator-male.png'}} />
            <TextInput onChangeText={(text)=>usn=text}  underlineColorAndroid={'transparent'} placeholderTextColor={'gray'} placeholder="Nhập tài khoản" style={{flex:4,paddingLeft:10,color:'white',backgroundColor:'rgba(0,0,0,0.3)'}} />
        </View>
    }else{
        return <View style={{width:width*0.7,height:height/12,flexDirection:'row',backgroundColor:'rgba(0,0,0,0.3)'}}>
            <Image style={{flex:1,width:30,height:40}} source={{uri:'https://png.icons8.com/office/2x/administrator-male.png'}} />
            <TextInput onChangeText={(text)=>usn=text} placeholderTextColor={'#fff'} placeholder="" style={{flex:4,paddingLeft:10,backgroundColor:'rgba(0,0,0,0.3)',color:'white'}} />
        </View>
    }
}

var _renderTextInputPW = ()=>{
    if(Platform.OS == 'android'){
        return <View style={{width:width*0.7,height:height/12,flexDirection:'row',backgroundColor:'rgba(0,0,0,0.3)',justifyContent:'center',alignItems:'center'}}>
            <Image style={{flex:1,width:30,height:40}} source={{uri:'https://png.icons8.com/color/2x/password1.png'}} />
            <TextInput secureTextEntry={true} onChangeText={(text)=>pw=text} underlineColorAndroid={'transparent'} placeholderTextColor={'gray'} placeholder="Nhập mật khẩu" style={{flex:4,paddingLeft:10,backgroundColor:'rgba(0,0,0,0.3)',color:'white'}} />
        </View>
    }else{
        return <View style={{width:width*0.7,height:height/12,flexDirection:'row',backgroundColor:'rgba(0,0,0,0.3)',justifyContent:'center',alignItems:'center'}}>
            <Image style={{flex:1,width:30,height:40}} source={{uri:'https://png.icons8.com/color/2x/password1.png'}} />
            <TextInput secureTextEntry={true} onChangeText={(text)=>pw=text} placeholderTextColor={'#fff'} placeholder="" style={{flex:4,paddingLeft:10,backgroundColor:'rgba(0,0,0,0.3)',color:'white'}} />
        </View>    
    }
}

var _renderTextInputPW_NhapLai = ()=>{
    if(Platform.OS == 'android'){
        return <View style={{width:width*0.7,height:height/12,flexDirection:'row',backgroundColor:'rgba(0,0,0,0.3)',justifyContent:'center',alignItems:'center'}}>
            <Image style={{flex:1,width:30,height:40}} source={{uri:'https://png.icons8.com/color/2x/password1.png'}} />
            <TextInput secureTextEntry={true} onChangeText={(text)=>pw2=text} underlineColorAndroid={'transparent'} placeholderTextColor={'gray'} placeholder="Nhập lại mật khẩu" style={{flex:4,paddingLeft:10,backgroundColor:'rgba(0,0,0,0.3)',color:'white'}} />
        </View>
    }else{
        return <View style={{width:width*0.7,height:height/12,flexDirection:'row',backgroundColor:'rgba(0,0,0,0.3)',justifyContent:'center',alignItems:'center'}}>
            <Image style={{flex:1,width:30,height:40}} source={{uri:'https://png.icons8.com/color/2x/password1.png'}} />
            <TextInput secureTextEntry={true} onChangeText={(text)=>pw2=text} placeholderTextColor={'#fff'} placeholder="" style={{flex:4,paddingLeft:10,backgroundColor:'rgba(0,0,0,0.3)',color:'white'}} />
        </View>    
    }
}




class Register extends Component {
    constructor(props){
        super(props);
    }
    static navigationOptions = {
        header:null
      };

    checkUsn(username){
        for(let i of this.props.arrLogin){
            if(username===i.Username){
                return true;
            }
        }
        return false;
    }
    
    checkRegister(){
        if(usn===''||pw===''||pw2===''){
            alert('Bạn không được để trống !');
        }else{
            if(pw !== pw2){
                alert('Mật khẩu nhập lại không đúng !');
            }else{
                if(this.checkUsn(usn)) alert('Username đã tồn tại !');
                else{ 
                    this.props.DangKi(usn,pw);
                    alert('Đăng kí thành công');
                    this.props.navigation.push('LoginScreen');
                }
            }
        }
    }
    render() {
        
        return (
            <View key={1} style={{flex:1,backgroundColor:'#476192',alignItems:'center'}}>
                <View style={{flex:1}}>
                    <Image style={{width:width/6,height:height/10,marginTop:height*0.1,resizeMode:'cover'}}
                        source={{uri:'https://www.vodafone.co.uk/cs/groups/public/documents/webcontent/img_210x210_store_locator.png'}}
                    />
                </View>
                <View style={{flex:4,marginTop:height/10}}>
                    <View style={{flex:3,alignItems:'center',marginTop:30}} >
                        {_renderTextInputUSN()}
                        {_renderTextInputPW()}
                        {_renderTextInputPW_NhapLai()}
                        <View style={{flexDirection:"row",marginTop:40}}>
                            <TouchableOpacity onPress={()=>{this.checkRegister()}} style={{borderRadius:3,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(255,0,0,0.75)',height:height/15,width:width*0.33}}>
                                <Text style={{color:'white'}} >REGISTER</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.props.navigation.push('LoginScreen')}} style={{borderRadius:3,marginLeft:15,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(255,0,0,0.75)',height:height/15,width:width*0.33}}>
                                <Text style={{color:'white'}} >Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state){
    return { 
        arrLogin : state.arrLogin
    };
}

export default connect(mapStateToProps,{DangKi})(Register);