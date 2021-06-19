import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Separator from '../components/Separator';
import {openDatabase} from 'react-native-sqlite-storage';
import color from '../constants/Colors';
const CollectionList = ({addClip, modal}) => {
  const [items, setItems] = useState([]);
  let title = 'No Clips!';
  var db = openDatabase({name: 'clippyData.db'});

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists collections (id integer primary key autoincrement, name text);',
        null,
        null,
      );
      tx.executeSql(
        'create table if not exists clips (id integer primary key autoincrement, collectionid text,url text,imgurl text,header text,read text,preview text);',
        null,
        null,
      );
      tx.executeSql(
        'SELECT c.id as id,c.name as name,GROUP_CONCAT(cp.preview) AS clips FROM collections c left join clips cp on c.id=cp.collectionid group by c.id',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setItems(temp);
        },
      );
    });
  }, [modal, items]);

  return (
    <View style={Style.list}>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => addClip(item.id, item.name)}>
            <Text style={Style.item}>{item.name}</Text>
            <Text style={Style.details}>
              {item.clips == null ? 'No Clips!' : item.clips}
            </Text>
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
    marginLeft: 20,
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
