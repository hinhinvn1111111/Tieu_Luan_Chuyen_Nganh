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
    YellowBox
} from 'react-native';
import {connect} from 'react-redux';
import {DangNhap} from '../redux/dispatch';
YellowBox.ignoreWarnings(['Require cycle:']);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

StatusBar.setHidden(true);
const {width,height} = Dimensions.get('window');
//var icpw = require('../Image/pw.png');

export var usn = "";
export var pw = "";
export var ID = "";
export var Avartar = "";
export var ID_Role = "";
export var Sex = "";
export var Email = "";


var _renderTextInputUSN = ()=>{
    if(Platform.OS == 'android'){
        return <View style={{width:width*0.7,height:height/12,flexDirection:'row',backgroundColor:'rgba(0,0,0,0.3)',justifyContent:'center',alignItems:'center'}}>
            <Image style={{flex:1,width:30,height:40}} source={{uri:'https://png.icons8.com/office/2x/administrator-male.png'}} />
            <TextInput onChangeText={(text)=>usn=text}  underlineColorAndroid={'transparent'} placeholderTextColor={'#fff'} placeholder="" style={{flex:4,paddingLeft:10,color:'white',backgroundColor:'rgba(0,0,0,0.3)'}} />
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
            <TextInput secureTextEntry={true} onChangeText={(text)=>pw=text} underlineColorAndroid={'transparent'} placeholderTextColor={'#fff'} placeholder="" style={{flex:4,paddingLeft:10,backgroundColor:'rgba(0,0,0,0.3)',color:'white'}} />
        </View>
    }else{
        return <View style={{width:width*0.7,height:height/12,flexDirection:'row',backgroundColor:'rgba(0,0,0,0.3)',justifyContent:'center',alignItems:'center'}}>
            <Image style={{flex:1,width:30,height:40}} source={{uri:'https://png.icons8.com/color/2x/password1.png'}} />
            <TextInput secureTextEntry={true} onChangeText={(text)=>pw=text} placeholderTextColor={'#fff'} placeholder="" style={{flex:4,paddingLeft:10,backgroundColor:'rgba(0,0,0,0.3)',color:'white'}} />
        </View>    
    }
}
    

t = [];
class Login extends Component {
    constructor(props){
        super(props);
    }
    static navigationOptions = {
        header:null
      };
    a(){
        for(let i of this.props.arrLogin){
            alert(i);
        }
    }
    checkLogin(){
        for(let i of this.props.arrLogin){
            if(usn === i.Username && pw === i.Password) 
            {
                ID=i.ID;
                Avartar=i.Avatar;
                ID_Role=i.ID_Role;
                Sex=i.Sex;
                Email=i.Email;
                return true;
            }
        }
        return false;
        
    }
    componentWillMount(){
        this.props.DangNhap(usn,pw);
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
                    <View style={{flex:3,justifyContent:'center',alignItems:'center'}} >
                        <Text onPress={()=>{this.props.navigation.push("RegisterScreen")}} style={{fontStyle:'italic',alignSelf:'flex-end',color:'yellow'}}>REGISTER</Text>
                        {_renderTextInputUSN()}
                        {_renderTextInputPW()}
                        <TouchableOpacity onPress={()=>{
                            if(this.checkLogin()){
                                this.props.navigation.push('profile');
                                this.props.navigation.push('HomeScreen');
                                
                            } 
                            else alert('Sai tài khoản hoặc mật khẩu !');
                        }} style={{justifyContent:'center',alignItems:'center',backgroundColor:'rgba(255,0,0,0.75)',height:height/15,width:width*0.7}}>
                            <Text style={{color:'white'}} >LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:20,flex:1,flexDirection:'row',alignItems:'center'}}>
                        <View style={{flex:1,height:2,backgroundColor:'white'}}/>
                        <View style={{flex:2, alignItems:'center'}}><Text style={{color:'white'}} >Or Connect With</Text></View>
                        <View style={{flex:1,height:2,backgroundColor:'white'}}/>
                    </View>
                    <View style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <View style={{}}>
                            <Image style={{width:width/8,height:height/12}} source={{uri:'https://png.icons8.com/color/2x/google-plus.png'}} />
                            {/* <Text style={{color:'white',fontStyle:'italic'}}>Google</Text> */}
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

export default connect(mapStateToProps,{DangNhap})(Login);
