import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScene from './screens/SignInScene';
import Bucketlist from './screens/Bucketlist';
import Profile from './screens/Profile';
import Newsfeed from './screens/Newsfeed';
import Post from './screens/AddPostScreen';
import { store } from './redux/store';
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';


function ApplicationTabs() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Newsfeed" component={ApplicationStack} />
      <Tab.Screen name="Bucket List" component={Bucketlist} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function ApplicationStack(navigation) {
  return (
    <Stack.Navigator initialRouteName="Newsfeed">
      <Stack.Screen name="Newsfeed" component={Newsfeed}
        options={({ navigation, route }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Add a Post')}>
              <Text style={{
                marginHorizontal: 20,
                color: 'white', textAlignVertical: 'center', borderRadius: 20,
                backgroundColor: '#EE4646', paddingHorizontal: 20, paddingVertical: 10, alignSelf: 'center', fontSize: 20
              }}>+</Text>
            </TouchableOpacity >
          )
        })}
      />
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
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}  >
        {store.getState().isSignedIn ?
          <Stack.Screen name="ApplicationTabs" component={ApplicationTabs} />
          :
          <Stack.Screen name="AuthenticationStack" component={SignInScene} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}