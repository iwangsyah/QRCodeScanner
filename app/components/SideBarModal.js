import React, { PropTypes, Component } from 'react'
import {
  View, Text, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash'


import { menuSetVisibility } from '../actions/sidebar'
import styles from '../styles/sidebar'

class SidebarModal extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)

    this.state = {
      showDeveloperMenu: false,
      username: this.props.username || 'Anonymous',
      location: this.props.location || 'Unknown'
    }

    this.gotoHome = this.gotoHome.bind(this)
    this.gotoAbout = this.gotoAbout.bind(this)
    this.gotoSetting = this.gotoSetting.bind(this)
  }

  gotoHome() {
    Actions.home()
    this.props.hideModal()
  }

  gotoSetting() {
    Actions.setting()
    this.props.hideModal()
  }

  gotoAbout() {
    Actions.about()
    this.props.hideModal()
  }

  render() {
    let { visible, signedIn, logout, hideModal } = this.props
    let { showDeveloperMenu } = this.state
    let reset = () => {
      this.props.hideModal()
    }

    let signInMenus = []

      signInMenus.push(
        <TouchableOpacity onPress={this.gotoHome}>
          <View style={styles.titleContainer}>
            <Icon name="home" size={30} style={{top:5}} style={{top:5}}/>
            <Text style={[styles.menuModalItem, {marginLeft: 15}]}>Beranda</Text>
          </View>
        </TouchableOpacity>
      )

      signInMenus.push(
          <TouchableOpacity onPress={this.gotoSetting}>
            <View style={styles.titleContainer}>
              <Icon name="gear" size={30} style={{top:5}}/>
              <Text style={styles.menuModalItem}>General Setting</Text>
            </View>
          </TouchableOpacity>
      )

      if (this.state.setting) {
        signInMenus.push(
            <TouchableOpacity onPress={logout}>
              <View style={styles.titleContainer}>
                <Icon name="user" size={30} style={{top:5}}/>
                <Text style={styles.menuModalItem}> Akun Saya </Text>
              </View>
            </TouchableOpacity>
        )
      }

      signInMenus.push(
          <TouchableOpacity onPress={this.gotoAbout}>
            <View style={styles.titleContainer}>
              <Icon name="info-circle" size={30} style={{top:5}}/>
              <Text style={[styles.menuModalItem, {marginLeft: 15}]}> About </Text>
            </View>
          </TouchableOpacity>
      )


    return (
      <TouchableWithoutFeedback>
        <Modal
          supportedOrientations={['portrait', 'landscape']}
          animationIn='slideInLeft'
          animationOut='slideOutLeft'
          isVisible={visible}
          onBackdropPress={hideModal}
          style={styles.menuModal}
        >
          <TouchableWithoutFeedback onPress={this.triggerDeveloperMenu}>
            <View style={styles.menuModalContainer}>
              {signInMenus}
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </TouchableWithoutFeedback>
    )
  }
}


let mapStateToProps = (state, props) => {
  return {
    visible: state.sidebarModal.visible,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => {
      dispatch(menuSetVisibility(false))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarModal)
