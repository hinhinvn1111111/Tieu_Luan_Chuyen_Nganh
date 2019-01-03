import React, { Component } from 'react';
import { 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';

import pick from '../API/picker';
import upload from '../API/upload';
import RNGooglePlaces from 'react-native-google-places';
import {connect} from 'react-redux';
import {ThemDiaDiem} from '../redux/dispatch';
import { usn } from './login';

export var iMage = '';
export var TenDiaDiem = '';
export var DIaChi = '';

class AddPlace extends Component {
    constructor(props){
        super(props);
        this.state = {
            avatarSource : null,
            data : '',
            s:'aa',
            place : '',
            name : '',
            Place_Name:'',
            lat: 0,
            long:0
        }
    }

    openSearchModal() {
        RNGooglePlaces.openAutocompleteModal({
        type: 'address',
        country: 'VN',
        latitude: 10.866925,
        longitude: 106.762001,
        radius: 10
        })
        .then((place) => {
            this.setState({place:place.address,lat:place.latitude,long:place.longitude});
            latSearch = place.latitude;
            longSearch = place.longitude;
            //
            //name=place.address;
            //alert(name);
            // place represents user's selection from the
            // suggestions and it is a simplified Google Place object.
        })
        .catch(error => alert(error.message));  // error is a Javascript Error object
    } 
    

    show(){
        pick((source,data)=>this.setState({avatarSource:source,data:data}));
        
      }
    Upload(){
        upload(
            [
                {name : 'info',data :'hinhin'},
                {name:'image',filename:'image.jpg',data:this.state.data}
            ]
            
        )
        .then(res=>{
            this.setState({s:res.data});
            var lat = this.state.lat;
            var long = this.state.long;
            var Place_Name = this.state.Place_Name;
            var place = this.state.place;
            //var img = this.state.s;
            iMage=res.data;
            TenDiaDiem=Place_Name;
            DIaChi=place;
                                        
            this.props.ThemDiaDiem(lat,long,Place_Name,place,res.data,usn);
        })
        .catch(err=>console.log(err))
        // var lat = this.state.lat;
        // var long = this.state.long;
        // var Place_Name = this.state.Place_Name;
        // var place = this.state.place;
        // var img = this.state.s;
        //console.log(this.state.lat+'-'+this.state.long+'-'+this.state.Place_Name+'-'+this.state.place+'-'+this.state.s+'-'+usn);
        //console.log(lat+'-'+long+'-'+Place_Name+'-'+place+'-'+img+'-'+username);
                                     
        //this.props.ThemDiaDiem(lat,long,Place_Name,place,img,usn);
    }
    

    render() {
        let img = null ? null : <Image style={{width:200,height:200}} source={this.state.avatarSource}/>
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'lightblue',padding:10}}>
                <View style={{flexDirection:'row',height:50,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{flex:2,fontSize:16,color:'#000080'}}>Tên địa điểm</Text>
                    <TextInput  onChangeText={(vl)=>this.setState({Place_Name:vl})}  style={{flex:3,height:40,backgroundColor:'#fff',padding:10,borderColor:'black',elevation:2}} />
                </View>
                <View style={{flexDirection:'row',height:50,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{flex:2,fontSize:16,color:'#000080'}}>Địa chỉ</Text>
                    <TextInput onFocus={()=>this.openSearchModal()} placeholder={this.state.place} style={{flex:3,padding:10,height:40,backgroundColor:'#fff',borderColor:'black',elevation:2}}/>
                </View>
                <View style={{flexDirection:'row',height:50,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{flex:2,fontSize:16,color:'#000080'}}>Image</Text>
                    <View style={{flex:3,justifyContent:'center',alignContent:'center'}}>
                        <Text onPress={()=>this.show()} style={{textAlign:'center',fontSize:20,fontWeight:'bold',width:90,height:40,backgroundColor:'#476192',padding:7,color:'#fff',borderRadius:5}}>Chọn</Text>
                    </View>
                </View>
                <View style={{height:250,justifyContent:'center',alignItems:'center'}}>
                    {img}
                    <TouchableOpacity onPress={()=>{
                        this.Upload();
                        alert('Thêm thành công !');
                        this.props.navigation.push('place_nhakinhdoanh');
                        //alert(this.state.place);
                        //console.log(this.state.Place_Name);
                        //this.props.ThemDiaDiem(2,2,2,2,2,2);
                        //this.props.ThemDiaDiem(this.state.lat,this.state.long,this.state.Place_Name,2,this.state.s,usn);
                    }}>
                        <Text style={{marginTop:10,fontFamily:'vincHand',color:'#fff',fontSize:20,fontWeight:'bold',width:120,height:40,textAlign:'center',borderColor:5,padding:7,backgroundColor:'#0099FF',borderRadius:5,elevation:5}}>ADD</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

function mapStateToProps(state){
    return { 
        arrLocations : state.arrLocations,
        isSearch : state.isSearch,
        id : state.changIDViewMa,
        ListKC : state.ListKC,
        bk : state.bk
    };
}

export default connect(mapStateToProps,{ThemDiaDiem})(AddPlace);

// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View,TouchableOpacity,Image} from 'react-native';
// import pick from '../API/picker';
// import upload from '../API/upload';

// export default class AddPlace extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       avatarSource : null,
//       data : '',
//       s:'aaa'
//     }
//   }
  
//   show(){
//     pick((source,data)=>this.setState({avatarSource:source,data:data}));
//   }
//   Upload(){
//       upload(
//         [
//           {name : 'info',data :'hinhin'},
//           {name:'image',filename:'image.jpg',data:this.state.data}
//         ]
        
//       )
//       .then(res=>{console.log(res.data),this.setState({s:res.data})})
//       .catch(err=>console.log(err))
//   }

//   render() {
//     let img = null ? null : <Image style={{width:200,height:200}} source={this.state.avatarSource}/>
//     return (
//       <View style={styles.container}>
//           <Image 
//             style={{width:100,height:100,resizeMode:'cover'}}
//             source={{uri:this.state.s}}
//           />
//           <TouchableOpacity onPress={()=>this.show()}>
//               <Text>Show</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={()=>this.Upload()}>
//               <Text>Upload</Text>
//           </TouchableOpacity>
//           {img}
          
//       </View>
//     );
//   }

  
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   }
// });


