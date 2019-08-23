import React from 'react';

import { StyleSheet, FlatList, Text,Image, View, Alert,Dimensions,TouchableHighlight,TouchableOpacity,ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Counter from "react-native-counters";
import Feather from 'react-native-vector-icons/Feather';
const { width } = Dimensions.get('window');

export default class CartItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [
               { name:'Chef',         img:require('../assets/images/chefwire.png'),             icon:false,addButton:true,},
               { name: 'Carpenter',   img:require('../assets/images/carpenterwire.png'),        icon:false,addButton:true,},
               { name: 'Painter',     img:require('../assets/images/painterwire.png'),          icon:false,addButton:true,},
               { name: 'Labor',       img:require('../assets/images/laborwire.png'),            icon:false,addButton:true,},
               { name: 'Busboywire',  img:require('../assets/images/Busboywire.png'),           icon:false,addButton:true,},
               { name: 'Designre',    img:require('../assets/images/interiorDesignrewire.png'), icon:false ,addButton:true,},
               { name: 'Stageplaner', img:require('../assets/images/stageplannerwire.png'),     icon:false,addButton:true,},
               { name: 'Dishwash',    img:require('../assets/images/dishwasherwire.png'),       icon:false,addButton:true,},
               { name: 'Flowerist',   img:require('../assets/images/floweristwire.png'),        icon:false,addButton:true,},
               { name: 'Electrician', img:require('../assets/images/electricianwire.png'),      icon:false,addButton:true, },
               { name: 'Supervisor',  img:require('../assets/images/supervisorwire.png'),       icon:false,addButton:true,},
               { name: 'Gateman',     img:require('../assets/images/Gatemanwire.png'),          icon:false,addButton:true,},
               { name: 'Cleaner',  img:require('../assets/images/cleanerwire.png'),             icon:false,addButton:true,},
               { name: 'Server',     img:require('../assets/images/serverwire.png'),            icon:false,addButton:true,},
               ],

add:false,
count:0,
    };
  }


  GreenIcon(item,index) {
          console.log(index);
          var items = this.state.cartItems

          if(items[index].icon  ){
            items[index].icon =false
            items[index].addButton=true
              }else{
              items[index].icon = true
                 items[index].addButton=false
               }

          this.setState({
            cartItems:items,
          });



          console.log(this.state.cartItems,'lllllllllll');
        }


          onChange(number, type) {
            console.log(number, type)
          };



          decreaseCart = ()=>{

                 if(this.state.count==0){
                     this.setState({count:this.state.count})
                 return
               }

              this.setState({count:this.state.count-1})
            }

  increaseCart = ()=>{


    this.setState({count:this.state.count+1})
  }

  render() {
    return (
      <View style={[styles.MainContainer]}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList

          data={this.state.cartItems}
          extraData={this.state}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item,index }) => (
            <TouchableOpacity style={{flex:1,paddingTop:0,marginTop:0,}} onPress={()=>this.GreenIcon(item.icon,index)} activeOpacity={1}>
                 <Card containerStyle={[styles.shadow, {flex:1,padding:0,marginTop:0,marginBottom:14, borderWidth: 1,width:160,height:160, borderColor: '#fff', borderRadius: 7 }]}   >
                      <View style={{padding:2,paddingLeft:4,backgroundColor:'#004863',borderTopLeftRadius:7,borderTopRightRadius:7}}>
                        <Text style={{color:'#ffffff',fontSize:20}}>{item.name}</Text></View>

                        <View style={{paddingHorizontal:2,width:160,height:100}}><Image source={item.img} style={{width:width*0.3,height:width*0.27,marginLeft:10}}/></View>
                         { item.icon ?<View style={{backgroundColor:'#ffffff', flexDirection: 'row', height: 30,paddingTop:0,borderBottomLeftRadius:7,borderBottomRightRadius:7, padding:0,}}>
                         <TouchableOpacity onPress={()=>{this.decreaseCart(item,index )}} activeOpacity={1}>
                           <View style={{width:52, borderWidth: 0, borderColor: '#004863', backgroundColor : '#004863', height: 30, paddingBottom:10,borderRadius:0,alignItems:'center',borderBottomLeftRadius:7,}}>
                             <Text style={{textAlign: 'center', color:'white',paddingBottom:4,fontSize:25}} >-</Text>
                           </View>
                         </TouchableOpacity>

                         <View style={{width:54, textAlign: 'center', borderWidth:0, borderColor: '#004863', height:30, paddingTop:3,fontSize:25}}>
                           <Text style={{textAlign: 'center',fontSize:20}} >{this.state.count}</Text>
                         </View>

                         <TouchableOpacity onPress={()=>this.increaseCart(item,index)} activeOpacity={1}>
                           <View style={{width:52, textAlign: 'center', borderWidth: 0, borderColor: '#004863', backgroundColor : '#004863', height: 30, paddingBottom:10,borderRadius:0,alignItems:'center',borderBottomRightRadius:7}}>
                             <Text style={{textAlign: 'center', color:'white',fontSize:25}} >+</Text>
                           </View>
                         </TouchableOpacity>

                       </View>:<View style={{ padding:2,backgroundColor:'#fff',borderBottomLeftRadius:7,borderBottomRightRadius:7}}><Text style={{color:'#004863',fontSize:20,textAlign:'center',}}>Add</Text>
                     </View>
                       }

                 </Card>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 3,

    paddingHorizontal:2,
    paddingTop:0,
    margin:0,
  },
  item: {
    // paddingHorizontal: 2,
    fontSize:10,
    backgroundColor:'#9d0b6b',
    borderRadius:10,
    color:'white',

  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageView: {

    width: '100%',
    height: '100%',

    borderRadius : 7,
    position:'relative',
    left: 0,
    bottom:0,
    top:0,

},
});
// <Image source={{require:item.img}} style={styles.imageView} />
// {item.icon?<View style={{flex: 1,justifyContent:'flex-end',alignItems:'flex-end',position:'absolute',right:4,top:4}}><Ionicons name="md-checkmark" color="#fff" size={25} /></View>:<View></View>}
