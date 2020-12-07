import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: '#0000003F',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  indicatorView: {
    backgroundColor: '#0000003F',
    height: 4,
    borderRadius: 4,
  },
  indicator: {
    width: '40%',
    position: 'absolute',
    top: -12,
    marginTop: 2,
    paddingTop: 12,
    paddingBottom: 12,
    alignSelf: 'center',
  },
  modal: {
    width: '100%',
    backgroundColor: '#ffffff',
    flexGrow: 1,
  },
});
