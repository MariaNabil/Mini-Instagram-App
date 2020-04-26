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
import Icon from 'react-native-vector-icons/Fontisto';

function ApplicationTabs() {
  const [c, setc] = useState('black')
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Newsfeed') {
          setc('#EE4646')
          iconName = focused
            ? 'applemusic'
            : 'curve';
          color = '#EE4646';

          size = focused
            ? 20 : 10;


        } else if (route.name === 'Bucket List') {
          color = '#FF7F50'
          setc(color)
          size = focused
            ? 20 : 10;
        }
        else if (route.name === 'Profile') {
          color = '#3498DB';
          setc(color)
          size = focused
            ? 20 : 10;
        }

        // You can return any component that you like here!
        return <Icon name='curve' size={size} color={color} />;
      },
    })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }} >
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