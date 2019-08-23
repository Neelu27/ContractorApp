
import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, ImageBackground, Image, Animated, AsyncStorage ,statusBar,} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class FirstPage extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      headerStyle: {
        backgroundColor: '#be1f6b',
      },
      headerTintColor: '#fff',
    }
  };

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const login =await AsyncStorage.getItem('login');
     console.log(login,'ggggggggggg');
     if(login == 'true' || login == true){
       this.props.navigation.navigate( 'App' );
     }else{
       this.props.navigation.navigate( 'Auth');
     }

  };

  componentDidMount() {
    setTimeout(
      () => {
        // const sessionid = AsyncStorage.getItem('sessionid');
        // if (sessionid != null && sessionid != undefined) {
        //   this.props.navigation.navigate("DetailsScreen");
        // } else {
        this._bootstrapAsync()


      }, 2000);
  }

  render() {


    const { navigate } = this.props.navigation;
    return (

      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 48, justifyContent: 'center', fontWeight: 700 }}>
          <Image style={{ width: '100%', resizeMode: 'contain' }} source={require('../assets/images/logo.jpeg')} />
          <Animatable.Text animation="zoomInUp">
            <Text style={{ fontSize: 18, color: 'grey', fontWeight: 'bold', }}> Now Zing your Manpower Needs </Text>
          </Animatable.Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },


});
