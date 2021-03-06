import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableWithoutFeedback }
  from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { saveInAsyncStorage, showAlert } from '../Helpers'



export default function Bucketlist({ navigation }) {
  const [dataSet, setDataSet] = useState();

  //#region States
  const [place, setPlace] = useState({});
  const [places, setPlaces] = useState([]);
  const [text, setText] = useState('')
  //#endregion

  //#region UseEffect 
  useEffect(() => {
    async function fetchData() {
      try {
        const unsubscribe = navigation.addListener('focus', async () => {
          await getPlacesFromAsyncStorage('@bucketlist');
        });
      } catch (error) {
        console.log("BUCKETLIST SCREEN useEffect Error : ", error);
      }
    }
    fetchData();
    console.log("PLACES : ", places)
  }, []);
  //#endregion

  //#region AsyncStorage Functions
  async function getPlacesFromAsyncStorage(key) {
    try {
      var bucketListStr = await AsyncStorage.getItem(key);
      var bucketList = JSON.parse(bucketListStr);
      if (bucketList != null && bucketList != undefined) {
        setPlaces(bucketList);
      }
      else {
        console.log("NO BUCKETLIST FOUND in AsyncStorage");
      }
    }
    catch (e) {
      console.log("App.js getStoredUser Error", e)
    }
  }
  //#endregion

  //#region Flatlist Functions
  function FillFlatList(props) {
    return (
      <View style={{ padding: 10 }}>
        <FlatList
          padding={30}
          data={props.data}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => actionOnRow(item)}>
              <View style={{ height: 50, marginBottom: 20 }}>
                <Text style={{ height: 45 }}>{item.place}</Text>
                <View style={{ height: 1, backgroundColor: 'gray' }}></View>
              </View>
            </TouchableWithoutFeedback>
          )} />
      </View>
    )
  }
  //#endregion

  //#region Event Handlers

  //#region Buttons Event Handlers
  function onAddBucketBtnPressed() {
    let e = places.filter(obj => obj.id == text)
    if (e.length != 0) {
      showAlert("Not Allowed", "This Place Is Already Added ")
      setText('');
      return;
    }
    if (text == null || text.length == 0) {
      showAlert("Not Allowed", "Please Add A Place ")
      return;
    }
    let p = places;
    p.push({ id, name } = place);
    setPlaces(p);
    saveInAsyncStorage('@bucketlist', JSON.stringify(places));
    setText('');
  }
  //#endregion

  //#region Flatlist Event Handler
  function actionOnRow(item) {
    showAlert(item.place, item.id);
  }
  //#endregion
  //#endregion

  return (
    <View style={{ flex: 1, alignItems: 'stretch', flexDirection: 'column' }}>
      <View style={{ flexDirection: 'row', height: 70, marginTop: 30 }}>
        <TextInput placeholder='Place' style={{
          flex: 1, alignSelf: 'stretch', backgroundColor: "#DDDDDD",
          margin: 10, paddingHorizontal: 20, marginLeft: 30
        }}
          onChangeText={(text) => {
            setText(text)
            setPlace({ "id": text, "place": text })
          }}
          defaultValue={text}>
        </TextInput>
        <TouchableOpacity style={{
          flex: 1, paddingHorizontal: 15,
          margin: 10, borderColor: 'black', borderWidth: 0, borderRadius: 10, backgroundColor: '#FF7F50'
        }} onPress={onAddBucketBtnPressed} >
          <Text style={{ flex: 1, fontSize: 20, textAlignVertical: 'center', color: 'white' }}>+</Text>
        </TouchableOpacity>
      </View>
      <FillFlatList data={places}></FillFlatList>
    </View>
  );
}