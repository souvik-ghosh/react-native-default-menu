import React, { Component } from 'react';
import {
  View,
  UIManager,
  findNodeHandle,
  TouchableWithoutFeedback,
  ActionSheetIOS,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Menu extends Component {
  showActionSheet = () => {
    const { actions, destructiveButtonIndex, onPress } = this.props;
    const options = ['Cancel', ...actions];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 0,
        destructiveButtonIndex: destructiveButtonIndex + 1 || -1,
      },
      buttonIndex => {
        onPress(options[buttonIndex], buttonIndex - 1);
      }
    );
  };

  showPopupMenu = () => {
    const { actions, onError, onPress } = this.props;
    const node = findNodeHandle(this.iconRef);
    UIManager.showPopupMenu(node, actions, onError, onPress);
  };

  onPress = () => {
    if (Platform.OS === 'ios') {
      this.showActionSheet();
      return;
    }
    this.showPopupMenu();
  };

  render() {
    const { color, icon, iconSize } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Icon
            name={'more-vert' || icon}
            size={iconSize || 24}
            color={'grey' || color}
            ref={node => {
              this.iconRef = node;
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
