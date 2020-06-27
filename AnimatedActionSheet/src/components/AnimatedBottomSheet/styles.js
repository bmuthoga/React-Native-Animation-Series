import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 25,
    marginHorizontal: 10,
    justifyContent: 'flex-start',
    zIndex: 100,
  },
  bottomSheetTextContainer: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0.5,
    width: '100%',
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetWarningText: {
    color: 'rgb(189, 49, 45)',
  },
});
