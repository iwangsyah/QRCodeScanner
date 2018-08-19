import React, { Component } from 'react'
import {
  Text,
  View,
  Alert,
  Platform,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid
} from 'react-native'

import { PropTypes } from 'prop-types'
import Camera from 'react-native-camera';
import {requestPermission} from 'react-native-android-permissions';

export default class QRCodeScreen extends Component {
  static propTypes = {
    cancelButtonVisible: PropTypes.bool,
    cancelButtonTitle: PropTypes.string,
    onSucess: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      read: "Ready",
      data: null,
      scanning: true
    }
    this._onBarCodeRead = this._onBarCodeRead.bind(this)
  }

  componentDidMount() {
    if(Platform.OS === 'android'){
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
        .then(res => {
            if(res !== 'granted') {
                Alert.alert('Oops!', 'We need permission to access your camera to scan codes')
            }
            else navigate('Scanner');
        });
    } else {
        if(Camera){
            Camera.checkDeviceAuthorizationStatus()
            .then(access => {
                if(!access) {
                    Alert.alert('Oops!', 'We need permission to access your camera to scan codes')
                }
                else navigate('Scanner');
            });
        }
    }
  }

  _onBarCodeRead(result) {
    if (result && this.state.read == "Ready") {
      alert(result.type+"\n\n"+result.data)
      this.setState({ read: "Coba Lagi", data: result.data, scanning: false })
    }
  }

  _onPress() {
    if (this.state.read == "Coba Lagi") {
      this.setState({ read: "Ready", data: null })
    }
    setTimeout(() => {
      this.setState({ scanning: true })
    },300)
  }

  render() {
    let { read, scanning } = this.state
    if (scanning && read == "Ready") {
      return (
        <View style={{height:'100%'}}>
          <Camera
            onBarCodeRead={this._onBarCodeRead}
            style={styles.camera}
            ref={cam => this.camera = cam}
            aspect={Camera.constants.Aspect.fill}
          >
            <Text style={styles.titleText}>QR CODE SCANNER</Text>
            <View style={styles.rectangleContainer}>
              <View style={styles.rectangle}/>
            </View>
            <TouchableOpacity onPress={this._onPress.bind(this)}>
              <View style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>{this.state.read}</Text>
              </View>
            </TouchableOpacity>
          </Camera>
          <View style={styles.dataContainer}>
            <Text style={[styles.dataText, {marginLeft:10, marginRight:10}]}>{this.state.data}</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View style={{height:'100%'}}>
          <Camera
            style={styles.camera}
            ref={cam => this.camera = cam}
            aspect={Camera.constants.Aspect.fill}
            >
            <Text style={styles.titleText}>QR CODE SCANNER</Text>
            <View style={styles.rectangleContainer}>
              <View style={styles.rectangle}/>
            </View>
            <TouchableOpacity onPress={this._onPress.bind(this)}>
              <View style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>{this.state.read}</Text>
              </View>
            </TouchableOpacity>
          </Camera>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>{this.state.data}</Text>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  camera: {
    height: '90%',
    alignItems: 'center',
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },
  cancelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 15,
    bottom: 10,
  },
  cancelButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#0097CE',
  },
  titleText: {
    color:'white',
    fontSize:30,
    marginTop:20,
  },
  dataContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  dataText: {
    fontSize:20,
    fontWeight:'bold',
  }
});
