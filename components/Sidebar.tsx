
import React from 'react';
import { Calculator, List, X } from 'lucide-react';

type View = 'calculator' | 'products';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: View;
  onNavigate: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentView, onNavigate }) => {
  const handleNavigation = (view: View) => {
    onNavigate(view);
    onClose();
  };
  
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      />
      <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={onClose} className="p-2 rounded-md text-slate-500 hover:bg-slate-100">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4">
          <ul>
            <li>
              <button 
                onClick={() => handleNavigation('calculator')}
                className={`w-full flex items-center p-3 rounded-md text-left text-base font-medium transition-colors ${currentView === 'calculator' ? 'bg-cyan-100 text-cyan-700' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <Calculator className="mr-3 h-5 w-5" />
                Kalkulator
              </button>
            </li>
            <li className="mt-2">
              <button
                onClick={() => handleNavigation('products')}
                className={`w-full flex items-center p-3 rounded-md text-left text-base font-medium transition-colors ${currentView === 'products' ? 'bg-cyan-100 text-cyan-700' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <List className="mr-3 h-5 w-5" />
                Daftar Produk
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
