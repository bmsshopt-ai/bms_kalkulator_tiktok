
import React, { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  return (
    <div className="relative flex items-center tooltip">
      {children}
      <div className="tooltip-text absolute bottom-full mb-2 w-48 bg-slate-800 text-white text-xs text-center rounded-md p-2 z-10 opacity-0 transition-opacity pointer-events-none">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
