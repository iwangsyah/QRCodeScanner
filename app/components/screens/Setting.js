import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Bantuan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ipServer: null,
      database: null
    }
    this.saveSetting = this.saveSetting.bind(this)
  }

  componentDidMount() {
    AsyncStorage.getItem('dataSetting').then((dataSetting)=>{
      let setting = JSON.parse(dataSetting)
      this.setState({ ipServer: setting.ipServer, database: setting.database })
    })
  }

  saveSetting() {
    let setting = this.state
    AsyncStorage.setItem('dataSetting', JSON.stringify(setting))
    if (setting.ipServer) {
      Actions.login()
    } else {
      alert('IP Server belum di set')
    }
  }

  renderHeader() {
    return (
      <View style={styles.containerHeader}>
        <View style={styles.containerHeaderText}>
          <Icon name="arrow-left" size={30} style={styles.backIcon} onPress={() => Actions.pop()}/>
          <Text style={styles.textHeader}> General Setting </Text>
          <View/>
        </View>
      </View>
    )
  }

  render() {
    let { item } = this.props
    return(
      <View style={{backgroundColor:'#ffffff', height:'100%'}}>
        {this.renderHeader()}
        <Text style={styles.titleInput}>IP SERVER</Text>
        <View style={styles.input}>
          <TextInput
            autoCorrect={false}
            style={{fontSize:20, paddingBottom:0, paddingLeft:10, bottom:5}}
            returnKeyType='done'
            underlineColorAndroid='transparent'
            keyboardType='numeric'
            onChangeText={newText => this.setState({ipServer: newText})}
            value={this.state.ipServer}
          />
        </View>
        <Text style={styles.titleInput}>DATABASE USER</Text>
        <View style={styles.input}>
          <TextInput
            autoCorrect={false}
            style={{fontSize:20, paddingBottom:0, paddingLeft:10, bottom:5}}
            returnKeyType='done'
            underlineColorAndroid='transparent'
            keyboardType='numeric'
            onChangeText={newText => this.setState({database: newText})}
            value={this.state.database}
          />
        </View>
        <TouchableOpacity onPress={this.saveSetting} style={{
          marginTop:30,
          padding: 5,
          backgroundColor:'#42c3f4',
          width: 120,
          justifyContent:'center',
          alignSelf:'center',
          alignItems: 'center',
          borderRadius: 10}}>
          <Text style={styles.text4}>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: '#42c3f4',
    justifyContent:'center',
    marginBottom: 20,
    height: 50,
  },
  containerHeaderText: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  textHeader: {
    fontSize:25,
    color:'#ffffff',
    alignSelf:'center',
    fontWeight:'bold'
  },
  backIcon: {
    left: 20,
    color: 'white'
  },
  text1: {
    fontSize: 25,
    fontWeight: 'bold',
    color:'#000000',
  },
  input: {
    borderWidth:1,
    height: 40,
    width: '80%',
    alignSelf: 'center',
    borderRadius:5,
    marginBottom:30
  },
  titleInput: {
    fontSize: 20,
    marginLeft: 15,
    marginBottom:5,
    fontWeight:'bold'
  },
  text4: {
    fontSize:25,
    fontWeight:'bold',
    color:'#ffffff',
  }
});
