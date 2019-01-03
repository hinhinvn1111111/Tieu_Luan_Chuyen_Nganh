import React, { Component } from 'react';
import { 
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    YellowBox,
    TextInput
} from 'react-native';
StatusBar.setHidden(true);

import ParallaxScrollView from 'react-native-parallax-scroll-view';
const {w,h} = Dimensions.get('window');
import {} from '../redux/dispatch';
import {connect} from 'react-redux';
import {ID,usn,pw,Avartar,ID_Role,Sex,Email} from './login';
import Modal from 'react-native-modalbox';
import {iMage,TenDiaDiem,DIaChi} from './addPlace';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

class Place_NhaKinhDoanh extends Component {

    constructor(props){
        super(props);
        this.state={
            tendiadiem : '',
            diachi : '',
            img :'aa',
            ID : '',
            arrProduces:[],
            ID_Place : '',
            ID_Produce : '',
            key : 1
        }
    }

    _renderItem({ item, index }){
        
        return(
          <TouchableOpacity onPress={()=>alert('Chức năng đang trong giai đoạn hoàn thiện !')} onLongPress={()=>{this._showModal(),this.setState({ID_Produce:item.key})}}>
              <View key={index} style={{margin:10,width:340,height:80,borderWidth:1,borderColor:'blue',flexDirection:'row',elevation:5}}>
                <Image 
                    style={{flex:1}}
                    source={{uri:item.Image}}
                />
                <View style={{flex:3,backgroundColor:'#009999', justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>{item.Produce_Name}</Text>
                    <Text style={{fontSize:16,color:'#fff',marginTop:10}}>Giá : {item.Price} VNĐ</Text>
                </View>
            </View>
          </TouchableOpacity>
        )
    
    }
    componentWillMount(){
        
        try{
            fetch('http://192.168.40.2:8888/Tieu_Luan_Chuyen_Nganh/Server/getPlaceFromUsename.php',{
            method:'POST',
            body:JSON.stringify({
                keySearch : usn,
                
            })
            })
            .then((response)=>response.json())
            .then((responsiveJSON)=>{
                if(responsiveJSON.length === 0){
                    this.setState({tendiadiem:TenDiaDiem,diachi:DIaChi,img:iMage});
                }
                else{
                    this.setState({
                        tendiadiem:responsiveJSON[0].Title,
                        diachi:responsiveJSON[0].Decription,
                        img:responsiveJSON[0].Image,
                        ID_Place:responsiveJSON[0].ID
                    })
                    arrProduce=[];
                    try{
                        fetch('http://192.168.40.2:8888/Tieu_Luan_Chuyen_Nganh/Server/getListProduceFromPlace.php',{
                        method:'POST',
                        body:JSON.stringify({
                            ID : responsiveJSON[0].ID,   
                        })
                        })
                        .then((response)=>response.json())
                        .then((responsiveJSON)=>{
                            for(let i of responsiveJSON){
                                arrProduce.push(i);
                                this.setState({arrProduces:arrProduce})
                            }
                        })
                        .catch((e)=>{
                            console.log(e);
                        })
                    }catch{
    
                    }
                }
                
                
            })
            .catch((e)=>{
                alert(e);
            })
        }catch{

        }
    }
    
     
    _showModal(){
        this.refs.myModal.open();
        
    }

    _deleteProduce(){
        //alert(this.state.ID_Produce);
        try{
            fetch('http://192.168.40.2:8888/Tieu_Luan_Chuyen_Nganh/Server/deleteProduce.php',{
            method:'POST',
            body:JSON.stringify({
                ID : this.state.ID_Produce,   
            })
            })
            .catch((e)=>{
                console.log(e);
            })
        }catch(e){
            console.log(e);
        }
    }
    
    render() {
        const { onScroll = () => {} } = this.props;
            return (
                <ParallaxScrollView
                key={this.state.key}
                onScroll={onScroll}
                headerBackgroundColor="red"
                stickyHeaderHeight={ 80 }
                parallaxHeaderHeight={ 200 }
                backgroundSpeed={20}

                

                renderBackground={() => (
                <View key="background">
                    <Image  source={{uri: this.state.img}}
                            style={{width: window.width,height: 200,resizeMode:'cover'}}
                    />
                    <View style={{position: 'relative',
                                top: 0,
                                width: window.width,
                                backgroundColor: '#fff',
                                height: 200}}/>
                </View>
                )}

                // renderForeground={() => (
                //   <View key="parallax-header" style={ styles.parallaxHeader }>
                //     {/* <Image style={ styles.avatar } source={{
                //       uri: 'https://pbs.twimg.com/profile_images/2694242404/5b0619220a92d391534b0cd89bf5adc1_400x400.jpeg',
                //       width: AVATAR_SIZE,
                //       height: AVATAR_SIZE
                //     }}/> */}
                    
                //   </View>
                // )}

                renderStickyHeader={() => (
                <View key="sticky-header" style={{justifyContent:'center',alignItems:'center',width:w,height:80,backgroundColor:'red',flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{}}> 
                        <Image 
                            style={{width:50,height:50,marginLeft:10,borderRadius:25,resizeMode:'cover'}}
                            source={{uri:this.state.img}}
                        />
                    </TouchableOpacity>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#ffff',fontSize:20,fontWeight:'bold',textAlign:'center'}}>{this.state.tendiadiem}</Text>
                        <Text style={{color:'#ffff',fontSize:13,fontWeight:'bold',textAlign:'center'}}>{this.state.diachi}</Text>
                    </View>
                </View>
                )}
                
                // renderFixedHeader={() => (
                //   <View key="fixed-header" style={styles.fixedSection}>
                //     <Text style={styles.fixedSectionText}
                //           onPress={() => this.refs.ListView.scrollTo({ x: 0, y: 0 })}>
                //       Scroll to top
                //     </Text>
                //   </View>
                // )}/>
                >
                    
                    <View style={{width:w,backgroundColor:'red', justifyContent:'center',alignItems:'center',padding:10}}>
                        <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',marginTop:5}}>
                                {this.state.tendiadiem}
                        </Text>
                        <Text style={{fontSize:13,color:'#fff',marginTop:10,textAlign:'center'}}>
                                {this.state.diachi}
                        </Text>
                        {/* <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Image style={{width:30,height:30,resizeMode:'cover'}} 
                                    source={{uri:'https://img.icons8.com/color/2x/taxi.png'}}
                                />
                                <Text style={{fontSize:12,color:'red',fontWeight:'bold'}}>{this.props.navigation.state.params.item.kc} km</Text>
                        </View> */}
                    </View>

                    <View style={{flex:1,backgroundColor:'#fff',alignItems:'center',marginBottom:20}}>
                        <Text style={{marginTop:30,fontSize:20,fontWeight:'bold',color:'blue'}}>Danh sách sản phẩm</Text>
                        <FlatList 
                            onScrollEndDrag={()=>alert('Drag')}
                            onMomentumScrollEnd={()=>alert('end')}
                            style={{flex:1,marginTop:15}}
                            data={this.state.arrProduces}
                            renderItem={
                                this._renderItem.bind(this)
                            }
                        />
                    </View>
                    <View style={{height:60,justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.push('addProduce',{IDPlace:this.state.ID_Place})}>
                            <Image 
                                style={{width:40,height:40,resizeMode:'cover'}}
                                source={{uri:'https://img.icons8.com/color/2x/plus.png'}}
                            />
                        </TouchableOpacity>
                    </View>
                    <Modal
                        ref={'myModal'}
                        position={'bottom'}
                        style={{height:80,backgroundColor:'#fff'}}
                    >
                        <TouchableOpacity  style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Image 
                                style={{width:26,height:26,resizeMode:'cover'}}
                                source={{uri:'https://img.icons8.com/ios/2x/ball-point-pen-filled.png'}}
                                />
                            </View>
                            <Text style={{fontSize:18,flex:4}}>Chỉnh sửa</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>{
                                this._deleteProduce();
                                this.setState({key:this.state.key + 1});
                                alert('Đã xóa !')
                                }} 
                                style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Image 
                                style={{width:26,height:26,resizeMode:'cover'}}
                                source={{uri:'https://img.icons8.com/ios/2x/cancel.png'}}
                                />
                            </View>
                            <Text style={{fontSize:18,flex:4}}>Xóa</Text>
                            </TouchableOpacity>
                    </Modal>                            
                </ParallaxScrollView>
            )
        }
}

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: 200
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: 300,
    justifyContent: 'flex-end'
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 12,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});


function mapStateToProps(state){
    return { 
        arrLocations : state.arrLocations,
        isSearch : state.isSearch,
        id : state.changIDViewMa,
        ListKC : state.ListKC,
        bk : state.bk,
        arrProduces : state.arrProduces,
        arrComments : state.arrComments
    };
}
export default connect(mapStateToProps,{})(Place_NhaKinhDoanh);