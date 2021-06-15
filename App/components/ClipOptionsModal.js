import React from 'react';
import {StyleSheet, View, Text, Modal, Linking} from 'react-native';
import color from '../constants/Colors';
import {openDatabase} from 'react-native-sqlite-storage';
import {deleteItem, setReadFlag} from '../data/Databasehandler';

const ClipOptionsModal = ({modalVisible, setModal, itemId, onEdit}) => {
  var db = openDatabase({name: 'clippyData.db'});

  const openUrl = () => {
    setModal();
    Linking.canOpenURL('https://reactnative.dev/docs/linking').then(
      supported => {
        supported
          ? Linking.openURL('https://reactnative.dev/docs/linking')
          : alert('invalid URL');
      },
    );
  };

  const setRead = () => {
    setModal();
    setReadFlag({db}, itemId);
  };

  const editClip = () => {
    setModal();
    onEdit();
  };

  const deleteClip = () => {
    setModal();
    deleteItem({db}, itemId);
  };

  return (
    <Modal visible={modalVisible} transparent={true} animationType={'slide'}>
      <View style={Style.bottomCenter}>
        <Text
          style={Style.bottomTextCollection}
          onPress={() => {
            openUrl();
          }}>
          Open in browser
        </Text>
        <Text
          style={Style.bottomTextCollection}
          onPress={() => {
            setRead();
          }}>
          Mark as read
        </Text>
        <Text
          style={Style.bottomTextCollection}
          onPress={() => {
            editClip();
          }}>
          Edit
        </Text>

        <Text
          style={Style.bottomTextCollection}
          onPress={() => {
            deleteClip();
          }}>
          Delete
        </Text>
      </View>
    </Modal>
  );
};
const Style = StyleSheet.create({
  bottomCenter: {
    width: '100%',
    backgroundColor: color.White,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  bottomTextCollection: {
    paddingVertical: 20,
    color: color.Black,
    fontSize: 16,
    fontFamily: 'IBMPlexSerif-Italic',
  },
});

export default ClipOptionsModal;
