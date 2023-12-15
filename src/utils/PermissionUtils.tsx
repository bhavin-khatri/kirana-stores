import {
    check,
    openSettings,
    PERMISSIONS,
    request,
    RESULTS,
} from 'react-native-permissions';
import { Linking, Platform } from 'react-native';
import AlertDialog from '../components/AlertDialog';

interface PermissionUtilsProps {
    isIosOnly: boolean;
    permissionName: any;
    message: string;
    onSuccess: (granted: boolean) => void;
    canAskForPermissionAgain?: boolean;
    stringsReference?: any;
}

export default class PermissionUtils {
    static checkPermission = ({
                                  isIosOnly,
                                  permissionName,
                                  message,
                                  onSuccess,
                                  canAskForPermissionAgain = true,
                                  stringsReference,
                              }: PermissionUtilsProps) => {
        if (isIosOnly) {
            onSuccess(true);
            return;
        }

        check(permissionName)
          .then((result) => {
              console.log("result====>",result);
              switch (result) {
                  case RESULTS.UNAVAILABLE:
                      onSuccess(false);
                      break;
                  case RESULTS.DENIED:
                  case RESULTS.LIMITED:
                      if (canAskForPermissionAgain) {
                          request(permissionName).then(() => {
                              PermissionUtils.checkPermission({
                                  isIosOnly,
                                  permissionName,
                                  message,
                                  onSuccess,
                                  canAskForPermissionAgain: false,
                                  stringsReference,
                              });
                          });
                      } else {
                          onSuccess(false);
                      }
                      break;
                  case RESULTS.GRANTED:
                      onSuccess(true);
                      break;
                  case RESULTS.BLOCKED:
                      AlertDialog.show({
                          title: 'Permission',
                          message: message,
                          positiveButton: {
                              title: 'Settings',
                              onPress: async () => {
                                  if (Platform.OS === 'ios') {
                                      await Linking.openURL('app-settings:');
                                  } else {
                                      await openSettings();
                                  }
                                  AlertDialog.hide();
                              },
                          },
                          negativeButton: {
                              title: 'Cancel',
                              onPress: () => {
                                  AlertDialog.hide();
                              },
                          },
                      });
                      break;
              }
          })
          .catch((error) => {
              // Handle error
          });
    };
}
