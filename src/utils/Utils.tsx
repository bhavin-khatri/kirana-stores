import {CURRENT_USER_NAME, IS_LOGGED_IN} from './PrefKeys';
import {getItem, setItem} from './PrefUtils';
import {Colors} from '../res/styles/Colors';
import {Toast} from 'native-base';
import {Dimensions, Text, View} from 'react-native';
import {ResponsivePixels} from '../res/styles/ResponsivePixels';
import database from '@react-native-firebase/database';

type TOAST_TYPES = 'success' | 'danger' | 'warning' | 'info';
let toastRef: any = undefined;
export const isEmpty = (value: any) =>
  !value || value.toString().trim().length <= 0;

export const setLoggedIn = async () => {
  await setItem(IS_LOGGED_IN, 'true');
};

export const setCurrentUserName = async (userName: string) => {
  await setItem(CURRENT_USER_NAME, userName);
};

export const getCurrentUserName = async () => {
  return await getItem(CURRENT_USER_NAME);
};

export const showToast = (
  message: string,
  duration = 2000,
  type: TOAST_TYPES = 'success',
) => {
  const styleToast: any = {position: 'absolute', bottom: 0};
  let bgColor = Colors.highlightGreen;
  if (type === 'warning') {
    bgColor = Colors.defaultYellow;
  } else if (type === 'danger') {
    bgColor = Colors.defaultRed;
  }
  if (!toastRef) {
    Toast.show({
      title: message.toString(),
      duration,
      placement: 'top',
      style: styleToast,
      render: () => {
        toastRef = 'Some dummy value';
        return (
          <View
            style={{
              backgroundColor: bgColor,
              width: Dimensions.get('window').width,
            }}>
            <Text
              style={{
                paddingVertical: ResponsivePixels.size15,
                paddingHorizontal: ResponsivePixels.size10,
                color: Colors.defaultWhite,
              }}>
              {message}
            </Text>
          </View>
        );
      },
      onCloseComplete: () => {
        toastRef = undefined;
      },
    });
  }
};

export const showDangerToast = (message: string, duration: number = 1500) => {
  showToast(message, duration, 'danger');
};

export const showSuccessToast = (message: string, duration: number = 1500) => {
  showToast(message, duration, 'success');
};

export const getAllStores = () => {
  return new Promise((resolve, reject) => {
    const storesRef = database().ref('stores');
    let storeList: any = [];
    storesRef.on('value', snapshot => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot: any) => {
          const stores = childSnapshot.val();
          const storeId = childSnapshot.key || ''; // Get the user ID
          storeList.push({
            storeId: storeId,
            name: stores.name,
            address: stores.address,
            area: stores.area,
            route: stores.route,
            type: stores.type,
            storeImage: stores.storeImage ? stores.storeImage : '',
          });
        });
        resolve(storeList);
      } else {
        reject('No data available');
      }
    });
  });
};

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const usersRef = database().ref('users');
    const userList: any[] = [];
    usersRef.on('value', snapshot => {
      if (snapshot.exists()) {
        snapshot.forEach(childSnapshot => {
          const user = childSnapshot.val();
          const userId = childSnapshot.key || '';
          userList.push({
            userId: userId,
            name: user.name,
            stores: user.stores || [],
          });
        });
        resolve(userList);
      } else {
        reject('No data available');
      }
    });
  });
};

const getUserDataFromName = async (userName: string) => {
  try {
    const userList: any = await getAllUsers();
    let userData: any = {};
    userData = userList.filter(
      (userItem: any) => userItem.name.toLowerCase() == userName.toLowerCase(),
    );
    return userData[0];
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const getUsersWithStoreData = async (userName: string) => {
  try {
    let userData: any = await getUserDataFromName(userName);
    let storeList: any = await getAllStores();
    let userStoreList: any = [];
    let newUserData: any = {};
    if (userData) {
      storeList.map((storeItem: any) => {
        userData.stores.map((storeId: string) => {
          if (storeItem.storeId == storeId) {
            userStoreList.push(storeItem);
          }
        });
      });
      newUserData = {
        ...userData,
        matchingStoresData: userStoreList,
      };
      return newUserData;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const updateStoreDetailsInFirebase = (storeDetails: any) => {
  const {storeId, storeImage} = storeDetails;
  const storeRef = database().ref(`stores/${storeId}`);
  storeRef
    .once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        const storeData = snapshot.val();
        const updatedStoreData = {
          ...storeData,
          storeImage: storeImage,
        };
        storeRef.update(updatedStoreData).then(r => {
          addStoreVisitDetails(storeId, updatedStoreData);
        });
      } else {
        console.log('Store not found');
      }
    })
    .catch(error => {
      console.error('Error updating store image:', error);
    });
};

const addStoreVisitDetails = async (storeId: string, storeDetails: any) => {
  try {
    const visitTime = new Date().toISOString(); // Get current time in ISO format
    const visitsRef = database().ref(`store_visits/${storeId}`);
    const snapshot = await visitsRef.once('value');
    if (snapshot.exists()) {
      // Update the existing entry if already store id data exist
      snapshot.forEach(childSnapshot => {
        const key: any = childSnapshot.key;
        visitsRef
          .child(key)
          .update({visit_time: visitTime, storeUrl: storeDetails.storeImage});
      });
    } else {
      // Create a new entry if store id not present
      await visitsRef.push({
        storeUrl: storeDetails.storeImage,
        visit_time: visitTime,
      });
    }
  } catch (error) {
    throw error;
  }
};

export function getFormattedText(text: string) {
  if (text && text.length > 26) {
    return `${text.substring(0, 26)}...`;
  }
  return text;
}
