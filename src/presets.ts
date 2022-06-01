import type {KeyboardConfig} from './keyboard';

export const PRESET_NUMERIC: KeyboardConfig = {
  layouts: {
    default: [
      ['7', '8', '9'],
      ['4', '5', '6'],
      ['1', '2', '3'],
      ['.', '0', '\u21E6'],
    ],
  },
};

export const PRESET_ENGLISH: KeyboardConfig = {
  displayOptions: {
    marginPercent: 5,
    display: {
      '{space}': ' ',
    },
  },
  layouts: {
    default: [
      [
        '`',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
        '-',
        '=',
        '{bksp}',
      ],
      [
        '{tab}',
        'q',
        'w',
        'e',
        'r',
        't',
        'y',
        'u',
        'i',
        'o',
        'p',
        '[',
        ']',
        '\\',
      ],
      [
        '{lock}',
        'a',
        's',
        'd',
        'f',
        'g',
        'h',
        'j',
        'k',
        'l',
        ';',
        "'",
        '{enter}',
      ],
      ['{shift}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '{shift}'],
      ['.com', '@', '{space}{10}'],
    ],
  },
};
