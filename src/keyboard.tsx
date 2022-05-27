import React, { PureComponent } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Row from './row';

export interface KeyConfig {
  value: string;
  size: number;
}

type LayoutInput = Record<
  string,
  (string | (Partial<KeyConfig> & { value: string }))[][]
>;

export interface KeyboardConfig {
  marginPercent?: number;
  layouts: LayoutInput;
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

interface State {
  layout: string;
  size: { height?: number; width?: number };
}

const DEFAULT_KEY: Omit<KeyConfig, 'value'> = Object.freeze({
  size: 1,
});

const sizeRegex = new RegExp(/{(\d*\.*\d*)}$/, 'gm');

class EasyKeyboard extends PureComponent<Props, State> {
  state: State = {
    layout: 'default',
    size: { height: undefined, width: undefined },
  };

  setLayout = (layout: string) => {
    if (this.props.config.layouts[layout]) {
      this.setState({ layout });
    }
  };

  private onTriggerPress = (trigger: string) => {
    console.log('Trigger pressed: ', trigger);
  };

  private onKeyPress = (key: string) => {
    console.log('Key pressed: ', key);
  };

  private createKeyConfigFromString = (input: string): KeyConfig => {
    const match = sizeRegex.exec(input);
    let value = input;
    let size = 1;
    if (match?.[1]) {
      size = parseFloat(match[1]);
      value = value.replace(match[0], '');
    }

    return {
      ...DEFAULT_KEY,
      value,
      size,
    };
  };

  private createLayoutConfigArray = (layouts: LayoutInput) => {
    const l: Record<string, KeyConfig[][]> = {};
    Object.keys(layouts).forEach((key) => {
      l[key] = layouts[key].map((row) => {
        return row.reduce((list, value) => {
          if (typeof value === 'string') {
            list.push(this.createKeyConfigFromString(value));
          } else {
            list.push({ ...DEFAULT_KEY, ...value });
          }
          return list;
        }, [] as KeyConfig[]);
      });
    });

    return l;
  };

  private calculateCellSize = (
    layouts: Record<string, KeyConfig[][]>,
    { width, height }: { width?: number; height?: number }
  ): CellSizes => {
    if (!width || !height) {
      return { cellSize: undefined, cellMargin: undefined };
    }

    const longest = this.getLongestRow(layouts);
    const margin = (this.props.config.marginPercent ?? 1) / 100;

    const marginWidth = Math.max(margin * width, 0);
    const marginHeight = Math.max(margin * height, 0);

    const maxHeight =
      height / layouts[this.state.layout].length -
      marginHeight / layouts[this.state.layout].length;

    const maxWidth = width / longest - marginWidth / longest;

    const cellSize = maxHeight > maxWidth ? maxWidth : maxHeight;
    const cellMargin =
      maxHeight > maxWidth
        ? marginWidth / longest
        : marginHeight / layouts[this.state.layout].length;

    const cellFontSize = (cellSize * 1.8) / this.getLongestWord(layouts);

    return {
      cellSize,
      cellMargin,
      cellFontSize,
    };
  };

  private getRowLength = (row: KeyConfig[]) => {
    return row.reduce((a, v) => a + v.size, 0);
  };

  private getLongestRow = (layouts: Record<string, KeyConfig[][]>) => {
    return layouts[this.state.layout].reduce((l, c) => {
      const size = this.getRowLength(c);
      return size > l ? size : l;
    }, 0);
  };

  private getLongestWord = (layouts: Record<string, KeyConfig[][]>) => {
    return layouts[this.state.layout].reduce((longest, current) => {
      const longestWord = current.reduce(
        (l, c) => (l < c.value.length ? c.value.length : l),
        0
      );
      return longestWord < longest ? longest : longestWord;
    }, 0);
  };

  private onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    this.setState({
      size: {
        height: nativeEvent.layout.height,
        width: nativeEvent.layout.width,
      },
    });
  };

  render() {
    const layouts = this.createLayoutConfigArray(this.props.config.layouts);
    const sizes = this.calculateCellSize(layouts, this.state.size);

    return (
      <View style={{ flex: 1 }} onLayout={this.onLayout}>
        {layouts[this.state.layout].map((row, i) => (
          <Row
            row={row}
            key={i}
            cellMargin={sizes.cellMargin}
            cellSize={sizes.cellSize}
            cellFontSize={sizes.cellFontSize}
            onKeyPress={this.onKeyPress}
            onTriggerPress={this.onTriggerPress}
          />
        ))}
      </View>
    );
  }
}

export default EasyKeyboard;
