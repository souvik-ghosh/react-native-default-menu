import React, { Component } from "react";
import {
  View,
  UIManager,
  findNodeHandle,
  TouchableWithoutFeedback,
  ActionSheetIOS,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Menu extends Component {
  constructor(props) {
    super(props);
  }

  showActionSheet = () => {
    const options = ["Cancel", ...this.props.actions];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 0,
        destructiveButtonIndex: this.props.destructiveButtonIndexIos + 1 || -1
      },
      buttonIndex => {
        this.props.onPress(options[buttonIndex], buttonIndex - 1);
      }
    );
  };

  showPopupMenu = () => {
    UIManager.showPopupMenu(
      findNodeHandle(this.iconRef),
      this.props.actions,
      this.props.onError || (() => console.log("Popup Error")),
      this.props.onPress
    );
  };

  onPress = () => {
    if (Platform.OS === "ios") {
      this.showActionSheet();
      return;
    }
    this.showPopupMenu();
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={{ alignItems: 'center', justifyContent: "center" }}>
          <Icon
            name={"more-vert" || this.props.icon}
            size={this.props.iconSize || 24}
            color={"grey" || this.props.color}
            ref={node => {
              this.iconRef = node;
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
