import React from 'react';

import { StyleSheet, FlatList, Text, Image, View, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
export default class OrderCard extends React.Component {
  constructor(props) {
    super(props);
    var item = props.item;
    this.state = {
      id: item.id,
      usimg: item.usimg,
      dur: item.dur,
      user: item.user,
      gst: item.gst,
      price: item.price,
      tym: item.tym,
      dt: item.dt,
      name: item.name,
      status: item.status,
      img: item.img,
      item: item,

    };
  }

  getItem() {
    var ele = 'UserImage: ' + this.state.usimg + 'Duration: ' + this.state.dur + 'USER: ' + this.state.user + 'GST: ' + this.state.gst + 'Price: ' + this.state.price + 'Time: ' + this.state.tym + 'Date: ' + this.state.dt + 'Id: ' + this.state.id + 'Name: ' + this.state.name + ' Status : ' + this.state.status + '' + this.state.img
    console.log(this.state.item, 'lllllllllll');
    this.props.navigate('ItemScreen', {
      item: this.state.item
    })
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <TouchableOpacity style={{ flex: 1, marginVertical: 5, }} onPress={() => this.getItem()}>
          <Card containerStyle={[styles.shadow, { borderWidth: 1, borderColor: '#fff', borderRadius: 7, paddingTop: 0, paddingRight: 4 }]}   >
            <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Image source={this.state.img} style={styles.imageIcon} />
            </View>
            <View style={{ flex: 1 }}>

              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{this.state.id}</Text>
              <Text style={styles.item}>{this.state.status} {this.state.name}</Text>

              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', marginTop: 5 }}>
                <View style={{ flex: 0.5, marginLeft: 5, }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 18, color: '#636363' }}>{this.state.user}</Text>
                    <Image source={this.state.usimg} style={{
                      width: 20, marginLeft: 5, marginTop: 3,
                      height: 20, color: '#636363'
                    }} />
                  </View>
                  <Text style={{ fontSize: 18, color: '#636363' }}>{this.state.dur}</Text>
                </View>
                <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 5 }}>
                  <Text style={{ fontSize: 18, color: '#636363' }}>{this.state.dt}</Text>
                  <Text style={[styles.item, { color: '#636363' }]}>{this.state.tym}</Text>
                  <Text style={[styles.item, { fontWeight: 'bold', color: '#636363' }]}>{this.state.price}</Text>
                  <Text style={{ fontSize: 10, marginBottom: 2, color: '#636363' }}>{this.state.gst}</Text>
                </View>
              </View>
            </View>

          </Card>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    // paddingBottom: 10,
  },
  item: {
    // padding: 5,
    fontSize: 18,

    alignItems: 'flex-start',
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageIcon: {
    width: 20,
    height: 20,
  }
});
