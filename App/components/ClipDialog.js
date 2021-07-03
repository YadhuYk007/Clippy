import React, {useState, useEffect} from 'react';
import {getLinkPreview} from 'link-preview-js';
import {openDatabase} from 'react-native-sqlite-storage';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  ToastAndroid,
  Linking,
} from 'react-native';
import color from '../constants/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
import {addClip} from '../data/Databasehandler';

const ClipDialog = ({clipModalVisible, visible, modal}) => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [dropdown, setDropdown] = useState([]);
  const [url, setUrl] = useState(null);

  var db = openDatabase({name: 'clippyData.db'});

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM collections', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setItems(temp);
      });
    });

    setDropdown(
      items.map((collection, index) => {
        return {value: collection.id, label: collection.name};
      }),
    );
  }, [clipModalVisible, modal]);

  const createClip = async () => {
    try {
      const result = await getLinkPreview(url);
      if (url === null || url.length === 0) {
        ToastAndroid.show('Please enter a valid URL', ToastAndroid.LONG);
      } else if (value === null) {
        ToastAndroid.show('Please choose a collection', ToastAndroid.LONG);
      } else {
        const supported = Linking.canOpenURL(url);
        if (supported) {
          addClip({db}, value, url, result.title, result.favicons[0]);
          visible();
          setUrl('');
        }
      }
    } catch (e) {
      ToastAndroid.show('Invalid URL', ToastAndroid.LONG);
    }
  };
  return (
    <View style={Style.centeredView}>
      <Modal
        visible={clipModalVisible}
        transparent={true}
        animationType={'slide'}>
        <View style={Style.centeredView}>
          <View style={Style.modalView}>
            <Text style={Style.modalHeader}>Create a clip</Text>
            <Text style={Style.subHeader}>Collection Name</Text>

            <View>
              <DropDownPicker
                items={dropdown}
                bottomOffset={100}
                placeholder="Choose collection"
                placeholderStyle={{
                  fontFamily: 'IBMPlexSerif-Italic',
                }}
                textStyle={{
                  fontFamily: 'IBMPlexSerif-Italic',
                }}
                open={open}
                value={value}
                setOpen={setOpen}
                setItems={setDropdown}
                setValue={setValue}
                style={Style.pickerContainer}
                dropDownContainerStyle={Style.dropDown}
              />
            </View>

            <Text style={Style.subHeader}>URL</Text>
            <TextInput
              style={Style.input}
              onChangeText={setUrl}
              value={url}
              placeholder="Enter the clip URL"
            />
            <View style={Style.dialogFooter}>
              <Text style={Style.cancel} onPress={() => visible()}>
                Cancel
              </Text>

              <Text style={Style.create} onPress={() => createClip()}>
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
    shadowColor: color.shadowColor,
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
    width: 320,
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

  pickerContainer: {
    width: 320,
    height: 42,
    alignSelf: 'center',
    borderRadius: 0,
    borderWidth: 0,
    margin: 3.5,
    backgroundColor: color.LightGrey,
  },
  dropDown: {
    width: 320,
    maxHeight: 100,
    alignSelf: 'center',
    borderRadius: 0,
    borderWidth: 0,
    margin: 3.5,
    backgroundColor: color.White,
  },
});

export default ClipDialog;
