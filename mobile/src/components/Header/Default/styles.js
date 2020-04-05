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