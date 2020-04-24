import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScene from './screens/SignInScene';
import Bucketlist from './screens/Bucketlist';
import Profile from './screens/Profile';
import Newsfeed from './screens/Newsfeed';
import Post from './screens/Post';
import AsyncStorage from '@react-native-community/async-storage';
import { store } from './redux/store';
import { Provider } from 'react-redux';


function ApplicationTabs() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Newsfeed" component={ApplicationStack} />
      <Tab.Screen name="Bucket List" component={Bucketlist} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function ApplicationStack() {
  return (
    <Stack.Navigator initialRouteName="Newsfeed">
      <Stack.Screen name="Newsfeed" component={Newsfeed} />
      <Stack.Screen name="Add a Post" component={Post} />
    </Stack.Navigator>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigations() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  useEffect(() => {
    store.subscribe(() => {
      setIsSignedIn(store.getState().isSignedIn)
    })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator   >
        {store.getState().isSignedIn ?
          <Stack.Screen name="ApplicationTabs" component={ApplicationTabs} />
          :
          <Stack.Screen name="AuthenticationStack" component={SignInScene} />}

        {/*d<Stack.Screen name="AuthenticationStack" component={SignInScene} />
        <Stack.Screen name="ApplicationTabs" component={ApplicationTabs} />*/}

      </Stack.Navigator>
    </NavigationContainer>
  );
}