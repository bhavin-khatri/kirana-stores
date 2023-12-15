import React, { useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { Colors } from "../res/styles/Colors";
import { ResponsivePixels } from "../res/styles/ResponsivePixels";
import Images from "./Images";

export interface IProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  imageStart?:any;
  isMultiCountry?:any
  isOTp?:any
  otp?:any
  handleOtpInputChange?:(index:any, text:any)=>void
  otpTextInputRefs?:any

}

export const FloatingEditTextInput: React.FC<IProps> = React.forwardRef(
  (props, ref: any) => {
    const {
      value,
      label,
      onChangeText,
      imageStart,
      isMultiCountry,
      isOTp,
      otp,
      handleOtpInputChange,
      otpTextInputRefs
    } = props;


    return (
      <>
        {isOTp ?
          <View style={styles.otpContainer}>
            {otp.map((value: any, index: number) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                onChangeText={(text) => handleOtpInputChange(index, text)}
                value={value}
                keyboardType="numeric"
                maxLength={1}
                ref={otpTextInputRefs[index]}
              />
            ))}
          </View>
          :
          <View style={styles.inputView}>
            {isMultiCountry ?
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{color:Colors.defaultBlack}}>+91</Text>
                <Image source={Images.ic_down} style={styles.imageStartStyle} />
              </View>
              : null
            }


            <TextInput
              style={styles.textInput}
              placeholderTextColor={Colors.shadeGray}
              placeholder={label}
              value={value}
              onChangeText={text => onChangeText(text)}
            />


          </View>
        }
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
  },
  rowView:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:ResponsivePixels.size15,
  },
  otpInput: {
    borderWidth: ResponsivePixels.size1,
    borderRadius: ResponsivePixels.size15,
    paddingVertical: ResponsivePixels.size10,
    marginHorizontal: ResponsivePixels.size10,
    textAlign: 'center',
    backgroundColor:Colors.lightGray,
    fontSize: ResponsivePixels.size20,
    borderColor:Colors.lightGrayBorder,
    width: ResponsivePixels.size70,
    color:Colors.defaultBlack
  },
})
