import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
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

  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999
  },

  itemText: {
    fontSize: 15,
    margin: 2
  },
});