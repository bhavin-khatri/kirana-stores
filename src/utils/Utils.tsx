import { IS_LOGGED_IN } from "./PrefKeys";
import { setItem } from "./PrefUtils";
import { Colors } from "../res/styles/Colors";
import { Toast } from "native-base";
import { Dimensions, Text, View } from "react-native";
import { ResponsivePixels } from "../res/styles/ResponsivePixels";

type TOAST_TYPES = 'success' | 'danger' | 'warning' | 'info';
let toastRef: any = undefined;
export const isEmpty = (value: any) =>
  !value || value.toString().trim().length <= 0;

export const setLoggedIn=async ()=>{
  await setItem(IS_LOGGED_IN, 'true');
}

export const showToast = (
  message: string,
  duration = 2000,
  type: TOAST_TYPES = 'success',
) => {
  const styleToast:any = {position: 'absolute', bottom: 0};

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
