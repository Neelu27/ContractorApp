import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput,AsyncStorage,TouchableOpacity,Image,Dimensions,Alert} from 'react-native'

const { width } = Dimensions.get('window');
const height = width * 0.8
const SERVER_URL = 'https://happypockets.in'


  export default class HomeScreen extends Component {
  static navigationOptions = {
        header:null
  };


  constructor(props){
    super(props);
    this.state = {
      name:'',
      userdetails:[]
    }

  }

  getUserAsync = async () => {
    const userToken = await AsyncStorage.getItem('userpk');
    const sessionid = await AsyncStorage.getItem('sessionid');
    if(userToken == null){
      return
    }

    fetch(SERVER_URL + '/api/HR/users/'+ userToken + '/', {
      headers: {
         "Cookie" :"sessionid=" + sessionid +";",
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Referer': SERVER_URL
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson,'ppppppppppp');
        this.setState({ userdetails: responseJson})
        this.setState({ name: responseJson.first_name})
        this.setState({ email: responseJson.email})
        this.setState({ lname: responseJson.last_name})
         console.log(this.state.profileName,'lllllllllllllllllllllllllllll');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount(){
    this.getUserAsync()
  }
  logout=()=>{
    new Promise((resolve, reject) => {
        Alert.alert(
            'Confirm',
            'Are you sure want to Logout?',
            [
                {text: "Yes", onPress: () => {
                  try {
                     AsyncStorage.removeItem('userpk')
                     AsyncStorage.removeItem('sessionid')
                     AsyncStorage.removeItem('csrf')
                     AsyncStorage.removeItem('cart')
                     AsyncStorage.setItem("login", JSON.stringify(false))
                     this.props.navigation.navigate('LogInScreen')
                   } catch (error) {
                     return
                   }

                 } },
                 {
                   text: 'No',
                   onPress: () => {return},
                   style: 'cancel',
                 },
            ],
            { cancelable: false }
        )
    })

  }


  render() {

    const { navigate } = this.props.navigation;
    return (
      <View style={[styles.Maincontainer,{marginTop:50}]}>
  <View style={[styles.container]}>

      <TextInput style = {styles.input}
        underlineColorAndroid = "transparent"
        placeholder = {this.state.name}
        placeholderTextColor = "#000"
        autoCapitalize = "none"/>
        <Text style = {{width:width*0.48}}></Text>

        <TouchableOpacity onPress = { () => this.logout()  }>
        <Image style={{width:38,height:40,borderWidth:1,borderColor:'#fff',borderTopLeftRadius:7,borderBottomLeftRadius:7}} source={require('../assets/images/logout.png')}  />
        </TouchableOpacity>
</View>

<Text style={{fontWeight:'700',alignSelf:'center',fontSize:26,color:'#000',paddingVertical:10,paddingTop:50}}>Home Screen</Text>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  Maincontainer: {

    // backgroundColor: '#2F7ECC',
    alignItems: 'center',
    justifyContent: 'center',

  },

  container: {

    flexDirection:'row',
    // backgroundColor: '#2F7ECC',
    // alignItems: 'center',
    // justifyContent: 'center',

  },
  input: {

      height: 40,
      backgroundColor: '#f2f2f2',
      borderColor:'#f2f2f2',
      borderWidth: 1,
      marginLeft: 10,
      padding: 8,
      color: '#000',
      borderRadius: 7,
      fontSize: 16,
      fontWeight:'700'

 },

});
