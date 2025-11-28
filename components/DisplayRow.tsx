
import React, { ReactNode } from 'react';
import { HelpCircle } from 'lucide-react';
import { formatCurrency, formatPercentage, formatNumber } from '../utils/formatters';

interface DisplayRowProps {
  label: string;
  value: number | string;
  type: 'currency' | 'percentage' | 'number';
  info?: string;
  calculatedValue?: number;
  calculatedValueType?: 'currency' | 'percentage' | 'number';
  highlight?: 'blue' | 'green' | 'yellow' | 'red';
  isBold?: boolean;
  icon?: ReactNode;
}

export const DisplayRow: React.FC<DisplayRowProps> = ({ label, value, type, info, calculatedValue, calculatedValueType = 'currency', highlight, isBold, icon }) => {

  const formatValue = () => {
    if (typeof value === 'string') return value;
    if (value === Infinity) return "Tak Terhingga";
    
    switch(type) {
      case 'currency': return formatCurrency(value);
      case 'percentage': return formatPercentage(value);
      case 'number': return formatNumber(value);
      default: return value;
    }
  };

  const formatCalculatedValue = () => {
    if (calculatedValue === undefined || isNaN(calculatedValue)) return null;

    switch(calculatedValueType) {
      case 'currency': return formatCurrency(calculatedValue);
      case 'percentage': return formatPercentage(calculatedValue);
      case 'number': return formatNumber(calculatedValue);
      default: return formatCurrency(calculatedValue);
    }
  }

  const highlightClasses = {
    blue: 'bg-cyan-50 text-cyan-800',
    green: 'bg-green-50 text-green-800',
    yellow: 'bg-yellow-50 text-yellow-800',
    red: 'bg-red-50 text-red-800',
  };

  const textHighlightClasses = {
    blue: 'text-cyan-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
  }

  const baseClasses = "px-3 py-2 rounded-md text-right w-full max-w-[150px] flex items-center justify-end gap-2";
  const finalClasses = `${baseClasses} ${highlight ? highlightClasses[highlight] : 'bg-slate-100 text-slate-800'} ${isBold ? 'font-bold' : 'font-semibold'}`;

  return (
    <div className="grid grid-cols-2 items-center gap-4 py-2.5 border-b border-slate-100 last:border-b-0">
      {/* Left Side: Label */}
      <div className="text-sm font-medium text-slate-700 flex items-center">
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
      </div>
      
      {/* Right Side: Display Value and Calculated Value */}
      <div className="flex items-center justify-end gap-4">
        {calculatedValue !== undefined && !isNaN(calculatedValue) && (
          <span className={`text-sm font-mono px-2 py-1 rounded-md hidden md:inline-block ${highlight ? highlightClasses[highlight] : 'bg-slate-200 text-slate-800'}`}>{formatCalculatedValue()}</span>
        )}
        <div className={finalClasses}>
          {icon && <span className={highlight ? textHighlightClasses[highlight] : ''}>{icon}</span>}
          <span>{formatValue()}</span>
        </div>
      </div>
    </div>
  );
};
