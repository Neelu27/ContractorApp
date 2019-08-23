import React, {
  Component
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  AsyncStorage,Alert
} from 'react-native';
import Constants from 'expo-constants';
import OrderCard from '../components/OrderCard';
import {
  FontAwesome
} from '@expo/vector-icons';



const SERVER_URL = 'https://happypockets.in'

export default class DetailsScreen extends Component {

  static navigationOptions = ({navigation}) => {
   const {params = {}  } = navigation.state
   return {
     // title: params ? params.name : 'Name',
      headerLeft: (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end',alignItems:'center' }}>
      <TouchableOpacity style={{ marginHorizontal: 8 }}  onPress={()=>params.handleProfile()} ><Text style={{fontSize:20,color:"#fff",fontWeight:'700'}}> {params ? params.name : 'Name'} </Text></TouchableOpacity>

      </View>
    ),
     headerRight: (
     <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end',alignItems:'center' }}>
     <TouchableOpacity style={{ marginHorizontal: 8 }}  onPress={()=>params.handleHelp()} ><Text style={{fontSize:20,color:"#fff",fontWeight:'700'}}><FontAwesome name="info" size={20} color="#fff" />  </Text></TouchableOpacity>
       <TouchableOpacity style={{ marginHorizontal: 8 }}  onPress={()=>params.handleLogout()} ><Text style={{fontSize:20,color:"#fff",fontWeight:'700'}}><FontAwesome name="sign-out" size={30} color="#fff" />  </Text></TouchableOpacity>
     </View>
   ),
     headerStyle: {
       backgroundColor: '#004863',
     },
     headerTintColor: '#fff',
   }
 };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      userdetails: [],
      FlatListItems: [{
          usimg: require('../assets/images/people.png'),
          user: '10',
          dur: '8 Hours',
          gst: '(Excluded GST)',
          id: '#101',
          dt: '07-Aug-2019 ',
          status: 'Catering Staff For',
          tym: '11:04 am',
          name: 'Hotel TAJ',
          price: '20,000/-',
          img: require('../assets/images/Processing.png')
        },
        {
          usimg: require('../assets/images/people.png'),
          user: '20',
          dur: '2 Hours',
          gst: '(Excluded GST)',
          id: '#100',
          dt: '06-Aug-2019 ',
          status: 'BusyBoy For',
          tym: '10:04 am',
          name: 'Hotel RestoCafe',
          price: '10,000/-',
          img: require('../assets/images/Processing.png')
        },
        {
          usimg: require('../assets/images/people.png'),
          user: '13',
          dur: '24 Hours',
          gst: '(Excluded GST)',
          id: '#99',
          dt: '05-Aug-2019 ',
          status: 'Catering Staff For',
          tym: '09:04 am',
          name: 'Hotel Naj',
          price: '15,000/-',
          img: require('../assets/images/recent.png')
        },
        {
          usimg: require('../assets/images/people.png'),
          user: '8',
          dur: '15 Hours',
          gst: '(Excluded GST)',
          id: '#98',
          dt: '04-Aug-2019 ',
          status: 'Catering Staff For',
          tym: '08:04 am',
          name: 'Hotel Raj',
          price: '25,000/-',
          img: require('../assets/images/Processing.png')
        },
        {
          usimg: require('../assets/images/people.png'),
          user: '15',
          dur: '10 Hours',
          gst: '(Excluded GST)',
          id: '#97',
          dt: '03-Aug-2019 ',
          status: 'Catering Staff For',
          tym: '07:04 am',
          name: 'Hotel Raj',
          price: '20,000/-',
          img: require('../assets/images/recent.png')
        }
      ],
    };
  }

  getUserAsync = async () => {
    const userToken = await AsyncStorage.getItem('userpk');
    const sessionid = await AsyncStorage.getItem('sessionid');
    if (userToken == null) {
      return
    }

    fetch(SERVER_URL + '/api/HR/users/' + userToken + '/', {
        headers: {
          "Cookie": "sessionid=" + sessionid + ";",
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Referer': SERVER_URL
        }
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson, 'ppppppppppp');
        this.setState({
          userdetails: responseJson
        })
        this.setState({
          first_name: responseJson.first_name
        })
        console.log(this.state.first_name, 'lllllllllllllllllllllllllllll');
        var username = 'Hi ' + this.state.first_name
        this.props.navigation.setParams({
          name: username
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
      this.getUserAsync()
      this.props.navigation.setParams({
        handleHelp: this.help,
        handleLogout: this.logout,
        handleProfile: this.profileDetails,

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
  help = () => {
    console.log('TermsConditionScreen');
    this.props.navigation.navigate('TermsConditionScreen',{
     color:'#efa834'
   })
 }
 profileDetails = () => {
   console.log('UserDetails');
   this.props.navigation.navigate('UserDetails')
}



  render() {
    return (
      <View style={{ flex: 1}}>
        <View style={styles.maincontainer}>
        <FlatList
          data={this.state.FlatListItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item,index }) => (
            <OrderCard item={item} navigate={this.props.navigation.navigate} />
          )}
        />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={()=>this.props.navigation.navigate('DevelopScreen')}
            style={styles.TouchableOpacityStyle}>
          <FontAwesome name="plus" size={20} color="#fff"  />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    left: 30,
    bottom: 20,
    backgroundColor: '#004863',
    zIndex: 1,
    borderRadius: 20,

  },
});
