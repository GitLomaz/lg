export function formatNumber(value: number | string | null | undefined, fractionDigits?: number): string {
  if (value === null || value === undefined || value === '') return '-';
  const num = typeof value === 'number' ? value : Number(value);
  if (Number.isNaN(num)) return '-';
  const options: Intl.NumberFormatOptions = {};
  if (typeof fractionDigits === 'number') {
    options.minimumFractionDigits = fractionDigits;
    options.maximumFractionDigits = fractionDigits;
  }
  return new Intl.NumberFormat(undefined, options).format(num);
}

export function formatText(text: string | null | undefined, maxLength?: number): string {
  if (!text) return '-';
  const trimmed = text.trim();
  if (maxLength && trimmed.length > maxLength) {
    return trimmed.slice(0, maxLength - 1) + '…';
  }
  return trimmed;
}

export function timestampToReadableDate(input: string | number | Date | null | undefined): string {
  if (input === null || input === undefined || input === '') return '-';
  const date = input instanceof Date ? input : new Date(input);
  if (isNaN(date.getTime())) return '-';
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

export default { formatNumber, formatText, timestampToReadableDate };
