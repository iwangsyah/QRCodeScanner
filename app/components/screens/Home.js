import React, { Component } from 'react';
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal'
import { connect } from 'react-redux'

import { menuSetVisibility } from '../../actions/sidebar'
import BackgroundImage from '../BackgroundImage'
import SideBarModal from '../SideBarModal'

const myIcon = (<Icon name="bars" size={40} color="black" />)

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: 'Anonymous',
      location: 'Unknown',
      height: Dimensions.get('window').height
    }
  }

  _getTime() {
    let today = new Date()
    let curHr = today.getHours()
    if (curHr < 11) {
      return 'Pagi'
    } else if (curHr < 15) {
      return 'Siang'
    } else if (curHr < 18) {
      return 'Sore'
    } else {
      return 'Malam'
    }
  }

  render() {
    let { showMenu } = this.props;

    return (
      <View style={styles.container}>
        <BackgroundImage/>
        <View style={styles.content}>
          <TouchableOpacity onPress={showMenu}>
          {myIcon}
          </TouchableOpacity>
          <View style={{bottom: this.state.height*20/100}}>
            <Text style={styles.titleText}>Selamat {this._getTime()},</Text>
            <Text style={styles.detailText}> {this.state.username} </Text>
          </View>
          <View style={{bottom: this.state.height*20/100}}>
            <Text style={styles.titleText}> Location : </Text>
            <Text style={styles.detailText}> {this.state.location} </Text>
          </View>
        </View>
        <View style={styles.serverWarning}>
          <Text style={styles.serverWarningText}>Server Not Connected</Text>
        </View>
        <SideBarModal/>
      </View>
    );
  }
}

let mapStateToProps = (state) => {
  return {
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    showMenu: () => {
      dispatch(menuSetVisibility(true))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eee',
    },
    content: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
      marginTop:30,
      marginLeft:20
    },
    titleText: {
      fontSize:18,
      color:'black'
    },
    detailText: {
      fontSize:30,
      color:'black'
    },
    serverWarning: {
      backgroundColor:'red',
      height:80,
      alignItems:'center',
      justifyContent:'center'
    },
    serverWarningText: {
      fontSize:22,
      color: 'white',
      fontWeight:'bold'
    }
});
