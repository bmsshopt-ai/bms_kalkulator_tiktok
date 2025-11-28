import React from 'react';
import { HelpCircle } from 'lucide-react';

interface MarginInputRowProps {
  label: string;
  mode: 'percent' | 'currency';
  value: number;
  onModeChange: (mode: 'percent' | 'currency') => void;
  onValueChange: (value: number) => void;
  info?: string;
}

export const MarginInputRow: React.FC<MarginInputRowProps> = ({
  label,
  mode,
  value,
  onModeChange,
  onValueChange,
  info,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = e.target.value === '' ? 0 : parseFloat(e.target.value);
    if (!isNaN(numValue)) {
      onValueChange(numValue);
    }
  };

  const buttonBaseClasses = "px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1";
  const activeClasses = "bg-cyan-600 text-white";
  const inactiveClasses = "bg-slate-200 text-slate-700 hover:bg-slate-300";

  return (
    <div className="grid grid-cols-2 items-center gap-4 py-2.5 border-b border-slate-100 last:border-b-0">
      {/* Left Side: Label */}
      <label htmlFor={label} className="text-sm font-medium text-slate-700 flex items-center">
        {label}
        {info && (
          <div className="relative ml-2 group">
            <HelpCircle className="w-4 h-4 text-slate-400 cursor-pointer" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-slate-800 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {info}
               <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-800"></div>
            </div>
          </div>
        )}
      </label>
      
      {/* Right Side: Input and Calculated Value */}
      <div className="flex items-center justify-end gap-4">
        <div className="flex w-full max-w-[150px] items-center bg-slate-50 rounded-md ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-cyan-500 transition">
          <input
            id={label}
            type="number"
            value={value}
            onChange={handleInputChange}
            className="w-full bg-transparent p-2 text-right font-semibold focus:outline-none"
            // FIX: Corrected typo from 'percentage' to 'percent' to match the 'mode' type.
            step={mode === 'percent' ? '0.01' : '1'}
            min="0"
          />
          <div className="flex items-center p-0.5">
              <button 
                  onClick={() => onModeChange('percent')} 
                  className={`${buttonBaseClasses} rounded-l-md ${mode === 'percent' ? activeClasses : inactiveClasses}`}
                  aria-pressed={mode === 'percent'}
              >
                  %
              </button>
              <button 
                  onClick={() => onModeChange('currency')} 
                  className={`${buttonBaseClasses} rounded-r-md ${mode === 'currency' ? activeClasses : inactiveClasses}`}
                  aria-pressed={mode === 'currency'}
              >
                  Rp
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};
