import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView, TextInput, Button, Dimensions }
  from 'react-native';
import { api } from '../network';
import { TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Post from '../Models/Post';
import { images } from '../Constants'

export default function Newsfeed({ navigation }) {
  const [posts, setPosts] = useState([{ "user": { "email": '', 'id': '', 'password': '' } }]);
  const [imgPaths, setImgPaths] = useState([])
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 9 / 16);
  const imageWidth = dimensions.width - 10;
  useEffect(() => {
    try {
      async function fetchData() {
        const unsubscribe = navigation.addListener('focus', async () => {

          let data = await api.request('posts', 'GET', {});
          let mPosts = [];
          //let p = [];
          //let paths = []
          for (let i = 0; i < data.length; i++) {
            let postObj = new Post(data[i].id, data[i].image, data[i].place, data[i].user);
            mPosts.push(postObj);
            //paths.push(postObj.image)
            console.log("IMAGES : ", postObj.image)
          }
          setPosts(mPosts);
          let paths = []
          for (var j = 0; j < images.length; j++) {
            paths.push(images[j].path)
          }
          setImgPaths(paths);
          console.log("Newsfeed Screen mPosts : ", mPosts, " Type : ", typeof (mPosts)
            , " mPosts[0] : ", mPosts[0], " mPosts[0].user : ", mPosts[0].user, " mPosts[0].user.email : ", mPosts[0].user.email);


          console.log("Newsfeed Screen DATA : ", data, " Type : ", typeof (data)
            , " data[0].user : ", data[0].user, " data[0].user.email : ", data[0].user.email);

        });
      }
      fetchData();
    } catch (error) {

      console.log("NEWSFEED ERROR : ", error)
    }
    return function cleanup() {
      //setIsSelectedImage(false)
    };
  }, [])

  function PostsFlatList() {

    function renderItem(item) {
      console.log("renderItem : ", item)
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

  return (
    <View style={{ flex: 1, alignItems: 'stretch' }}>
      <PostsFlatList />
      <Button
        title="Add a Post"
        onPress={() => navigation.push('Add a Post')}
      />
    </View>
  );
}

//module.exports = Newsfeed;