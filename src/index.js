import React from "react";
import {
  View,
  UIManager,
  findNodeHandle,
  TouchableWithoutFeedback,
  ActionSheetIOS,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Menu = props => {
  this.showActionSheet = () => {
    const options = ["Cancel", ...props.actions];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 0,
        destructiveButtonIndex: props.destructiveButtonIndexIos + 1 || -1
      },
      buttonIndex => {
        props.onPress(options[buttonIndex], buttonIndex - 1);
      }
    );
  };

  this.showPopupMenu = () => {
    UIManager.showPopupMenu(
      findNodeHandle(this.iconRef),
      props.actions,
      props.onError || (() => console.log("Popup Error")),
      props.onPress
    );
  };

  const onPress = () => {
    if (Platform.OS === "ios") {
      this.showActionSheet();
      return;
    }
    this.showPopupMenu();
  };

  return (
    <View style={props.style}>
      <TouchableWithoutFeedback onPress={onPress}>
        <Icon
          name={"more-vert" || props.icon}
          size={props.iconSize || 24}
          color={"grey" || props.color}
          ref={node => {
            this.iconRef = node;
          }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Menu;
