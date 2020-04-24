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

  checkView: {
    position: 'absolute',
    top: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2fc247',
    height: 30,
    width: 30,
    borderRadius: 50
    // color: '#fff'
  },

  checkText: {
    fontSize: 15,
    fontWeight: "bold"
  },

  selected: {},
});