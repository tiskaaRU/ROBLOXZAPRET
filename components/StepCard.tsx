
import React from 'react';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const StepCard: React.FC<StepCardProps> = ({ number, title, description, children }) => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 md:p-8 transition-all hover:border-slate-700 hover:shadow-xl hover:shadow-purple-500/10 group relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg font-extrabold text-slate-400 group-hover:text-purple-400 group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all shadow-inner">
          {number}
        </div>
        <div className="flex-grow z-10">
          <h3 className="text-xl font-bold text-slate-100 mb-3">{title}</h3>
          <p className="text-slate-400 text-base leading-relaxed mb-6">
            {description}
          </p>
          {children && <div className="mt-2 text-slate-300">{children}</div>}
        </div>
      </div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-full pointer-events-none" />
    </div>
  );
};
