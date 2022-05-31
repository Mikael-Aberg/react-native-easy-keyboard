import type {KeyboardConfig, KeyConfig} from './keyboard';
import * as constants from './constants';

interface CellSizes {
  cellSize?: number;
  cellMargin?: number;
  cellFontSize?: number;
}

export const createKeyConfigFromString = (
  config: KeyboardConfig,
  input: string
): KeyConfig => {
  const match = constants.sizeRegex.exec(input);
  let value = input;
  let size = 1;
  if (match?.[1]) {
    size = parseFloat(match[1]);
    value = value.replace(match[0], '');
  }

  return {
    ...constants.DEFAULT_KEY_CONFIG,
    keyStyle: config.displayOptions?.theme?.keyStyle,
    textStyle: config.displayOptions?.theme?.textStyle,
    value,
    size,
    display: getDisplayNameFromConfig(config, value),
  };
};

export const getDisplayNameFromConfig = (
  config: KeyboardConfig,
  name: string
) => {
  return config.displayOptions?.display?.[name];
};

export const getLongestRow = (layout: KeyConfig[][]) => {
  return layout.reduce((l, c) => {
    const size = getRowLength(c);
    return size > l ? size : l;
  }, 0);
};

export const getLongestWord = (
  config: KeyboardConfig,
  layout: KeyConfig[][]
) => {
  return layout.reduce((longest, current) => {
    const longestWord = current.reduce((l, c) => {
      // Local display value overrides global option
      if (c.display) {
        return l < c.display.length ? c.display.length : l;
      }

      const val =
        getDisplayNameFromConfig(config, c.value)?.length || c.value.length;
      return l < val ? val : l;
    }, 0);
    return longestWord < longest ? longest : longestWord;
  }, 0);
};

export const getRowLength = (row: KeyConfig[]) => {
  return row.reduce((a, v) => a + v.size, 0);
};

export const createLayoutConfigArray = (config: KeyboardConfig) => {
  const l: Record<string, KeyConfig[][]> = {};
  Object.keys(config.layouts).forEach(key => {
    l[key] = config.layouts[key].map(row => {
      return row.reduce((list, value) => {
        if (typeof value === 'string') {
          list.push(createKeyConfigFromString(config, value));
        } else {
          list.push({
            ...constants.DEFAULT_KEY_CONFIG,
            keyStyle: config.displayOptions?.theme?.keyStyle,
            textStyle: config.displayOptions?.theme?.textStyle,
            // Local styles override global theme
            // Option to keep global style also?
            ...value,
            display:
              value.display || getDisplayNameFromConfig(config, value.value),
          });
        }
        return list;
      }, [] as KeyConfig[]);
    });
  });

  return l;
};

export const calculateCellSize = (
  config: KeyboardConfig,
  layout: KeyConfig[][],
  area: {width?: number; height?: number},
  measure: {width?: number; height?: number}
): CellSizes => {
  if (!area.width || !area.height) {
    return {cellSize: undefined, cellMargin: undefined};
  }

  const longest = getLongestRow(layout);
  const margin = (config.displayOptions?.marginPercent ?? 1) / 100;

  const marginWidth = Math.max(margin * area.width, 0);
  const marginHeight = Math.max(margin * area.height, 0);

  const maxHeight = area.height / layout.length - marginHeight / layout.length;
  const maxWidth = area.width / longest - marginWidth / longest;

  const cellSize = maxHeight > maxWidth ? maxWidth : maxHeight;
  const cellMargin =
    maxHeight > maxWidth ? marginWidth / longest : marginHeight / layout.length;

  const cellFontSize = calculateFontSize(
    measure,
    cellSize,
    getLongestWord(config, layout)
  );

  return {
    cellSize,
    cellMargin,
    cellFontSize,
  };
};

export const calculateFontSize = (
  measure: {width?: number; height?: number},
  cellSize: number,
  longestWord: number
) => {
  if (!measure.height || !measure.width) {
    return undefined;
  }

  if (longestWord === 1) {
    return cellSize / ((measure.height / 100) * longestWord);
  }

  return cellSize / ((measure.width / 100 / 1.35) * longestWord);
};
