
export enum MarginMode {
  PERCENT = '%',
  RUPIAH = 'Rp',
}

export interface ProductCalculation {
  id: string;
  namaProduk: string;
  
  // Harga & Margin
  hpp: number;
  marginProfit: number;
  marginMode: MarginMode;
  diskonToko: number;
  
  // Perhitungan Campaign
  potonganCampaignPersen: number;
  subsidiCampaignTokoPersen: number;

  // Biaya-Biaya Marketplace
  komisiPlatformPersen: number;
  komisiDinamisPersen: number;
  cashbackBonusPersen: number;
  biayaPemrosesan: number;
  afiliasiPersen: number;
  komisiAfiliasiTokoPersen: number;
  liveVoucherExtraPersen: number;
  biayaOperasional: number;
  biayaOperasionalMode: MarginMode;

  // Target Ideal
  targetKeuntunganPersen: number;

  // Analisis Performa Aktual
  inputROIActual: number;

  // Analisis Biaya / Pesanan
  biayaIklanPerPesanan: number;
}
