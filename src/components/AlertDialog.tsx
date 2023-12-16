import React, {Component, ReactNode} from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import Dialog, {
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from 'react-native-popup-dialog';

import {ResponsivePixels} from '../res/styles/ResponsivePixels';
import {Colors} from '../res/styles/Colors';

interface AlertDialogProps {
  onRef?: (ref: AlertDialog) => void;
}

interface AlertDialogState {
  visible?: boolean;
  onDismiss?: () => void;
  children?: ReactNode;
  cancelable?: boolean;
  title?: string;
  message?: string;
  positiveButton?: ButtonConfig;
  negativeButton?: ButtonConfig;
  onTouchOutside?: () => void;
}

interface ButtonConfig {
  title: string;
  onPress: () => void;
}

export default class AlertDialog extends Component<
  AlertDialogProps,
  AlertDialogState
> {
  static dialogInstance: AlertDialog;

  state: AlertDialogState = {
    visible: false,
  };

  static show(config: AlertDialogState) {
    this.dialogInstance.showDialog(config);
  }

  static hide() {
    this.dialogInstance.hideDialog();
  }

  hideDialog = () => {
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    if (this.props.onRef != null) {
      this.props.onRef(this);
    }
  }

  showDialog(config: AlertDialogState) {
    this.setState({
      visible: true,
      title: config.title,
      message: config.message,
      positiveButton: config.positiveButton,
      negativeButton: config.negativeButton,
      cancelable: config.cancelable,
      children: config.children,
    });
  }

  render() {
    const {
      visible,
      onDismiss,
      children,
      cancelable,
      title,
      message,
      positiveButton,
      negativeButton,
      onTouchOutside,
    } = {...this.props, ...this.state};

    return (
      <Dialog
        visible={visible || false}
        containerStyle={styles.dialogContainer}
        dialogStyle={styles.dialogStyle}
        onTouchOutside={() => {
          if (cancelable) {
            this.hideDialog();
          }
          if (onTouchOutside) onTouchOutside();
        }}
        onDismiss={onDismiss}
        footer={
          <DialogFooter>
            {negativeButton && (
              <DialogButton
                text={negativeButton.title}
                textStyle={styles.negativeTextStyle}
                onPress={negativeButton.onPress}
              />
            )}
            {positiveButton && (
              <DialogButton
                textStyle={styles.positiveTextStyle}
                text={positiveButton.title}
                onPress={() => {
                  positiveButton.onPress();
                }}
              />
            )}
          </DialogFooter>
        }
        dialogTitle={
          title && (
            <DialogTitle
              textStyle={styles.titleStyle}
              style={styles.titleContainer}
              align="center"
              title={title}
            />
          )
        }>
        <DialogContent style={styles.dialogContent}>
          {message && <Text style={styles.messageStyle}>{message}</Text>}
          {children}
        </DialogContent>
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  dialogContainer: {
    borderRadius: 4,
  },
  dialogStyle: {
    margin: 24,
    borderRadius: 4,
  },
  titleContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 0,
  },
  dialogContent: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width - 80,
  },
  messageStyle: {
    color: Colors.shadeGray,
    fontSize: ResponsivePixels.size19,
    lineHeight: 25,
  },
  titleStyle: {
    color: Colors.defaultBlack,
    marginBottom: 16,
    fontSize: ResponsivePixels.size24,
  },
  positiveTextStyle: {
    color: Colors.primaryColor,
    fontSize: ResponsivePixels.size17,
  },
  negativeTextStyle: {
    color: Colors.shadeGray,
    fontSize: ResponsivePixels.size17,
  },
});
