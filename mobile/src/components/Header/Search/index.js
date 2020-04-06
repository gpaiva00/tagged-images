import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

export default function Search({ handleClosePress }) {

  function toggleTagsList() {}

  return (
    <View style={styles.header}>
      <MaterialIcons
        name="image"
        size={28}
        style={[styles.headerPageIcon, styles.headerIcons]}>
        </MaterialIcons>
        
        <View style={styles.searchContent}>
          {/* <TextInput
            style={styles.searchField}
            placeholder="Beleza, Paisagem, Natureza..."
            autoFocus={true}
            onFocus={toggleTagsList}>
          </TextInput> */}

          <Autocomplete
            data={[1,2,3]}
            defaultValue={""}
            onChangeText={() => {}}
            autoFocus={true}
            keyExtractor={(item, index) => String(index)}
            style={{ }}
            containerStyle={styles.autocompleteContainer}
            renderItem={({ item, i }) => (
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.itemText}>Texto aqui</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      
      <View style={styles.headerOptionsContent}>
        <TouchableOpacity onPress={handleClosePress} style={styles.headerSearchButton}>
          <MaterialIcons name='close' size={28} style={styles.headerIcons}>
          </MaterialIcons>
        </TouchableOpacity>
      </View>
    </View>
  );
}