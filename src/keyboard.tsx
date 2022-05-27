import React, { PureComponent } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Row from './row';

export interface KeyboardConfig {
  marginPercent?: number;
  layouts: Record<string, string[][]>;
  triggerOptions?: {
    layout?: Record<string, string>;
    display?: Record<string, string>;
  };
}

interface CellSizes {
  cellSize?: number;
  cellMargin?: number;
  cellFontSize?: number;
}

interface Props {
  config: KeyboardConfig;
}

interface State extends CellSizes {
  layout: string;
  size: { height?: number; width?: number };
}

class EasyKeyboard extends PureComponent<Props, State> {
  state: State = {
    layout: 'default',
    size: { height: undefined, width: undefined },
    cellSize: undefined,
    cellMargin: undefined,
    cellFontSize: undefined,
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
  ): CellSizes => {
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

    const cellSize = maxHeight > maxWidth ? maxWidth : maxHeight;
    const cellMargin =
      maxHeight > maxWidth
        ? marginWidth / longest
        : marginHeight / this.props.config.layouts[layout].length;

    const cellFontSize = (cellSize * 1.8) / this.getLongestWord(layout);

    return {
      cellSize,
      cellMargin,
      cellFontSize,
    };
  };

  private getLongestRow = (layout: string) => {
    return this.props.config.layouts[layout].reduce((l, c) => {
      return c.length > l ? c.length : l;
    }, 0);
  };

  private getLongestWord = (layout: string) => {
    return this.props.config.layouts[layout].reduce((longest, current) => {
      const longestWord = current.reduce(
        (l, c) => (l < c.length ? c.length : l),
        0
      );
      return longestWord < longest ? longest : longestWord;
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
            cellFontSize={this.state.cellFontSize}
            onKeyPress={this.onKeyPress}
            onTriggerPress={this.onTriggerPress}
          />
        ))}
      </View>
    );
  }
}

export default EasyKeyboard;
