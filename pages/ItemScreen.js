import React from 'react';

import { StyleSheet, FlatList, Text, View, Alert, Dimensions, TouchableOpacity, ScrollView, Animated, Platform, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import HTML from 'react-native-render-html';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 400;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 195 : 195;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
export default class ItemScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      headerRight: (
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700', marginRight: 20 }}>{params.setId}</Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: '#004863',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTintColor: '#fff',
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [
        { type: 'in', message: 'hi ..H r U', timeDate: '9.41 am', attachment: null, amount: 0, paid: null, seen: false, pk: 1, amountMode: 'recieve', attachmentType: '', fileName: null },

        { type: 'in', message: 'Reply...', timeDate: '9.43 am', attachment: null, amount: 0, paid: null, seen: false, pk: 2, amountMode: 'recieve', attachmentType: '', fileName: null },

        { type: 'out', message: 'Please make the payment', timeDate: '9.43 am', attachment: null, amount: 100, paid: false, seen: false, pk: 3, amountMode: 'recieve', attachmentType: 'img', fileName: null },

        { type: 'out', message: 'Reply...', timeDate: '9.43 am', attachment: 'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg', amount: 0, paid: null, seen: false, pk: 4, amountMode: 'recieve', attachmentType: 'img', fileName: null },

        { type: 'out', message: 'Please make the advance payment', timeDate: '9.43 am', attachment: null, amount: 0, paid: null, seen: false, pk: 5, amountMode: 'recieve', attachmentType: '', fileName: null },

        { type: 'in', message: 'Reply...', timeDate: '9.43 am', attachment: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', amount: 0, paid: false, seen: false, pk: 6, amountMode: 'recieve', attachmentType: 'pdf', fileName: 'quotation01.pdf' },

        { type: 'out', message: 'Please make the advance payment', timeDate: '9.43 am', attachment: null, amount: 100, paid: true, seen: false, pk: 7, amountMode: 'recieve', attachmentType: 'img', fileName: null },

        { type: 'in', message: 'Reply...', timeDate: '9.43 am', attachment: null, amount: 0, paid: null, seen: false, pk: 8, amountMode: 'recieve', attachmentType: 'img', fileName: null },

        { type: 'out', message: 'Reply...', timeDate: '9.43 am', attachment: null, amount: 0, paid: null, seen: false, pk: 9, amountMode: 'recieve', attachmentType: 'pdf', fileName: null }
      ]
    };
  }

  componentDidMount() {
    var name = this.props.navigation.getParam('item').name
    this.props.navigation.setParams({
      setId: '#1011',
    });
  }

  clickPdf = function(item) {
    var link = item.attachment;
    console.log(link, 'ggggg');
    this.props.navigation.navigate('TermsConditionScreen', {
      link: link
    })
  }

  render() {
    const name = this.props.navigation.getParam('item').name
    const status = this.props.navigation.getParam('item').status

    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 120, backgroundColor: '#004863' }}>
          <View style={{ marginLeft: 15 }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}> Catering Staff for Hotel Taj</Text>
          </View >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', marginTop: 10 }}>
            <View style={{ flex: 0.5, marginLeft: 20, }}>
              <Text style={{ color: '#fff', fontSize: 12 }}>10 <FontAwesome name="users" size={20} color="#fff" /></Text>
              <Text style={{ color: '#fff', fontSize: 12, marginTop: 5 }}>8 Hours</Text>
              <Text style={{ color: '#fff', fontSize: 12 }}>13-jul-2019 - 7:00 pm  </Text>
            </View>
            <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: 20 }}>

              <Text style={{ color: '#fff', fontSize: 20, marginTop: 5 }}>23,000/-</Text>
              <Text style={{ color: '#fff', fontSize: 12 }}>(Exclusive from GST)</Text>
            </View>
          </View>
        </View>
        <FlatList style={{ paddingHorizontal: 17, }}
          data={this.state.data}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={(message) => {
            const item = message.item;
            let inMessage = item.type === 'in';
            if (item.message.length < 1 || item.message == 'undefined') var m = ' ';
            else var m = item.message
            let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
            return (
              <View style={[itemStyle]}   >
                <TouchableOpacity  >
                  {inMessage && item.attachment == null &&
                    <View style={[styles.item, styles.balloon]}>
                      <Text style={{ color: '#000' }}>{item.message}</Text>
                    </View>
                  }
                  {inMessage && item.attachment != null &&
                    <View style={{}}>
                      {item.attachmentType == 'img' &&
                        <View style={[styles.item, styles.balloon]}>
                          <Image source={{ uri: item.attachment }} style={{ width: 210, height: 125 }} />
                        </View>
                      }
                      {item.attachmentType == 'pdf' &&
                        <View style={[styles.item, styles.balloon]}>
                          <TouchableOpacity onPress={() => { this.clickPdf(item) }}>
                            <FontAwesome name="file-pdf-o" size={25} color="#004863" style={{}} /><Text style={{ color: '#000' }}>{item.fileName}</Text></TouchableOpacity>

                        </View>
                      }
                    </View>
                  }
                  {!inMessage && item.attachment == null && item.paid == null &&
                    <View style={[styles.itemout, styles.balloon, { backgroundColor: '#004863' }]}>
                      <Text style={{ color: '#ffffff' }}>{item.message}</Text>
                    </View>
                  }
                  {!inMessage && item.paid != null &&
                    <View style={{}}>
                      {item.paid == false &&
                        <View style={[styles.itemout, styles.balloon]}>
                          <Text style={{ color: '#000' }}>{item.message}</Text>
                          <Text style={{ color: '#000', alignSelf: 'center' }}>$:{item.amount}</Text>
                          <TouchableOpacity onPress={() => { this.clickPdf(item) }} style={{ backgroundColor: '#fc0000', borderRadius: 7, }}>

                            <Text style={{ color: '#fff', alignSelf: 'center', fontSize: 20, paddingBottom: 5 }}>pay</Text></TouchableOpacity>
                        </View>
                      }
                      {item.paid == true &&
                        <View style={[styles.itemout, styles.balloon]}>
                          <Text style={{ color: '#000' }}>{item.message}</Text>
                          <Text style={{ color: '#000', alignSelf: 'center' }}> Rs. {item.amount}</Text>
                          <TouchableOpacity //onPress={() => {this.clickPdf(item)}}
                            style={{ backgroundColor: '#00fc50', borderRadius: 14, }}>
                            <Text style={{ color: '#fff', fontSize: 18, paddingLeft: 55, width: 150, alignSelf: 'center', padding: 5 }}>Paid</Text>
                          </TouchableOpacity>

                        </View>
                      }
                    </View>
                  }
                  {!inMessage && item.attachment != null &&
                    <View style={{}}>
                      {item.attachmentType == 'img' &&
                        <View style={[styles.item, styles.balloon]}>
                          <Image source={{ uri: item.attachment }} style={{ width: 210, height: 125 }} />
                        </View>
                      }
                      {item.attachmentType == 'pdf' &&
                        <View style={[styles.item, styles.balloon]}>
                          <TouchableOpacity onPress={() => {
                            this.clickPdf(item)
                          }}>
                            <FontAwesome name="file-pdf-o" size={25} color="#004863" style={{}} /></TouchableOpacity>

                        </View>
                      }
                    </View>
                  }
                  {inMessage && <Text style={styles.time}>{item.timeDate}</Text>}
                  {!inMessage && <Text style={styles.timeout}>{item.timeDate}</Text>}
                </TouchableOpacity>
              </View>
            )
          }} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 10,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#004863',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balloon: {
    maxWidth: 250,
    padding: 15,
    borderRadius: 20,

  },
  itemIn: {
    alignSelf: 'flex-start',
  },
  itemOut: {
    alignSelf: 'flex-end',
  },
  time: {
    alignSelf: 'flex-start',
    marginLeft: 15,
    fontSize: 12,
    color: "#000",
  },
  timeout: {
    alignSelf: 'flex-end',
    marginRight: 15,
    fontSize: 12,
    color: "#000",
  },
  item: {
    marginVertical: 14,
    backgroundColor: '#e6e6e6',
    borderRadius: 300,
    borderTopLeftRadius: 0,
    padding: 5,
    color: '#ffffff',
  },
  itemout: {
    marginVertical: 14,
    backgroundColor: '#fff',
    borderRadius: 300,
    color: '#ffffff',
    borderTopRightRadius: 0,
    padding: 5,
  },

});
