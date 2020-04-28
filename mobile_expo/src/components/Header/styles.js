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

  headerPageContent: {
    flexDirection: 'row',
  },

  headerIcons: {
    color: '#fff',
  },

  cancelIcon: {
    color: '#f76554'
  },

  headerPageIcon: {
    marginStart: 10,
  },

  headerButtons: {
    paddingHorizontal: 10,
    // paddingStart: 15,
  },

  headerOptionsContent: {
    flexDirection: "row"
  },

  headerTitle: {
    color: '#fff', 
    fontSize: 20,
    marginHorizontal: 10,
  },
});