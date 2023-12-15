import React, { useState } from "react";
import {Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ResponsivePixels } from "../../../res/styles/ResponsivePixels";
import { Colors } from "../../../res/styles/Colors";
import Images from "../../../components/Images";
import { FloatingEditTextInput } from "../../../components/FloatingEditText";
import { navigationConstants } from "../../../constants/NavigationConstant";
import { isEmpty, setLoggedIn, showDangerToast } from "../../../utils/Utils";
import { HeaderView } from "../../../components/HeaderView";

const Login = (props:any) => {

  const [phoneNumber,setPhoneNumber]=useState('')

  const handlePhoneNumber=(text:any)=>{
    setPhoneNumber(text)
  }

  const validateUser=async ()=>{
    console.log("nanna",phoneNumber);
    if(isEmpty(phoneNumber)){
      showDangerToast('Enter Phone Number')
    }else{
      props.navigation.navigate(navigationConstants.OTP_VERIFICATION,{phoneNumber:phoneNumber})
    }
  }


  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderView/>
      <View style={styles.topView}>
        <Text style={styles.textSize20}>Login In</Text>
        <Animated.View style={{ flex: 1 }}>
        <Image source={Images.ic_gif_login} style={styles.headerImage}/>
        </Animated.View>
        <FloatingEditTextInput isMultiCountry={true} label={'Phone Number'} value={phoneNumber} onChangeText={handlePhoneNumber} imageStart={Images.ic_email}/>
        <TouchableOpacity onPress={validateUser} style={styles.loginButton}>
          <Text style={styles.loginText}>Get Otp</Text>
        </TouchableOpacity>
        <Text style={[styles.textSize16]}>By signing up you agree with our terms and condition</Text>

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
    marginVertical:ResponsivePixels.size40,
    marginHorizontal:ResponsivePixels.size50,
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

export default Login;
