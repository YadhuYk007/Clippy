import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import Icon from 'react-native-remix-icon';
import color from '../constants/Colors';

const NavHeader = ({onEditClick, onDeleteClick}) => {
  return (
    <View style={styles.headerParent}>
      <TouchableOpacity onPress={onEditClick} style={styles.editButton}>
        <Icon name="ri-edit-line" size={24} color={color.White} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDeleteClick} style={styles.deleteButton}>
        <Icon name="ri-delete-bin-4-line" size={24} color={color.White} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerParent: {flexDirection: 'row'},
  editButton: {marginHorizontal: 14},
  deleteButton: {marginRight: 16},
});

export default NavHeader;
