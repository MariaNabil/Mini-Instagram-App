import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, Button, Alert }
  from 'react-native';
import styles from '../styles';
import { api } from '../network';
import AsyncStorage from '@react-native-community/async-storage';
import { store, signIn, signOut, logIn, logout } from '../app/store'


export default function SignInScene({ navigation }) {
  const [emails, setEmails] = useState([])
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");



  const logo = {
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    width: 64,
    height: 64
  };

  /* useEffect(() => {
     getUsers()
       .catch((error) => {
         console.log("SignInScene useEffect Error : ", error);
       });
   }, []);*/

  useEffect(() => {
    async function fetchData() {
      try {
        await getUsers();
      } catch (error) {
        console.log("SignInScene useEffect Error : ", error);
      }
    }
    fetchData();
  }, []);

  async function getUsers() {
    try {
      const data = await api.request('users', 'GET', {});
      setEmails(data);
      console.log("SignInScreen getUsers Success : length ", data)

    } catch (error) {
      console.log("SignInScreen getUsers error : ", error)
      throw error
    }
  }

  async function onSignInBtnPressed() {
    try {
      console.log("email : ", email);
      console.log("password : ", password);
      if (checkCredentials(email, password)) {
        await saveInAsyncStorage('@current_email', email);
        await saveInAsyncStorage('@current_password', password);
        await saveInAsyncStorage('@current_id', '' + id);

        store.dispatch(signIn());
        store.dispatch(logIn());
        await showAlert("Congratulations You Signed In")

      }
    } catch (error) {
      console.log("SignInScene onSignInBtnPressed error : ", error);
    }
  }

  function checkCredentials(email, password) {
    let e = emails.filter(obj => obj.email == email)
    console.log(e);
    if (e == undefined || e.length == 0) {
      showAlert("Not Found", "No User Found With This Email .");
      return false;
    }
    else {
      e = e.filter(obj => obj.password == password)
      if (e == undefined || e.length == 0) {
        showAlert("Wrong Password", "Please Re-check The Password .");
        return false;
      }
      else {
        setId('' + e[0].id);
        console.log("checkCredentials id : ", e[0].id)
        console.log("checkCredentials local id : ", id)
        return true;
      }
    }
  }

  async function saveInAsyncStorage(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('SignInScene saveInAsyncStorage Success', key)
    } catch (e) {
      console.log("SignInScene saveInAsyncStorage Error : ", error);
    }
  }

  const showAlert = (alertTitle, alertMessage) =>
    Alert.alert(
      alertTitle,
      alertMessage,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.imageStyle} />
      <TextInput
        onChangeText={text => setEmail(text)}
        defaultValue={email}
        style={styles.textInput} placeholder="Email" />
      <TextInput
        onChangeText={text => setPassword(text)}
        defaultValue={password}
        style={styles.textInput} placeholder="Password" />
      <View style={styles.buttonStyle}>
        <Button
          title="Sign In"
          color="red"
          onPress={onSignInBtnPressed}
        />
      </View>
    </View>
  );
}

