import React, { useState, useEffect, useRef } from 'react';
import { Key, Lock, Eye, EyeOff, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { authenticateAdmin } from '../../utils/adminAuth';
import { useApp } from '../../context/AppContext';

interface SecretAdminKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessNavigate: (path: string) => void;
}

export const SecretAdminKeyModal: React.FC<SecretAdminKeyModalProps> = ({
  isOpen,
  onClose,
  onSuccessNavigate,
}) => {
  const { showToast } = useApp();
  const [keyInput, setKeyInput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setKeyInput('');
      setErrorMessage('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyInput.trim()) return;

    setIsVerifying(true);
    setErrorMessage('');

    try {
      const clean = keyInput.trim();
      const result = await authenticateAdmin(clean);
      if (result.success) {
        showToast('Blog Admin Panel unlocked successfully.', 'success');
        onClose();
        onSuccessNavigate('/admin');
      } else {
        setErrorMessage(result.error || 'Invalid key. Access denied.');
        showToast('Invalid access key.', 'error');
      }
    } catch {
      setErrorMessage('Verification failed. Try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm bg-[#FAF5EE] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-7 shadow-2xl relative text-[#241A16]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-full bg-[#FAF0EB] text-stone-500 hover:text-[#9B332C] hover:bg-[#EACAC0]/50 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Icon Header */}
        <div className="text-center space-y-2 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#9B332C] text-[#FAF5EE] flex items-center justify-center mx-auto shadow-md border border-[#D4AF37]/50">
            <Lock className="w-6 h-6 text-[#FCE5A4]" />
          </div>
          <h3 className="font-playfair text-xl font-bold text-[#241A16]">
            Atelier Private Portal
          </h3>
          <p className="text-xs text-stone-600">
            Enter the authorized master key to access the Blog Admin Suite.
          </p>
        </div>

        {/* Passkey Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
              Access Key
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type={showKey ? 'text' : 'password'}
                value={keyInput}
                onChange={(e) => {
                  setKeyInput(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Enter specific key..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#9B332C] focus:ring-1 focus:ring-[#9B332C] outline-none text-sm bg-white pr-10 tracking-widest font-mono"
                required
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errorMessage && (
              <p className="text-xs text-red-600 mt-1 font-semibold">
                {errorMessage}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isVerifying || !keyInput.trim()}
            className="w-full py-2.5 rounded-xl bg-[#9B332C] hover:bg-[#801B18] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
          >
            <Key className="w-3.5 h-3.5 text-[#FCE5A4]" />
            <span>{isVerifying ? 'Verifying...' : 'Unlock Blog Admin'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-[#D4AF37]/20 text-center">
          <p className="text-[10px] text-stone-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#9B332C]" />
            <span>Shortcut: Press <kbd className="px-1.5 py-0.5 bg-stone-200 rounded font-mono text-[9px]">Ctrl+Shift+A</kbd> anytime</span>
          </p>
        </div>
      </div>
    </div>
  );
};
