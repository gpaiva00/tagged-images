import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  
  list: {
    // flex: 1,
    marginTop: 15,
  },

  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#dbdbdb'
  },

  listItemText: {
    fontSize: 15
  },

  listItemIcon: {
    color: '#dbdbdb'
  },
})