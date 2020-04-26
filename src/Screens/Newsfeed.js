import React, { useState, useEffect } from 'react';
import { Text, View, Image, ScrollView, Dimensions }
  from 'react-native';
import { api } from '../network';
import { TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Post from '../Models/Post';
import { images } from '../Constants'
import { isConnected, showAlert } from '../Helpers';

export default function Newsfeed({ navigation }) {
  const [posts, setPosts] = useState([{ "user": { "email": '', 'id': '', 'password': '' } }]);
  const [imgPaths, setImgPaths] = useState([])
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 9 / 16);
  const imageWidth = dimensions.width - 10;

  //#region useEffect 
  useEffect(() => {
    try {
      async function fetchData() {
        const unsubscribe = navigation.addListener('focus', async () => {
          await reload();
        });
      }
      fetchData();
    } catch (error) {
      console.log("NEWSFEED ERROR : ", error)
    }
  }, [])
  //#endregion

  async function reload() {
    try {
      if (!(await isConnected())) {
        showAlert("You Are Offline", "Please Check Your Internet Connetion And Reload")
        return;
      }
      let data = await api.request('posts', 'GET', {});
      let mPosts = [];
      for (let i = 0; i < data.length; i++) {
        let postObj = new Post(data[i].id, data[i].image, data[i].place, data[i].user);
        mPosts.push(postObj);
      }
      setPosts(mPosts);
      let paths = []
      for (var j = 0; j < images.length; j++) {
        paths.push(images[j].path)
      }
      setImgPaths(paths);
    } catch (error) {
      console.log("NEWFEEDS ERROR : ", error)
      showAlert('' + error, "Please Check Your Server Connection And reload");
    }
  }

  //#region UI Helper Function
  function PostsFlatList() {

    function renderItem(item) {
      //console.log("renderItem : ", item)
      return (
        <TouchableWithoutFeedback style={{ margin: 5 }}>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>{item.user.email}</Text>
          <Image style={{ height: imageHeight, width: imageWidth }} source={imgPaths[item.image - 1]} />
          <Text style={{ fontSize: 10, marginBottom: 10 }}>{item.place}</Text>
          <View style={{ height: 1, backgroundColor: 'gray', marginVertical: 20 }}></View>

        </TouchableWithoutFeedback>
      )
    }
    return (
      <FlatList style={{ marginVertical: 20, alignSelf: 'stretch', alignContent: 'stretch' }}
        data={posts}
        renderItem={({ item }) => renderItem(item)} />
    )
  }
  //#endregion

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'stretch' }}>
        <PostsFlatList />
        <TouchableOpacity
          onPress={reload}>
          <Text style={{
            marginHorizontal: 20,
            color: 'white', textAlignVertical: 'center', borderRadius: 20,
            backgroundColor: '#EE4646', paddingHorizontal: 40, paddingVertical: 13, alignSelf: 'center'
          }}>Reload</Text>
        </TouchableOpacity >
      </View>
    </ScrollView>
  );
}