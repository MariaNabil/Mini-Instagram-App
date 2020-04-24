import Navigations from './src/Navigations';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { store, signIn, addUser } from './src/app/store'
import User from './src/Models/User';

const App = (props) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    try {
      setIsLoading(true);
      async function runAsync() {
        await getStoredUser();
      }
      runAsync();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, [])



  async function getFromAsyncStorage(key) {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value !== null) {
        console.log("App.js getFromAsyncStorage at ", key, ' : ', value)
        return value;
      }
      else {
        console.log("App.js No Value Stored in async Storage : ", key)
        return value;
      }
    } catch (e) {
      console.log("App.js getFromAsyncStorage Error :", e)
      return value;
    }
  }

  async function getStoredUser() {
    try {
      var userStr = await getFromAsyncStorage('@current_user');
      var user = JSON.parse(userStr);
      if (user != null && user != undefined) {
        let mUser = new User(userObj = user);
        store.dispatch(signIn());

        console.log("TYPE OF MUSER : ", typeof (JSON.stringify(mUser)))
        store.dispatch(addUser(JSON.stringify(mUser)));
      }
    }
    catch (e) {
      console.log("App.js getStoredUser Error", e)
    }
    console.log("App.js getStoredUser return : ", false)
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
        <ActivityIndicator size='large' />
      </View>
    )
  } else {
    return (
      <Navigations />
    )
  }
}
export default App;
