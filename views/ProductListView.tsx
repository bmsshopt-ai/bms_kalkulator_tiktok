import React, { useState, useMemo } from 'react';
import { ProductCalculation, MarginMode } from '../types';
import { ChevronDown, Search, Trash2 } from 'lucide-react';
import { formatRupiah } from '../utils/formatter';
import DisplayRow from '../components/DisplayRow';

interface ProductListViewProps {
    products: ProductCalculation[];
    onDelete: (id: string) => void;
}

const ProductDetail: React.FC<{ product: ProductCalculation }> = ({ product }) => {
    const calculations = useMemo(() => {
        const state = product;
        const { hpp, marginProfit, marginMode, diskonToko, potonganCampaignPersen, subsidiCampaignTokoPersen, komisiPlatformPersen, komisiDinamisPersen, cashbackBonusPersen, biayaPemrosesan, afiliasiPersen, komisiAfiliasiTokoPersen, liveVoucherExtraPersen, biayaOperasional, biayaOperasionalMode, targetKeuntunganPersen, inputROIActual, biayaIklanPerPesanan } = state;

        const hargaJual = marginMode === MarginMode.PERCENT ? hpp * (1 + marginProfit / 100) : hpp + marginProfit;
        const totalPotonganCampaignRp = hargaJual * (potonganCampaignPersen / 100);
        const potonganCampaignDitanggungTokoRp = totalPotonganCampaignRp * (subsidiCampaignTokoPersen / 100);
        const subsidiCampaignTikTokRp = totalPotonganCampaignRp - potonganCampaignDitanggungTokoRp;
        
        const hargaFinalEtalase = hargaJual - diskonToko - totalPotonganCampaignRp;
        const basisKomisi = hargaJual - totalPotonganCampaignRp;

        const komisiPlatformRp = basisKomisi * (komisiPlatformPersen / 100);
        const komisiDinamisRp = basisKomisi * (komisiDinamisPersen / 100);
        const cashbackBonusRp = basisKomisi * (cashbackBonusPersen / 100);
        const afiliasiRp = basisKomisi * (afiliasiPersen / 100);
        const komisiAfiliasiTokoRp = basisKomisi * (komisiAfiliasiTokoPersen / 100);
        const liveVoucherExtraRp = basisKomisi * (liveVoucherExtraPersen / 100);

        const biayaOperasionalRp = biayaOperasionalMode === MarginMode.PERCENT ? hargaJual * (biayaOperasional / 100) : biayaOperasional;
        
        const totalBiayaMarketplace = komisiPlatformRp + komisiDinamisRp + cashbackBonusRp + biayaPemrosesan + afiliasiRp + komisiAfiliasiTokoRp + liveVoucherExtraRp + biayaOperasionalRp;

        const totalPenghasilanSeller = hargaJual - diskonToko - potonganCampaignDitanggungTokoRp;
        const totalPenyelesaianPembayaran = totalPenghasilanSeller - totalBiayaMarketplace;

        const profitSebelumIklan = totalPenyelesaianPembayaran - hpp;
        const targetKeuntunganRp = totalPenghasilanSeller * (targetKeuntunganPersen / 100);
        const budgetIklanIdeal = profitSebelumIklan - targetKeuntunganRp;
        const potensiKeuntunganRp = targetKeuntunganRp;
        const targetROIIdeal = budgetIklanIdeal > 0 ? profitSebelumIklan / budgetIklanIdeal : Infinity;

        const budgetIklanMaksimal = profitSebelumIklan;
        const roiBEP = budgetIklanMaksimal > 0 ? profitSebelumIklan / budgetIklanMaksimal : Infinity;

        const biayaIklanAktual = inputROIActual > 0 ? profitSebelumIklan / inputROIActual : 0;
        const potensiProfitPerOrder = profitSebelumIklan - biayaIklanAktual;
        const persentaseKeuntunganAktual = totalPenghasilanSeller > 0 ? (potensiProfitPerOrder / totalPenghasilanSeller) * 100 : 0;

        const biayaIklanDenganPPN = biayaIklanPerPesanan * 1.11;
        const profitFinal = totalPenyelesaianPembayaran - hpp - biayaIklanDenganPPN;

        return {
            hargaJual, totalPotonganCampaignRp, potonganCampaignDitanggungTokoRp, subsidiCampaignTikTokRp, hargaFinalEtalase,
            totalPenghasilanSeller, basisKomisi, komisiPlatformRp, komisiDinamisRp, cashbackBonusRp, afiliasiRp, komisiAfiliasiTokoRp,
            liveVoucherExtraRp, biayaOperasionalRp, totalBiayaMarketplace, totalPenyelesaianPembayaran, potensiKeuntunganRp,
            budgetIklanIdeal, targetROIIdeal, budgetIklanMaksimal, roiBEP, biayaIklanAktual, potensiProfitPerOrder,
            persentaseKeuntunganAktual, biayaIklanDenganPPN, profitFinal,
        };
    }, [product]);

    return (
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 space-y-6">
            <div className="space-y-2">
                <h4 className="font-semibold text-cyan-700">Harga & Margin</h4>
                <DisplayRow label="HPP" value={formatRupiah(product.hpp)} />
                <DisplayRow label="Margin Profit" value={`${product.marginProfit}${product.marginMode}`} />
                <DisplayRow label="Harga Jual" value={formatRupiah(calculations.hargaJual)} />
                <DisplayRow label="Diskon Toko" value={formatRupiah(product.diskonToko)} />
            </div>

            <div className="space-y-2">
                 <h4 className="font-semibold text-cyan-700">Perhitungan Campaign</h4>
                 <DisplayRow label="Potongan Campaign" value={`${product.potonganCampaignPersen}%`} calculatedValue={formatRupiah(calculations.totalPotonganCampaignRp)} />
                 <DisplayRow label="Subsidi Campaign Toko" value={`${product.subsidiCampaignTokoPersen}%`} calculatedValue={formatRupiah(calculations.potonganCampaignDitanggungTokoRp)} />
                 <DisplayRow label="Subsidi Campaign TikTok" value={formatRupiah(calculations.subsidiCampaignTikTokRp)} />
                 <DisplayRow label="Harga Final / Etalase" value={formatRupiah(calculations.hargaFinalEtalase)} isHighlighted />
            </div>

            <div className="space-y-2">
                <h4 className="font-semibold text-cyan-700">Total Penghasilan</h4>
                <DisplayRow label="Total Penghasilan Seller" value={formatRupiah(calculations.totalPenghasilanSeller)} isHighlighted />
            </div>

            <div className="space-y-2">
                <h4 className="font-semibold text-cyan-700">Biaya-Biaya Marketplace</h4>
                <DisplayRow label="Komisi Platform" value={`${product.komisiPlatformPersen}%`} calculatedValue={formatRupiah(calculations.komisiPlatformRp)}/>
                <DisplayRow label="Komisi Dinamis" value={`${product.komisiDinamisPersen}%`} calculatedValue={formatRupiah(calculations.komisiDinamisRp)} />
                <DisplayRow label="Cashback Bonus" value={`${product.cashbackBonusPersen}%`} calculatedValue={formatRupiah(calculations.cashbackBonusRp)} />
                <DisplayRow label="Biaya Pemrosesan" value={formatRupiah(product.biayaPemrosesan)} />
                <DisplayRow label="Afiliasi" value={`${product.afiliasiPersen}%`} calculatedValue={formatRupiah(calculations.afiliasiRp)} />
                <DisplayRow label="Komisi Afiliasi Toko" value={`${product.komisiAfiliasiTokoPersen}%`} calculatedValue={formatRupiah(calculations.komisiAfiliasiTokoRp)} />
                <DisplayRow label="Live/Voucher Extra" value={`${product.liveVoucherExtraPersen}%`} calculatedValue={formatRupiah(calculations.liveVoucherExtraRp)} />
                <DisplayRow label="Biaya Operasional" value={product.biayaOperasionalMode === '%' ? `${product.biayaOperasional}%` : formatRupiah(product.biayaOperasional)} calculatedValue={formatRupiah(calculations.biayaOperasionalRp)} />
            </div>

             <div className="space-y-2">
                <h4 className="font-semibold text-cyan-700">Total Penyelesaian Pembayaran</h4>
                <DisplayRow label="Total Penyelesaian Pembayaran" value={formatRupiah(calculations.totalPenyelesaianPembayaran)} isHighlighted />
            </div>

             <div className="space-y-2">
                <h4 className="font-semibold text-cyan-700">Target Ideal</h4>
                <DisplayRow label="Target Keuntungan" value={`${product.targetKeuntunganPersen}%`} calculatedValue={formatRupiah(calculations.potensiKeuntunganRp)} />
                <DisplayRow label="Target ROI Ideal" value={`${calculations.targetROIIdeal.toFixed(2)}`} calculatedValue={`Budget Iklan: ${formatRupiah(calculations.budgetIklanIdeal)}`} />
                <DisplayRow label="ROI BEP / Impas" value={`${calculations.roiBEP.toFixed(2)}`} calculatedValue={`Budget Maks: ${formatRupiah(calculations.budgetIklanMaksimal)}`} />
            </div>

             <div className="space-y-2">
                <h4 className="font-semibold text-cyan-700">Analisis Performa Aktual</h4>
                <DisplayRow label="Input ROI Aktual" value={`${product.inputROIActual}`} />
                <DisplayRow label="Biaya Iklan Aktual" value={formatRupiah(calculations.biayaIklanAktual)} />
                <DisplayRow label="Potensi Profit per Order" value={formatRupiah(calculations.potensiProfitPerOrder)} valueColor={calculations.potensiProfitPerOrder >= 0 ? 'text-green-600' : 'text-red-600'} />
                <DisplayRow label="Persentase Keuntungan" value={`${calculations.persentaseKeuntunganAktual.toFixed(2)}%`} valueColor={calculations.persentaseKeuntunganAktual >= 0 ? 'text-green-600' : 'text-red-600'} />
            </div>
            
             <div className="space-y-2">
                <h4 className="font-semibold text-cyan-700">Analisis Biaya / Pesanan</h4>
                <DisplayRow label="Biaya Iklan / Pesanan" value={formatRupiah(product.biayaIklanPerPesanan)} calculatedValue={`+PPN 11%: ${formatRupiah(calculations.biayaIklanDenganPPN)}`} />
                <DisplayRow label="Pembayaran" value={formatRupiah(calculations.totalPenyelesaianPembayaran)} />
                <DisplayRow label="Profit" value={formatRupiah(calculations.profitFinal)} isHighlighted valueColor={calculations.profitFinal >= 0 ? 'text-green-600' : 'text-red-600'} />
            </div>
        </div>
    );
};


const ProductListView: React.FC<ProductListViewProps> = ({ products, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const filteredProducts = useMemo(() => {
        return products.filter(p =>
            p.namaProduk.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    const toggleExpand = (id: string) => {
        setExpandedId(prevId => (prevId === id ? null : id));
    };

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            onDelete(id);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Cari nama produk..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition bg-white text-slate-900"
                />
            </div>
            
            <div className="space-y-3">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300">
                            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50" onClick={() => toggleExpand(product.id)}>
                                <h3 className="font-semibold text-lg text-slate-800">{product.namaProduk}</h3>
                                <div className="flex items-center space-x-4">
                                    <button onClick={(e) => handleDelete(e, product.id)} className="text-slate-400 hover:text-red-500 p-2 rounded-full hover:bg-red-100 transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                    <ChevronDown
                                        size={24}
                                        className={`text-slate-500 transition-transform duration-300 ${expandedId === product.id ? 'rotate-180' : ''}`}
                                    />
                                </div>
                            </div>
                            {expandedId === product.id && <ProductDetail product={product} />}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 px-6 bg-white rounded-xl shadow-md">
                        <h3 className="text-xl font-semibold text-slate-700">Belum Ada Data</h3>
                        <p className="text-slate-500 mt-2">Anda belum menyimpan perhitungan apapun. Silakan pergi ke halaman Kalkulator untuk memulai.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductListView;