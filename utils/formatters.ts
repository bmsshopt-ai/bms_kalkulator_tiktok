
export const formatCurrency = (value: number): string => {
  if (isNaN(value)) return 'Rp 0';
  return `Rp ${Math.round(value).toLocaleString('id-ID')}`;
};

export const formatPercentage = (value: number): string => {
  if (isNaN(value) || !isFinite(value)) return '0.00%';
  return `${(value * 100).toFixed(2).replace('.', ',')}%`;
};

export const formatNumber = (value: number): string => {
  if (isNaN(value) || !isFinite(value)) return '0.00';
  return value.toFixed(2).replace('.', ',');
};
