
import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center">
        {icon && <div className="mr-3 text-cyan-600">{icon}</div>}
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>
      <div className="p-6 space-y-4">
        {children}
      </div>
    </div>
  );
};

export default Card;
