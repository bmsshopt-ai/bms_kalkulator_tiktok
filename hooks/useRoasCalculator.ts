
import { useState, useMemo, useCallback } from 'react';
import { ProductCalculation, MarginMode } from '../types';

const INITIAL_STATE: ProductCalculation = {
    id: '',
    namaProduk: '',
    hpp: 0,
    marginProfit: 30,
    marginMode: MarginMode.PERCENT,
    diskonToko: 0,
    potonganCampaignPersen: 5,
    subsidiCampaignTokoPersen: 100,
    komisiPlatformPersen: 4.3,
    komisiDinamisPersen: 2.2,
    cashbackBonusPersen: 0,
    biayaPemrosesan: 1000,
    afiliasiPersen: 0,
    komisiAfiliasiTokoPersen: 0,
    liveVoucherExtraPersen: 0,
    biayaOperasional: 0,
    biayaOperasionalMode: MarginMode.RUPIAH,
    targetKeuntunganPersen: 20,
    inputROIActual: 5,
    biayaIklanPerPesanan: 5000,
};

export const useRoasCalculator = () => {
    const [state, setState] = useState<ProductCalculation>(INITIAL_STATE);

    const handleInputChange = useCallback(<K extends keyof ProductCalculation>(key: K, value: ProductCalculation[K]) => {
        setState(prev => ({ ...prev, [key]: value }));
    }, []);

    const resetCalculator = useCallback(() => {
        setState({ ...INITIAL_STATE, id: '', namaProduk: '' });
    }, []);

    const calculations = useMemo(() => {
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

        // Target Ideal
        const profitSebelumIklan = totalPenyelesaianPembayaran - hpp;
        const targetKeuntunganRp = totalPenghasilanSeller * (targetKeuntunganPersen / 100);
        const budgetIklanIdeal = profitSebelumIklan - targetKeuntunganRp;
        const potensiKeuntunganRp = targetKeuntunganRp;
        const targetROIIdeal = budgetIklanIdeal > 0 ? profitSebelumIklan / budgetIklanIdeal : Infinity;

        // BEP
        const budgetIklanMaksimal = profitSebelumIklan;
        const roiBEP = budgetIklanMaksimal > 0 ? profitSebelumIklan / budgetIklanMaksimal : Infinity;

        // Analisis Performa Aktual
        const biayaIklanAktual = inputROIActual > 0 ? profitSebelumIklan / inputROIActual : 0;
        const potensiProfitPerOrder = profitSebelumIklan - biayaIklanAktual;
        const persentaseKeuntunganAktual = totalPenghasilanSeller > 0 ? (potensiProfitPerOrder / totalPenghasilanSeller) * 100 : 0;

        // Analisis Biaya / Pesanan
        const biayaIklanDenganPPN = biayaIklanPerPesanan * 1.11;
        const profitFinal = totalPenyelesaianPembayaran - hpp - biayaIklanDenganPPN;

        return {
            hargaJual,
            totalPotonganCampaignRp,
            potonganCampaignDitanggungTokoRp,
            subsidiCampaignTikTokRp,
            hargaFinalEtalase,
            totalPenghasilanSeller,
            basisKomisi,
            komisiPlatformRp,
            komisiDinamisRp,
            cashbackBonusRp,
            afiliasiRp,
            komisiAfiliasiTokoRp,
            liveVoucherExtraRp,
            biayaOperasionalRp,
            totalBiayaMarketplace,
            totalPenyelesaianPembayaran,
            potensiKeuntunganRp,
            budgetIklanIdeal,
            targetROIIdeal,
            budgetIklanMaksimal,
            roiBEP,
            biayaIklanAktual,
            potensiProfitPerOrder,
            persentaseKeuntunganAktual,
            biayaIklanDenganPPN,
            profitFinal,
        };
    }, [state]);

    return {
        state,
        setState,
        handleInputChange,
        calculations,
        resetCalculator,
    };
};
