import React, {useState} from 'react';
import {Platform, StyleSheet, Text, View, Image ,ScrollView, TextInput,Button}
from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function SignInScene({navigation}){
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
        onPress={() => navigation.push('ApplicationStack')}
      />
        </View>
  </View>
);
}

function Newsfeed( {navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
      />
    </View>
  );
}

const Stack = createStackNavigator();

 function App() {
   //return (signInScene());
   return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="AuthenticationStack" component={SignInScene} />
      <Stack.Screen name="ApplicationStack" component={Newsfeed} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;


const styles = StyleSheet.create({
 container: {
   flex: 10,
   //justifyContent: 'flex-start',
   backgroundColor: '#FFFFFF',

 },

 textInput: {
   padding: 10,
   margin:10,
   height: 40,
   borderColor: 'gray',
   borderWidth: 1,
   justifyContent: 'center',
 },
 buttonStyle: {
   marginTop : 50,
   marginLeft:80,
   marginRight:80,
   backgroundColor:'#FF0000'
 },
 imageStyle: {
   margin : 60,
   alignSelf: 'center',
   backgroundColor: '#FFFFFF',
 },
})

/*export default function App() {
  let pic = {
      uri: 'https://reactnative.dev/docs/assets/p_cat2.png'
    };
  return (
    <ScrollView>
      <Text>Some text</Text>
      <View>
        <Text>Some more text</Text>
        <Image source={pic} style={{width: 200, height: 200}}/>
      </View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1
        }}
        defaultValue="You can type in me"
      />
    </ScrollView>
  );
}


/*const instructions = Platform.select({
 ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
 android:
   'Double tap R on your keyboard to reload,\n' +
   'Shake or press menu button for dev menu',
});

/*type Props = {};
export default class App extends Component<Props> {
 render() {
   return (
     <View style={styles.container}>
       <Text style={styles.welcome}>Hello World</Text>
     </View>
   );
 }
}*/

/*export default function HelloWorldApp() {
  let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
  return (
    <View style={styles.container}>
      <Text>Hello, world!</Text>
      <Image source={pic} style={{width: 193, height: 110}}/>
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#FFFFFF',
 }
})
/*const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#F5FCFF',
 },
 welcome: {
   fontSize: 20,
   textAlign: 'center',
   margin: 10,
 },
 instructions: {
   textAlign: 'center',
   color: '#333333',
   marginBottom: 5,
 },
});*/
