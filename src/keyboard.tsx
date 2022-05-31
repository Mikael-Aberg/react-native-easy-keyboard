import React, {PureComponent} from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Row from './row';
import * as utils from './utils';

export interface KeyConfig {
  value: string;
  size: number;
  display?: string;
  keyStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export type LayoutInput = Record<
  string,
  (string | (Partial<KeyConfig> & {value: string}))[][]
>;

interface KeyboardTheme {
  keyStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  rowStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

interface DisplayOptions {
  marginPercent?: number;
  display?: Record<string, string>;
  theme?: KeyboardTheme;
}

export interface KeyboardConfig {
  layouts: LayoutInput;
  displayOptions?: DisplayOptions;
}

interface Props {
  config: KeyboardConfig;
  onKeyPress: (key: string) => void;
}

interface State {
  layout: string;
  size: {height?: number; width?: number};
  fontMeasure: {height: number; width: number};
}

class EasyKeyboard extends PureComponent<Props, State> {
  state: State = {
    layout: 'default',
    size: {height: undefined, width: undefined},
    fontMeasure: {height: 1, width: 1},
  };

  setLayout = (layout: string) => {
    if (this.props.config.layouts[layout]) {
      this.setState({layout});
    }
  };

  private onLayout = ({nativeEvent}: LayoutChangeEvent) => {
    this.setState({
      size: {
        height: nativeEvent.layout.height,
        width: nativeEvent.layout.width,
      },
    });
  };

  private onFontMeasureLayout = ({nativeEvent}: LayoutChangeEvent) => {
    this.setState({
      fontMeasure: {
        height: nativeEvent.layout.height,
        width: nativeEvent.layout.width,
      },
    });
  };

  render() {
    const layouts = utils.createLayoutConfigArray(this.props.config);
    const sizes = utils.calculateCellSize(
      this.props.config,
      layouts[this.state.layout],
      this.state.size,
      this.state.fontMeasure
    );

    return (
      <>
        <Text
          selectable={false}
          style={styles.measure}
          onLayout={this.onFontMeasureLayout}>
          W
        </Text>
        <View
          style={[
            styles.container,
            this.props.config.displayOptions?.theme?.containerStyle,
          ]}
          onLayout={this.onLayout}>
          {layouts[this.state.layout].map((row, i) => (
            <Row
              row={row}
              key={i}
              style={this.props.config.displayOptions?.theme?.rowStyle}
              cellMargin={sizes.cellMargin}
              cellSize={sizes.cellSize}
              cellFontSize={sizes.cellFontSize}
              onKeyPress={this.props.onKeyPress}
            />
          ))}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
  measure: {
    fontSize: 100,
    position: 'absolute',
    opacity: 0,
    alignSelf: 'flex-start',
    left: -Dimensions.get('screen').width,
  },
});

export default EasyKeyboard;
