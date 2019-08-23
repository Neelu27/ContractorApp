import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput,TouchableOpacity,AsyncStorage,Dimensions,Modal, TouchableHighlight, Alert,StatusBar,SafeAreaView} from 'react-native'
import GradientButton from "react-native-gradient-buttons";
import Constants from 'expo-constants';

const SERVER_URL = 'https://happypockets.in'
const { width } = Dimensions.get('window');
const height = width * 0.8
const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

  export default class UserDetails extends Component {

  static navigationOptions = {

    header:null
  };


  constructor(props){
    super(props);
    this.state = {
      username: '',
      email:'',
      mobile:'',
      gstNumber:'',
      comapanyName:'',
      name:'',
      userdetails:[],


    }

  }
  state = {
    showModalbutton:true,
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
          this.setState({ mobile: responseJson.mobile})

         console.log(this.state.profileName,'lllllllllllllllllllllllllllll');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount(){
    this.getUserAsync()
  }

  registration = () => {
    console.log('DevelopScreen');
    this.props.navigation.navigate('DevelopScreen')
 }

  render() {

    const { navigate } = this.props.navigation;
    return (





<View>
<MyStatusBar backgroundColor="#004863" barStyle="light-content" />
      <View style={styles.Maincontainer}>
    
<View style={styles.contentImage}>
        <Text style={{fontWeight:'700',alignSelf:'center',fontSize:26,color:'#004863',paddingVertical:10,paddingTop:50}}>User Details</Text>
  </View>

                <Text style = {[styles.input]}>Name: {this.state.name} {this.state.lname}</Text>



                  <TextInput style = {[styles.input]}
                   underlineColorAndroid = "transparent"
                   placeholder = "Email"
                   placeholderTextColor = "#004863"
                   autoCapitalize = "none"
                   />

                   <TextInput style = {[styles.input]}
                     underlineColorAndroid = "transparent"
                     placeholder = "Mobile no."
                     placeholderTextColor = "#004863"
                     autoCapitalize = "none"
                     returnKeyLabel = {"next"}
                     onChangeText={(text) => this.setState({mobile:text})}/>

                 <TextInput style = {styles.input}
                   underlineColorAndroid = "transparent"
                   placeholder = "Company Name"
                   placeholderTextColor = "#004863"
                   autoCapitalize = "none"
                   returnKeyLabel = {"next"}
                   onChangeText={(text) => this.setState({comapanyName:text})}/>

                 <TextInput style = {styles.input}
                   underlineColorAndroid = "transparent"
                   placeholder = "GST Number"
                   placeholderTextColor = "#004863"
                   autoCapitalize = "none"
                   returnKeyLabel = {"next"}
                   onChangeText={(text) => this.setState({gstNumber:text})}/>






                       <TouchableOpacity  style={[styles.submit,{paddingBottom:55}]} underlayColor='#004863' activeOpacity={0.2}>
                     <GradientButton
                            style={{ marginRight:10,
                            marginLeft:10,
                            marginTop:10,
                            paddingTop:10,
                            paddingBottom:0,borderRadius:50, }}
                            textStyle={{ fontSize: 24 }}
                            text="Save"
                            height={50}
                            width={width*0.78}
                            gradientBegin="#004863"
                            gradientEnd="#004863"
                            gradientDirection="diagonal"
                            impact
                            onPressAction={() => this.registration()}
                          />
                        </TouchableOpacity>



      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Maincontainer: {
    alignSelf:'center',
    // backgroundColor: '#2F7ECC',
    alignItems: 'center',
    justifyContent: 'center',

  },
  input: {
    width:width*0.8,
      height: 40,
      backgroundColor: '#fff',
      borderColor:'#004863',
      borderWidth: 1,
      margin: 15,
      padding: 8,
      color: '#004863',
      borderRadius: 7,
      fontSize: 16,

 },



contentImage:{
alignItems: 'center',
// marginTop:Constants.statusBarHeight,
justifyContent: 'flex-start',
},
submit:{
  flex:1,
  marginRight:10,
  marginLeft:10,
  paddingBottom:10,
  borderRadius:50,
  justifyContent: 'flex-end',
},
statusBar: {
   backgroundColor: "#004863",
   height: Constants.statusBarHeight,
 },

});


//
// <Text style = {[styles.input]}>Email:{this.state.email}</Text>
// <Text style = {[styles.input]}>Mobile:{this.state.mobile}</Text>
// <Text style = {[styles.input]}>Company Name:{this.state.comapanyName}</Text>
// <Text style = {[styles.input]}>GST Number:{this.state.gstNumber}</Text>

// <Modal
//           animationType="slide"
//           transparent={false}
//           visible={this.state.modalVisible}
//           onRequestClose={() => {
//             Alert.alert('Data Modal has been Saved.');
//           }}>
//           <View style={{marginTop: 22}}>
//             <View>
//             <TextInput style = {[styles.input]}
//               underlineColorAndroid = "transparent"
//               placeholder = {this.state.email}
//               placeholderTextColor = "#004863"
//               autoCapitalize = "none"
//               />
//
//               <TextInput style = {[styles.input]}
//                 underlineColorAndroid = "transparent"
//                 placeholder = "Number"
//                 placeholderTextColor = "#004863"
//                 autoCapitalize = "none"
//                 returnKeyLabel = {"next"}
//                 onChangeText={(text) => this.setState({mobile:text})}/>
//
//             <TextInput style = {styles.input}
//               underlineColorAndroid = "transparent"
//               placeholder = "Company Name"
//               placeholderTextColor = "#004863"
//               autoCapitalize = "none"
//               returnKeyLabel = {"next"}
//               onChangeText={(text) => this.setState({comapanyName:text})}/>
//
//             <TextInput style = {styles.input}
//               underlineColorAndroid = "transparent"
//               placeholder = "GST Number"
//               placeholderTextColor = "#004863"
//               autoCapitalize = "none"
//               returnKeyLabel = {"next"}
//               onChangeText={(text) => this.setState({gstNumber:text})}/>
//
//               <TouchableHighlight style = {{color:'#000'}}
//                 onPress={() => {
//                   this.setModalVisible(!this.state.modalVisible);
//                 }}>
//                 <Text >Hide Modal</Text>
//               </TouchableHighlight>
//             </View>
//           </View>
//         </Modal>
// { this.state.showModalbutton && <TouchableHighlight
// onPress={() => {
// this.setModalVisible(true);
// }}>
// <Text>Edit</Text>
// </TouchableHighlight>
// }
