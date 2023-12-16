import React, {useEffect, useState} from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ResponsivePixels} from '../../../res/styles/ResponsivePixels';
import {Colors} from '../../../res/styles/Colors';
import Images from '../../../components/Images';
import {FloatingEditTextInput} from '../../../components/FloatingEditText';
import {navigationConstants} from '../../../constants/NavigationConstant';
import {
  getAllUsers,
  isEmpty,
  setCurrentUserName,
  setLoggedIn,
  showDangerToast,
} from '../../../utils/Utils';
import {HeaderView} from '../../../components/HeaderView';
import LottieView from 'lottie-react-native';
import {appConstants, DEFAULT_PASSWORD} from '../../../constants/AppConstants';
import {resetNavigation} from '../../../navigation/Navigator';

const Login = (props: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const users: any = await getAllUsers();
      setAllUsers(users);
    }
    fetchData();
  }, []);

  const handlePhoneNumber = (text: any) => {
    setPhoneNumber(text);
  };
  const handlePassword = (text: any) => {
    setPassword(text);
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const validateUser = async () => {
    if (isEmpty(userName)) {
      showDangerToast('Enter Username');
    } else if (isEmpty(password)) {
      showDangerToast('Enter Password');
    } else if (
      password.toLowerCase() != appConstants.DEFAULT_PASSWORD.toLowerCase()
    ) {
      showDangerToast('Enter Valid Password');
    } else {
      await checkIfUserExist();
    }
  };

  const checkIfUserExist = async () => {
    let result = allUsers.filter(
      (item: any) => item.name.toLowerCase() == userName.toLowerCase(),
    );
    console.log('result= == >', result);
    if (result.length > 0) {
      await setCurrentUserName(userName);
      await setLoggedIn();
      resetNavigation(navigationConstants.STORE_LIST);
    } else {
      showDangerToast('Invalid Username or Password');
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderView />
      <View style={styles.topView}>
        <LottieView
          source={Images.ic_gif_login}
          style={styles.headerImage}
          autoPlay
          loop
        />
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.textSize20}>Welcome Back</Text>
        <FloatingEditTextInput
          label={'Username'}
          value={userName}
          onChangeText={handlePhoneNumber}
          imageStart={Images.ic_username}
        />
        <FloatingEditTextInput
          label={'Password'}
          value={password}
          onChangeText={handlePassword}
          imageStart={Images.ic_password_lock}
          endImage={
            showPassword ? Images.ic_password_hide : Images.ic_password_show
          }
          endImageClick={handlePasswordToggle}
          showText={showPassword}
        />
        <TouchableOpacity onPress={validateUser} style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  topView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.defaultWhite,
    borderBottomEndRadius: ResponsivePixels.size40,
    paddingVertical: ResponsivePixels.size20,
    borderBottomStartRadius: ResponsivePixels.size40,
    zIndex: 100,
  },
  headerImage: {
    width: ResponsivePixels.size250,
    height: ResponsivePixels.size250,
  },
  loginText: {
    fontSize: ResponsivePixels.size16,
    color: Colors.primaryColor,
    fontWeight: 'bold',
    marginHorizontal: ResponsivePixels.size5,
    letterSpacing: 0.5,
    lineHeight: ResponsivePixels.size24,
  },
  textSize20: {
    fontSize: ResponsivePixels.size20,
    color: Colors.defaultWhite,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    lineHeight: ResponsivePixels.size30,
  },
  textSize16: {
    fontSize: ResponsivePixels.size14,
    color: Colors.shadeGray,
    fontWeight: 'bold',
    marginVertical: ResponsivePixels.size40,
    marginHorizontal: ResponsivePixels.size50,
    textAlign: 'center',
    lineHeight: ResponsivePixels.size21,
  },
  loginButton: {
    height: ResponsivePixels.size50,
    borderRadius: ResponsivePixels.size44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.defaultWhite,
    width: '100%',
    alignSelf: 'center',
    marginVertical: ResponsivePixels.size20,
  },
  bottomView: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    marginHorizontal: ResponsivePixels.size20,
    paddingVertical: ResponsivePixels.size20,
  },
});

export default Login;
