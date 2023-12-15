import React, { useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { Colors } from "../res/styles/Colors";
import { ResponsivePixels } from "../res/styles/ResponsivePixels";
import Images from "./Images";

export interface IProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  imageStart?:any;
}

export const FloatingEditTextInput: React.FC<IProps> = React.forwardRef(
  (props, ref: any) => {
    const {
      value,
      label,
      onChangeText,
      imageStart,
    } = props;

    return (
      <>
        <View style={styles.inputView}>
          {imageStart ?
              <Image source={Images.ic_down} style={styles.imageStartStyle} />
              : null
          }
          <TextInput
              style={styles.textInput}
              placeholderTextColor={Colors.shadeGray}
              placeholder={label || 'Enter Text'}
              value={value}
              onChangeText={text => onChangeText(text)}
          />


        </View>
      </>
    );
  }
);

const styles = StyleSheet.create({
  inputView:{
    height:ResponsivePixels.size50,
    borderColor:Colors.lightGrayBorder,
    borderWidth:ResponsivePixels.size2,
    backgroundColor:Colors.lightGray,
    width:'90%',
    borderRadius:ResponsivePixels.size25,
    marginVertical:ResponsivePixels.size15,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    paddingHorizontal:ResponsivePixels.size20
  },
  textInput: {
    fontSize: ResponsivePixels.size14,
    color: Colors.defaultBlack,
  },
  imageStartStyle:{
    height:ResponsivePixels.size20,
    width:ResponsivePixels.size20,
    marginHorizontal:ResponsivePixels.size10
  }
})
