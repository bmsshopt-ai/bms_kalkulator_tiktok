
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center bg-slate-800 text-white text-sm font-medium px-4 py-3 rounded-lg shadow-lg animate-fade-in-out z-50">
      <CheckCircle className="text-green-400 mr-3" size={20} />
      {message}
      <style>{`
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translate(-50%, 20px); }
          10% { opacity: 1; transform: translate(-50%, 0); }
          90% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, 20px); }
        }
        .animate-fade-in-out {
          animation: fade-in-out 3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Toast;
