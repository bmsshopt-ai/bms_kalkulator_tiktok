
import React from 'react';
import { HelpCircle } from 'lucide-react';
import Tooltip from './Tooltip';
import { formatRupiah, parseRupiah } from '../utils/formatter';

interface InputRowProps {
    label: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: 'text' | 'number';
    placeholder?: string;
    unit?: string;
    isCurrency?: boolean;
    calculatedValue?: string;
    tooltip?: string;
}

const InputRow: React.FC<InputRowProps> = ({
    label,
    value,
    onChange,
    type = 'text',
    placeholder,
    unit,
    isCurrency = false,
    calculatedValue,
    tooltip,
}) => {
    
    const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = parseRupiah(e.target.value);
        const newEvent = {
            ...e,
            target: { ...e.target, value: String(numericValue) }
        }
        onChange(newEvent);
    }
    
    const displayValue = isCurrency ? formatRupiah(Number(value), false) : value;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
            <label className="font-medium text-slate-700 flex items-center">
                {label}
                {tooltip && (
                    <Tooltip text={tooltip}>
                        <HelpCircle size={16} className="ml-2 text-slate-400" />
                    </Tooltip>
                )}
            </label>
            <div className="relative flex items-center">
                {isCurrency && <span className="absolute left-3 text-slate-500">Rp</span>}
                <input
                    type={type === 'number' && !isCurrency ? 'number' : 'text'}
                    value={displayValue}
                    onChange={isCurrency ? handleCurrencyChange : onChange}
                    placeholder={placeholder}
                    className={`w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition text-right bg-white text-slate-900 ${isCurrency ? 'pl-9' : ''} ${unit ? 'pr-10' : ''}`}
                />
                {unit && <span className="absolute right-3 text-slate-500">{unit}</span>}
            </div>
            {calculatedValue && <p className="text-sm text-slate-500 md:col-start-2 md:text-right">{calculatedValue}</p>}
        </div>
    );
};

export default InputRow;