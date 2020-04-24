import React from 'react';
import { Text, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { store, signOut, logout, removeUser } from '../redux/store';



export default function Profile({ navigation }) {


  async function logoutBtnPressed() {
    await deleteAsyncStorage();
    //await navigation.push('AuthenticationStack');
    store.dispatch(signOut());
    store.dispatch(removeUser());

    // store.dispatch(logout());
    showAlert("Congratulations!", " You Signed Out ");
  }
  const showAlert = (alertTitle, alertMessage) =>
    Alert.alert(
      alertTitle,
      alertMessage,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  async function deleteAsyncStorage() {
    try {
      await AsyncStorage.removeItem('@current_user')
    } catch (e) {
      // remove error
      console.log("deleteAsyncStorage Error :", e)
    }
    console.log('deleteAsyncStorage Done.')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile</Text>
      <Button
        title="Logout"
        onPress={logoutBtnPressed}
      />
    </View>
  );
}