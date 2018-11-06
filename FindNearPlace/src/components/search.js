// import React, { Component } from 'react';
// import { 
//     View,
//     Text,
//     Animated,
//     TouchableOpacity,
//     Image,
//     TextInput
// } from 'react-native';

// import {connect} from 'react-redux';

// import {GetDataSearch,MEMORIZED,ISSearch} from '../redux/dispatch';

// import {createStackNavigator} from 'react-navigation';

// class Search extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             isSearch : false,
//             value : '',
//             num : 0,
//             animated : new Animated.Value(0)
//         }
//     }

//     componentDidMount(){
//         Animated.timing(
//             this.state.animated,
//             {
//                 toValue : '2',
//                 duration : 4000
//             }
//         ).start();
//     }


//     _sendata(value){
//         this.props.GetDataSearch(value);
//         this.setState({value:''});
//     }

//     IsSearch(){
//         const backgroundColor = this.state.animated.interpolate({
//             inputRange : [0,0.5,1,1.5,2],
//             outputRange : ['yellow','blue','green','lightblue','red']
//         });
//         if(this.props.isSearch===true){
//             return(
//                 <Animated.View style={{width:width,height:40,backgroundColor,justifyContent:'space-between',alignItems:"center",flexDirection:'row',paddingLeft:10,paddingRight:10}}>
//                     <TouchableOpacity onPress={()=>this.props.ISSearch()}>
//                         <Image
//                             style={{width:26,height:26,resizeMode:'cover'}}
//                             source={require('../Image/icons8-back-24.png')}
//                         />
//                     </TouchableOpacity>
//                     <View style={{height:30,backgroundColor:'#fff',flex:1,marginLeft:10,marginRight:10}}><TextInput autoFocus={true} style={{fontSize:12,paddingTop:5,paddingLeft:10,paddingBottom:5}} onChangeText={(vl)=>this.setState({value:vl})} placeholder="Nhập từ bạn muốn tìm..." value={this.state.value}/></View>
//                     <TouchableOpacity onPress={()=>this._sendata(this.state.value)}>
//                         <Image
//                             style={{width:26,height:26,resizeMode:'cover'}}
//                             source={{uri:'https://png.icons8.com/office/2x/search.png'}}
//                         />
//                     </TouchableOpacity>
//                 </Animated.View>
//             );
//         }
//         return (
//             <Animated.View style={{width:width,height:40,backgroundColor,justifyContent:'space-between',alignItems:"center",flexDirection:'row',paddingLeft:10,paddingRight:10}}>
//                 <TouchableOpacity onPress={()=>this.props.ISSearch()}>
//                 <Image
//                     style={{width:26,height:26,resizeMode:'cover'}}
//                     source={{uri:'https://png.icons8.com/office/2x/search.png'}}
//                 />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={()=>this.props.ISSearch()}>
//                     <Text style={{color:'#fff'}}>Nhập từ bạn muốn tìm...</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity>
//                 <Image
//                     style={{width:26,height:26,resizeMode:'cover'}}
//                     source={{uri:'https://png.icons8.com/nolan/2x/plus-math.png'}}
//                 />
//                 </TouchableOpacity>
                
//             </Animated.View>
//         );
//     }
//     render() {
//         // return (
//         //     <View>
//         //         {this.IsSearch()}
//         //     </View>
//         // );
//         const backgroundColor = this.state.animated.interpolate({
//             inputRange : [0,0.5,1,1.5,2],
//             outputRange : ['yellow','blue','green','lightblue','red']
//         });
//         if(this.props.isSearch===true){
//             return(
//                 <Animated.View style={{width:width,height:40,backgroundColor,justifyContent:'space-between',alignItems:"center",flexDirection:'row',paddingLeft:10,paddingRight:10}}>
//                     <TouchableOpacity onPress={()=>this.props.ISSearch()}>
//                         <Image
//                             style={{width:26,height:26,resizeMode:'cover'}}
//                             source={require('../Image/icons8-back-24.png')}
//                         />
//                     </TouchableOpacity>
//                     <View style={{height:30,backgroundColor:'#fff',flex:1,marginLeft:10,marginRight:10}}><TextInput autoFocus={true} style={{fontSize:12,paddingTop:5,paddingLeft:10,paddingBottom:5}} onChangeText={(vl)=>this.setState({value:vl})} placeholder="Nhập từ bạn muốn tìm..." value={this.state.value}/></View>
//                     <TouchableOpacity onPress={()=>this._sendata(this.state.value)}>
//                         <Image
//                             style={{width:26,height:26,resizeMode:'cover'}}
//                             source={{uri:'https://png.icons8.com/office/2x/search.png'}}
//                         />
//                     </TouchableOpacity>
//                 </Animated.View>
//             );
//         }
//         return (
//             <View>
//                 <Animated.View style={{width:width,height:40,backgroundColor,justifyContent:'space-between',alignItems:"center",flexDirection:'row',paddingLeft:10,paddingRight:10}}>
//                     <TouchableOpacity onPress={()=>this.props.ISSearch()}>
//                     <Image
//                         style={{width:26,height:26,resizeMode:'cover'}}
//                         source={{uri:'https://png.icons8.com/office/2x/search.png'}}
//                     />
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>this.props.ISSearch()}>
//                         <Text style={{color:'#fff'}}>Nhập từ bạn muốn tìm...</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity>
//                     <Image
//                         style={{width:26,height:26,resizeMode:'cover'}}
//                         source={{uri:'https://png.icons8.com/nolan/2x/plus-math.png'}}
//                     />
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>this.props.navigation.navigate('a1')}>
//                         <Text>aaaaa</Text>
//                     </TouchableOpacity>
//                 </Animated.View>
//             </View>
//         );
//     }
// }

// function mapStateToProps(state){
//     return { 
//         arrLocations : state.arrLocations,
//         isSearch : state.isSearch
//     };
// };

// connect(mapStateToProps,{GetDataSearch,MEMORIZED,ISSearch})(Search);

// import A from './request';

// export default Search1 = createStackNavigator({
//     Search : {
//         screen : Search,
//         navigationOptions : {
//             header : null
//         }
//     },
//     a1 : {
//         screen : A
//     }
// })
