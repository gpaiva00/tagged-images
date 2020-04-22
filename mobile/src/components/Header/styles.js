import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  header: {
    // position: 'absolute',
    // top: 0,
    // width: '100%',
    paddingTop: Constants.statusBarHeight - 10,
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

  headerPageIcon: {
    marginStart: 10,
  },

  headerSearchButton: {
    paddingHorizontal: 10,
  },

  headerTitle: {
    color: '#fff', 
    fontSize: 20,
    marginHorizontal: 10,
  },
});