import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  NetInfo
} from 'react-native'

import { Router, Scene, Stack } from 'react-native-router-flux'
import { connect, Provider } from 'react-redux'
import Home from '../components/screens/Home'
import LoginScreen from '../components/screens/LoginScreen'
import Bantuan from '../components/screens/Bantuan'
import Setting from '../components/screens/Setting'
import Scanner from '../components/screens/Scanner'
import DeviceInfo from '../components/screens/DeviceInfo'
import About from '../components/screens/About'
import store from '../store'


const RouterWithRedux = connect()(Router)

export default class DemoApp extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key='home'
                   component={Home}
                   title='Home'
                   panHandlers={null}
                   hideNavBar={true} />
            <Scene key='login'
                   component={LoginScreen}
                   title='LoginScreen'
                   panHandlers={null}
                   hideNavBar={true} />
            <Scene key='bantuan'
                   component={Bantuan}
                   title='Bantuan'
                   panHandlers={null}
                   hideNavBar={true} />
            <Scene key='setting'
                   component={Setting}
                   title='Setting'
                   panHandlers={null}
                   hideNavBar={true} />
            <Scene key='scanner'
                    component={Scanner}
                    title='Scanner'
                    panHandlers={null}
                    hideNavBar={true} />
            <Scene key='deviceInfo'
                   component={DeviceInfo}
                   title='DeviceInfo'
                   panHandlers={null}
                   hideNavBar={true} />
            <Scene key='about'
                   component={About}
                   title='About'
                   panHandlers={null}
                   hideNavBar={true} />
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
}
