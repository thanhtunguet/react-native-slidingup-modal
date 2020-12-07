import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeSlidingUpModal from 'react-native-slidingup-modal';

export default function App() {
  const [visible, setVisible] = React.useState<boolean>(false);

  const handleToggleVisible = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const handleRequestClose = React.useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleToggleVisible}>
          <Text>Toggle modal</Text>
        </TouchableOpacity>
      </View>
      <ReactNativeSlidingUpModal
        visible={visible}
        style={styles.modalStyle}
        onRequestClose={handleRequestClose}
      >
        <SafeAreaView>
          <Text>Modal content</Text>
        </SafeAreaView>
      </ReactNativeSlidingUpModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  modalStyle: {
    marginTop: 60,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
});
