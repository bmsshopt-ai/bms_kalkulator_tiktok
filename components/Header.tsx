
import React from 'react';
import { Menu, Calculator } from 'lucide-react';

interface HeaderProps {
    onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    return (
        <header className="bg-white shadow-md sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                         <button onClick={onMenuClick} className="p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                            <span className="sr-only">Open main menu</span>
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="flex items-center">
                        <Calculator className="h-7 w-7 text-cyan-600 mr-2" />
                        <h1 className="text-xl font-bold text-slate-800">
                            Kalkulator Seller TikTok
                        </h1>
                    </div>
                     <div className="w-10"></div> {/* Spacer */}
                </div>
            </div>
        </header>
    );
};

export default Header;
