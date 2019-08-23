import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput,Image, StyleSheet,FlatList,AsyncStorage,Alert,Linking,PermissionsAndroid,ToastAndroid,Slider,
Dimensions,Platform,ScrollView,StatusBar} from 'react-native'
import { MonoText } from '../components/StyledText';
import { FontAwesome } from '@expo/vector-icons';
import SmsListener from 'react-native-android-sms-listener'
import { Constants } from 'expo';
import * as Expo from 'expo';
import GradientButton from "react-native-gradient-buttons";
import * as Permissions from 'expo-permissions';

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
const SERVER_URL = 'https://happypockets.in'

export default class SecondPage extends Component {



  static navigationOptions = {
      header:null
  };

  constructor(props){
  super(props);
  this.state = {
    needOTP : false,
    username:'',
    sessionid:'',
    name:'',
    token:'',
    loginname:'',
    password:'',
  }
  this.SMSReadSubscription = {};

  SmsListener.addListener(message => {
    console.info(message,'opppppppppppp')
  })
}

  componentWillUnmount() {

    this.SMSReadSubscription.remove();
  }

  async requestReadSmsPermission() {
    try {
    var granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_SMS,
    {
    title: "Auto Verification OTP",
    message: "need access to read sms, to verify OTP"
    }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log("sms read permissions granted", granted);
    granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,{
    title: "Receive SMS",
    message: "Need access to receive sms, to verify OTP"
    }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log("RECEIVE_SMS permissions granted", granted);
    } else {
    console.log("RECEIVE_SMS permissions denied");
    }
    } else {
    console.log("sms read permissions denied");
    }
    } catch (err) {
    console.log(err);
    }
    }

    componentDidMount()
    {
    console.log("Message:dgggggggggg", 'messageeee');
      // this.requestReadSmsPermission()
      this.SMSReadSubscription = SmsListener.addListener(message => {
        console.log("Message:", message);
        let verificationCodeRegex = /([\d]{4})/
        if (verificationCodeRegex.test(message.body)) {
        let verificationCode = message.body.match(verificationCodeRegex)[1]
        console.log(verificationCode)
          this.setState({OTP:verificationCode})

        }

      });
    }

    logInfacebook= async () =>{
    const {
      type,
      token,
    } = await Expo.Facebook.logInWithReadPermissionsAsync('2101704323212270', {
      permissions: ['public_profile','email','user_friends'],
    });

    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?fields=email,name,first_name,last_name,friends&access_token=${token}`
      );
      var result  = await response.json()
      var name  = result.name
      var email  = result.email
      var fname  = result.first_name
      var lname  = result.last_name

      var data = new FormData();
      data.append( "name", name );
      data.append( "email", email );
      data.append( "fname", fname );
      data.append( "lname", lname );
      data.append( "secretKey", 'Titan@1' );
      console.log(data,'kkkkkkkkkk');

      fetch( 'https://happypockets.in/mobilelogin/', {
        method: 'POST',
        body: data,
      })
      .then((response) =>{
        console.log(response.headers)
       if (response.status == 200){
         var sessionid = response.headers.get('set-cookie').split(';')[0].split('=')[1]
         console.log(sessionid,'ghhghhhh');
         AsyncStorage.setItem("sessionid", JSON.stringify(sessionid))
       return response.json()}
       else if(response.status == 401){
         ToastAndroid.show('Login was not sucessfull..', ToastAndroid.SHORT);
         return
       }
       })
      .then((responseJson) => {
        console.log(responseJson,'ffffffffffffff')
        if(responseJson.pk){
          AsyncStorage.setItem("userpk", JSON.stringify(responseJson.pk))
          AsyncStorage.setItem("login", JSON.stringify(true)).then(res => {
            return  this.props.navigation.navigate('UserDetails')
          })
        }
      })
      .catch((error) => {
        ToastAndroid.show('Login was not sucessfull..', ToastAndroid.SHORT);
      });
  }
  }

  signInWithGoogleAsync = async () => {

  try {
    const result = await Expo.Google.logInAsync({
      androidClientId: '370697243487-7d4q3d937c602slucf99hfbbaat3fb2n.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      console.log(result.user,'gooleee',result.user.email);
      var name  = result.user.name
      var email  = result.user.email
      var fname  = result.user.name
      var lname  = result.user.name

      var data = new FormData();
      data.append( "name", name );
      data.append( "email", email );
      data.append( "fname", fname );
      data.append( "lname", lname );
      data.append( "secretKey", 'Titan@1' );
      console.log(data,'kkkkkkkkkk');

      fetch( 'https://happypockets.in/mobilelogin/', {
        method: 'POST',
        body: data,
      })
      .then((response) =>{
        console.log(response.headers)
       if (response.status == 200){
         var sessionid = response.headers.get('set-cookie').split(';')[0].split('=')[1]
         this.setState({sessionid:sessionid})
         AsyncStorage.setItem("sessionid", JSON.stringify(sessionid))
       return response.json()}
       else if(response.status == 401){
         ToastAndroid.show('Login was not sucessfull..', ToastAndroid.SHORT);
         return
       }
     })
      .then((responseJson) => {
        console.log(responseJson,'ffffffffffffff')
        if(responseJson.pk){
          AsyncStorage.setItem("userpk", JSON.stringify(responseJson.pk))
          AsyncStorage.setItem("login", JSON.stringify(true)).then(res => {
            return  this.props.navigation.navigate('Home',{
              screen:'UserDetails'
            })
          })
        }
      })
      .catch((error) => {
        ToastAndroid.show('Login was not sucessfull..', ToastAndroid.SHORT);

      });

  } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }


}



 sendOtp() {
  if(this.state.mobileNo == undefined){
    ToastAndroid.show('Enter Correct Mobile No', ToastAndroid.SHORT);
  }else{
    var data = new FormData();
    data.append( "id", this.state.mobileNo );
    fetch(SERVER_URL + '/generateOTP/', {
      method: 'POST',
      body: data
    })
    .then((response) =>{
      console.log(response.status)
     if (response.status == 200){
    this.setState({ username: this.state.mobileNo })
    this.setState({ needOTP: true })
     return response.json()}
     else{
       ToastAndroid.show('Mobile no was incorrect...', ToastAndroid.SHORT);
     }})
    .then((responseJson) => {
      this.setState({ OTP: responseJson })
    })
    .catch((error) => {
      ToastAndroid.show('Mobile no was incorrect...', ToastAndroid.SHORT);
    });
  }
}



  logIn(){
  if(this.state.needOTP == false){
    console.log(this.state.username,this.state.password ,'hhh')

    var data = new FormData();
    data.append( "username", this.state.username );
    data.append( "password", this.state.password );
    fetch(SERVER_URL + '/login/?mode=api', {
      method: 'POST',
      body: data,
      headers : {
      }
    })
    .then((response) =>{
      console.log(response)
      if (response.status == 200){
        var sessionid = response.headers.get('set-cookie').split(';')[0].split('=')[1]
        this.setState({sessionid:sessionid})
        AsyncStorage.setItem("sessionid", JSON.stringify(sessionid))
        return response.json()
      }else{
        ToastAndroid.show('Incorrect Username or Password', ToastAndroid.SHORT);
        return
      }})
      .then((responseJson) => {
        console.log(responseJson,'kkkkkkkkkkkkkkkkkkkkkkkkkk');
        AsyncStorage.setItem("csrf", JSON.stringify(responseJson.csrf_token))
        fetch(SERVER_URL + '/api/HR/users/?mode=mySelf&format=json', {
          headers: {
             "Cookie" :"csrftoken="+responseJson.csrf_token+";sessionid=" + this.state.sessionid +";",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Referer': SERVER_URL,
            'X-CSRFToken': responseJson.csrf_token
          },
          method: 'GET'
            })
            .then((response) =>{
              if (response.status !== 200) {
               return;
             }
             else if(response.status == 200){
              return response.json()
             }
           })
        .then((responseJson) => {
            console.log(responseJson,'mode sucesss');
          AsyncStorage.setItem("userpk", JSON.stringify(responseJson[0].pk))
          AsyncStorage.setItem("login", JSON.stringify(true)).then(res => {
                return  this.props.navigation.navigate ('UserDetails')
            });
        })
      })
      .catch((error) => {
        ToastAndroid.show('Incorrect Username or Password', ToastAndroid.SHORT);
      });

  }else{
  var data = new FormData();
  data.append( "username", this.state.username );
  data.append( "otp", this.state.otp );
  fetch(SERVER_URL + '/login/?otpMode=True&mode=api', {
    method: 'POST',
    body: data,
    headers : {
    }
  })
  .then((response) =>{
    console.log(response)
    if (response.status == 200){
      var sessionid = response.headers.get('set-cookie').split(';')[0].split('=')[1]

      this.setState({sessionid:sessionid})
      AsyncStorage.setItem("sessionid", JSON.stringify(sessionid))
      return response.json()
    }
  else{
    ToastAndroid.show('Mobile no was incorrect...', ToastAndroid.SHORT);
  }})
    .then((responseJson) => {
      console.log(responseJson,'kkkkkkkkkkkkkkkkkkkkkkkkkk');
      AsyncStorage.setItem("csrf", JSON.stringify(responseJson.csrf_token))
      fetch(SERVER_URL + '/api/HR/users/?mode=mySelf&format=json', {
        headers: {
           "Cookie" :"csrftoken="+responseJson.csrf_token+";sessionid=" + this.state.sessionid +";",
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Referer': SERVER_URL,
          'X-CSRFToken': responseJson.csrf_token
        },
        method: 'GET'
          })
          .then((response) =>{
            if (response.status !== 200) {
                ToastAndroid.show('Mobile no was incorrect...', ToastAndroid.SHORT);
           }
           else if(response.status == 200){
            return response.json()
           }
         })
      .then((responseJson) => {
          console.log(responseJson,'mode sucesss');
          this.setState({needOTP:false})
        AsyncStorage.setItem("userpk", JSON.stringify(responseJson[0].pk))
        AsyncStorage.setItem("login", JSON.stringify(true)).then(res => {
              return  this.props.navigation.navigate('UserDetails')
          });
      })
    })
    .catch((error) => {
      ToastAndroid.show('Incorrect OTP', ToastAndroid.SHORT);
    });
  }
}



  socialLogin(text){
    if(text == 'facebook'){
      this.props.navigation.navigate('SocialScreen',{
        account:'facebook'
      })
    }
    if(text == 'google'){
      this.props.navigation.navigate('SocialScreen',{
        account:'google'
      })
    }
  }

  logInHome = () => {
     console.log('UserDetails');
     this.props.navigation.navigate('UserDetails')
  }



  render() {

    const { navigate } = this.props.navigation;
    return (

        <View style={[styles.container,{backgroundColor:'#fff'}]}>
        <MyStatusBar backgroundColor="#004863" barStyle="light-content" />
        <View style={styles.contentImage}>


            <Text style={{fontWeight:'700',alignSelf:'center',fontSize:26,color:'#000',paddingVertical:10,paddingTop:50}}>Login</Text>
          </View>
    <View style={{flex: 1,alignItems: 'center',justifyContent: 'flex-start',}}>
     <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
       <Text style={{color:'#fff',fontSize:16,borderWidth:1,borderTopLeftRadius:7,borderBottomLeftRadius:7,borderColor:'#004863',height:45,paddingVertical:9,paddingHorizontal:10,backgroundColor:'#004863',width:50}} >
       +91
       </Text>

       <TextInput style = {{borderWidth:1,borderColor:'#be1f6b',height:40,paddingHorizontal:10,backgroundColor:'#fff',color:'#000',fontSize:16,width:150,height:45}}
                    underlineColorAndroid = "transparent"
                    placeholder = "Mobile No./username"
                    placeholderTextColor = "#000"
                    onChangeText={query => { this.setState({ mobileNo: query });
                      this.setState({ username: query }) }}
                      value={this.state.username}
                    />

        <TouchableOpacity onPress={() => this.sendOtp()}>
         <Text style={{color:'#fff',fontSize:16,width:75,borderWidth:1,borderTopRightRadius:7,borderBottomRightRadius:7,borderColor:'#004863',height:45,paddingVertical:9,paddingHorizontal:10,backgroundColor:'#004863'}}>Get Otp
         </Text>
        </TouchableOpacity>
      </View>
        {this.state.needOTP? <View  style={{flex:1}}>
        <TextInput style={{borderWidth:1,borderRadius:7,borderColor:'#000',width:275,height:40,paddingHorizontal:10,backgroundColor:'#fff',color:'#000',marginHorizontal:1,fontSize:16}} placeholder="OTP" placeholderTextColor='#000' secureTextEntry={true}  keyboardType='numeric' onChangeText={query => { this.setState({ otp: query }); }}
              value={this.state.otp}/>
            </View >:<View style={{flex:1}}>
            <TextInput style={{borderWidth:1,borderRadius:7,borderColor:'#be1f6b',width:275,height:40,paddingHorizontal:10,backgroundColor:'#fff',color:'#000',marginHorizontal:1,fontSize:16}} placeholder="Password" placeholderTextColor='#000' secureTextEntry={true}   onChangeText={query => { this.setState({ password: query }); }}
            value={this.state.password}/>
            </View>}
            <View style={{flex:1,paddingTop:20}}>
                    <TouchableOpacity onPress={() => this.logIn()}>
                         <Text style={{color:'#fff',fontSize:20,fontWeight:'700',width:275,textAlign:'center',borderWidth:1,borderRadius:7,borderColor:'#004863',height:50,marginVertical:0,paddingVertical:9,paddingHorizontal:10,backgroundColor:'#004863'}}>Sign In</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() =>{this.props.navigation.navigate('RegistrationScreen')}} >
                         <Text style={{color:'#000',fontSize:15,fontWeight:'700',marginVertical:10}}>New User?</Text></TouchableOpacity>
                  </View>

      </View>
      <View style={styles.footerPart}>
            <View style={{flex:1,justifyContent:'flex-end',}}>
            </View>
            <View style={{flex:1,justifyContent:'flex-end',}}>
            <TouchableOpacity style={{flex:1,flexDirection:'row',alignItems:'flex-end',}}    onPress={this.signInWithGoogleAsync}>
            <View style={{backgroundColor:'#ffffff',height:40}}>
              <Image style={{width:38,height:40,borderWidth:1,borderColor:'#DA3D29',borderTopLeftRadius:7,borderBottomLeftRadius:7}} source={require('../assets/images/googleicon.png')}  /></View>
              <Text style={{color:'#fff',fontSize:15,fontWeight:'700',width:250,textAlign:'center',borderWidth:1,borderTopRightRadius:7,borderBottomRightRadius:7,borderColor:'#DA3D29',height:40,marginVertical:0,paddingVertical:9,paddingHorizontal:10,backgroundColor:'#DA3D29'}}>Sign In With Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1,flexDirection:'row',alignItems:'flex-end',}}  onPress={this.logInfacebook}>
            <View style={{backgroundColor:'#ffffff'}}>
              <Image style={{width:38,height:40,borderWidth:1,borderColor:'#3B5A9A',borderTopLeftRadius:7,borderBottomLeftRadius:7}} source={require('../assets/images/fbicon.png')}  /></View>
              <Text style={{color:'#fff',fontSize:15,fontWeight:'700',width:250,textAlign:'center',borderWidth:1,borderTopRightRadius:7,borderBottomRightRadius:7,borderColor:'#3B5A9A',height:40,paddingVertical:9,paddingHorizontal:10,backgroundColor:'#3B5A9A'}}>Sign In With Facebook</Text>
            </TouchableOpacity>
            </View>
          </View>

        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentImage:{
    flex: 1,
    alignItems: 'center',
    // marginTop:Constants.statusBarHeight,
    justifyContent: 'flex-start',
  },
  input: {
    width: 200,
    height: 45,
    paddingLeft: 20,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems:'center',
    borderColor: '#000',
    borderWidth:1,

  },
  footerPart:{
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginVertical:20,
    },

    statusBar: {
       backgroundColor: "#004863",
       height: Constants.statusBarHeight,
     },

});
