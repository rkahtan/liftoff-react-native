import React from 'react'
import {connect} from 'react-redux'
import {View, Text} from 'react-native'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <View>
      <Text>Welcome, {username}</Text>
    </View>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)