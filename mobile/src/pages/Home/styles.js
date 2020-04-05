import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
let dimensions = Dimensions.get('window');
let imageHeight = Math.round((dimensions.width * 3) / 4);
let imageWidth = dimensions.width;


export default StyleSheet.create({
  header: {
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: '#be79df',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 15,
  },

  headerIcon: {
    color: '#fff',
    marginStart: 10,
  },

  headerTitle: {
    color: '#fff', 
    fontSize: 20,
    marginHorizontal: 10,
  },

  container: {
    flex: 1,
  },
  
  chipsList: {
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#dbdbdb'
  },

  chip: {
    padding: 10,
    // backgroundColor: '#c873fa',
    backgroundColor: '#dbdbdb',
    borderRadius: 50,
    marginHorizontal: 5,
  },

  chipText: {
    // color: '#fff'
    color: '#636262',
    fontSize: 12,
  },

  image: {
    width: imageWidth,
    height: imageHeight,
    // overflow: 'visible',
  },

  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
  },

  navButton: {}
});