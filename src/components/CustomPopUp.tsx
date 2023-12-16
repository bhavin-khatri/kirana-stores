import React from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Colors} from '../res/styles/Colors';
import {ResponsivePixels} from '../res/styles/ResponsivePixels';

interface PopUpModelProps {
  showModal: boolean;
  hideModel: () => void;
  onClickYes: () => void;
  onClickNo: () => void;
  isCenterButtonNeeded?: boolean;
  onClickCenterButton?: () => void;
  centerButtonTitle?: string;
  title: string;
  description: string;
}

const CustomPopUp: React.FC<PopUpModelProps> = ({
  showModal,
  hideModel,
  title,
  description,
  onClickNo,
  onClickYes,
  isCenterButtonNeeded,
  onClickCenterButton,
  centerButtonTitle,
}) => {
  const handleNoClick = () => {
    hideModel();
    onClickNo();
  };

  const handleYesClick = () => {
    hideModel();
    onClickYes();
  };

  const handleCenterButtonClick = () => {
    if (onClickCenterButton) {
      hideModel();
      onClickCenterButton();
    }
  };

  return (
    <>
      <StatusBar translucent />
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <TouchableWithoutFeedback>
          <View style={styles.outerView}>
            <View style={styles.innerView}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    styles.mainText,
                    {marginVertical: ResponsivePixels.size20},
                  ]}>
                  {title?.toUpperCase()}
                </Text>
                <View style={styles.lineView} />

                <Text style={styles.textSize14}>{description}</Text>
              </View>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => handleNoClick()}
                  style={[styles.buttonStyle]}>
                  <Text style={[styles.mainText]}>{'No'}</Text>
                </TouchableOpacity>
                {isCenterButtonNeeded ? (
                  <TouchableOpacity
                    onPress={() => handleCenterButtonClick()}
                    style={[styles.buttonStyleRateUs]}>
                    <Text style={[styles.mainText]}>
                      {centerButtonTitle?.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ) : null}

                <TouchableOpacity
                  onPress={() => handleYesClick()}
                  style={[styles.buttonStyleApply]}>
                  <Text style={styles.mainText}>{'Yes'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.defaultWhiteWithLowOpacity,
  },
  innerView: {
    backgroundColor: Colors.defaultWhite,
    alignItems: 'center',
    borderWidth: ResponsivePixels.size1,
    borderRadius: ResponsivePixels.size20,
    marginHorizontal: ResponsivePixels.size20,
    borderTopColor: Colors.primaryColorShade1,
    borderLeftColor: Colors.primaryColorShade1,
    borderBottomWidth: 0,
    borderEndWidth: 0,
  },
  mainText: {
    fontSize: ResponsivePixels.size18,
    fontWeight: 'bold',
    color: Colors.primaryColor,
    letterSpacing: 0.9,
  },

  textSize14: {
    fontSize: ResponsivePixels.size16,
    color: Colors.primaryColor,
    letterSpacing: 0.2,
    marginVertical: ResponsivePixels.size20,
  },
  buttonStyle: {
    borderBottomStartRadius: ResponsivePixels.size20,
    borderEndWidth: ResponsivePixels.size2,
    borderEndColor: Colors.primaryColorShade1,
    flex: 1,
    alignItems: 'center',
    paddingVertical: ResponsivePixels.size10,
    backgroundColor: Colors.primaryColorShade2,
    justifyContent: 'center',
  },
  buttonStyleRateUs: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: ResponsivePixels.size10,
    justifyContent: 'center',
    backgroundColor: Colors.primaryColorShade2,
    borderEndWidth: ResponsivePixels.size2,
    borderEndColor: Colors.primaryColorShade1,
  },
  buttonStyleApply: {
    borderBottomEndRadius: ResponsivePixels.size20,
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.primaryColorShade2,
    justifyContent: 'center',
    borderEndWidth: ResponsivePixels.size2,
    borderEndColor: Colors.primaryColorShade1,
    paddingVertical: ResponsivePixels.size10,
  },
  spaceView: {
    marginVertical: ResponsivePixels.size15,
  },
  lineView: {
    height: ResponsivePixels.size1,
    width: ResponsivePixels.size320,
    backgroundColor: Colors.primaryColorShade1,
    alignSelf: 'center',
  },
});

export default CustomPopUp;
