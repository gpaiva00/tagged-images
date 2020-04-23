import { StyleSheet, Dimensions } from 'react-native';
let dimensions = Dimensions.get('window');
let imageHeight = Math.round((dimensions.width * 3) / 4);
let imageWidth = dimensions.width;

export default StyleSheet.create({
  container: { 
    flex: 1,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  noText: {
    fontSize: 15
  },
  
  image: {
    width: imageWidth,
    height: imageHeight,
  },

  checkIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // color: '#2fc247'
    color: '#fff'
  },

  selected: {},
});