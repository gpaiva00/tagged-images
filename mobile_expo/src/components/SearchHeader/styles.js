import { StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  header: {
    paddingTop: Platform.select({
      ios: Constants.statusBarHeight + 15,
      android: 15
    }),
    backgroundColor: '#7159c1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
  },

  searchInputText: {
    backgroundColor: '#fff',
    height: 30, 
    borderRadius: 5,
    width: '74%',
    paddingStart: 8,
    borderColor: '#fff',
    borderWidth: 1
  },

  headerIcons: {
    color: '#fff',
  },

  headerPageIcon: {
    marginStart: 5,
  },

  headerButtons: {
    marginEnd: 8,
  },

  checkButton: {
    color: '#32a852',
    // backgroundColor: '#fff', 
    // borderRadius: 100,
  },

});