# react-native-easy-keyboard

A simple way to create virtual keyboards for React Native

## Installation

Install the package with npm

```sh
npm i --save react-native-easy-keyboard
```

or with yarn

```sh
yarn add react-native-easy-keyboard
```

## How do I change the layout of my keyboard?

`react-native-easy-keyboard` layouts are made up of lists of strings or `KeyConfig` objects representing each row of the keyboard.

With strings

```js
import EasyKeyboard, {KeyboardConfig} from 'react-native-easy-keyboard';

const myCustomLayout: KeyboardConfig = {
  layouts: {
    default: [
      ['7', '8', '9'],
      ['4', '5', '6'],
      ['1', '2', '3'],
    ],
  },
};

return <EasyKeyboard config={myCustomLayout} />;
```

With `KeyConfig` objects

```js
import EasyKeyboard, {KeyboardConfig} from 'react-native-easy-keyboard';

const myCustomLayout: KeyboardConfig = {
  layouts: {
    default: [
      [{value: '7'}, {value: '8'}, {value: '9'}],
      [{value: '4'}, {value: '5'}, {value: '6'}],
      [{value: '1'}, {value: '2'}, {value: '3'}],
    ],
  },
};

<EasyKeyboard config={myCustomLayout} />;
```

They can also be mixed

```js
import EasyKeyboard, {KeyboardConfig} from 'react-native-easy-keyboard';

const myCustomLayout: KeyboardConfig = {
  layouts: {
    default: [
      ['7', {value: '8'}, '9'],
      [{value: '4'}, '5', {value: '6'}],
      ['1', {value: '2'}, '3'],
    ],
  },
};

<EasyKeyboard config={myCustomLayout} />;
```

## How do I change the size of my keys?

To change the size of a key you can either use the `size` property of the `KeyConfig` object or end your string with a pair of curly brackets containing the desired size.

The `8` key in these examples will be the width of 3 default size keys

With strings

```js
import EasyKeyboard, {KeyboardConfig} from 'react-native-easy-keyboard';

const myCustomLayout: KeyboardConfig = {
  layouts: {
    default: [['7', '8{3}', '9']],
  },
};

return <EasyKeyboard config={myCustomLayout} />;
```

With `KeyConfig` objects

```js
import EasyKeyboard, {KeyboardConfig} from 'react-native-easy-keyboard';

const myCustomLayout: KeyboardConfig = {
  layouts: {
    default: [[{value: '7'}, {value: '8', size: 3}, {value: '9'}]],
  },
};

<EasyKeyboard config={myCustomLayout} />;
```
