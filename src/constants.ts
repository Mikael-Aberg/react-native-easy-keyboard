import type {KeyConfig} from './keyboard';

export const sizeRegex = new RegExp(/{(\d*\.*\d*)}$/, 'gm');

export const DEFAULT_KEY_CONFIG: Omit<KeyConfig, 'value'> = Object.freeze({
  size: 1,
});
