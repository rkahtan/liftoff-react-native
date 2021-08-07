import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import { View, TextInput, Text, StyleSheet, Button, PressEvent } from 'react-native'
import auth from 'firebase/auth'

class AuthForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {

      
      const username = this.state.username
      const password = this.state.password
      const formName = this.props.name

      console.log(username, password, formName)
      //this.props.submit(username, password, formName)

      
  }
  
  
  render() {
    const {name, displayName, error} = this.props
    const {handleSubmit} = this

    return (
      <View style={styles.container}>
          <Text>Username</Text>
          <TextInput 
          style={styles.input}
          defaultValue={this.state.username}
          onChangeText={text=> this.setState({username: text})}
          ></TextInput>

          <Text>Password</Text>
          <TextInput
          style={styles.input}
          secureTextEntry={true}
          defaultValue={this.state.password}
          onChangeText={text=> this.setState({password: text})}
          ></TextInput>

          <Button onPress={handleSubmit(PressEvent)} title={`${displayName}`}/>
        {error && error.response && <View> {error.response.data} </View>}
      </View>
    
    )
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 300
    //flexGrow: 
  },
})


//this.props = {name, displayName, error}
//name is for sending thunk
//display name is for the button
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

//this.props = { name, displayName, error}
const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

//this.props = {handleSubmit}
//calls authenticate thunk
//this sets state to user or an error
const mapDispatch = dispatch => {
  return {
    submit: (username, password, formName) => dispatch(authenticate(username, password, formName))
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

