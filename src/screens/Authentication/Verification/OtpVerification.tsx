import React, { useRef, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ResponsivePixels } from "../../../res/styles/ResponsivePixels";
import { Colors } from "../../../res/styles/Colors";
import Images from "../../../components/Images";
import { FloatingEditTextInput } from "../../../components/FloatingEditText";
import { navigationConstants } from "../../../constants/NavigationConstant";
import { isEmpty, setLoggedIn, showDangerToast, showSuccessToast } from "../../../utils/Utils";
import { HeaderView } from "../../../components/HeaderView";
import AlertDialog from "../../../components/AlertDialog";

const OtpVerification = (props:any) => {

  const [otp, setOtp] = useState(['', '', '', '']);
  const otpTextInputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleOtpInputChange = (index:any, value:any) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    if (index < otp.length - 1 && value !== '') {
      otpTextInputRefs[index + 1].current.focus();
    }
  };
  const {params} = props.route;
  const mobileNumber = params?.phoneNumber

  const handleClick=async ()=>{
    showSuccessToast('Your Details has been submitted')
  }


  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderView/>
      <View style={styles.topView}>
        <Text style={styles.textSize20}>OTP Verify</Text>
        <Image source={Images.ic_login_head} style={styles.headerImage} />
        <Text style={[styles.textSize16,{color:Colors.defaultBlack,fontWeight:'normal'}]}>Otp Sent To</Text>
        <Text style={[styles.numberText]}>{`+91`} {mobileNumber}</Text>
        <FloatingEditTextInput  isOTp={true} otp={otp} handleOtpInputChange={handleOtpInputChange} otpTextInputRefs={otpTextInputRefs}/>
        <TouchableOpacity onPress={handleClick} style={styles.loginButton}>
          <Text style={styles.loginText}>Verify Otp</Text>
        </TouchableOpacity>
        <Text style={[styles.textSize16,{marginVertical:ResponsivePixels.size40,
          marginHorizontal:ResponsivePixels.size50,}]}>By signing up you agree with our terms and condition</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.defaultWhite,
  },
  topView:{
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical:ResponsivePixels.size20
  },
  headerImage:{
    width:ResponsivePixels.size227,
    height:ResponsivePixels.size227,
  },
  loginText:{
    fontSize:ResponsivePixels.size16,
    color:Colors.defaultWhite,
    fontWeight:'bold',
    marginHorizontal:ResponsivePixels.size5,
    letterSpacing:0.5,
    lineHeight:ResponsivePixels.size24
  },
  textSize20:{
    fontSize:ResponsivePixels.size20,
    color:Colors.defaultBlack,
    fontWeight:'bold',
    letterSpacing:0.5,
    lineHeight:ResponsivePixels.size30,
    marginBottom:ResponsivePixels.size20
  },
  textSize16:{
    fontSize:ResponsivePixels.size14,
    color:Colors.shadeGray,
    fontWeight:'bold',
    textAlign:'center',
    lineHeight:ResponsivePixels.size21
  },
  numberText:{
    fontSize:ResponsivePixels.size16,
    color:Colors.defaultBlack,
    fontWeight:'bold',
    marginBottom:ResponsivePixels.size10,
    textAlign:'center',
    lineHeight:ResponsivePixels.size21
  },
  loginButton:{
    height:ResponsivePixels.size50,
    width:'90%',
    borderRadius:ResponsivePixels.size44,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:Colors.primaryColor,
  }

});

export default OtpVerification;
