import React, {useState} from 'react';
import {Platform, StyleSheet, Text, View, Image ,ScrollView, TextInput,Button}
from 'react-native';

export default function Newsfeed( {navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Newsfeed</Text>
      <Button
        title="Add a Post"
        onPress={() => navigation.push('Add a Post')}
      />
    </View>
  );
}

//module.exports = Newsfeed;