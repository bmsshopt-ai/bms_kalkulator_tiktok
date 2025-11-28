
import React from 'react';
import { HelpCircle } from 'lucide-react';
import Tooltip from './Tooltip';

interface DisplayRowProps {
    label: string;
    value: string | number;
    isHighlighted?: boolean;
    valueColor?: string;
    calculatedValue?: string;
    tooltip?: string;
}

const DisplayRow: React.FC<DisplayRowProps> = ({
    label,
    value,
    isHighlighted = false,
    valueColor = 'text-slate-900',
    calculatedValue,
    tooltip,
}) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 items-center gap-2 ${isHighlighted ? 'py-2 px-3 bg-cyan-50 rounded-md' : ''}`}>
            <label className="font-medium text-slate-700 flex items-center">
                {label}
                {tooltip && (
                    <Tooltip text={tooltip}>
                        <HelpCircle size={16} className="ml-2 text-slate-400" />
                    </Tooltip>
                )}
            </label>
            <div className="text-right">
                <p className={`font-semibold ${isHighlighted ? 'text-lg text-cyan-700' : 'text-base'} ${valueColor}`}>
                    {value}
                </p>
                {calculatedValue && <p className="text-sm text-slate-500">{calculatedValue}</p>}
            </div>
        </div>
    );
};

export default DisplayRow;
