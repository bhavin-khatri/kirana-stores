import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Colors} from '../res/styles/Colors';
import {ResponsivePixels} from '../res/styles/ResponsivePixels';
import Images from './Images';

interface ModelPropUps {
  showModal: boolean;
  message: string;
}

const CustomLoading: React.FC<ModelPropUps> = ({
  showModal,
  message = 'Loading Please Wait',
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startRotation();
    return () => {
      // Clean up the animation when the component unmounts
      rotateAnim.setValue(0);
    };
  }, [rotateAnim]);
  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000, // Duration for one full rotation (in milliseconds)
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <>
      <StatusBar translucent />
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <TouchableWithoutFeedback>
          <View style={styles.outerView}>
            <View style={styles.innerView}>
              <Animated.Image
                source={Images.ic_loading}
                style={[styles.loadingImage, {transform: [{rotate: spin}]}]}
              />
              <Text style={styles.textSize16}>{message}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default CustomLoading;

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.defaultWhiteWithLowOpacity,
  },
  innerView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: ResponsivePixels.size1,
    borderRadius: ResponsivePixels.size20,
    marginHorizontal: ResponsivePixels.size20,
    height: ResponsivePixels.size100,
    backgroundColor: Colors.primaryColorShade2,
    borderColor: Colors.primaryColorShade1,
  },
  loadingImage: {
    height: ResponsivePixels.size30,
    width: ResponsivePixels.size30,
    tintColor: Colors.primaryColor,
  },
  textSize16: {
    fontSize: ResponsivePixels.size16,
    color: Colors.primaryColor,
    letterSpacing: 0.2,
    marginTop: ResponsivePixels.size10,
  },
});
