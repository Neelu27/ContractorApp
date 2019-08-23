import * as WebBrowser from 'expo-web-browser';
import React,{Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,TextInput,
  TouchableOpacity,TouchableHighlight,
  View,Button,Flatlist,ImageBackground,AsyncStorage,Dimensions,Alert
} from 'react-native';
import Constants from 'expo-constants';
import DatePicker from 'react-native-datepicker';
import CheckBox from 'react-native-check-box';
import { Ionicons } from '@expo/vector-icons';
import GradientButton from "react-native-gradient-buttons";
import CartItems from '../components/CartItems';
import Counter from "react-native-counters";
import Feather from 'react-native-vector-icons/Feather';
import { FontAwesome } from '@expo/vector-icons';
import { Kaede } from 'react-native-textinput-effects';
import TimePicker from 'react-native-simple-time-picker';
import { Dropdown } from 'react-native-material-dropdown';



const { width } = Dimensions.get('window');
const height = width * 0.8
const SERVER_URL = 'https://happypockets.in'



export default class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {

       value: '08:00 AM',
      name:'',
      userdetails:[],
      date:'',
      text: '',
      checked: false,
      cartItems:[ ],
      // items:0,
      value:0,
      isFocused:false,
      selectedHours: '00',
   selectedMinutes: '00',
    }

  }


  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      title: 'Create a new request',
      headerLeft:null,
      headerStyle: {
        backgroundColor: '#004863',
      },
      headerTintColor: '#fff',
    }
  };

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



onChange = time => this.setState({ time })





  render() {
    let data = [
      {value: '01:00 AM',},
      {value: '02:00 AM',},
       {value: '03:00 AM',},
       {value: '04:00 AM',},
       {value: '05:00 AM',},
       {value: '06:00 AM',},
       {value: '07:00 AM',},
        {value: '08:00 AM',},
        {value: '09:00 AM',},
        {value: '10:00 AM',},
        {value: '11:00 AM',},
        {value: '12:00 AM',},
        {value: '01:00 PM',},
         {value: '02:00 PM',},
         {value: '03:00 PM',},
          {value: '04:00 PM',},
           {value: '05:00 PM',},
            {value: '06:00 PM',},
             {value: '07:00 PM',},
              {value: '08:00 PM',},
              {value: '09:00 PM',},
              {value: '10:00 PM',},
              {value: '11:00 PM',},
              {value: '12:00 PM',}];
    return (

      <View style={{ flex: 1}}>




        <View style={{marginTop: 10,marginLeft: 5,marginRight:5, flexDirection:'column' }}>
<TouchableHighlight  onPress={() => { this.refs['input'].focus() }}>
  <TextInput
    placeholder='Occasion/venue/Name'
    onChangeText={(text) => this.setState({text})}
    value={this.state.text}
    style={styles.textInput}

     selectionColor={'#004863'}>
  </TextInput>
</TouchableHighlight>



       </View>

              <View style={{flexDirection:'row' ,marginLeft:5,marginRight:5,marginTop:6,marginBottom:10}}>
                <DatePicker
                  style={{width: '60%',fontSize:28,marginLeft:0,marginTop:6}}
                  date={this.state.date}
                  mode="date"
                  placeholder=''

                  format="DD-MM-YYYY"
                  minDate="01-01-2016"
                  maxDate="01-01-2050"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={true}

                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      right: 0,
                      top: 4,
                      marginLeft: 0,

                      },
                    dateInput: {
                      marginRight: 0,
                      borderRadius:10 ,
                      borderColor:'#004863',
                      fontSize:28,
                      paddingLeft:10,
                      alignItems:'flex-start',
                      paddingHorizontal:4,
                      color:'black',
                      marginRight:4
                    }
                  }}

                  onDateChange={(date) => {this.setState({date: date})}}/>

                <View style={{flex:1,top:5,color:'#000'}}>
                  <Dropdown
                      placeholder='08:00 AM'
                      data={data}
                      value='08:00 AM'
                      dropdownOffset={{top:8}}
                      containerStyle={{borderWidth:1, borderColor:'#004863', borderRadius:10, paddingLeft:10,height:40}}
                      rippleCentered={true}
                      inputContainerStyle={{ borderBottomColor: 'transparent',fontSize:20 }}
                      pickerStyle={{borderWidth:0,  borderRadius:10, paddingLeft:10,width:150 ,marginLeft:240,marginTop:80}}
                    />
                  </View>


          </View>




               <View style={{flex:3.5,flexDirection:'row',marginRight:10}}>
                 <CartItems/>
                  </View>




       <View style={{flex:0.5,  marginLeft:15, marginRight:15}}>

               <TouchableOpacity  style={styles.submit} underlayColor='#004863' activeOpacity={0.2}>
             <GradientButton
                    style={{ marginRight:10,
                    marginLeft:10,
                    marginTop:0,
                    paddingTop:10,
                    paddingBottom:0,borderRadius:50, }}
                    textStyle={{ fontSize: 24 }}
                    text="Request"
                    height={50}
                    gradientBegin="#cc0b79"
                    gradientEnd="#f92a2a"
                    gradientDirection="diagonal"
                    impact
                    onPressAction={()=>this.props.navigation.navigate('DetailsScreen')}
                  />
                </TouchableOpacity>

        </View>

    </View>
    );
  }
}
const styles = StyleSheet.create({
  imgBackground: {
          width: '100%',
          height: '100%',
          flex: 1
  },

     lineStyle:{
      borderWidth: 0.5,
      borderColor:'#004863',
      shadowColor:'#004863',
      shadowRadius:2,
      marginLeft:10,
      marginRight:10,
      marginTop:15
 },
 img: {
   height:'120%',
   width:'100%',
 },

  textInput:{
    height: 40,
    width:'100%',
    borderColor: 'black',
    borderWidth: 1,
    // fontSize:18,
    borderRadius:10,
    borderColor:'#004863',
    paddingHorizontal:8,

  },
   imgBackground: {
           width: '100%',
           height: '100%',
           flex: 1,
   },

box:{

  borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#004863',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    width: 100,
    marginTop:4,
    height:100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding:6
},
submit:{

  marginRight:10,
  marginLeft:10,
  paddingBottom:10,
  borderRadius:50,
},
input: {

    height: 40,
    // backgroundColor: '#f2f2f2',
    borderColor:'#004863',
    borderWidth: 1,
    marginLeft: 10,
    padding: 8,
    color: '#000',
    borderRadius: 7,
    fontSize: 16,
    fontWeight:'700'

},
footer: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'absolute',
  bottom: 0,
  right: 0,
  left: 0,
  height: width * 0.15,
  borderWidth: 0,
},
account:{
  flexWrap: 'nowrap',
  justifyContent: 'center',
  alignItems: 'center',
},


});


//           <Kaede
//   label={'Occasion/venue/Name'}
//   inputPadding={8}
//   onChangeText={(text) => this.setState({text})}
//   value={this.state.text}
//   labelStyle={{ color: 'white',backgroundColor:'#d23990',borderRadius:10,height:20}}
//   inputStyle={{ color: '#000',backgroundColor:'#fbe3f1',borderRadius:10,height:20 }}
//   labelContainerStyle={{ padding: 8,color:'#ab698f',height:20,borderRadius:10, }}
//   labelBackgroundColor='#af1d67'
//   inputContainerStyle={{height:20,padding: 8,borderWidth:1,borderColor:'#c4197a' }}
//   autoCapitalize={'none'}
//   autoCorrect={false}
//
// />
//  <TouchableOpacity onPress={()=>{this.qtyDecrease}}>
//   <View style={{width:60, borderWidth: 1,borderRadius:20, borderColor: '#ee347d', backgroundColor : '#de4170', height: 40, paddingTop:4,}}>
//     <Text style={{textAlign: 'center', color:'white', fontSize:24}} >-</Text>
//   </View>
// </TouchableOpacity>
// <View style={{width:50, textAlign: 'center',  borderColor: '#de4170', height: 40, paddingTop:4}}>
//            <Text style={{textAlign: 'center', fontSize:24}} >{this.state.items}</Text>
//          </View>
//
//
// <TouchableOpacity onPress={()=>this.qtyincrease}>
//   <View style={{width:60, textAlign: 'center',borderRadius:20, borderWidth: 1, borderColor: '#ee347d', backgroundColor : '#de4170',height: 40, paddingTop:4}}>
//     <Text style={{textAlign: 'center', color:'white', fontSize:24}} >+</Text>
//   </View>
// </TouchableOpacity>
//   qtyDecrease = ()=>{
//
//
//       this.setState({items:this.state.items-1})
//             console.log(items);
//     }
//
//     qtyincrease = ()=>{
//
//       this.setState({items:this.state.items+1})
// console.log(items);
//     }
  // var item = this.state.items+1;
// var item = this.state.items
//   if(item==1){
//
//     this.setState({items:this.state.items-1})
//     return
//   }
//   item = item-1;
// { name: 'gdhghghghj', img:require('../assets/images/images2.jpeg'),count:'0'},{name: 'gdhghghghj', img:require('../assets/images/images2.jpeg'),count:'0'},{ name: 'gdhghghghj', img:require('../assets/images/images2.jpeg'),count:'0'},
//  { name: 'gdhghghghj', img:require('../assets/images/images2.jpeg'),count:'0' }
  // <Image style={styles.img} source={require('../assets/images/images.jpeg')}/></View>
// <View style={{marginTop: 10,marginLeft: 15,marginRight:15}}>
//   <TextInput
//     placeholder='Occasion'
//     style={{height: 50, borderColor: 'black', borderWidth: 1,fontSize:24}}
//     onChangeText={(text) => this.setState({text})}
//     value={this.state.text} >
//   </TextInput>
// </View>

          // <Ionicons name="md-checkmark-circle" size={32} color="green" />
// <View style={{height:Constants.statusBarHeight,backgroundColor:'#be1f6b'}}></View>
// <Button style={{backgroundColor:'#b0287e',color:'#a63b78'}} title='Request' onPress={()=>this.props.navigation.navigate('DetailsScreen')} />
//    <View style={{flex:1,flexDirection:'row',marginTop:10,marginLeft:15,marginRight:15}}>
//   <View style={styles.box}>
//
//       <ImageBackground style={ styles.imgBackground } resizeMode='cover' source={require('../assets/images/images2.jpeg')}>
//        <CheckBox on={true}
//        onClick={()=>{this.setState({isChecked:!this.state.isChecked})}}
//      isChecked={this.state.isChecked}
//        />
//       </ImageBackground>
//
//   </View>
//   <View style={styles.box}>
//         <ImageBackground style={ styles.imgBackground } resizeMode='cover' source={require('../assets/images/images3.jpeg')}>
//           <CheckBox on={true}
//             onClick={()=>{this.setState({isChecked:!this.state.isChecked})}}
//             isChecked={this.state.isChecked}/>
//         </ImageBackground>
//   </View>
//   </View>
//   <View style={{flex:1,flexDirection:'row',marginTop:20,marginLeft:15,marginRight:15,}}>
//  <View style={styles.box}>
//      <ImageBackground style={ styles.imgBackground } resizeMode='cover' source={require('../assets/images/images4.jpeg')}>
//       <CheckBox on={true}
//       onClick={()=>{this.setState({isChecked:!this.state.isChecked})}}
//       isChecked={this.state.isChecked}/>
//      </ImageBackground>
//
//  </View>
//  <View style={styles.box}>
//        <ImageBackground style={ styles.imgBackground } resizeMode='cover' source={require('../assets/images/images4.jpg')}>
//          <CheckBox on={true}
//            onClick={()=>{this.setState({isChecked:!this.state.isChecked})}}
//            isChecked={this.state.isChecked}/>
//        </ImageBackground>
//  </View>
//  </View>
//  <View style={{flex:1,flexDirection:'row',marginTop:20,marginLeft:15,marginRight:15,marginBottom:10}}>
// <View style={styles.box}>
//     <ImageBackground style={ styles.imgBackground } resizeMode='cover' source={require('../assets/images/images3.jpeg')}>
//      <CheckBox on={true}
//      onClick={()=>{this.setState({isChecked:!this.state.isChecked})}}
//      isChecked={this.state.isChecked}/>
//     </ImageBackground>
//
// </View>
// <View style={styles.box}>
//       <ImageBackground style={ styles.imgBackground } resizeMode='cover' source={require('../assets/images/11.jpeg')}>
//         <CheckBox on={true}
//           onClick={()=>{this.setState({isChecked:!this.state.isChecked})}}
//           isChecked={this.state.isChecked}/>
//       </ImageBackground>
// </View>
// </View>
