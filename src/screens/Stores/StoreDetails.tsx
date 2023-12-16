import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  getAllStores,
  isEmpty,
  updateStoreDetailsInFirebase,
} from '../../utils/Utils';
import {ResponsivePixels} from '../../res/styles/ResponsivePixels';
import PhotoPicker from '../../components/PhotoPicker';
import Images from '../../components/Images';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import {Colors} from '../../res/styles/Colors';
import {HeaderView} from '../../components/HeaderView';
import CustomLoading from '../../components/CustomLoading';

const StoreDetails = (props: any) => {
  const {params} = props.route;
  const storeDetails: any = params.storeDetails;
  const [newStoreDetails, setNewStoreDetails] = useState(storeDetails);
  const [canOpenBottomSheet, setCanOpenBottomSheet] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [allStoresList, setAllStoresList] = useState<any>([]);

  console.log('params storeDetails ==== > ', storeDetails);

  useEffect(() => {
    async function fetchData() {
      let allStoresList = await getAllStores();
      setAllStoresList(allStoresList);
    }
    fetchData();
  }, []);

  const uploadImageToFirebase = async (image: any) => {
    try {
      setShowLoading(true);
      let imageUri = image.uri;
      const timestamp = Date.now();
      let filename = `${newStoreDetails.storeId}_${timestamp}`;
      const reference = storage().ref().child(`images/${filename}`);
      await reference.putFile(imageUri.toString());
      console.log('Image uploaded to Firebase Storage');
      const downloadURL = await reference.getDownloadURL();
      console.log('Download URL:', downloadURL);
      const storeDetails = {
        ...newStoreDetails,
        storeImage: downloadURL,
      };
      console.log('storeDetails ==== > ', storeDetails);
      setNewStoreDetails(storeDetails);
      await updateStoreDetailsInFirebase(storeDetails);
      setShowLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={myStyles.mainView}>
      <HeaderView
        showHeader={true}
        startImage={Images.ic_back}
        startImageClick={handleBack}
        title={'Store Details'}
      />
      <View style={myStyles.storeItemStyle}>
        <View>
          {!isEmpty(newStoreDetails.storeImage) ? (
            <View>
              <TouchableOpacity
                style={myStyles.editIconView}
                onPress={() => setCanOpenBottomSheet(true)}>
                <Image source={Images.ic_edit} style={myStyles.editIcon} />
              </TouchableOpacity>
              <Image
                source={{uri: newStoreDetails.storeImage}}
                style={myStyles.storeImage}
                resizeMode="cover"
              />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setCanOpenBottomSheet(true)}
              style={myStyles.defaultImageView}>
              <Image
                source={Images.ic_upload}
                style={myStyles.defaultImage}
                resizeMode={'center'}
              />
              <Text style={myStyles.storeSubText}>Upload Image</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={myStyles.storeDetailsView}>
          <Text style={myStyles.storeTitleText}>{storeDetails.name}</Text>
          <Text style={myStyles.storeSubTitle}>Address:</Text>
          <Text style={myStyles.storeSubText}>{storeDetails.address}</Text>
          <Text style={myStyles.storeSubTitle}>Location:</Text>
          <Text
            style={
              myStyles.storeSubText
            }>{`${storeDetails.area} • ${storeDetails.route}`}</Text>
        </View>
      </View>
      <PhotoPicker
        canOpenBottomSheet={canOpenBottomSheet}
        openCloseBottomSheet={(canOpenBottomSheet: any) => {
          setCanOpenBottomSheet(canOpenBottomSheet);
        }}
        onFileSelect={(res: any) => {
          if (res) {
            uploadImageToFirebase(res[0]);
          }
        }}
      />
      <CustomLoading
        showModal={showLoading}
        message={'Uploading Image , Please Wait'}
      />
    </View>
  );
};
export default StoreDetails;

const myStyles = StyleSheet.create({
  mainView: {
    backgroundColor: Colors.defaultWhite,
    flex: 1,
  },
  storeItemStyle: {
    marginHorizontal: ResponsivePixels.size10,
    paddingHorizontal: ResponsivePixels.size10,
    paddingVertical: ResponsivePixels.size10,
  },
  storeImage: {
    height: ResponsivePixels.size200,
    width: '100%',
    borderRadius: ResponsivePixels.size20,
  },
  editIconView: {
    position: 'absolute',
    top: ResponsivePixels.size5,
    right: ResponsivePixels.size5,
    zIndex: 100,
  },
  editIcon: {
    height: ResponsivePixels.size40,
    width: ResponsivePixels.size40,
  },
  defaultImageView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ResponsivePixels.size200,
    borderColor: Colors.darkMatGrey,
    borderWidth: ResponsivePixels.size1,
    borderStyle: 'dotted',
    borderRadius: ResponsivePixels.size20,
  },
  defaultImage: {
    height: ResponsivePixels.size50,
    width: ResponsivePixels.size50,
    borderRadius: ResponsivePixels.size10,
    borderColor: Colors.primaryColorShade1,
    tintColor: Colors.darkMatGrey,
  },
  storeTitleText: {
    fontSize: ResponsivePixels.size18,
    fontWeight: 'bold',
    color: Colors.primaryColor,
    lineHeight: 25,
    letterSpacing: 0.3,
    alignSelf: 'center',
  },
  storeSubTitle: {
    fontSize: ResponsivePixels.size14,
    fontWeight: 'bold',
    color: Colors.defaultBlack,
    lineHeight: 22,
    letterSpacing: 0.3,
    marginVertical: ResponsivePixels.size5,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  storeSubText: {
    fontSize: ResponsivePixels.size14,
    color: Colors.defaultGray,
    lineHeight: 22,
    letterSpacing: 0.3,
  },
  storeDetailsView: {
    marginVertical: ResponsivePixels.size10,
  },
});
