import React, { useState, useEffect } from 'react';
import { Text, View, Button, Picker, Image, StyleSheet } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { getFromAsyncStorage, saveInAsyncStorage } from '../Helpers'
import { showAlert } from '../Helpers'
import { api } from '../network';
import Post from '../Models/Post';
import { store } from '../redux/store';
import { images } from '../Constants'
export default function PostScreen({ navigation }) {
  const [selectedPlace, setSelectedPlace] = useState('');
  const [bucketlistItems, setBucketlistItems] = useState();
  const [isSelectedImage, setIsSelectedImage] = useState(false);
  const [selectedImageID, setSelectedImageID] = useState(1);
  const [updatedBucketList, setUpdatedBucketList] = useState([])

  //#region useEffect
  useEffect(() => {
    try {
      async function runAsync() {
        const unsubscribe = navigation.addListener('focus', async () => {
          // The screen is focused
          // Call any action
          await setPickerItems();
        });
      }
      runAsync();
    } catch (error) {
    }
    return function cleanup() {
      setIsSelectedImage(false)
    };
  }, [])
  //#endregion

  //#region Event Handlers
  async function onAddBtnClicked() {
    try {
      if (selectedPlace == 0) {
        showAlert('No Place Selected', 'Please Selected A Place');
        return;
      }
      if (!isSelectedImage) {
        showAlert('No Image Selected', 'Please Selected An Image');
        return;
      }
      //Add Post To The Server
      let userId = JSON.parse(store.getState().user);
      let mPost = new Post(0, selectedImageID, selectedPlace, userId)
      const data = await api.request('posts', 'POST', mPost);

      //Delete Bucket From BucketList
      const items = updatedBucketList.filter(item => item.id !== selectedPlace);
      setUpdatedBucketList({ items });
      saveInAsyncStorage('@bucketlist', JSON.stringify(items))

      //Navigate to Newsfeed
      navigation.push('Newsfeed')
    } catch (error) {
      console.log("PostScreen onAddBtnClicked ERROR : ", error);
    }
  }
  //#endregion

  //#region UI Helper Functions

  async function setPickerItems() {
    var bucketlistStr = await getFromAsyncStorage('@bucketlist');
    var bucketlist = JSON.parse(bucketlistStr);
    setUpdatedBucketList(bucketlist);
    if (bucketlist != null && bucketlist != undefined) {
      let items = bucketlist.map((s, i) => {
        return <Picker.Item key={i} value={s.id} label={s.place} />
      });
      setBucketlistItems(items);

    }
  }
  function ImagesFlatList() {

    function renderItem(item) {
      return (
        <TouchableOpacity onPress={() => {
          setIsSelectedImage(true)
          setSelectedImageID(item.id)
        }}>
          <Image style={{ width: 90, height: 90, margin: 5, borderColor: 'black', borderWidth: 1 }} source={item.path} />
        </TouchableOpacity>
      )
    }
    return (
      <FlatList style={{ marginVertical: 20 }} horizontal={true}
        data={images}
        renderItem={({ item }) => renderItem(item)} />
    )
  }
  //#endregion

  //#region Styles
  var styles = StyleSheet.create({
    visible: {
      width: 200,
      height: 200,
      alignSelf: 'center',
      borderWidth: 1,
    },
    hidden: {
      width: 0,
      height: 0,
    },
  });
  //#endregion

  return (
    <View >

      <ImagesFlatList />
      <Image
        style={[styles.hidden, isSelectedImage ? styles.visible : {}]}
        source={images[selectedImageID - 1].path} />
      <Picker
        selectedValue={selectedPlace}
        style={{
          height: 50, alignSelf: 'stretch', backgroundColor: '#DDDDDD',
          marginHorizontal: 20, paddingHorizontal: 20, marginVertical: 20
        }}

        onValueChange={(itemValue, itemIndex) => setSelectedPlace(itemValue)}>
        <Picker.Item label="Choose A Place" value="0" />
        {bucketlistItems}
      </Picker>

      <TouchableOpacity onFocus={true} onPress={onAddBtnClicked} >
        <Text style={{
          alignSelf: 'center', color: 'white', textAlignVertical: 'center', borderRadius: 20,
          backgroundColor: '#FF7F50', paddingHorizontal: 40, paddingVertical: 13, marginVertical: 20
        }}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}