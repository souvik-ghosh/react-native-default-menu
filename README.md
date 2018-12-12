# react-native-default-menu

[![npm Version](https://img.shields.io/npm/v/react-native-default-menu.svg)](https://www.npmjs.com/package/react-native-default-menu) [![License](https://img.shields.io/npm/l/react-native-default-menu.svg)](https://www.npmjs.com/package/react-native-default-menu)

Menu component for showing default OS menus. Uses ActionSheetIOS for IOS and UIManager for Android

## Installation

`npm i react-native-default-menu` 

or

`yarn add react-native-default-menu`

## Demo

![](iphone.webp) ![](android.webp)

## Usage

```js
...
import Menu from 'react-native-default-menu';
...
const options = ['Edit', 'Remove'];
...
onPopupEvent = (eventName, index) => {
  // on IOS it returns the option name as first argument
  // on Android it returns 'itemSelected' or 'dismissed' as first argument
  // the second argument is the index of the selected option. If cancelled, it returns undefined as index
  console.log('index', index);
  let optionName;
  if (index >= 0) optionName = options[index]; // get option name from 'options' array
  console.log('selected option', optionName);
};
...
render() {
  return(
    <View>
      <Menu options={options} onPress={this.onPopupEvent}>
        <Text>click me</Text>
      </Menu>
    </View>
   )
}
```

## Complete Example

```js
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Menu from 'react-native-default-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';

const options = ['Edit', 'Remove'];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: 'none',
      index: 'none',
      selectedOption: 'none',
    };
  }

  onPopupEvent = (eventName, index) => {
    let selectedOption = 'none';
    if (index >= 0) selectedOption = options[index];
    this.setState({ eventName, index, selectedOption });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ padding: 20 }}>
          <Menu options={options} onPress={this.onPopupEvent} style={{height: 30, width: 30}}>
            <Icon name={'more-vert'} size={24} color={'grey'} />
          </Menu>
        </View>
        <View style={{ padding: 15 }}>
          <Text style={styles.text}>{`event: ${this.state.eventName}`}</Text>
          <Text style={styles.text}>{`index: ${this.state.index}`}</Text>
          <Text style={styles.text}>{`selected option: ${this.state.selectedOption}`}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  text: { fontSize: 30 },
});

```


