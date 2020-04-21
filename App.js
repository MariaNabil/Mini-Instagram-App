import Navigations from './src/Navigations';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  useEffect(async () => {
    //console.log("SignInScreen willMount/useEffect :")
    try {
      //getUsers();
      //const isSignedIn = await getStoredUser();
      setIsSignedIn(await getStoredUser());
      console.log("App.js useEffect isSignedIn : ", isSignedIn)
      /* if (current_user){
 
       }*/
    } catch (error) {
      throw error;
    }

  }, [])



  async function getFromAsyncStorage(key) {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value !== null) {
        console.log("App.js getFromAsyncStorage at ", key, ' : ', value)
      }
      else {
        console.log("App.js No Value Stored in async Storage : ", key)
        return false;
      }
    } catch (e) {
      console.log("App.js getFromAsyncStorage Error :", e)
      return false;
    }
    return true;
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
        return true;
      }
    }
    catch (e) {
      console.log("App.js getStoredUser return : ", false)
      console.log("App.js getStoredUser Error", e)
    }
    console.log("App.js getStoredUser return : ", false)
    return false;
  }


  return (Navigations(isSignedIn));
}
export default App;
