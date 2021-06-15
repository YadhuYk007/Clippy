import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  Linking,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import Separator from '../components/Separator';
import color from '../constants/Colors';
import BottomModal from '../components/BottomModal';
import ClipDialog from '../components/ClipDialog';
import CollectionDialog from '../components/CollectionDialog';
import ClipOptionsModal from '../components/ClipOptionsModal';
import ClipEdit from '../components/ClipEdit';

const CollectionDetails = ({navigation}) => {
  const [bottomModal, setBottomModal] = useState(false);
  const [id, setId] = useState(navigation.state.params.id);
  const [items, setItems] = useState(null);
  const [readItems, setReadItems] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [clipModalVisible, setClipModalVisible] = useState(false);
  const [optionsModal, setOptionsModal] = useState(null);
  const [visible, setVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(null);
  const [editClip, setEditClip] = useState(null);
  var db = openDatabase({name: 'clippyData.db'});

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM clips where collectionid=? AND read=?',
        [id, 0],
        (_, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setItems(temp);
        },
      );
      tx.executeSql(
        'SELECT * FROM clips where collectionid=? AND read=?',
        [id, 1],
        (_, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            setReadItems(temp);
            setVisible(true);
          }
        },
      );
    });
  }, [clipModalVisible, optionsModal, editClip]);

  const openUrl = url => {
    Linking.canOpenURL(url).then(supported => {
      supported ? Linking.openURL(url) : alert('invalid URL');
    });
  };

  // const editClip = () => {
  //   return (

  //   );
  // };

  const setOptionsModalVisible = () => {
    setOptionsModal(true);
  };

  return (
    <View>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setCurrentUrl(item.url);
              openUrl(item.url);
            }}
            onLongPress={() => {
              setCurrentUrl(item.url);
              //openUrl(item.url);
              setOptionsModalVisible();
              setCurrentItem(item.id);
            }}>
            <View style={Style.rowItem}>
              <Image
                style={Style.tinyLogo}
                source={{
                  uri: item.imgurl,
                }}
              />
              <Text style={Style.item}>{item.header}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={
          readItems === null && (
            <Text style={Style.emptyView}>
              No clips to show. Use + button to add
            </Text>
          )
        }
      />
      {visible && (
        <View>
          <Text style={Style.headerText}> Read</Text>
        </View>
      )}

      <FlatList
        data={readItems}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setCurrentUrl(item.url);
              openUrl(item.url);
            }}
            onLongPress={() => {
              setCurrentUrl(item.url);
              //openUrl();
              setOptionsModalVisible();
              setCurrentItem(item.id);
            }}>
            <View style={Style.rowItem}>
              <Image
                style={Style.tinyLogo}
                source={{
                  uri: item.imgurl,
                }}
              />
              <Text style={Style.item}>{item.header}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Separator}
      />
      {/* <View>
        <TouchableOpacity
          style={Style.fab}
          onPress={() => setBottomModal(true)}>
          <Text style={{color: color.White, fontSize: 30}}>+</Text>
        </TouchableOpacity>
      </View> */}
      <CollectionDialog
        modalVisible={modalVisible}
        visible={() => {
          setModalVisible(false);
        }}
      />
      <ClipDialog
        clipModalVisible={clipModalVisible}
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
      <ClipEdit
        clipModalVisible={editClip}
        visible={() => {
          setEditClip(false);
          setModalVisible(false);
        }}
        clipId={currentItem}
        clipUrl={currentUrl}
        collection={id}
      />
      <ClipOptionsModal
        modalVisible={optionsModal}
        itemId={currentItem}
        url={currentUrl}
        setModal={() => {
          setOptionsModal(false);
        }}
        onEdit={() => {
          setEditClip(true);
          //editClip();
        }}
      />
    </View>
  );
};
const Style = StyleSheet.create({
  list: {
    flex: 4,
    flexDirection: 'row',
    flex: 1,
  },
  item: {
    margin: 5,
    padding: 10,
    fontSize: 18,
    height: 44,
    fontFamily: 'IBMPlexSerif-Italic',
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
  emptyView: {
    alignSelf: 'center',
    marginTop: '80%',
    fontSize: 14,
    fontFamily: 'IBMPlexSerif-Italic',
    color: color.Grey,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    margin: 3,
  },
  rowItem: {
    flexDirection: 'row',
  },
  main: {flex: 1},
  headerText: {
    alignSelf: 'center',
    fontFamily: 'IBMPlexSerif-Italic',
  },
});

export default CollectionDetails;
