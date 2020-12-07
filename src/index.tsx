import React, { FC, PropsWithChildren } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  ModalProps,
  PanResponder,
  PanResponderInstance,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { styles } from './styles';

const { height } = Dimensions.get('screen');

const ReactNativeSlidingUpModal: FC<
  PropsWithChildren<ReactNativeSlidingUpModalProps>
> = (props: PropsWithChildren<ReactNativeSlidingUpModalProps>) => {
  const {
    visible,
    children,
    backdropStyle,
    style,
    indicatorStyle,
    onRequestClose,
    animationEndingDuration,
  } = props;

  const animatedValue: Animated.Value = React.useRef<Animated.Value>(
    new Animated.Value(height)
  ).current;

  const innerAnimatedValue: Animated.Value = React.useRef<Animated.Value>(
    new Animated.Value(0)
  ).current;

  const panResponder: PanResponderInstance = React.useRef<PanResponderInstance>(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (...[, state]) => {
        if (state.dy >= 0) {
          innerAnimatedValue.setValue(state.dy);
        }
      },
      onPanResponderEnd: () => {},
      onPanResponderRelease: (...[, state]) => {
        if (state.dy >= 0) {
          const toValue: number =
            state.vy < 0 ? 0 : state.dy > 100 ? height - state.y0 : 0;
          Animated.spring(innerAnimatedValue, {
            toValue,
            useNativeDriver: true,
          }).start(() => {
            if (toValue > 0 && typeof onRequestClose === 'function') {
              onRequestClose();
              innerAnimatedValue.setValue(0);
            }
          });
        }
      },
    })
  ).current;

  React.useEffect(() => {
    const toValue: number = visible ? 0 : height;
    Animated.timing(animatedValue, {
      toValue,
      useNativeDriver: true,
      duration: animationEndingDuration,
    }).start();
  }, [visible, animatedValue, animationEndingDuration]);

  return (
    <Modal visible={visible} transparent={true}>
      <Animated.View
        style={[
          styles.backdrop,
          StyleSheet.flatten(backdropStyle),
          {
            transform: [
              {
                translateY: animatedValue,
              },
            ],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.modal,
            StyleSheet.flatten(style),
            {
              transform: [
                {
                  translateY: innerAnimatedValue,
                },
              ],
            },
          ]}
        >
          <Animated.View
            {...panResponder.panHandlers}
            style={[styles.indicator, StyleSheet.flatten(indicatorStyle)]}
          >
            <View style={styles.indicatorView} />
          </Animated.View>
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

interface ReactNativeSlidingUpModalProps extends ModalProps {
  visible: boolean;
  backdropStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  animationEndingDuration?: number;
}

ReactNativeSlidingUpModal.defaultProps = {
  animationEndingDuration: 300,
};

ReactNativeSlidingUpModal.displayName = 'SlidingUpModal';

export default ReactNativeSlidingUpModal;
