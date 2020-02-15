// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// import RNFetchBlob from 'rn-fetch-blob'

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;
import React, { Component } from 'react';
import { View,Text,TouchableOpacity, Image } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import ImagePicker from 'react-native-image-picker';

console.disableYellowBox = true

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class App extends Component {
  state = { 
    avatarSource : null,
    res : null
   }
  _handlePicker=()=>{
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
    
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          avatarSource: source,
          res:response
        });
      }
    });
  }
  componentDidMount(){
    
  }
  _handlePostImage=()=>{
    console.log('uploading !!!')
    const {res={}} = this.state
    RNFetchBlob.fetch('POST', 'http://192.168.91.1:3000/', {
    Authorization : "Bearer access-token",
    otherHeader : "foo",
    'Content-Type' : 'multipart/form-data',
    }, [
      // element with property `filename` will be transformed into `file` in form data
      // { name : 'avatar', filename : 'avatar.png', data: res.data},
      // // custom content type
      // { name : 'avatar-png', filename : 'avatar-png.png', type:'image/png', data: res.data},
      // part file from storage
      { name : 'avatar_foo', filename : 'avatar-foo.png', type:'image/foo', data: RNFetchBlob.wrap(res.path)},
      // // elements without property `filename` will be sent as plain text
      // { name : 'name', data : 'user'},
      { name : 'info', data : JSON.stringify({
        mail : 'example@example.com',
        tel : '12345678'
      })},
    ]).then((resp) => {
      // ...
    }).catch((err) => {
      // ...
    })
  }
  render() {
    
    return (
      <View style={{flex:1,backgroundColor:'lightblue',justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity onPress={this._handlePicker} style={{width:120,height:40,borderRadius:4,justifyContent:'center',alignItems:'center'}}>
            <Text>PickerImage</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._handlePostImage} style={{width:120,height:40,borderRadius:4,justifyContent:'center',alignItems:'center'}}>
            <Text>UploadImage</Text>
          </TouchableOpacity>
          {this.state.avatarSource !== null &&
            <Image 
              style={{width:200,height: 200,resizeMode:'cover'}}
              source={this.state.avatarSource}
            />
          }
      </View>
    );
  }
}