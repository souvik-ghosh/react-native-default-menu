import React, { Component } from "react";
import {
  View,
  UIManager,
  findNodeHandle,
  TouchableWithoutFeedback,
  ActionSheetIOS,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Menu extends Component {
  showActionSheet = () => {
    const { options, destructiveButtonIndex, onPress } = this.props;
    const actions = ["Cancel", ...options];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: actions,
        cancelButtonIndex: 0,
        destructiveButtonIndex: destructiveButtonIndex + 1 || -1
      },
      buttonIndex => {
        onPress(actions[buttonIndex], buttonIndex > 0 ? buttonIndex - 1 : undefined);
      }
    );
  };

  showPopupMenu = () => {
    const { options, onError, onPress } = this.props;
    const node = findNodeHandle(this.iconRef);
    UIManager.showPopupMenu(node, options, onError, onPress);
  };

  onPress = () => {
    if (Platform.OS === "ios") {
      this.showActionSheet();
      return;
    }
    this.showPopupMenu();
  };

  render() {
    const { color, icon, iconSize } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Icon
            name={"more-vert" || icon}
            size={iconSize || 24}
            color={"grey" || color}
            ref={node => {
              this.iconRef = node;
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Menu.propTypes = {
  options: PropTypes.array,
  cancelButtonIndex: PropTypes.number,
  onPress: PropTypes.func,
  destructiveButtonIndex: PropTypes.number,
  optionalObject: PropTypes.object,
  name: PropTypes.string,
  color: PropTypes.string,
  onError: PropTypes.func
};
