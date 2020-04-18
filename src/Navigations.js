import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScene from './Screens/SignInScene';
import Bucketlist from './Screens/Bucketlist';
import Profile from './Screens/Profile';
import Newsfeed from './Screens/Newsfeed';
import Post from './Screens/Post';


function ApplicationTabs() {
    return (
      <Tab.Navigator>
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
     return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthenticationStack">
        <Stack.Screen name="AuthenticationStack" component={SignInScene} />
        <Stack.Screen name="ApplicationTabs" component={ApplicationTabs} />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }