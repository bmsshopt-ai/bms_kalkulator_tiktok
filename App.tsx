
import React, { useState, useCallback, useEffect } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import LoginView from './views/LoginView';
import CalculatorView from './views/CalculatorView';
import ProductListView from './views/ProductListView';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { ProductCalculation } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

type View = 'calculator' | 'products';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

const MainApp: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('calculator');
  const [products, setProducts] = useLocalStorage<ProductCalculation[]>('products', []);

  const handleSaveCalculation = useCallback((calculation: ProductCalculation) => {
    setProducts(prev => {
      const existingIndex = prev.findIndex(p => p.id === calculation.id);
      if (existingIndex > -1) {
        const newProducts = [...prev];
        newProducts[existingIndex] = calculation;
        return newProducts;
      }
      return [...prev, calculation];
    });
  }, [setProducts]);

  const handleDeleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, [setProducts]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isAuthenticated) {
    return <LoginView />;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentView={currentView}
        onNavigate={setCurrentView}
      />
      <main className="p-4 sm:p-6 lg:p-8">
        {currentView === 'calculator' && <CalculatorView onSave={handleSaveCalculation} />}
        {currentView === 'products' && <ProductListView products={products} onDelete={handleDeleteProduct} />}
      </main>
    </div>
  );
};

export default App;
