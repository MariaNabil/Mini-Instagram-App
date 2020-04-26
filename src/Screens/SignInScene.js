import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, Button, Alert } from 'react-native';
import styles from '../styles';
import { api } from '../network';
import { store, signIn, signOut, logIn, logout, addUser } from '../redux/store'
import User from '../Models/User';
import { showAlert, saveInAsyncStorage, isConnected } from '../Helpers'


export default function SignInScene({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logo = {
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    width: 64,
    height: 64
  };

  async function onSignInBtnPressed() {
    try {
      if (await isConnected()) {
        const allUsers = await getUsers();
        if (allUsers == null) {
          await showAlert("Server Connection", "Please Check Your Server Connection")
          return;
        }
        userId = checkCredentials(email, password, allUsers);
        if (userId != null && userId != undefined) {
          console.log("checkCredentials local id : ", userId)
          let mUser = new User(userObj = { id: userId, email: email, password: password });
          console.log("FOO : ", mUser);

          await saveInAsyncStorage('@current_user', JSON.stringify(mUser));
          store.dispatch(signIn());
          store.dispatch(addUser(JSON.stringify(mUser)));
          await showAlert("Congratulations You Signed In")
        }
      }

      else {
        showAlert("You Are Offline", "Please check Your Internet Connection")
      }
    } catch (error) {
      console.log("SignInScene onSignInBtnPressed error : ", error);

    }
  }

  async function getUsers() {
    try {
      const data = await api.request('users', 'GET', {});
      console.log("SignInScreen getUsers Success : length ", data)
      return data;
    } catch (error) {
      console.log("SignInScreen getUsers ERROR : ", error)
      return null;
    }
  }

  function checkCredentials(email, password, allEmails) {
    console.log("EMAILS : ", allEmails);
    let e = allEmails.filter(obj => obj.email == email)
    console.log(e);
    if (e == undefined || e.length == 0) {
      showAlert("Not Found", "No User Found With This Email .");
      return null;
    }
    else {
      e = e.filter(obj => obj.password == password)
      if (e == undefined || e.length == 0) {
        showAlert("Wrong Password", "Please Re-check The Password .");
        return null;
      }
      else {
        let userId = e[0].id
        console.log("checkCredentials id : ", (userId))
        return userId;
      }
    }
  }

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

