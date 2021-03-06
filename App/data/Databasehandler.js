import Toast from 'react-native-simple-toast';

export const createCollection = ({db}, collectionName) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists collections (id integer primary key autoincrement, name text);',
        null,
        null,
      );
      tx.executeSql(
        'insert into collections (name) values (?)',
        [collectionName],
        (_, results) => {
          resolve(results);
          if (results.rowsAffected > 0) {
            Toast.show('Added');
          } else {
            Toast.show('Error occurred...Please try again');
          }
        },
        (_, error) => reject(error),
      );
    });
  });
  return promise;
};

export const getCollections = ({db}) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'select * from collections',
        [],
        (_, results) => {
          let row = results.rows.item(0);
          resolve(results);
        },
        (_, error) => reject(error),
      );
    });
  });
  return promise;
};

export const addClip = async ({db}, cId, url, title, image) => {
  const preview = title.slice(0, 15);
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists clips (id integer primary key autoincrement, collectionid text,url text,imgurl text,header text,read text,preview text);',
        null,
        null,
      );
      tx.executeSql(
        'insert into clips (collectionid,url,read,header,imgurl,preview) values (?,?,?,?,?,?)',
        [cId, url, 0, title, image, preview],
        (_, results) => {
          resolve(results);
          if (results.rowsAffected > 0) {
            Toast.show('Clip Added');
          } else {
            Toast.show('Error occurred...Please try again');
          }
        },
        (_, error) => reject(error),
      );
    });
  });
  return promise;
};

export const deleteItem = ({db}, id) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM  clips where id=?', [id], (_, results) => {
      if (results.rowsAffected > 0) {
        Toast.show('Deleted');
      } else {
        Toast.show('error while deleting');
      }
    });
  });
};

export const deleteCollection = ({db}, id) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM  collections where id=?', [id], (_, results) => {
      if (results.rowsAffected > 0) {
        Toast.show('Deleted');
      } else {
        Toast.show('error while deleting');
      }
    });
    tx.executeSql(
      'DELETE FROM  clips where collectionid=?',
      [id],
      (_, results) => {
        if (results.rowsAffected > 0) {
          Toast.show('Deleted');
        } else {
          Toast.show('error while deleting');
        }
      },
    );
  });
};

export const setReadFlag = ({db}, id) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE clips set read=? where id=?',
      [1, id],
      (_, results) => {
        if (results.rowsAffected > 0) {
          Toast.show('Updated');
        } else Toast.show('Updation Failed');
      },
    );
  });
};

export const updateCollection = ({db}, id, name) => {
  console.log(id, name);
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE collections set name=? where id=?',
      [name, id],
      (_, results) => {
        if (results.rowsAffected > 0) {
          Toast.show('Updated');
        } else Toast.show('Updation Failed');
      },
    );
  });
};

export const ClipUpdate = ({db}, collection, url, title, image, clipId) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE clips set collectionid=?,url=? ,header=?,imgurl=? where id=?',
      [collection, url, title, image, clipId],
      (_, results) => {
        if (results.rowsAffected > 0) {
          Toast.show('Updated');
        } else Toast.show('Updation Failed');
      },
    );
  });
};
