import {Image, StyleSheet, View} from 'react-native';
import {useEffect} from 'react';
import {getCurrentUserName, isEmpty} from '../../utils/Utils';
import {navigationConstants} from '../../constants/NavigationConstant';
import {resetNavigation} from '../../navigation/Navigator';
import Images from '../../components/Images';
import {Colors} from '../../res/styles/Colors';
import {ResponsivePixels} from '../../res/styles/ResponsivePixels';
import {HeaderView} from '../../components/HeaderView';

const Splash = (props: any) => {
  useEffect(() => {
    async function fetchData() {
      try {
        let currentUser: string = (await getCurrentUserName()) || '';
        if (isEmpty(currentUser)) {
          navigateToNextScreen(navigationConstants.LOGIN);
        } else {
          navigateToNextScreen(navigationConstants.STORE_LIST);
        }
      } catch (error) {
        // Handle errors if getCurrentUserName() fails
        console.error('Error:', error);
      }
    }
    setTimeout(() => {
      fetchData();
    }, 500);
  }, []);

  const navigateToNextScreen = (screenName: any) => {
    resetNavigation(screenName);
  };

  return (
    <View style={myStyles.mainView}>
      <HeaderView showHeader={false} />
      <Image style={myStyles.appLogo} source={Images.ic_app_logo} />
    </View>
  );
};

export default Splash;

const myStyles = StyleSheet.create({
  mainView: {
    backgroundColor: Colors.defaultWhite,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appLogo: {
    height: ResponsivePixels.size150,
    width: ResponsivePixels.size150,
  },
});
