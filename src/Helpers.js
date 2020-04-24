import { Alert, Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo'
import { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export function CheckConnectivity() {
    const unsubscribe = NetInfo.addEventListener(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        if (state.isConnected) {
            //showAlert("Internet Connection", "You Are Online Now !")
            //return true;
        }
        else {
            showAlert("You Are Offline !! ", "Please Check Your Internet Connection !")
            //return false;
        }

    });
}

export async function isConnected() {
    let flag = false;
    flag = await NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", typeof (state.isConnected));
        if (state.isConnected) {
            return true;
        }
        else {
            return false;
        }
    });
    return flag;
}

export const showAlert = (alertTitle, alertMessage) =>
    Alert.alert(
        alertTitle,
        alertMessage,
        [
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
    );

export async function saveInAsyncStorage(key, value) {
    try {
        await AsyncStorage.setItem(key, value);
        console.log(' saveInAsyncStorage Success', key)
    } catch (e) {
        console.log(" saveInAsyncStorage Error : ", error);
    }
}

export async function deleteAsyncStorage(key) {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.log("deleteAsyncStorage Error :", e)
    }
    console.log('deleteAsyncStorage Done.')
}

export async function getFromAsyncStorage(key) {
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