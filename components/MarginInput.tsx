import React from 'react';
import { MarginMode } from '../types';
import { formatRupiah, parseRupiah } from '../utils/formatter';

interface MarginInputProps {
  label: string;
  value: number;
  mode: MarginMode;
  onValueChange: (value: number) => void;
  onModeChange: (mode: MarginMode) => void;
  calculatedValue?: string;
}

const MarginInput: React.FC<MarginInputProps> = ({ label, value, mode, onValueChange, onModeChange, calculatedValue }) => {
  const isPercent = mode === MarginMode.PERCENT;
  
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const numericValue = isPercent ? parseFloat(rawValue) || 0 : parseRupiah(rawValue);
      onValueChange(numericValue);
  }

  const displayValue = isPercent ? value : formatRupiah(value, false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
      <label className="font-medium text-slate-700">{label}</label>
      <div className="flex">
        <div className="relative flex-grow">
          {!isPercent && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">Rp</span>}
          <input
            type={isPercent ? "number" : "text"}
            value={displayValue}
            onChange={handleValueChange}
            className={`w-full border border-slate-300 rounded-l-md px-3 py-2 focus:z-10 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition text-right bg-white text-slate-900 ${!isPercent ? 'pl-9' : ''}`}
          />
        </div>
        <div className="flex -ml-px">
            <button
                type="button"
                onClick={() => onModeChange(MarginMode.PERCENT)}
                className={`relative inline-flex items-center px-4 py-2 border border-slate-300 font-semibold transition-colors text-sm ${isPercent ? 'bg-cyan-600 text-white z-10' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
            >
                %
            </button>
            <button
                type="button"
                onClick={() => onModeChange(MarginMode.RUPIAH)}
                className={`relative inline-flex items-center px-4 py-2 border border-slate-300 rounded-r-md font-semibold transition-colors text-sm ${!isPercent ? 'bg-cyan-600 text-white z-10' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
            >
                Rp
            </button>
        </div>
      </div>
      {calculatedValue && <p className="text-sm text-slate-500 md:col-start-2 md:text-right">{calculatedValue}</p>}
    </div>
  );
};

export default MarginInput;
