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

The "8" key in these examples will be the width of 3 default size keys

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

## How do I change the style of my keyboard?

```js
import EasyKeyboard, {KeyboardTheme} from 'react-native-easy-keyboard';

const myTheme: KeyboardTheme = {
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  rowStyle: {},
  keyStyle: {},
  textStyle: {},
};

<EasyKeyboard theme={myTheme} />;
```

## How do I change the text on a key?

To change the text displayed on a key you can either configure the `displayOptions` in the `KeyboardConfig`, (this will affect all keys in every layout) or you can use the `display` option in the `KeyConfig` object.

With displayOptions

```js
import EasyKeyboard, {KeyboardConfig} from 'react-native-easy-keyboard';

const myCustomLayout: KeyboardConfig = {
  layouts: {
    default: [['7', '8', '9', '{del}']],
  },
  displayOptions: {
    display: {
      '{del}': '<- Delete',
      '9': 'Nine',
    },
  },
};

<EasyKeyboard config={myCustomLayout} />;
```

With `KeyConfig`

```js
import EasyKeyboard, {KeyboardConfig} from 'react-native-easy-keyboard';

const myCustomLayout: KeyboardConfig = {
  layouts: {
    default: [
      [
        '7',
        '8',
        {value: '9', display: 'Nine'},
        {value: '{del}', display: '<- Delete'},
      ],
    ],
  },
};

<EasyKeyboard config={myCustomLayout} />;
```

## KeyboardTheme

| Property       | Type      | Notes                                                      |
| -------------- | --------- | ---------------------------------------------------------- |
| keyStyle       | ViewStyle | The style applied to TouchableOpacity for each key         |
| textStyle      | TextStyle | The style applied to the Text for each key                 |
| rowStyle       | ViewStyle | The style applied to to View containing each row           |
| containerStyle | ViewStyle | The style applied to the main View containing the keyboard |

## KeyConfig

| Property  | Type      | Notes                                                                                                                                        |
| --------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| value     | string    | The value that will be returned when the key is pressed (Required)                                                                           |
| size      | number    | The size of the key. 2 = double the size of a normal key, 0.5 = half the size of a normal key. Only affects the width of the key (Default 1) |
| isTrigger | boolean   | If the key should trigger the onTriggerPressed callback (Default false)                                                                      |
| display   | string    | The text to be displayed on the key. If undefined value property is used instead                                                             |
| keyStyle  | ViewStyle | Style for the keys TouchableOpacity component                                                                                                |
| textStyle | TextStyle | Style for the keys Text component                                                                                                            |

## KeyboardConfig

## EasyKeyboard Component

### Methods

| Method name       | Arguments          | Notes                                                                 |
| ----------------- | ------------------ | --------------------------------------------------------------------- |
| setKeyboardLayout | layoutName: string | Changes the layout of the keyboard if the layout exists in the config |

### Props

| Prop   | Type           | Required | Note                                                           |
| ------ | -------------- | -------- | -------------------------------------------------------------- |
| config | KeyboardConfig | true     | The configuration for the keyboard, containing all the layouts |
| theme  | KeyboardTheme  | false    |                                                                |

### Events

| Event Name     | Returns         | Notes                                                 |
| -------------- | --------------- | ----------------------------------------------------- |
| onKeyPress     | key: string     | Callback that is called when a key is pressed         |
| onTriggerPress | trigger: string | Callback that is called when a trigger key is pressed |
