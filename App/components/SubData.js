import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {previewDetails} from '../data/Databasehandler';

const SubData = ({id}) => {
  var db = openDatabase({name: 'clippyData.db'});
  const [string, setString] = useState('');
  console.log('TEST');

  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM clips where collectionid=?',
      [id],
      (_, results) => {
        var temp = [];
        if (results.rows.length > 0) {
          console.log(results.rows.item(0));
          // for (let i = 0; i < results.rows.length; i + 1) {
          //   console.log(results.rows.item(i));
          // }
        }

        // if (results.rows.length > 0) {
        //   for (let i = 0; i < results.rows.length; i + 1) {
        //     let row = results.rows.item(i).url;
        //     //console.log(JSON.stringify(row));
        //     //temp.push(row);
        //     setString(string + row);
        //     console.log(string);
        //   }
        //   console.log(string);
        // }
      },
      (_, error) => reject(error),
    );
  });
  return <Text>{string}</Text>;
};

export default SubData;
