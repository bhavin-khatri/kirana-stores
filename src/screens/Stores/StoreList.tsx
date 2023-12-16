import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  getCurrentUserName,
  getFormattedText,
  getUsersWithStoreData,
  isEmpty,
  setCurrentUserName,
  setLoggedIn,
  showDangerToast,
} from '../../utils/Utils';
import {ResponsivePixels} from '../../res/styles/ResponsivePixels';
import {navigationConstants} from '../../constants/NavigationConstant';
import Images from '../../components/Images';
import {Colors} from '../../res/styles/Colors';
import {FloatingEditTextInput} from '../../components/FloatingEditText';
import {appConstants} from '../../constants/AppConstants';
import {createFilter} from 'react-native-search-filter';
import {HeaderView} from '../../components/HeaderView';
import CustomPopUp from '../../components/CustomPopUp';
import {resetNavigation} from '../../navigation/Navigator';
import {useFocusEffect} from '@react-navigation/native';
import CustomLoading from '../../components/CustomLoading';

const StoreList = (props: any) => {
  const [userName, setUserName] = useState('');
  const [storesData, setStoresData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStoresData, setFilterStoresData] = useState<any>([]);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [showExitPopUp, setShowExitPopUp] = useState(false);
  const handleLogout = async () => {
    await setCurrentUserName('');
    resetNavigation(navigationConstants.SPLASH);
  };
  const handleBackButtonClick = () => {
    setShowExitPopUp(!showExitPopUp);
    return true;
  };
  useFocusEffect(
      React.useCallback(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

        return () => {
          BackHandler.removeEventListener(
              "hardwareBackPress",
              handleBackButtonClick
          );
        };
      }, [])
  );
  useFocusEffect(
    React.useCallback(() => {
      async function getData() {
        let currentUser: string = (await getCurrentUserName()) || '';
        setUserName(currentUser);
        getUsersWithStoreData(currentUser)
          .then(res => {
            setStoresData(res.matchingStoresData);
            setShowLoading(false);
          })
          .catch(e => {
            showDangerToast('No Stores Found');
            setShowLoading(false);
          });
      }

      getData();
    }, []),
  );

  useEffect(() => {
    if (isEmpty(searchTerm)) {
      setFilterStoresData(storesData);
    } else {
      const filterList = storesData.filter(
        createFilter(searchTerm, appConstants.SEARCH_STORE_KEYS),
      );
      setFilterStoresData(filterList);
    }
  }, [searchTerm, storesData]);

  const navigateToStoreDetails = (storeItem: any) => {
    props.navigation.navigate(navigationConstants.STORE_DETAILS, {
      storeDetails: storeItem,
    });
  };

  const handleSearchTerm = (text: string) => {
    setSearchTerm(text);
  };

  const renderStoreItem = ({item, index}: {item: any; index: number}) => {
    return (
      <TouchableOpacity
        onPress={() => navigateToStoreDetails(item)}
        style={myStyles.storeItemStyle}>
        {item.storeImage ? (
          <Image source={{uri: item.storeImage}} style={myStyles.storeImage} />
        ) : (
          <View style={myStyles.storeDefaultImageView}>
            <Image
              source={Images.ic_shop}
              style={myStyles.storeDefaultImage}
              resizeMode={'center'}
            />
          </View>
        )}
        <View style={myStyles.storeColumnView}>
          <Text style={myStyles.storeTitleText}>{item.name}</Text>
          <Text style={myStyles.storeSubText}>
            {getFormattedText(item.address)}
          </Text>
          <Text
            style={
              myStyles.storeSubText
            }>{`${item.area} • ${item.route} • 2.1km`}</Text>
          <View style={myStyles.typeView}>
            <Text style={myStyles.typeText}>{item.type.toUpperCase()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={myStyles.mainView}>
      <HeaderView
        startImage={Images.ic_app_logo}
        title={appConstants.APP_NAME}
        showHeader={true}
        userName={userName}
        endImage={Images.ic_logout}
        endImageClick={() => setShowLogoutPopup(true)}
      />
      <View style={myStyles.searchBarView}>
        <FloatingEditTextInput
          label={'Name, Area, Route, Type'}
          value={searchTerm}
          onChangeText={handleSearchTerm}
          imageStart={Images.ic_search}
        />
      </View>
      <FlatList
        data={filterStoresData}
        renderItem={renderStoreItem}
        keyExtractor={item => (item.id = storesData.storeId)}
      />
      <CustomPopUp
        showModal={showLogoutPopup}
        hideModel={() => setShowLogoutPopup(false)}
        // isCenterButtonNeeded={true}
        title={'Logout'}
        description={`Are you sure you want to logout ${userName.toUpperCase()} ?`}
        onClickNo={() => {
          setShowLogoutPopup(false);
        }}
        onClickYes={() => handleLogout()}
        // onClickCenterButton={() => onClickRateUs()}
      />
      <CustomLoading
        showModal={showLoading}
        message={'Fetching Stores , Please Wait'}
      />
      <CustomPopUp
          showModal={showExitPopUp}
          hideModel={() => setShowExitPopUp(false)}
          title={'Exit'}
          description={`Are you sure you want to Exit ?`}
          onClickNo={() => {
            setShowExitPopUp(false);
          }}
          onClickYes={() => {
            BackHandler.exitApp()
          }}
      />
    </View>
  );
};

export default StoreList;

const myStyles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
    flex: 1,
  },
  storeItemStyle: {
    marginTop: ResponsivePixels.size30,
    marginHorizontal: ResponsivePixels.size20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
  },
  storeColumnView: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flex: 1,
    marginStart: ResponsivePixels.size10,
    paddingVertical: ResponsivePixels.size10,
  },
  storeImage: {
    height: ResponsivePixels.size150,
    width: ResponsivePixels.size120,
    borderRadius: ResponsivePixels.size20,
  },
  storeDefaultImageView: {
    height: ResponsivePixels.size150,
    width: ResponsivePixels.size120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeDefaultImage: {
    height: ResponsivePixels.size80,
    width: ResponsivePixels.size80,
  },
  storeTitleText: {
    fontSize: ResponsivePixels.size18,
    fontWeight: 'bold',
    color: Colors.defaultBlack,
    lineHeight: 25,
    letterSpacing: 0.3,
  },
  storeSubText: {
    fontSize: ResponsivePixels.size14,
    color: Colors.defaultGray,
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  typeView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryColorShade2,
    width: '100%',
    height: ResponsivePixels.size40,
    paddingHorizontal: ResponsivePixels.size10,
    borderRadius: ResponsivePixels.size25,
    borderColor: Colors.primaryColorShade1,
    borderWidth: ResponsivePixels.size1,
    marginVertical: ResponsivePixels.size5,
  },
  typeText: {
    color: Colors.primaryColor,
    fontWeight: 'bold',
    fontSize: ResponsivePixels.size16,
  },
  searchBarView: {
    marginHorizontal: ResponsivePixels.size20,
  },
  searchIcon: {
    height: ResponsivePixels.size20,
    width: ResponsivePixels.size20,
    tintColor: Colors.darkMatGrey,
  },
  searchText: {
    color: Colors.darkMatGrey,
    fontSize: ResponsivePixels.size14,
    lineHeight: 20,
  },
});
