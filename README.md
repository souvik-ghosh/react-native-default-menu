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
  // the second argument is the index of the option that got pressed
  console.log('index', index);
  // if cancelled it returns -1 and IOS and  undefined on Android as index
  if (index) option = options[index]; // get option name from index
  console.log('option', option);
};
...
render() {
  return(
    <View>
      <Menu options={options} onPress={this.onPopupEvent} />
    </View>
   )
}
```

## Complete example

```js
import React {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Menu from 'react-native-default-menu';

const options = ['Edit', 'Remove'];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: 'none',
      index: 'none',
    };
  }

  onPopupEvent = (eventName, index) => {
    if (eventName === 'itemSelected') eventName = options[index];
    this.setState({ eventName, index });
  };
  
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Menu options={options} onPress={this.onPopupEvent} />
        </View>
        <View style={{ padding: 15 }}>
          <Text style={styles.text}>{`event: ${this.state.eventName}`}</Text>
          <Text style={styles.text}> {`index: ${this.state.index}`}</Text>
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
});

```


