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
import {createStackNavigator} from 'react-navigation';
const {w,h} = Dimensions.get('window');
import {ChangeIDViewMap,ChangeIDViewMap2,AddComments,DeleteComments} from '../redux/dispatch';
import {connect} from 'react-redux';
import {ID,usn,pw,Avartar,ID_Role,Sex,Email} from './login';
import Modal from 'react-native-modalbox';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

class ChiTietPlace extends Component {

    constructor(props){
        super(props);
        this.state={
            content : '',
            idp : 0,
            idl : 0,
            key:1,
            arrCOMMENTS :[],
            content1:'',
            refresh : false
        }
    }

    _renderItem({ item, index }){
        
        return(
          <TouchableOpacity onPress={()=>alert(item.Produce_Name)}>
              <View key={index} style={{margin:10,width:340,height:80,borderBottomWidth:1,borderBottomColor:'black',flexDirection:'row'}}>
                <Image 
                    style={{flex:1}}
                    source={{uri:item.Image}}
                />
                <View style={{flex:3,backgroundColor:'red', justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>{item.Produce_Name}</Text>
                    <Text style={{fontSize:16,color:'#fff',marginTop:10}}>Giá : {item.Price} VNĐ</Text>
                </View>
            </View>
          </TouchableOpacity>
        )
    
      }
      componentWillMount(){
        this.setState({idl:ID,idp:this.props.navigation.state.params.item.place.ID,arrCOMMENTS:this.props.arrComments});
      }
      componentDidMount(){
        this.setState({idl:ID,idp:this.props.navigation.state.params.item.place.ID,arrCOMMENTS:this.props.arrComments});
      }
      _showModal(item){
        this.refs.myModal.open();
        this.setState({content1:item.Content})
      }
      _renderItem1({ item, index }){
          
        if(item.Username === usn){
            return(
                <View key={index} style={{margin:10,width:340,height:100,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    
                    <Image 
                        style={{width:40,height:40,borderRadius:20}}
                        source={{uri:item.Avatar}}
                    />
                    <View style={{borderRadius:10,elevation:5,marginLeft:10,flex:1,backgroundColor:'#fff',borderWidth:1,borderColor:'blue',padding:7}}>
                        <Text style={{color:'blue',fontSize:14}}>{item.Username}</Text>
                        <Text style={{textAlign:'left',fontSize:16}}>{item.Content}</Text>
                        <Text onPress={()=>this._showModal(item)} style={{color:'gray',position:'absolute',marginLeft:260,fontWeight:'bold'}}>...</Text>
                    </View>
                    
                </View>
              )
        }
        return(
            <View key={index} style={{margin:10,width:340,height:80,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Image 
                    style={{width:40,height:40,borderRadius:20}}
                    source={{uri:item.Avatar}}
                />
                <View style={{borderRadius:10,elevation:5,marginLeft:10,flex:1,backgroundColor:'#fff',borderWidth:1,borderColor:'blue',padding:7}}>
                    <Text style={{color:'blue',fontSize:14}}>{item.Username}</Text>
                    <Text style={{textAlign:'left',fontSize:16}}>{item.Content}</Text>
                </View>
            </View>
          )
    
      }
    
    _ThemBinhLuan(){
        this.props.AddComments(this.state.idl,this.state.idp,this.state.content);
        this.setState({key:this.state.key+1});
        this.setState({content:''});
        alert('Thêm thành công !');
        //this.setState({refresh:true});
    }
    _DeleteComment(){
        this.props.DeleteComments(this.state.idl,this.state.idp,this.state.content1);
        this.setState({key:this.state.key+1});
        alert('Đã xóa');
    }
    _refresh(){
        // this.setState({arrCOMMENTS:this.props.arrComments});
        // this.setState({refresh:false});
        // this.setState({key:this.state.key+1});
    }

    render() {
        const { onScroll = () => {} } = this.props;
            return (
                <ParallaxScrollView
                key={this.state.key}
                onScroll={onScroll}
                headerBackgroundColor="red"
                stickyHeaderHeight={ 40 }
                parallaxHeaderHeight={ 200 }
                backgroundSpeed={20}

                

                renderBackground={() => (
                <View key="background">
                    <Image source={{uri: this.props.navigation.state.params.item.place.Image,
                                    width: window.width,
                                    height: 200}}/>
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
                <View key="sticky-header" style={{justifyContent:'center',alignItems:'center',width:w,height:40,backgroundColor:'blue',flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('screen1')}> 
                        <Image 
                            style={{width:26,height:26}}
                            source={{uri:'https://img.icons8.com/color/2x/back.png'}}
                        />
                    </TouchableOpacity>
                    <Text style={{color:'#ffff',fontSize:20,fontWeight:'bold',flex:1,textAlign:'center'}}>{this.props.navigation.state.params.item.place.Title}</Text>
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
                    
                    <View style={{width:w,backgroundColor:'blue', justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',marginTop:10}}>
                                {this.props.navigation.state.params.item.place.Title}
                        </Text>
                        <Text style={{fontSize:13,color:'#00FFFF',marginTop:10,textAlign:'center'}}>
                                {this.props.navigation.state.params.item.place.Decription}
                        </Text>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Image style={{width:30,height:30,resizeMode:'cover'}} 
                                    source={{uri:'https://img.icons8.com/color/2x/taxi.png'}}
                                />
                                <Text style={{fontSize:12,color:'red',fontWeight:'bold'}}>{this.props.navigation.state.params.item.kc} km</Text>
                        </View>
                    </View>

                    <View style={{height:600,backgroundColor:'#fff',alignItems:'center',marginBottom:40}}>
                        <Text style={{marginTop:30,fontSize:20,fontWeight:'bold',color:'blue'}}>Danh sách sản phẩm</Text>
                        <FlatList 
                            style={{flex:1,marginTop:15}}
                            data={this.props.arrProduces}
                            renderItem={
                                this._renderItem.bind(this)
                            }
                        />
                    </View>

                    <View style={{margin:10,width:340,height:80,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Image 
                            style={{width:40,height:40,borderRadius:20}}
                            source={{uri:Avartar}}
                        />
                        <TextInput 
                            value={this.state.content}
                            onChangeText={(vl)=>this.setState({content:vl})}
                            style={{padding:10,elevation:5,marginLeft:10,flex:1,backgroundColor:'#fff', justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'lightblue'}}
                        />
                    </View>
                    <View style={{height:50,justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity onPress={this._ThemBinhLuan.bind(this)}>
                            <Text style={{fontSize:16,fontWeight:'bold',color:'#fff',textAlign:'center',padding:10,borderRadius:5,width:150,height:40,backgroundColor:'#476192'}}>Thêm bình luận</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:600,backgroundColor:'#fff',alignItems:'center',marginTop:30}}>
                        
                        <FlatList style={{marginTop:20}}
                            refreshing={false}
                            onRefresh={()=>{}}
                            scrollsToTop={false}
                            data={this.state.arrCOMMENTS}
                            renderItem={
                                this._renderItem1.bind(this)
                            }
                        />
                        <Modal 
                            ref={'myModal'}
                            position={'bottom'}
                            style={{height:80,backgroundColor:'#fff'}}
                        >
                            <TouchableOpacity onPress={()=>alert('Update')} style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Image 
                                style={{width:26,height:26,resizeMode:'cover'}}
                                source={{uri:'https://img.icons8.com/ios/2x/ball-point-pen-filled.png'}}
                                />
                            </View>
                            <Text style={{fontSize:18,flex:4}}>Chỉnh sửa</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this._DeleteComment.bind(this)} style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Image 
                                style={{width:26,height:26,resizeMode:'cover'}}
                                source={{uri:'https://img.icons8.com/ios/2x/cancel.png'}}
                                />
                            </View>
                            <Text style={{fontSize:18,flex:4}}>Xóa</Text>
                            </TouchableOpacity>
                            
                        </Modal>
                    </View>
                  
                    
                    
                            
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
export default connect(mapStateToProps,{ChangeIDViewMap,ChangeIDViewMap2,AddComments,DeleteComments})(ChiTietPlace);