import React, { Component } from 'react';
import {
  View,
  UIManager,
  findNodeHandle,
  TouchableWithoutFeedback,
  ActionSheetIOS,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

export default class Menu extends Component {
  showActionSheet = () => {
    const { options, destructiveButtonIndex, onPress } = this.props;
    const actions = ['Cancel', ...options];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: actions,
        cancelButtonIndex: 0,
        destructiveButtonIndex: destructiveButtonIndex + 1 || -1,
      },
      buttonIndex => {
        onPress(
          actions[buttonIndex],
          buttonIndex > 0 ? buttonIndex - 1 : undefined
        );
      }
    );
  };

  showPopupMenu = () => {
    const { options, onError, onPress } = this.props;
    const node = findNodeHandle(this.refNode);
    UIManager.showPopupMenu(node, options, onError, onPress);
  };

  onPress = () => {
    if (Platform.OS === 'ios') {
      this.showActionSheet();
      return;
    }
    this.showPopupMenu();
  };

  render() {
    const { style, children } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View
          ref={node => {
            this.refNode = node;
          }}
          style={style}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Menu.propTypes = {
  options: PropTypes.array,
  onPress: PropTypes.func,
  cancelButtonIndex: PropTypes.number,
  destructiveButtonIndex: PropTypes.number,
  onError: PropTypes.func,
  children: PropTypes.node,
  style: PropTypes.style,
};
