import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  useEffect,
} from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './Stylesheet';

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
        {/* {
          firebase.auth().currentUser !== null &&
          navigation.navigate('Dashboard')
        } */}

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

