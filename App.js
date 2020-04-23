import Navigations from './src/Navigations';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { store, signIn, signOut, logIn } from './src/app/store'
import { Provider, connect } from 'react-redux';
import { NavigationService } from './src/NavigationService'
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [initialScreen, setInitialScreen] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  /*useEffect(async () => {
    try {
      setIsLoading(true);
      const flag = await getStoredUser();
      console.log("App.js useEffect flag : ", flag)
      setIsSignedIn(flag);
      //setInitialScreen("ApplicationTabs")
    } catch (error) {
      console.log("App.js useEffect error : ", error);
    } finally {
      setIsLoading(false);
    }
  }, [])*/

  /*useEffect(() => {
    setIsLoading(true);
    getStoredUser()
      .then(flag => {
        setIsSignedIn(flag);
        console.log("App.js useEffect flag : ", flag)
      })
      .catch(error => {
        console.log("App.js useEffect error : ", error)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [])*/

  useEffect(() => {
    try {
      //store.subscribe(ReLoad);
      //store.subscribe(Navigations());
      setIsLoading(true);
      async function runAsync() {
        await getStoredUser();
        console.log("App.js useEffect isSignedIn : ", isSignedIn)
        //CHANGES HEREEE
        // const navigation = useNavigation();
        //await NavigationService.setNavigator();
      }
      runAsync();
    } catch (error) {
      console.log("App.js useEffect error : ", error);
    } finally {
      setIsLoading(false);
    }
  }, [])



  async function getFromAsyncStorage(key) {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value !== null) {
        console.log("App.js getFromAsyncStorage at ", key, ' : ', value)
        return true;
      }
      else {
        console.log("App.js No Value Stored in async Storage : ", key)
        return false;
      }
    } catch (e) {
      console.log("App.js getFromAsyncStorage Error :", e)
      return false;
    }
    //return true;
  }

  async function getStoredUser() {
    try {
      var user = await getFromAsyncStorage('@current_email');
      var pass = await getFromAsyncStorage('@current_password');
      var id = await getFromAsyncStorage('@current_id');

      console.log("App.js getStoredUser user", user);
      console.log("App.js getStoredUser pass", pass);
      console.log("App.js getStoredUser id", id);

      if (user) {
        console.log("App.js getStoredUser return : ", true)
        setIsSignedIn(true)
        await store.dispatch(signIn());
        console.log("HEREEEEEEEE")

        store.dispatch(logIn())
        store.dispatch(signIn());
      }
    }
    catch (e) {
      console.log("App.js getStoredUser return : ", false)
      console.log("App.js getStoredUser Error", e)
    }
    console.log("App.js getStoredUser return : ", false)
    setIsSignedIn(false);
    //return false;
  }
  console.log("App.js getInitialScreen : ", initialScreen);

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
  /* function ReLoad() {
     console.log("HELLO FROM RELOAD");
     return (
       <Navigations />
     )
}*/
}
export default App;
