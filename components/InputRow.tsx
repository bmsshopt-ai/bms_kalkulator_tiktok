
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface InputRowProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  type: 'currency' | 'percentage' | 'number';
  info?: string;
  calculatedValue?: number;
}

export const InputRow: React.FC<InputRowProps> = ({ label, value, onChange, type, info, calculatedValue }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = e.target.value === '' ? 0 : parseFloat(e.target.value);
    if (!isNaN(numValue)) {
      onChange(numValue);
    }
  };

  const getPrefix = () => {
    if (type === 'currency') return <span className="text-slate-500 pl-2">Rp</span>;
    return null;
  };
  
  const getSuffix = () => {
    if (type === 'percentage') return <span className="text-slate-500 pr-2">%</span>;
    return null;
  };

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
        {calculatedValue !== undefined && !isNaN(calculatedValue) && (
            <span className="text-sm font-mono bg-slate-200 text-slate-800 px-2 py-1 rounded-md hidden md:inline-block">{formatCurrency(calculatedValue)}</span>
        )}
        <div className="flex w-full max-w-[150px] items-center bg-slate-50 rounded-md ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-cyan-500 transition">
          {getPrefix()}
          <input
            id={label}
            type="number"
            value={value}
            onChange={handleInputChange}
            className="w-full bg-transparent p-2 text-right font-semibold focus:outline-none"
            step={type === 'percentage' ? '0.01' : '1'}
            min="0"
          />
          {getSuffix()}
        </div>
      </div>
    </div>
  );
};
