
export interface CalculatorState {
  hpp: number;
  diskon: number;
  marginProfitMode: 'percent' | 'currency';
  marginProfitValueInput: number;
  
  persentaseCampaign: number;
  campaignDitanggungTokoPercent: number;

  komisiPlatformPercent: number;
  komisiDinamisPercent: number;
  cashbackBonusPercent: number;
  biayaPemrosesan: number;
  afiliasiPercent: number;
  komisiAfiliasiTokoPercent: number;
  liveVoucherExtraPercent: number;
  biayaOperasionalPercent: number;
  targetProfitPercent: number;
  actualRoi: number; // Renamed from actualRoas
  biayaIklanPerPesanan: number;
}
