import React, { Component } from 'react';
import { 
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import pick from '../API/picker';
import upload from '../API/upload';

export default class AddProDuce_Business extends Component {
    constructor(props){
        super(props);
        this.state = {
            tensp : '',
            gia : '',
            img : 'aa',
            avatarSource:'',
            data:'',
            ID : ''
        }
    }
    componentWillMount(){
        //alert(this.props.navigation.state.params.IDPlace);
    }
    show(){
        pick((source,data)=>this.setState({avatarSource:source,data:data}));
        
      }
    Upload(){
        if(this.state.tensp === '' || this.state.gia === ''){
            alert('Vui lòng điền đầy đủ thông tin !');
        }
        else{
            try{
                fetch('http://192.168.40.2:8888/Tieu_Luan_Chuyen_Nganh/Server/addProduce.php',{
                method:'POST',
                body:JSON.stringify({
                    TenSP : this.state.tensp,
                    
                })
                })
                .then((response)=>response.json())
                .then((responsiveJSON)=>{
                    
                    upload(
                        [
                            {name : 'info',data :'hinhin'},
                            {name:'image',filename:'image.jpg',data:this.state.data}
                        ]
                        
                    )
                    .then(res=>{
                        try{
                            fetch('http://192.168.40.2:8888/Tieu_Luan_Chuyen_Nganh/Server/addProduce1.php',{
                            method:'POST',
                            body:JSON.stringify({
                                ID_Place:this.props.navigation.state.params.IDPlace,
                                ID_Produce : responsiveJSON[0].ID,   
                                price:this.state.gia,
                                Image:res.data
                            })
                            })
                            
                            .catch((e)=>{
                                //console.log(e);
                                alert(e);
                            })
                        }catch{
        
                        }
                    })
                    .catch(err=>console.log(err))
                        
                    //alert(responsiveJSON[0].ID);
                    
                    
                })
                .catch((e)=>{
                    alert(e);
                })
            }catch{
    
            }
        }
        
    }
    render() {
        let img = null ? null : <Image style={{width:120,height:120,resizeMode:'cover',marginTop:20}} source={this.state.avatarSource}/>
        return (
            <View style={{flex:1,padding:16,backgroundColor:'lightblue'}}>
                <View style={{width:100,height:100,position:'absolute'}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.push('place_nhakinhdoanh')}>
                        <Image 
                            style={{width:26,height:26,resizeMode:'cover',margin:10}}
                            source={require('../Image/icons8-back-24.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{height:60,justifyContent:"center",alignItems:"center",marginTop:50}}>
                    <Text style={{fontSize:37,fontWeight:'bold',color:'red',elevation:10}}>THÊM SẢN PHẨM</Text>
                </View>
                <View style={{height:35,flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:70,borderColor:'black',borderWidth:1,elevation:10}}>
                    <Text style={{flex:1,textAlign:"center",color:'#000080',fontWeight:'bold'}}>Tên SP</Text>
                    <TextInput onChangeText={(vl)=>this.setState({tensp:vl})} style={{flex:4,backgroundColor:'#fff',marginLeft:10,padding:8}}/>
                </View>
                <View style={{height:37,flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:20,borderColor:'black',borderWidth:1,elevation:10}}>
                    <Text style={{flex:1,textAlign:"center",color:'#000080',fontWeight:'bold'}}>Giá SP</Text>
                    <TextInput onChangeText={(vl)=>this.setState({gia:vl})} style={{flex:4,backgroundColor:'#fff',marginLeft:10,padding:8}}/>
                </View>
                <View style={{height:37,flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:25,elevation:10}}>
                    
                    <TouchableOpacity onPress={()=>this.show()} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{textAlign:'center',width:100,height:35,padding:7,color:'#fff',backgroundColor:'red',fontWeight:'bold',borderRadius:5}}>Chọn ảnh</Text>
                    </TouchableOpacity>
                </View>
                {img}
                <View style={{height:40,alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>{
                            //alert(this.state.tensp);
                            this.Upload();
                            alert('Thêm thành công !');
                            this.props.navigation.push('place_nhakinhdoanh');
                        }}>
                        <Text style={{width:100,height:40,backgroundColor:'blue',fontSize:20,fontWeight:'bold',color:'#fff',padding:7,textAlign:'center',borderRadius:5,marginTop:20}}>ADD</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}