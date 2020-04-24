import React from 'react';
import { Text, View, Button }
  from 'react-native';

export default function Post({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Add A Post</Text>
      <Button
        title="Add"
      />
    </View>
  );
}