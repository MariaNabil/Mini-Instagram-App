import React, { useState, useEffect } from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import { store, signOut, removeUser } from '../redux/store';
import { showAlert, deleteAsyncStorage, isConnected } from '../Helpers'
import User from '../Models/User';
import { TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native-gesture-handler';
import { api } from '../network';
import Post from '../Models/Post'
import { images } from '../Constants';

export default function Profile({ navigation }) {
  const [user, setUser] = useState()
  const [userPosts, setUserPosts] = useState([])
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 9 / 16);
  const imageWidth = dimensions.width - 10;
  //#region useEffect
  useEffect(() => {
    try {
      async function runAsync() {
        const unsubscribe = navigation.addListener('focus', async () => {
          await reload();
        });
      }
      runAsync();
    } catch (error) {
      console.log("Profile Screen ERROR : ", error)
    }
  }, [])
  //#endregion

  async function reload() {
    try {
      if (!(await isConnected())) {
        showAlert("You Are Offline", "Please Check Your Internet Connetion And Reload")
        return;
      }
      let userObj = new User(JSON.parse(store.getState().user));
      setUser(userObj.email);
      let data = await api.request('posts', 'GET', {});
      let myPosts = data.filter(obj => obj.user.id == userObj.id)
      let tempUserPosts = [];
      for (let i = 0; i < myPosts.length; i++) {
        let userPost = new Post(myPosts[i].id, myPosts[i].image, myPosts[i].place, myPosts[i].user);
        tempUserPosts.push(userPost);
      }
      setUserPosts(tempUserPosts)
    } catch (error) {
      showAlert('' + error, "Please Check Your Server Connection And Reload");
    }
  }

  //#region Event Handlers
  async function logoutBtnPressed() {
    await deleteAsyncStorage('@current_user');
    await deleteAsyncStorage('@bucketlist');
    store.dispatch(signOut());
    store.dispatch(removeUser());
  }
  //#endregion

  //#region UI Helper Functions
  function MyPostsFlatList() {
    function renderItem(item) {
      //console.log("renderItem : ", item)
      return (
        <TouchableWithoutFeedback style={{ margin: 5 }}>
          <Image style={{ height: imageHeight, width: imageWidth }} source={images[item.image - 1].path} />
          <Text style={{ fontSize: 10, marginBottom: 10 }}>{item.place}</Text>
          <View style={{ height: 1, backgroundColor: 'gray', marginVertical: 20 }}></View>
        </TouchableWithoutFeedback>
      )
    }
    return (
      <FlatList style={{ marginVertical: 20, alignSelf: 'stretch', alignContent: 'stretch' }}
        data={userPosts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem(item)}
        ListFooterComponent={getFooter}
        ListHeaderComponent={getHeader} />
    )
  }

  const getHeader = () => {
    return (
      <View>
        <Image style={{ width: 100, height: 100, borderColor: 'black', borderWidth: 0, alignSelf: 'center' }} source={{ uri: 'https://www.kindpng.com/picc/m/22-223965_no-profile-picture-icon-circle-member-icon-png.png' }}></Image>
        <Text style={{ margin: 10, fontSize: 20, alignSelf: 'center' }}>{user}</Text>
        <TouchableOpacity
          title="Logout"
          onPress={logoutBtnPressed}>
          <Text style={{
            marginHorizontal: 20,
            color: 'white', textAlignVertical: 'center', borderRadius: 20,
            backgroundColor: '#3498DB', paddingHorizontal: 40, paddingVertical: 13, alignSelf: 'center'
          }}>Logout</Text>
        </TouchableOpacity >
        <View style={{ height: 1, backgroundColor: 'gray', marginVertical: 20 }}></View>

      </View>
    )
  }

  const getFooter = () => {
    return (
      <TouchableOpacity
        onPress={reload}>
        <Text style={{
          marginHorizontal: 20,
          color: 'white', textAlignVertical: 'center', borderRadius: 20,
          backgroundColor: '#3498DB', paddingHorizontal: 40, paddingVertical: 13, alignSelf: 'center'
        }}>Reload</Text>
      </TouchableOpacity >
    )
  }
  //#endregion




  return (
    <MyPostsFlatList />
  );
}