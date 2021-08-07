import { ImageBackground, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/background.jpg')}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>liftoff</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Sign Up')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.inlineText}>Already have an account?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Sign In')}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    bottom: 200,
  },
  button: {
    width: 200,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: '#223023',
    padding: 10,
    margin: '4%',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  inlineText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: '5%',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  titleContainer: {
    position: 'absolute',
    top: 170,
  },
});
