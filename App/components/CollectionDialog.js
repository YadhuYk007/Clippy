import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Modal} from 'react-native';
import {createCollection, getCollections} from '../data/Databasehandler';
import {openDatabase} from 'react-native-sqlite-storage';
import color from '../constants/Colors';

const CollectionDialog = ({modalVisible, visible}) => {
  var db = openDatabase({name: 'clippyData.db'});
  const [name, setName] = useState(null);

  const addCollection = () => {
    createCollection({db}, name);
    visible();
    setName('');
  };
  const onCancel = () => {
    visible();
    setName('');
  };

  return (
    <View style={Style.centeredView}>
      <Modal visible={modalVisible} transparent={true} animationType={'slide'}>
        <View style={Style.centeredView}>
          <View style={Style.modalView}>
            <Text style={Style.modalHeader}>Create a collection</Text>

            <Text style={Style.subHeader}>Collection Name</Text>

            <TextInput
              style={Style.input}
              onChangeText={setName}
              value={name}
              placeholder="Enter collection name"
            />

            <View style={Style.dialogFooter}>
              <Text style={Style.cancel} onPress={() => onCancel()}>
                Cancel
              </Text>

              <Text style={Style.create} onPress={() => addCollection()}>
                Create
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Style = StyleSheet.create({
  centeredView: {
    alignSelf: 'center',
    position: 'absolute',
  },
  modalView: {
    marginTop: 180,
    backgroundColor: 'white',
    width: '100%',
    height: '62%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    padding: 10,
    textAlign: 'center',
    backgroundColor: color.Primary,
    width: '100%',
    fontSize: 18,
    color: color.White,
    fontFamily: 'IBMPlexSerif-Italic',
  },
  subHeader: {
    alignSelf: 'flex-start',
    fontSize: 14,
    marginTop: 12,
    marginLeft: 10,
    fontFamily: 'IBMPlexSerif-Italic',
  },
  input: {
    height: 45,
    paddingLeft: 8,
    backgroundColor: color.LightGrey,
    color: color.Black,
    width: '94%',
    marginTop: 4,
    fontFamily: 'IBMPlexSerif-Italic',
  },
  dialogFooter: {
    marginTop: 25,
    flexDirection: 'row',
  },
  create: {
    backgroundColor: color.Accent,
    paddingVertical: 8,
    color: color.White,
    paddingHorizontal: 50,
    marginHorizontal: 5,
    fontFamily: 'IBMPlexSerif-Italic',
  },
  cancel: {
    borderColor: color.Accent,
    borderWidth: StyleSheet.hairlineWidth,
    color: color.Accent,
    paddingVertical: 8,
    paddingHorizontal: 50,
    marginHorizontal: 5,
    fontFamily: 'IBMPlexSerif-Italic',
  },
});

export default CollectionDialog;
