
import React, { useState } from 'react';
import { ProductCalculation } from '../types';
import { useRoasCalculator } from '../hooks/useRoasCalculator';
import Card from '../components/Card';
import InputRow from '../components/InputRow';
import DisplayRow from '../components/DisplayRow';
import MarginInput from '../components/MarginInput';
import Toast from '../components/Toast';
import { formatRupiah, parseRupiah } from '../utils/formatter';
import { Calculator, DollarSign, Percent, Receipt, Target, BarChart2, Briefcase, FileText, CheckCircle } from 'lucide-react';

interface CalculatorViewProps {
    onSave: (calculation: ProductCalculation) => void;
}

const CalculatorView: React.FC<CalculatorViewProps> = ({ onSave }) => {
    const { state, setState, handleInputChange, calculations, resetCalculator } = useRoasCalculator();
    const [showToast, setShowToast] = useState(false);

    const handleSave = () => {
        if (!state.namaProduk) {
            alert('Nama Produk harus diisi sebelum menyimpan.');
            return;
        }
        const id = state.id || new Date().toISOString();
        onSave({ ...state, id });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        resetCalculator();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Card title="Nama Produk" icon={<FileText className="w-5 h-5" />}>
                <InputRow
                    label="Nama Produk"
                    value={state.namaProduk}
                    onChange={(e) => handleInputChange('namaProduk', e.target.value)}
                    placeholder="Masukkan nama produk"
                />
            </Card>

            <Card title="Harga & Margin" icon={<DollarSign className="w-5 h-5" />}>
                <InputRow label="HPP" type="number" value={state.hpp} onChange={(e) => handleInputChange('hpp', parseRupiah(e.target.value))} isCurrency />
                <MarginInput 
                    label="Margin Profit"
                    value={state.marginProfit}
                    mode={state.marginMode}
                    onValueChange={(v) => handleInputChange('marginProfit', v)}
                    onModeChange={(m) => handleInputChange('marginMode', m)}
                />
                <DisplayRow label="Harga Jual" value={formatRupiah(calculations.hargaJual)} />
                <InputRow label="Diskon Toko" type="number" value={state.diskonToko} onChange={(e) => handleInputChange('diskonToko', parseRupiah(e.target.value))} isCurrency />
            </Card>

            <Card title="Perhitungan Campaign" icon={<BarChart2 className="w-5 h-5" />}>
                <InputRow label="Potongan Campaign" type="number" value={state.potonganCampaignPersen} onChange={(e) => handleInputChange('potonganCampaignPersen', parseFloat(e.target.value) || 0)} unit="%" calculatedValue={formatRupiah(calculations.totalPotonganCampaignRp)} />
                <InputRow label="Subsidi Campaign Toko" type="number" value={state.subsidiCampaignTokoPersen} onChange={(e) => handleInputChange('subsidiCampaignTokoPersen', parseFloat(e.target.value) || 0)} unit="%" calculatedValue={formatRupiah(calculations.potonganCampaignDitanggungTokoRp)} tooltip="Berapa persen potongan campaign yang ditanggung oleh seller." />
                <DisplayRow label="Subsidi Campaign TikTok" value={`${formatRupiah(calculations.subsidiCampaignTikTokRp)}`} tooltip="Sisa potongan campaign yang ditanggung oleh TikTok."/>
                <DisplayRow label="Harga Final / Etalase" value={formatRupiah(calculations.hargaFinalEtalase)} isHighlighted />
            </Card>

            <Card title="Total Penghasilan" icon={<Receipt className="w-5 h-5" />}>
                 <DisplayRow label="Total Penghasilan Seller" value={formatRupiah(calculations.totalPenghasilanSeller)} isHighlighted />
            </Card>

            <Card title="Biaya-Biaya Marketplace" icon={<Briefcase className="w-5 h-5" />}>
                <InputRow label="Komisi Platform" type="number" value={state.komisiPlatformPersen} onChange={(e) => handleInputChange('komisiPlatformPersen', parseFloat(e.target.value) || 0)} unit="%" calculatedValue={formatRupiah(calculations.komisiPlatformRp)} />
                <InputRow label="Komisi Dinamis" type="number" value={state.komisiDinamisPersen} onChange={(e) => handleInputChange('komisiDinamisPersen', parseFloat(e.target.value) || 0)} unit="%" calculatedValue={formatRupiah(calculations.komisiDinamisRp)} />
                <InputRow label="Cashback Bonus" type="number" value={state.cashbackBonusPersen} onChange={(e) => handleInputChange('cashbackBonusPersen', parseFloat(e.target.value) || 0)} unit="%" calculatedValue={formatRupiah(calculations.cashbackBonusRp)} />
                <InputRow label="Biaya Pemrosesan" type="number" value={state.biayaPemrosesan} onChange={(e) => handleInputChange('biayaPemrosesan', parseRupiah(e.target.value))} isCurrency />
                <InputRow label="Afiliasi" type="number" value={state.afiliasiPersen} onChange={(e) => handleInputChange('afiliasiPersen', parseFloat(e.target.value) || 0)} unit="%" calculatedValue={formatRupiah(calculations.afiliasiRp)} />
                <InputRow label="Komisi Afiliasi Toko" type="number" value={state.komisiAfiliasiTokoPersen} onChange={(e) => handleInputChange('komisiAfiliasiTokoPersen', parseFloat(e.target.value) || 0)} unit="%" calculatedValue={formatRupiah(calculations.komisiAfiliasiTokoRp)} />
                <InputRow label="Live/Voucher Extra" type="number" value={state.liveVoucherExtraPersen} onChange={(e) => handleInputChange('liveVoucherExtraPersen', parseFloat(e.target.value) || 0)} unit="%" calculatedValue={formatRupiah(calculations.liveVoucherExtraRp)} />
                 <MarginInput 
                    label="Biaya Operasional"
                    value={state.biayaOperasional}
                    mode={state.biayaOperasionalMode}
                    onValueChange={(v) => handleInputChange('biayaOperasional', v)}
                    onModeChange={(m) => handleInputChange('biayaOperasionalMode', m)}
                    calculatedValue={state.biayaOperasionalMode === '%' ? formatRupiah(calculations.biayaOperasionalRp) : undefined}
                />
            </Card>

            <Card title="Total Penyelesaian Pembayaran" icon={<CheckCircle className="w-5 h-5" />}>
                <DisplayRow label="Total Penyelesaian Pembayaran" value={formatRupiah(calculations.totalPenyelesaianPembayaran)} isHighlighted />
            </Card>

            <Card title="Target Ideal" icon={<Target className="w-5 h-5" />}>
                <InputRow label="Target Persentase Keuntungan" type="number" value={state.targetKeuntunganPersen} onChange={(e) => handleInputChange('targetKeuntunganPersen', parseFloat(e.target.value) || 0)} unit="%" calculatedValue={formatRupiah(calculations.potensiKeuntunganRp)} />
                <DisplayRow label="Potensi Keuntungan" value={formatRupiah(calculations.potensiKeuntunganRp)} />
                <DisplayRow label="Target ROI Ideal" value={`${calculations.targetROIIdeal.toFixed(2)}`} calculatedValue={`Budget Iklan: ${formatRupiah(calculations.budgetIklanIdeal)}`} />
                <DisplayRow label="ROI BEP / Impas" value={`${calculations.roiBEP.toFixed(2)}`} calculatedValue={`Budget Maks: ${formatRupiah(calculations.budgetIklanMaksimal)}`} />
            </Card>

            <Card title="Analisis Performa Aktual" icon={<BarChart2 className="w-5 h-5" />}>
                 <InputRow label="Input ROI Aktual" type="number" value={state.inputROIActual} onChange={(e) => handleInputChange('inputROIActual', parseFloat(e.target.value) || 0)} />
                 <DisplayRow label="Biaya Iklan Aktual" value={formatRupiah(calculations.biayaIklanAktual)} />
                 <DisplayRow label="Potensi Profit per Order" value={formatRupiah(calculations.potensiProfitPerOrder)} valueColor={calculations.potensiProfitPerOrder >= 0 ? 'text-green-600' : 'text-red-600'} />
                 <DisplayRow label="Persentase Keuntungan" value={`${calculations.persentaseKeuntunganAktual.toFixed(2)}%`} valueColor={calculations.persentaseKeuntunganAktual >= 0 ? 'text-green-600' : 'text-red-600'} />
            </Card>

             <Card title="Analisis Biaya / Pesanan" icon={<Calculator className="w-5 h-5" />}>
                <InputRow label="Biaya Iklan / Pesanan" type="number" value={state.biayaIklanPerPesanan} onChange={(e) => handleInputChange('biayaIklanPerPesanan', parseRupiah(e.target.value))} isCurrency calculatedValue={`+PPN 11%: ${formatRupiah(calculations.biayaIklanDenganPPN)}`} />
                <DisplayRow label="Pembayaran" value={formatRupiah(calculations.totalPenyelesaianPembayaran)} />
                <DisplayRow label="Profit" value={formatRupiah(calculations.profitFinal)} isHighlighted valueColor={calculations.profitFinal >= 0 ? 'text-green-600' : 'text-red-600'} />
            </Card>


            <div className="pt-4">
                <button 
                    onClick={handleSave}
                    className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                    Simpan Perhitungan
                </button>
            </div>
            {showToast && <Toast message="Data berhasil disimpan" />}
        </div>
    );
};

export default CalculatorView;
