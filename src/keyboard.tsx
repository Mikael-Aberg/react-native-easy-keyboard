import React, { PureComponent } from 'react';
import { LayoutChangeEvent, PixelRatio, View } from 'react-native';
import Row from './row';

export interface KeyboardConfig {
  marginPercent?: number;
  layouts: Record<string, string[][]>;
  triggerOptions?: {
    layout?: Record<string, string>;
    display?: Record<string, string>;
  };
}

interface Props {
  config: KeyboardConfig;
}

interface State {
  layout: string;
  size: { height?: number; width?: number };
  cellSize?: number;
  cellMargin?: number;
}

class EasyKeyboard extends PureComponent<Props, State> {
  state: State = {
    layout: 'default',
    size: { height: undefined, width: undefined },
    cellSize: undefined,
    cellMargin: undefined,
  };

  setLayout = (layout: string) => {
    if (this.props.config.layouts[layout]) {
      this.setState({
        layout,
        ...this.calculateCellSize(layout, this.state.size),
      });
    }
  };

  private onTriggerPress = (trigger: string) => {
    console.log('Trigger pressed: ', trigger);
  };

  private onKeyPress = (key: string) => {
    console.log('Key pressed: ', key);
  };

  private calculateCellSize = (
    layout: string,
    { width, height }: { width?: number; height?: number }
  ) => {
    if (!width || !height) {
      return { cellSize: undefined, cellMargin: undefined };
    }

    const longest = this.getLongestRow(this.state.layout);
    const margin = (this.props.config.marginPercent ?? 1) / 100;

    const marginWidth = margin * width;
    const marginHeight = margin * height;

    const maxHeight =
      height / this.props.config.layouts[layout].length -
      marginHeight / this.props.config.layouts[layout].length;

    const maxWidth = width / longest - marginWidth / longest;

    return {
      cellSize: maxHeight > maxWidth ? maxWidth : maxHeight,
      cellMargin:
        maxHeight > maxWidth
          ? marginWidth / longest
          : marginHeight / this.props.config.layouts[layout].length,
    };
  };

  private getLongestRow = (layout: string) => {
    return this.props.config.layouts[layout].reduce((l, c) => {
      return c.length > l ? c.length : l;
    }, 0);
  };

  private onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    this.setState({
      ...this.calculateCellSize(this.state.layout, nativeEvent.layout),
      size: {
        height: nativeEvent.layout.height,
        width: nativeEvent.layout.width,
      },
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }} onLayout={this.onLayout}>
        {this.props.config.layouts[this.state.layout].map((row, i) => (
          <Row
            row={row}
            key={i}
            cellMargin={this.state.cellMargin}
            cellSize={this.state.cellSize}
            onKeyPress={this.onKeyPress}
            onTriggerPress={this.onTriggerPress}
          />
        ))}
      </View>
    );
  }
}

export default EasyKeyboard;
