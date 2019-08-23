import React, { Component } from 'react';
import { StyleSheet, WebView, Platform,ActivityIndicator,Dimensions} from 'react-native';



  export default class TermsConditionScreen extends Component {
  static navigationOptions = {
    // title: 'User Details',
    header: null
  };

  renderLoadingView() {
   const dimensions = Dimensions.get('window');
   const marginTop = dimensions.height/2 - 75;

   return (
     <ActivityIndicator
       animating = {true}
       color = '#0076BE'
       size = 'large'
       hidesWhenStopped={true}
       style={{marginTop}}
     />
   );
 }

  render() {

    let link = this.props.navigation.getParam('link','https://Google.com');
    console.log(link,'kkkkkkkkkkk');
    if (/\.pdf$/.test(link)) {
     link = `https://drive.google.com/viewerng/viewer?embedded=true&url=${link}`;
   }
    return (

          <WebView
          renderLoading={this.renderLoadingView}
          style={styles.WebViewStyle}
          source={{uri: link}}
          javaScriptEnabled={true}
          domStorageEnabled={true}  />

        );
      }
    }



const styles = StyleSheet.create(
{

 WebViewStyle:
 {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    marginTop: (Platform.OS) === 'ios' ? 20 : 0
 }
});
