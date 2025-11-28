
import { useMemo } from 'react';
import { CalculatorState } from '../types';

export const useRoasCalculator = (state: CalculatorState) => {
  return useMemo(() => {
    const {
      hpp,
      diskon,
      marginProfitMode,
      marginProfitValueInput,
      persentaseCampaign,
      campaignDitanggungTokoPercent,
      komisiPlatformPercent,
      komisiDinamisPercent,
      cashbackBonusPercent,
      biayaPemrosesan,
      afiliasiPercent,
      komisiAfiliasiTokoPercent,
      liveVoucherExtraPercent,
      biayaOperasionalPercent,
      targetProfitPercent,
      actualRoi,
      biayaIklanPerPesanan,
    } = state;

    // 1. Calculate Harga Jual from HPP and Margin Input (Markup Logic)
    let pricingMarginValue: number;
    let pricingMarginPercent: number;
    let hargaJual: number;

    if (marginProfitMode === 'percent') {
      pricingMarginPercent = marginProfitValueInput / 100;
      pricingMarginValue = hpp * pricingMarginPercent;
      hargaJual = hpp + pricingMarginValue;
    } else { // currency mode
      pricingMarginValue = marginProfitValueInput;
      hargaJual = hpp + pricingMarginValue;
      pricingMarginPercent = hpp > 0 ? pricingMarginValue / hpp : 0;
    }

    if (!isFinite(hargaJual) || hargaJual < hpp) {
        hargaJual = hpp;
        pricingMarginValue = 0;
        pricingMarginPercent = 0;
    }

    // 2. Calculate Campaign Discount and key price points
    const potonganCampaignValue = hargaJual * (persentaseCampaign / 100);
    const potonganDitanggungToko = potonganCampaignValue * (campaignDitanggungTokoPercent / 100);
    const subsidiTiktokValue = potonganCampaignValue - potonganDitanggungToko;
    const subsidiTiktokPercent = 1 - (campaignDitanggungTokoPercent / 100);


    // This is the price the marketplace uses as the base for calculating commissions.
    // It's the price after public campaign discounts, but BEFORE private store discounts.
    const commissionBase = hargaJual - potonganCampaignValue;

    // This is the final price the customer pays after all discounts.
    const hargaFinal = hargaJual - diskon - potonganCampaignValue;

    // This is the actual amount the seller receives in their balance after all discounts are accounted for.
    // This is the correct base for calculating the seller's actual payout.
    const totalPenghasilan = hargaJual - diskon - potonganDitanggungToko;

    // 3. Calculate all costs based on the `commissionBase`
    const komisiPlatformValue = commissionBase * (komisiPlatformPercent / 100);
    const komisiDinamisValue = commissionBase * (komisiDinamisPercent / 100);
    const cashbackBonusValue = commissionBase * (cashbackBonusPercent / 100);
    const afiliasiValue = commissionBase * (afiliasiPercent / 100);
    const komisiAfiliasiTokoValue = commissionBase * (komisiAfiliasiTokoPercent / 100);
    const liveVoucherExtraValue = commissionBase * (liveVoucherExtraPercent / 100);
    const biayaOperasionalValue = commissionBase * (biayaOperasionalPercent / 100);

    const totalCosts =
      komisiPlatformValue +
      komisiDinamisValue +
      cashbackBonusValue +
      biayaPemrosesan +
      afiliasiValue +
      komisiAfiliasiTokoValue +
      liveVoucherExtraValue +
      biayaOperasionalValue;
    
    // This calculation remains based on totalPenghasilan, as it reflects the actual cash flow to the seller.
    const totalPenyelesaianPembayaran = totalPenghasilan - totalCosts;

    // 4. Calculate Ideal Scenario (ROI) and Actual Performance.
    // These calculations are based on `totalPenghasilan` (the net revenue for the seller).
    
    // Profit pool available for ad spend and profit, based on `totalPenghasilan`.
    const profitPoolForRoiCalc = totalPenghasilan - hpp - totalCosts;

    // Ideal Scenario Calculations
    const potensiKeuntunganValue = totalPenghasilan * (targetProfitPercent / 100);
    const budgetIklanValue = profitPoolForRoiCalc - potensiKeuntunganValue;
    const targetRoiIdeal = budgetIklanValue > 0 ? totalPenghasilan / budgetIklanValue : Infinity;

    const maxAdSpendForBep = profitPoolForRoiCalc;
    const roiBep = maxAdSpendForBep > 0 ? totalPenghasilan / maxAdSpendForBep : Infinity;

    // Actual Performance Calculations
    const actualAdSpend = actualRoi > 0 ? totalPenghasilan / actualRoi : 0;
    const actualProfit = profitPoolForRoiCalc - actualAdSpend;
    const actualProfitPercent = totalPenghasilan > 0 ? actualProfit / totalPenghasilan : 0;
    
    // 5. Final analysis based on manual ad cost input with 11% tax
    const finalBiayaIklanPerPesanan = biayaIklanPerPesanan * 1.11;
    const pembayaran = totalPenyelesaianPembayaran - finalBiayaIklanPerPesanan;
    const profitAnalisisBiaya = totalPenyelesaianPembayaran - hpp - finalBiayaIklanPerPesanan;


    return {
      hargaJual,
      pricingMarginValue,
      pricingMarginPercent,
      potonganDitanggungToko,
      subsidiTiktokValue,
      subsidiTiktokPercent: persentaseCampaign > 0 ? subsidiTiktokPercent : 0,
      hargaFinal,
      totalPenghasilan,
      komisiPlatformValue,
      komisiDinamisValue,
      cashbackBonusValue,
      afiliasiValue,
      komisiAfiliasiTokoValue,
      liveVoucherExtraValue,
      biayaOperasionalValue,
      totalCosts,
      totalPenyelesaianPembayaran,
      potensiKeuntunganValue,
      budgetIklanValue,
      targetRoiIdeal,
      roiBep,
      maxAdSpendForBep,
      actualAdSpend,
      actualProfit,
      actualProfitPercent,
      pembayaran,
      profitAnalisisBiaya,
      finalBiayaIklanPerPesanan,
    };
  }, [state]);
};
