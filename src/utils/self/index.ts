export const numberToArray = (value: number | number[]): number[] =>
  Array.isArray(value) ? value.map(Number) : value ? [+value] : [];

export const stringToArray = (value: string | string[]): string[] =>
  Array.isArray(value) ? value : value ? [value] : [];

export function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
