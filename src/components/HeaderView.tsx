import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../res/styles/Colors';
import {ResponsivePixels} from '../res/styles/ResponsivePixels';
import Images from './Images';
import {getCurrentUserName} from '../utils/Utils';
import {APP_NAME, appConstants} from '../constants/AppConstants';
import CustomPopUp from './CustomPopUp';

interface HeaderProps {
  backgroundColor?: any;
  headerIconColor?: any;
  userName?: string;
  endImage?: any;
  startImage?: any;
  startImageClick?: () => void;
  endImageClick?: () => void;
  showHeader?: boolean;
  title?: string;
}
export const HeaderView = (props: HeaderProps) => {
  const {
    backgroundColor,
    headerIconColor,
    title,
    endImage,
    endImageClick,
    showHeader = false,
    startImageClick,
    startImage,
  } = props;

  return (
    <>
      <StatusBar
        backgroundColor={backgroundColor || Colors.defaultWhite}
        barStyle={'dark-content'}
      />
      {showHeader ? (
        <View style={myStyles.headerMain}>
          <View style={myStyles.rowView}>
            {startImage ? (
              <TouchableOpacity
                onPress={() => (startImageClick ? startImageClick() : null)}>
                <Image source={startImage} style={myStyles.logoImage} />
              </TouchableOpacity>
            ) : null}
            {title ? (
              <Text style={myStyles.nameText}>{title.toUpperCase()}</Text>
            ) : null}
          </View>
          {endImage ? (
            <TouchableOpacity
              onPress={() => (endImageClick ? endImageClick() : null)}>
              <Image source={endImage} style={myStyles.logoImage} />
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
    </>
  );
};

const myStyles = StyleSheet.create({
  headerMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ResponsivePixels.size20,
    paddingTop: ResponsivePixels.size30,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoImage: {
    height: ResponsivePixels.size30,
    width: ResponsivePixels.size30,
  },
  nameText: {
    fontSize: ResponsivePixels.size18,
    fontWeight: 'bold',
    color: Colors.primaryColor,
    marginHorizontal: ResponsivePixels.size10,
    lineHeight: 25,
    letterSpacing: 0.3,
  },
});
