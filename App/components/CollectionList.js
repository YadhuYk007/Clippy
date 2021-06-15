import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Separator from '../components/Separator';
import {openDatabase} from 'react-native-sqlite-storage';
import color from '../constants/Colors';
import SubData from './SubData';
const CollectionList = ({addClip, modal}) => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState(null);
  let title = 'No Clips!';
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
  }, [modal]);

  const clearText = () => {
    setText('No');
  };

  const initChild = id => {
    console.log(id);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM clips where collectionid=?',
        [id],
        (tx, results) => {
          //console.log('LENGTH>>>>>', results.rows.length);
          if (results.rows.length > 0) {
            if (results.rows.length === 1) {
              title = results.rows.item(0).header;
            } else {
              let temp = results.rows.item(0).header;
              title = temp.slice(0, 20);
              let temp1 = results.rows.item(1).header;
              title = title + ',' + temp1.slice(0, 20);
              let temp2 = results.rows.item(2).header;
              title = title + ',' + temp2.slice(0, 20);
            }
          }
          // if (results.rows.length === 0) {
          //   text = 'No Clips!';
          // }
          setText(title);
        },
      );
    });

    return <Text style={Style.details}>{text}</Text>;
  };
  return (
    <View style={Style.list}>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => addClip(item.id)}>
            <Text style={Style.item}>{item.name}</Text>
            <View style={Style.details}>{initChild(item.id)}</View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={
          <Text style={Style.emptyView}>
            No collection to show. Use + button to add
          </Text>
        }
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
    marginLeft: 10,
    padding: 10,
    fontSize: 18,
    height: 44,
    fontFamily: 'IBMPlexSerif-Italic',
  },
  details: {
    fontFamily: 'IBMPlexSerif-Italic',
    fontSize: 11,
    marginLeft: 10,
  },
  emptyView: {
    alignSelf: 'center',
    marginTop: '80%',
    fontSize: 14,
    fontFamily: 'IBMPlexSerif-Italic',
    color: color.Grey,
  },
});

export default CollectionList;
