import React from 'react';
import {Modal, View, ActivityIndicator} from 'react-native';

import styles from './styles';

export default function Loader({ loading }) {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => console.log('modal close')}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={loading}/>
        </View>
      </View>
    </Modal>
  )
}