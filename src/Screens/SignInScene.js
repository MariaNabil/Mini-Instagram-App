import React, {useState} from 'react';
import {View, Image, TextInput,Button}
from 'react-native';
import styles from '../styles';

export default function SignInScene({navigation}){
    const [email, setEmail] = useState("Maria");
    const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64
  };
    const [text, setText] = useState('');
  return (
    <View style= {styles.container}>
    <Image source={logo} style={styles.imageStyle} />
      <TextInput
        style={styles.textInput} placeholder="Email"/>
        <TextInput
        onChangeText={text => setText(text)}
        defaultValue={text}
          style={styles.textInput} placeholder="Password"/>
          <View style={styles.buttonStyle}>
          <Button
          title="Sign In"
          color="red"
          onPress={() => navigation.push('ApplicationTabs')}
        />
          </View>
    </View>
  );
  }

