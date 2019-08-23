import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Slider,
  Dimensions,
  TextInput,FlatList,AsyncStorage,ToastAndroid,statusBar,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
// import { FontAwesome } from '@expo/vector-icons';
import GradientButton from "react-native-gradient-buttons";
import { MonoText } from '../components/StyledText';
import { Constants } from 'expo';


const { width } = Dimensions.get('window');
const height = width * 0.8
const SERVER_URL = 'https://happypockets.in'



export default class RegistrationScreen extends React.Component {

  static navigationOptions = {
    header:null
  };

  constructor(props){
    super(props);
    this.state = {
      needOTP : false,
      agree:false,
      checked:false,
    }

  }

  getOtp() {
    if(this.state.mobileNo == undefined){
       ToastAndroid.show('Mobile no was incorrect ', ToastAndroid.SHORT);
    }else if(this.state.checked == false){
      ToastAndroid.show('Agree the Terms And Condition ', ToastAndroid.SHORT);
    }else{
      var data = new FormData();
      data.append( "mobile", this.state.mobileNo );
      fetch(SERVER_URL + '/api/homepage/registration/', {
        method: 'POST',
        body: data
      })
      .then((response) =>{console.log(response.status)
        if(response.status == 200 || response.status==201 ){
          var d = response.json()
          this.setState({ needOTP: true })
          return d
        }else{
          ToastAndroid.show('Mobile No Already register with user ', ToastAndroid.SHORT);
        }
      })
      .then((responseJson) => {
         this.setState({ userPk: responseJson.pk,token:responseJson.token,mobile:responseJson.mobile,username:this.state.mobileNo })
          })
      .catch((error) => {
        return
      });
    }
  }

  SignIn(){
    if(this.state.otp == undefined){
      return
    }else{
      var data = new FormData();
      data.append( "reg", this.state.userPk );
      data.append( "token", this.state.token );
      data.append( "mobileOTP", this.state.otp );
      data.append( "mobile", this.state.username );
      data.append( "agree", this.state.checked );
      fetch(SERVER_URL + '/api/homepage/registration/'+ this.state.userPk+'/', {
        method: 'PATCH',
        body: data
      })
      .then((response) =>{
        console.log(response.status,'final')
       var d = response.json()
      })
      .then((responseJson) => {
          this.props.navigation.navigate('LogInScreen')
          })
      .catch((error) => {
        console.error(error);
      });
    }
  }


    render() {
      const { navigation } = this.props;
      const color = navigation.getParam('color','#fff')
      return (

        <View style={[styles.container,{backgroundColor:'#004863'}]}>
          <View style={styles.contentImage}>

            <Text style={{fontWeight:'700',alignSelf:'center',fontSize:26,color:'#fff',paddingVertical:10,marginTop:30}}>Registration</Text>
          </View>
          <View style={styles.logInPart}>
            <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <Text style={{color:'#000',fontSize:16,borderWidth:1,borderTopLeftRadius:7,width:width*0.15,borderBottomLeftRadius:7,borderColor:'#f2f2f2',height:40,paddingVertical:9,paddingHorizontal:10,backgroundColor:'#f2f2f2'}}>+91</Text>
              <TextInput style={{borderWidth:1,width:width*0.48,height:40,paddingHorizontal:10,backgroundColor:'#fff',color:'#000',fontSize:16,borderColor:'#f2f2f2',}}  placeholder="Enter Mobile No" placeholderTextColor='#000' keyboardType='numeric' onChangeText={query => { this.setState({ mobileNo: query }); }}
              value={this.state.mobileNo} />
              <TouchableOpacity onPress={() => this.getOtp()}><Text style={{color:'#000',fontSize:16,width:width*0.22,borderWidth:1,borderTopRightRadius:7,borderBottomRightRadius:7,borderColor:'#f2f2f2',height:40,paddingVertical:9,paddingHorizontal:10,backgroundColor:'#f2f2f2'}}>Get Otp</Text></TouchableOpacity>
            </View>
            {!this.state.needOTP? <View  style={{flexDirection:'row',paddingLeft:35, paddingRight:55}}>
            <CheckBox
              containerStyle={{backgroundColor:'#004863',}}
              textStyle={{color:'#004863',}}
              center
              checkedColor="#fff"
              uncheckedColor="#000"
              // title='I have read, understood, and I agree to the " Terms and Conditions " set forth by CIOC.'
              checked={this.state.checked}
              onPress={() => this.setState({checked: !this.state.checked,})}
              />
              <TouchableOpacity onPress={() => {this.props.navigation.navigate('TermsConditionScreen')}}><Text style={{color:'#fff',fontSize:15,fontWeight:'700',marginVertical:10}}>I have read, understood, and I agree to the " Terms and Conditions " set forth by CIOC.</Text></TouchableOpacity>
            </View >:<View></View>}
            {this.state.needOTP? <View  style={{flex:1}}>
              <TextInput style={{borderWidth:1,borderRadius:7,borderColor:'#fff',width:width*0.85,height:40,paddingHorizontal:10,backgroundColor:'#fff',color:'#000',marginHorizontal:1,fontSize:16}} placeholder="OTP" placeholderTextColor='#000' secureTextEntry={true} onChangeText={query => { this.setState({ otp: query }); }}
              value={this.state.otp}/>
            </View >:<View></View>}
            <View style={{flex:1}}>
              <TouchableOpacity onPress={() => {
              if(this.state.otp == undefined){
                this.getOtp()
              }else{
                this.SignIn()
              }}}><Text style={{color:'#004863',fontSize:20,fontWeight:'700',width:width*0.85,textAlign:'center',borderWidth:1,borderRadius:7,borderColor:'#fff',height:50,marginVertical:0,paddingVertical:9,paddingHorizontal:10,backgroundColor:'#fff'}}>SUBMIT</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => {this.props.navigation.navigate('LogInScreen')}}><Text style={{color:'#fff',fontSize:15,fontWeight:'700',marginVertical:10}}>Already User?</Text></TouchableOpacity>
            </View>
          </View>
          <View style={styles.footerPart}>
            <View style={{flex:1,justifyContent:'flex-end',}}>
            </View>
            <View style={{flex:1,justifyContent:'flex-end',}}>

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
      justifyContent: 'space-between',

    },
    contentImage:{
      flex: 1,
      alignItems: 'center',

      // marginTop:Constants.statusBarHeight,
      justifyContent: 'flex-start',
    },
    logInPart:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    footerPart:{
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginVertical:20,
    },
    image:{
      width:width,
      height:width*0.2
    },
    statusBar: {
       backgroundColor: "#004863",
       height: Constants.statusBarHeight,
     },

  });
