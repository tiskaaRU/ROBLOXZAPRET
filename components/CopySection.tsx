
import React, { useState, useCallback } from 'react';
import { ROBLOX_DOMAINS } from '@/lib/constants';

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
          className="w-full h-56 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 text-sm font-mono text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 resize-none overflow-y-auto"
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-2 pointer-events-none opacity-50 text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1 bg-slate-900 rounded-lg border border-slate-800">
          Domains List
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleCopy}
          className={`flex-1 py-4 px-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 border shadow-sm ${copied
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 active:scale-[0.98]'
            }`}
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Скопировано!
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              Скопировать
            </>
          )}
        </button>

        <button
          onClick={() => {
            const blob = new Blob([ROBLOX_DOMAINS], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'list-general.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }}
          className="flex-1 py-4 px-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 border shadow-sm bg-indigo-500/10 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20 active:scale-[0.98]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Скачать .txt
        </button>
      </div>
    </div>
  );
};
