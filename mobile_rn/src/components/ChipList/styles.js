import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  chipsList: {
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#dbdbdb'
  },

  chip: {
    padding: 10,
    backgroundColor: '#dbdbdb',
    borderRadius: 50,
    marginHorizontal: 5,
  },

  activeChip: {
    backgroundColor: '#7159c1',
  },

  chipText: {
    color: '#636262',
    fontSize: 12,
  },

  activeChipText: {
    color: '#fff',
  },
});