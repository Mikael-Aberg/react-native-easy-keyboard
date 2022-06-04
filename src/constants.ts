import type {KeyConfig} from './keyboard';

export const sizeRegex = new RegExp(/{(\d*\.*\d*)}$/);

export const DEFAULT_KEY_CONFIG: Omit<KeyConfig, 'value'> = Object.freeze({
  size: 1,
  isTrigger: false,
});
