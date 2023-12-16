import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../res/styles/Colors';
import {ResponsivePixels} from '../res/styles/ResponsivePixels';
import Images from './Images';

export interface IProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  imageStart?: any;
  endImage?: any;
  endImageClick?: any;
  showText?: any;
}

export const FloatingEditTextInput: React.FC<IProps> = React.forwardRef(
  (props, ref: any) => {
    const {
      value,
      label,
      onChangeText,
      imageStart,
      endImage,
      endImageClick,
      showText = true,
    } = props;

    return (
      <>
        <View style={styles.inputView}>
          {imageStart ? (
            <Image source={imageStart} style={styles.imageStartStyle} />
          ) : null}
          <TextInput
            style={styles.textInput}
            placeholderTextColor={Colors.darkMatGrey}
            placeholder={label || 'Enter Text'}
            value={value}
            onChangeText={text => onChangeText(text)}
            secureTextEntry={!showText}
          />
          {endImage ? (
            <TouchableOpacity onPress={endImageClick ? endImageClick : null}>
              <Image source={endImage} style={styles.imageStartStyle} />
            </TouchableOpacity>
          ) : null}
        </View>
      </>
    );
  },
);

const styles = StyleSheet.create({
  inputView: {
    height: ResponsivePixels.size50,
    backgroundColor: Colors.matGrey,
    borderRadius: ResponsivePixels.size10,
    marginTop: ResponsivePixels.size20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: ResponsivePixels.size10,
  },
  textInput: {
    fontSize: ResponsivePixels.size14,
    color: Colors.defaultBlack,
    marginHorizontal: ResponsivePixels.size10,
    flex: 1,
  },
  imageStartStyle: {
    height: ResponsivePixels.size20,
    width: ResponsivePixels.size20,
    tintColor: Colors.darkMatGrey,
  },
});
