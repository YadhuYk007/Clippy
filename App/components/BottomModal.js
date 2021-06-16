import React from 'react';
import {StyleSheet, View, Text, Modal} from 'react-native';
import color from '../constants/Colors';
const BottomModal = ({bottomModal, clip, collection}) => {
  return (
    <Modal visible={bottomModal} transparent={true} animationType={'slide'}>
      <View style={Style.bottomCenter} onPress={() => setBottomModal(false)}>
        <Text style={Style.bottomTextCollection} onPress={clip}>
          Create a clip
        </Text>

        <Text style={Style.bottomTextCollection} onPress={collection}>
          Create a collection
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
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },

  bottomTextCollection: {
    paddingVertical: 20,
    color: color.Black,
    fontSize: 16,
    fontFamily: 'IBMPlexSerif-Italic',
  },
});

export default BottomModal;
