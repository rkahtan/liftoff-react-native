import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as firebase from 'firebase';
import styles from './Stylesheet'

export default function LoadingScreen({ navigation }) {
  useEffect(
     () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.replace('Dashboard');
        } else {
          navigation.replace('Home');
        }
      });
    }
  );
  //seems to still go to dashboard if theres's no user too?
  //or the user data isn't passed to dashboard correctly

  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//     width: '100%',
//     backgroundColor: '#899C89',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });