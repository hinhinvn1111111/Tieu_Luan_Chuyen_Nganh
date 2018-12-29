import RNFetchBlob from 'react-native-fetch-blob';
const upload = (data)=>{
    return RNFetchBlob.fetch('POST', 'http://192.168.40.2:3000/', {
      Authorization : "Bearer access-token",
      otherHeader : "foo",
      'Content-Type' : 'multipart/form-data',
    }, data)
    
}
export default upload;
