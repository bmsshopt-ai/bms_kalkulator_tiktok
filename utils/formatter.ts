
export const formatRupiah = (value: number, withPrefix = true): string => {
  if (isNaN(value)) return withPrefix ? "Rp 0" : "0";
  return `${withPrefix ? "Rp " : ""}${Math.round(value).toLocaleString("id-ID")}`;
};

export const parseRupiah = (value: string): number => {
    return Number(value.replace(/[^0-9]/g, ''));
};
