import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView, TextInput, Button }
  from 'react-native';

export default function Bucketlist({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bucket list</Text>
      <Button
        title="Go to Details"
      />
    </View>
  );
}