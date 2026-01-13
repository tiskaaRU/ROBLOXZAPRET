
import React, { useState, useCallback } from 'react';
import { ROBLOX_DOMAINS } from '../constants';

export const CopySection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(ROBLOX_DOMAINS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <div className="space-y-4">
      <div className="relative group">
        <textarea
          readOnly
          value={ROBLOX_DOMAINS}
          className="w-full h-56 bg-slate-50 border border-slate-200 rounded-2xl p-5 text-sm font-mono text-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 resize-none overflow-y-auto"
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-2 pointer-events-none opacity-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 bg-white rounded-lg border border-slate-100">
          Domains List
        </div>
      </div>
      
      <button
        onClick={handleCopy}
        className={`w-full py-4 px-6 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 border shadow-sm ${
          copied 
            ? 'bg-green-50 border-green-200 text-green-600' 
            : 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800 active:scale-[0.98]'
        }`}
      >
        {copied ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Скопировано!
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            Скопировать список
          </>
        )}
      </button>
    </div>
  );
};
