import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter } from 'react-router-native';
import Routes from './client/components/Routes';
import store from './client/store';
import {Provider} from 'react-redux'


//import store and do the provider stuff
//import navbar, routes

export default function App() {
  return (
    <NativeRouter>
      <Provider store={store}>
        <View style={styles.container}>
          {/* navbar */}
          <Routes />
        </View>
      </Provider>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
