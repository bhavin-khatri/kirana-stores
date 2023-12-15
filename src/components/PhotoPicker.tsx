import React from "react";
import { Actionsheet, useDisclose } from "native-base";
import { Platform, View } from "react-native";
import { PERMISSIONS } from "react-native-permissions";
import { CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from "react-native-image-picker";
import PermissionUtils from "../utils/PermissionUtils";

export interface PhotoPickerProps {
  canOpenBottomSheet: boolean;
  openCloseBottomSheet: (canOpenBottomSheet: boolean) => void;
  onFileSelect: any;
}

const PhotoPicker = ({
  canOpenBottomSheet,
  openCloseBottomSheet,
  onFileSelect,
}: PhotoPickerProps) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  if (!isOpen && canOpenBottomSheet) {
    onOpen();
  }

  if (isOpen && !canOpenBottomSheet) {
    onClose();
  }

  const basicConfig = {
    maxWidth: 1200,
    maxHeight: 1200,
    includeBase64: true,
  }

  const cameraConfig: CameraOptions = {
    mediaType: "photo",
    saveToPhotos: false,
    quality: 0.3,
    ...basicConfig
  }

  const libraryConfig: ImageLibraryOptions = {
    selectionLimit: 1,
    mediaType: "photo",
    quality: 0.3,
    ...basicConfig
  }

  const PERMISSION_STRINGS={
      AGENT_APP_CAMERA_ENABLE_PERMISSION_SETTINGS:'Permission denied, please allow camera access from your device settings to use this feature',
      AGENT_APP_GALLERY_ENABLE_PERMISSION_SETTINGS:'Permission denied, please allow storage access from your device settings to use this feature',
  }

    const onCameraOptionSelection = () => {
        PermissionUtils.checkPermission({
            isIosOnly: Platform.OS === 'ios',
            permissionName:
                Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
            message: 'Settings',
            onSuccess: (onSuccess1: boolean) => {
                console.log('onSuccess1====>', onSuccess1);
                if (onSuccess1) {
                    PermissionUtils.checkPermission({
                        isIosOnly: Platform.OS === 'ios',
                        permissionName:
                            Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
                        message: PERMISSION_STRINGS.AGENT_APP_CAMERA_ENABLE_PERMISSION_SETTINGS,
                        onSuccess: (onSuccess2: boolean) => {
                            console.log('onSuccess2====>', onSuccess2);
                            if (onSuccess2) {
                                launchCamera(cameraConfig, (response:any) => {
                                    if (!response.didCancel) {
                                        onFileSelect(response?.assets);
                                    }
                                });
                            }
                        },
                        canAskForPermissionAgain: true,
                        stringsReference: 'Strings',
                    });
                }
            },
            canAskForPermissionAgain: true,
            stringsReference: 'Strings',
        });
    };


    const onGalleryOptionSelection = () => {
        PermissionUtils.checkPermission({
            isIosOnly: Platform.OS === 'ios',
            permissionName:
                Platform.OS === 'ios'
                    ? PERMISSIONS.IOS.PHOTO_LIBRARY
                    : PERMISSIONS.ANDROID.CAMERA,
            message: 'Enable Storage',
            onSuccess: (onSuccess1: boolean) => {
                if (onSuccess1) {
                    PermissionUtils.checkPermission({
                        isIosOnly: Platform.OS === 'ios',
                        permissionName:
                            Platform.OS === 'ios'
                                ? PERMISSIONS.IOS.PHOTO_LIBRARY
                                : PERMISSIONS.ANDROID.CAMERA,
                        message: PERMISSION_STRINGS.AGENT_APP_GALLERY_ENABLE_PERMISSION_SETTINGS,
                        onSuccess: (onSuccess2: boolean) => {
                            if (onSuccess2) {
                                launchImageLibrary(libraryConfig, (response:any) => {
                                    if (!response.didCancel) {
                                        onFileSelect(response.assets);
                                    }
                                });
                            }
                        },
                        canAskForPermissionAgain: true,
                        stringsReference: '',
                    });
                }
            },
            canAskForPermissionAgain: true,
            stringsReference: '',
        });
    };


    return (
    <>
      <Actionsheet
        isOpen={isOpen}
        onClose={() => {
          onClose();
          openCloseBottomSheet(false);
        }}
      >
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={() => {
              onCameraOptionSelection();
              openCloseBottomSheet(false);
            }}
          >
            {"Camera"}
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              onGalleryOptionSelection();
              openCloseBottomSheet(false);
            }}
          >
            {"Gallery"}
          </Actionsheet.Item>
          <View />
          <Actionsheet.Item
            onPress={() => {
              openCloseBottomSheet(false);
            }}
          >
            {"Cancel"}
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default PhotoPicker;
