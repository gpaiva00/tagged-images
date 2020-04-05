import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  header: {
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: '#be79df',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
  },

  headerIcons: {
    color: '#fff',
  },

  headerPageIcon: {
    marginStart: 10,
  },

  headerSearchButton: {
    marginRight: 10,
  },

  searchField: {
    height: 28,
    width: '90%',
    backgroundColor: '#fff',
    marginStart: 12,
  },
  
  searchContent: {
    width: '70%',
    backgroundColor: '#fff',
    borderRadius: 50,
  },
});