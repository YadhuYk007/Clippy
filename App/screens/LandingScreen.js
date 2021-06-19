import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import color from '../constants/Colors';
import {openDatabase} from 'react-native-sqlite-storage';
import CollectionList from '../components/CollectionList';
import CollectionDialog from '../components/CollectionDialog';
import ClipDialog from '../components/ClipDialog';
import BottomModal from '../components/BottomModal';
import SplashScreen from 'react-native-splash-screen';

const LandingScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [clipModalVisible, setClipModalVisible] = useState(false);
  const [bottomModal, setBottomModal] = useState(false);
  const [items, setItems] = useState([]);
  var db = openDatabase({name: 'clippyData.db'});

  const setModal = () => {
    items.length > 0 ? setBottomModal(true) : setModalVisible(true);
  };
  useEffect(() => {
    SplashScreen.hide();
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM collections', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setItems(temp);
      });
    });
  }, [modalVisible, navigation]);
  return (
    <SafeAreaView style={Style.container}>
      <StatusBar backgroundColor={color.Primary} />

      <CollectionList
        addClip={(cId, cName) => {
          console.log('Collection ID>>', cId);
          setClipModalVisible(false);
          navigation.navigate('Details', {id: cId, name: cName});
        }}
        modal={modalVisible}
      />
      <CollectionDialog
        modalVisible={modalVisible}
        visible={() => {
          setModalVisible(false);
        }}
      />

      <ClipDialog
        clipModalVisible={clipModalVisible}
        modal={modalVisible}
        visible={() => {
          setClipModalVisible(false);
          setModalVisible(false);
        }}
      />
      <BottomModal
        bottomModal={bottomModal}
        clip={() => {
          setClipModalVisible(true);
          setBottomModal(false);
        }}
        collection={() => {
          setModalVisible(true);
          setBottomModal(false);
        }}
      />

      <View>
        <TouchableOpacity style={Style.fab} onPress={() => setModal()}>
          <Text style={{color: color.White, fontSize: 30}}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: 'column',
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 30,
    backgroundColor: color.Accent,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 10,
    right: 10,
  },
});

export default LandingScreen;
