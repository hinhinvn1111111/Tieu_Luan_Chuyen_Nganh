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
    StyleSheet
} from 'react-native';
StatusBar.setHidden(true);

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {createStackNavigator} from 'react-navigation';
const {w,h} = Dimensions.get('window');
import {ChangeIDViewMap,ChangeIDViewMap2} from '../redux/dispatch';
import {connect} from 'react-redux';
class ChiTietPlace extends Component {
    _renderItem({ item, index }){
      
        return(
          <View key={index} style={{width:w,height:100,borderBottomWidth:1,borderBottomColor:'black'}}>
              <View style={{height:80}}>
                  <Text>{item.Price}</Text>
               </View>
          </View>
        )
    
      }
    state = {  }
    render() {
        const { onScroll = () => {} } = this.props;
            return (
                <ParallaxScrollView
                onScroll={onScroll}

                headerBackgroundColor="red"
                stickyHeaderHeight={ 40 }
                parallaxHeaderHeight={ 200 }
                backgroundSpeed={10}

                

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
                    <View style={{width:w,height:120,backgroundColor:'blue', justifyContent:'center',alignItems:'center'}}>
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
                    <View style={{width:w,height:600,backgroundColor:'#fff',alignItems:'center'}}>
                        <Text style={{marginTop:30,fontSize:20,fontWeight:'bold',color:'blue'}}>Danh sách sản phẩm</Text>
                        <FlatList style={{flex:1}}
                            data={this.props.arrProduces}
                            renderItem={({item,index}) => 
                                <View key={index} style={{width:w,height:200,flexDirection:'row',backgroundColor:'gray'}}>
                                    <Image 
                                        style={{width:70,height:70}}
                                        source={{uri:item.Image}}
                                    />
                                    
                                        <Text style={{color:'red'}}>{item.Produce_Name}</Text>
                                        <Text style={{color:'red'}}>{item.Price} VNĐ</Text>
                                    
                                </View>
                            }
                        />
                    </View>

                    {/* <View style={{flex:1,backgroundColor:'#fff',alignItems:'center'}}>
                        <Text style={{marginTop:30,fontSize:20,fontWeight:'bold',color:'blue'}}>Danh sách sản phẩm</Text>
                        <FlatList style={{flex:1}}
                            data={this.state.arr}
                            renderItem={
                                this._renderItem.bind(this)
                            }
                        />
                    </View> */}
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
        arrProduces : state.arrProduces
    };
}
export default connect(mapStateToProps,{ChangeIDViewMap,ChangeIDViewMap2})(ChiTietPlace);