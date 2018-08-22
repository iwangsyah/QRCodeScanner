import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux'

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

  render() {
    let { latitude, longitude } = this.state

    if (!latitude && !longitude) {
      latitude = 'unknown'
      longitude = 'unknown'
    }

    return(
      <View style={styles.container}>
        <Text style={styles.titleText}>About App</Text>
        <Text style={styles.copyrightText}>Copyright © 2018 Wahyu Irwansyah.</Text>
        <Text style={styles.copyrightText}>All Rights Reserved.</Text>
        <TouchableOpacity onPress={() => Actions.pop()} style={{marginTop: 50}}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    titleText: {
      marginBottom: 30,
      fontSize: 25,
      color: 'black'
    },
    copyrightText: {
      fontSize:15
    }
});
