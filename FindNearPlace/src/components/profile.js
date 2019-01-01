import React, { Component } from 'react';
import { 
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    Animated,
    YellowBox,
    TextInput,
    Alert
} from 'react-native';

var imv = '';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);
import {ID,usn,pw,Avartar,ID_Role,Sex,Email} from './login';
export var ID_RoleP = "";

const {width,height} = Dimensions.get('window');
export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            update : false,
            USN : '',
            PW : '',
            SEX : '',
            ID_ROLE :1,
            AVATAR : '',
            EMAIL : ''
        }
    }
    componentWillMount(){
        this.setState({
            USN : usn,
            PW : pw,
            AVATAR : Avartar,
            ID_ROLE : ID_Role,
            SEX : Sex,
            EMAIL : Email
        });
        ID_RoleP=ID_Role;
    }
    NangCapTaiKhoan(){
        return(
            Alert.alert(
                'Question',
                'Bạn có chắc chắn không ?',
                [
                  {text: 'Ok', onPress: () => {
                    try{
                        this.setState({ID_ROLE:2});
                        ID_RoleP=2;
                        fetch('http://192.168.40.2:8888/Tieu_Luan_Chuyen_Nganh/Server/NangCapTaiKhoan.php',{
                        method:'POST',
                        body:JSON.stringify({
                            usn : this.state.USN,
                            id_role : this.state.ID_ROLE
                        })
                        })
                        .catch((e)=>{
                            alert(e);
                        })
                    }catch{
            
                    }
                  }, style: 'cancel'},
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
                ],
                { cancelable: false }
              )
        )
    }
    
    _RenderButtonNangCap(){
        if(this.state.ID_ROLE==1){
            return(
                <TouchableOpacity onPress={()=>this.NangCapTaiKhoan()}>
                    <Text style={{marginLeft:15,width:150,height:40,backgroundColor:'#476192',borderRadius:5,textAlign:'center',padding:5,color:'#fff',fontSize:18,fontWeight:'bold'}}>Nâng cấp TK</Text>
                </TouchableOpacity>
            )
        }
        else{
            return(
                <View></View>
            )
        }
    }
    CapNhatThongTin(){
        try{
            fetch('http://192.168.40.2:8888/Tieu_Luan_Chuyen_Nganh/Server/UpdateTaiKhoan.php',{
            method:'POST',
            body:JSON.stringify({
                usn : this.state.USN,
                pw : this.state.PW,
                sex : this.state.SEX,
                email:this.state.EMAIL
            })
            })
            .catch((e)=>{
                alert(e);
            })
        }catch{

        }
    }
    
    _RenderThongTincaNhan(){
        if(this.state.update===false){
            return(
                <View style={{flex:1, margin:10}}>
                    
                    <Text style={{fontSize:24,marginEnd:15}}>Username : {this.state.USN}</Text>
                    <View style={{height:1,alignItems:'center'}}><Text style={{width:320,height:1,backgroundColor:'black'}}></Text></View>
                    <Text style={{fontSize:24,marginEnd:15}}>Password : {this.state.PW}</Text>
                    <View style={{height:1,alignItems:'center'}}><Text style={{width:320,height:1,backgroundColor:'black'}}></Text></View>
                    <Text style={{fontSize:24,marginEnd:15}}>Sex : {this.state.SEX}</Text>
                    <View style={{height:1,alignItems:'center'}}><Text style={{width:320,height:1,backgroundColor:'black'}}></Text></View>
                    <Text style={{fontSize:24,marginEnd:15}}>Loại tài khoản : {this.state.ID_ROLE}</Text>
                    <View style={{height:1,alignItems:'center'}}><Text style={{width:320,height:1,backgroundColor:'black'}}></Text></View>
                    <Text style={{fontSize:24,marginEnd:15}}>Email : {this.state.EMAIL}</Text>
                    <View style={{flex:1,justifyContent:"center",alignItems:'center', flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>this.setState({update:!this.state.update})}>
                            <Text style={{width:150,height:40,backgroundColor:'#476192',borderRadius:5,textAlign:'center',padding:5,color:'#fff',fontSize:18,fontWeight:'bold'}}>Cập nhật</Text>
                        </TouchableOpacity>
                        {this._RenderButtonNangCap()}
                    </View>
                    
                </View>
                
            );
        }
        return (
            <View style={{flex:1, margin:10}}>
                <View style={{height:50,justifyContent:'space-between',alignItems:'center',flexDirection:'row',marginTop:5}}>
                    <Text style={{flex:2,fontSize:24, marginRight:15}}>Password</Text>
                    <TextInput  secureTextEntry={true} onChangeText={(vl)=>{this.setState({PW:vl})}} style={{flex:3,height:35,backgroundColor:'#fff',padding:5}}/>
                </View>
                <View style={{height:50,justifyContent:'space-between',alignItems:'center',flexDirection:'row',marginTop:5}}>
                    <Text style={{flex:2,fontSize:24, marginRight:15}}>Sex</Text>
                    <TextInput onChangeText={(vl)=>{this.setState({SEX:vl})}} style={{flex:3,height:35,backgroundColor:'#fff',padding:5}}/>
                </View>
                <View style={{height:50,justifyContent:'space-between',alignItems:'center',flexDirection:'row',marginTop:5}}>
                    <Text style={{flex:2,fontSize:24, marginRight:15}}>Email</Text>
                    <TextInput onChangeText={(vl)=>{this.setState({EMAIL:vl})}} style={{flex:3,height:35,backgroundColor:'#fff',padding:5}}/>
                </View>
                <View style={{flex:1,justifyContent:"center",alignItems:'center',flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{
                        this.setState({update:!this.state.update});
                        this.CapNhatThongTin();
                        alert('Cập nhật thành công !');                       
                    }}>
                        <Text style={{width:100,height:40,backgroundColor:'#476192',borderRadius:5,textAlign:'center',padding:5,color:'#fff',fontSize:18,fontWeight:'bold'}}>Cập nhật</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.setState({update:!this.state.update})}>
                        <Text style={{elevation:5,marginLeft:30,width:100,height:40,backgroundColor:'#476192',borderRadius:5,textAlign:'center',padding:5,color:'#fff',fontSize:18,fontWeight:'bold'}}>Hủy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // show(){
    //     pick((source,data)=>this.setState({avatarSource:source,data:data}));
    //     this.Upload();
    // }

    // Upload(){
    //     upload(
    //       [
    //         {name : 'info',data :'hinhin'},
    //         {name:'image',filename:'image.jpg',data:this.state.data}
    //       ]
          
    //     )
    //     .then(res=>{console.log(res.data),this.setState({AVATAR:res.data})})
    //     .catch(err=>console.log(err))
    // }
  

    render() {
        return (
            <View style={{flex:1,backgroundColor:'lightblue'}}>
                <ImageBackground style={{width,height:150,backgroundColor:'green',alignItems:'center'}} 
                    source={{uri:'http://www.websoft.vn/UploadFile/Article/xulyanh/cs5/light-glow-03.jpg'}}>
                    <Image 
                        style={{zIndex:1,margin:50,width:170,height:170,resizeMode:'cover',borderRadius:85}}
                        source={{uri:Avartar}}
                    />

                </ImageBackground>
                
                    {/* <TouchableOpacity style={{zIndex:10, width:50,height:50,position:'absolute',marginTop:160,marginLeft:90}} 
                        onPress={()=>{
                            this.show()
                            
                            alert(this.state)
                        }}>
                        <Image 
                            style={{width:50,height:50,resizeMode:'cover'}}
                            source={{uri:'https://img.icons8.com/color/2x/old-time-camera.png'}}
                        />
                    </TouchableOpacity> */}
               
                <View style={{flex:1,marginTop:90,marginLeft:10,marginRight:10}}>
                    <Text style={{width,textAlign:"center",fontSize:30}}>Thông tin cá nhân</Text>
                    {this._RenderThongTincaNhan()}
                </View>
            </View>
        );
    }
}