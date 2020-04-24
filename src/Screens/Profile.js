import React from 'react';
import { Text, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { store, signOut, logout, removeUser } from '../redux/store';
import { showAlert, deleteAsyncStorage } from '../Helpers'


export default function Profile({ navigation }) {


  async function logoutBtnPressed() {
    await deleteAsyncStorage('@current_user');
    await deleteAsyncStorage('@bucketlist');
    //await navigation.push('AuthenticationStack');
    store.dispatch(signOut());
    store.dispatch(removeUser());

    showAlert("Congratulations!", " You Signed Out ");
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