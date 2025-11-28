
import React, { useState } from 'react';
import { Calculator, TrendingUp, TrendingDown, Target, CheckCircle, TicketPercent, DollarSign, Wallet, Landmark, Receipt } from 'lucide-react';
import { InputRow } from './components/InputRow';
import { DisplayRow } from './components/DisplayRow';
import { MarginInputRow } from './components/MarginInputRow';
import { CalculatorState } from './types';
import { useRoasCalculator } from './hooks/useRoasCalculator';

const App: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({
    hpp: 25000,
    diskon: 0,
    marginProfitMode: 'percent',
    marginProfitValueInput: 48.98,
    persentaseCampaign: 0,
    campaignDitanggungTokoPercent: 100,
    komisiPlatformPercent: 8,
    komisiDinamisPercent: 5,
    cashbackBonusPercent: 4.5,
    biayaPemrosesan: 1250,
    afiliasiPercent: 6,
    komisiAfiliasiTokoPercent: 0,
    liveVoucherExtraPercent: 0,
    biayaOperasionalPercent: 0,
    targetProfitPercent: 12.6,
    actualRoi: 5,
    biayaIklanPerPesanan: 0,
  });

  const calculations = useRoasCalculator(state);

  const handleStateChange = <K extends keyof CalculatorState>(key: K, value: CalculatorState[K]) => {
    setState(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const handleMarginChange = (mode: 'percent' | 'currency', value: number) => {
    setState(prevState => ({
      ...prevState,
      marginProfitMode: mode,
      marginProfitValueInput: value,
    }));
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <div className="container mx-auto p-4 md:p-8 max-w-3xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center justify-center gap-3">
            <Calculator className="w-8 h-8 text-cyan-500" />
            Kalkulator Seller TikTok
          </h1>
        </header>

        <main className="space-y-6">
          {/* Section 1: Harga & Margin */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2 flex items-center gap-2"><DollarSign className="w-5 h-5 text-cyan-500" />Harga & Margin</h2>
            <div className="space-y-1">
              <InputRow label="HPP" type="currency" value={state.hpp} onChange={v => handleStateChange('hpp', v)} info="Harga Pokok Penjualan atau harga produksi/ambil barang." />
              <MarginInputRow 
                label="Margin Profit"
                mode={state.marginProfitMode}
                value={state.marginProfitValueInput}
                onModeChange={mode => handleMarginChange(mode, state.marginProfitValueInput)}
                onValueChange={value => handleMarginChange(state.marginProfitMode, value)}
                info="Set margin profit yang diinginkan dalam persen (%) atau nominal (Rp)."
              />
              <DisplayRow label="Harga Jual" type="currency" value={calculations.hargaJual} highlight="blue" info="Harga jual otomatis dihitung dari HPP + Margin Profit." />
              <InputRow label="Diskon Toko" type="currency" value={state.diskon} onChange={v => handleStateChange('diskon', v)} info="Diskon atau voucher tambahan dari toko yang mengurangi harga jual." />
            </div>
          </div>

          {/* Section 2: Campaign */}
          <div className="bg-white rounded-xl shadow-md p-6">
             <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2 flex items-center gap-2"><TicketPercent className="text-orange-500"/>Perhitungan Campaign</h2>
             <div className="space-y-1">
                <InputRow label="Potongan Campaign" type="percentage" value={state.persentaseCampaign} onChange={v => handleStateChange('persentaseCampaign', v)} info="Persentase diskon dari program campaign marketplace (dihitung dari Harga Jual)." />
                <InputRow label="Subsidi Campaign Toko" type="percentage" value={state.campaignDitanggungTokoPercent} onChange={v => handleStateChange('campaignDitanggungTokoPercent', v)} info="Berapa persen dari total diskon campaign yang ditanggung oleh toko." calculatedValue={calculations.potonganDitanggungToko} />
                <DisplayRow label="Subsidi Campaign TikTok" type="percentage" value={calculations.subsidiTiktokPercent} calculatedValue={calculations.subsidiTiktokValue} calculatedValueType="currency" highlight="yellow" info="Sisa potongan campaign yang ditanggung oleh marketplace/TikTok."/>
                <DisplayRow label="Harga Final / Etalase" type="currency" value={calculations.hargaFinal} highlight="blue" isBold={true} info="Harga yang dilihat dan dibayar oleh pembeli setelah semua diskon." />
             </div>
          </div>
          
          {/* Section 2.5: Total Penghasilan */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2 flex items-center gap-2"><Wallet className="text-blue-500"/>Total Penghasilan</h2>
            <div className="space-y-1">
                <DisplayRow 
                    label="Total Penghasilan Seller" 
                    type="currency" 
                    value={calculations.totalPenghasilan} 
                    highlight="blue" 
                    isBold={true} 
                    info="Jumlah uang yang diterima seller setelah semua diskon dan subsidi campaign, sebelum dipotong biaya marketplace dan HPP." 
                />
            </div>
          </div>

          {/* Section 3: Biaya-biaya */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2">Biaya-Biaya Marketplace</h2>
            <div className="space-y-1">
              <InputRow label="Komisi Platform" type="percentage" value={state.komisiPlatformPercent} onChange={v => handleStateChange('komisiPlatformPercent', v)} calculatedValue={calculations.komisiPlatformValue} />
              <InputRow label="Komisi Dinamis" type="percentage" value={state.komisiDinamisPercent} onChange={v => handleStateChange('komisiDinamisPercent', v)} calculatedValue={calculations.komisiDinamisValue} />
              <InputRow label="Cashback Bonus" type="percentage" value={state.cashbackBonusPercent} onChange={v => handleStateChange('cashbackBonusPercent', v)} calculatedValue={calculations.cashbackBonusValue} />
              <InputRow label="Biaya Pemrosesan" type="currency" value={state.biayaPemrosesan} onChange={v => handleStateChange('biayaPemrosesan', v)} />
              <InputRow label="Afiliasi" type="percentage" value={state.afiliasiPercent} onChange={v => handleStateChange('afiliasiPercent', v)} calculatedValue={calculations.afiliasiValue} />
              <InputRow label="Komisi Affiliasi Toko" type="percentage" value={state.komisiAfiliasiTokoPercent} onChange={v => handleStateChange('komisiAfiliasiTokoPercent', v)} calculatedValue={calculations.komisiAfiliasiTokoValue} />
              <InputRow label="Live/Voucher Extra" type="percentage" value={state.liveVoucherExtraPercent} onChange={v => handleStateChange('liveVoucherExtraPercent', v)} calculatedValue={calculations.liveVoucherExtraValue} />
              <InputRow label="Biaya Operasional" type="percentage" value={state.biayaOperasionalPercent} onChange={v => handleStateChange('biayaOperasionalPercent', v)} calculatedValue={calculations.biayaOperasionalValue} />
            </div>
          </div>
          
          {/* Section 3.5: Total Penyelesaian Pembayaran */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2 flex items-center gap-2"><Landmark className="text-purple-500"/>Total Penyelesaian Pembayaran</h2>
            <div className="space-y-1">
                <DisplayRow 
                    label="Total Penyelesaian Pembayaran" 
                    type="currency" 
                    value={calculations.totalPenyelesaianPembayaran} 
                    highlight="green" 
                    isBold={true} 
                    info="Jumlah akhir yang masuk ke saldo penjual setelah semua biaya marketplace dipotong dari total penghasilan." 
                />
            </div>
          </div>

          {/* Section 4: Target Ideal */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2 flex items-center gap-2"><Target className="text-green-500"/>Target Ideal</h2>
            <div className="space-y-1">
              <InputRow label="Target Persentase Keuntungan" type="percentage" value={state.targetProfitPercent} onChange={v => handleStateChange('targetProfitPercent', v)} calculatedValue={calculations.potensiKeuntunganValue} info="Keuntungan bersih yang Anda inginkan per pesanan."/>
              <DisplayRow label="Potensi Keuntungan" type="currency" value={calculations.potensiKeuntunganValue} highlight="green" />
              <DisplayRow label="Target ROI Ideal" type="number" value={calculations.targetRoiIdeal} calculatedValue={calculations.budgetIklanValue} calculatedValueType="currency" highlight="green" isBold={true} info="Target ROI yang harus dicapai untuk mendapatkan profit yang diinginkan."/>
              <DisplayRow label="ROI BEP / Impas" type="number" value={calculations.roiBep} calculatedValue={calculations.maxAdSpendForBep} calculatedValueType="currency" highlight="yellow" info="ROI minimum agar tidak rugi (profit Rp 0). Angka di samping adalah budget iklan maksimal untuk impas." />
            </div>
          </div>

          {/* Section 5: Performa Aktual */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2 flex items-center gap-2"><CheckCircle className="text-indigo-500"/>Analisis Performa Aktual</h2>
            <div className="space-y-1">
              <InputRow label="Input ROI Aktual" type="number" value={state.actualRoi} onChange={v => handleStateChange('actualRoi', v)} info="Masukkan ROI yang Anda dapatkan dari campaign." />
              <DisplayRow label="Biaya Iklan Aktual" type="currency" value={calculations.actualAdSpend} highlight="yellow" info="Biaya iklan yang dihabiskan berdasarkan ROI aktual yang dimasukkan." />
              <DisplayRow label="Potensi Profit per Order" type="currency" value={calculations.actualProfit} highlight={calculations.actualProfit > 0 ? 'green' : 'red'} isBold={true} icon={calculations.actualProfit > 0 ? <TrendingUp/> : <TrendingDown/>} />
              <DisplayRow label="Persentase Keuntungan" type="percentage" value={calculations.actualProfitPercent} highlight={calculations.actualProfitPercent > 0 ? 'green' : 'red'} />
            </div>
          </div>
          
          {/* Section 6: Analisis Biaya / Pesanan */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2 flex items-center gap-2"><Receipt className="text-green-500"/>Analisis Biaya / Pesanan</h2>
            <div className="space-y-1">
              <InputRow 
                label="Biaya Iklan / Pesanan" 
                type="currency" 
                value={state.biayaIklanPerPesanan} 
                onChange={v => handleStateChange('biayaIklanPerPesanan', v)} 
                info="Masukkan biaya iklan (sebelum PPN) per pesanan. PPN 11% akan ditambahkan secara otomatis." 
                calculatedValue={calculations.finalBiayaIklanPerPesanan}
              />
              <DisplayRow label="Pembayaran" type="currency" value={calculations.pembayaran} highlight="blue" info="Total penyelesaian pembayaran dikurangi biaya iklan per pesanan (termasuk PPN)." />
              <DisplayRow label="Profit" type="currency" value={calculations.profitAnalisisBiaya} highlight={calculations.profitAnalisisBiaya > 0 ? 'green' : 'red'} isBold={true} icon={calculations.profitAnalisisBiaya > 0 ? <TrendingUp/> : <TrendingDown/>} info="Total penyelesaian pembayaran dikurangi HPP dan biaya iklan final."/>
            </div>
          </div>

        </main>
        
      </div>
    </div>
  );
};

export default App;
