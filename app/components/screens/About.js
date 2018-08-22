import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Bantuan extends Component {
  constructor(props) {
    super(props)
    this.state = {
       initialPosition: 'unknown',
       lastPosition: 'unknown',
       longitude: null,
       latitude: null,
    }
  }

  renderHeader() {
    return (
      <View style={styles.containerHeader}>
        <View style={styles.containerHeaderText}>
          <Icon name="arrow-left" size={30} style={styles.backIcon} onPress={() => Actions.pop()}/>
          <Text style={styles.textHeader}> About </Text>
          <View/>
        </View>
      </View>
    )
  }

  render() {
    let { latitude, longitude } = this.state

    if (!latitude && !longitude) {
      latitude = 'unknown'
      longitude = 'unknown'
    }

    return(
      <View>
        {this.renderHeader()}
        <View style={styles.container}>
          <Text style={styles.copyrightText}>Copyright © 2018 Wahyu Irwansyah.</Text>
          <Text style={styles.copyrightText}>All Rights Reserved.</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height:'70%',
    },
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
    copyrightText: {
      fontSize:15
    }
});
