
import React from 'react';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const StepCard: React.FC<StepCardProps> = ({ number, title, description, children }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 transition-all hover:shadow-xl hover:shadow-slate-200/50 group relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg font-extrabold text-slate-400 group-hover:text-red-500 group-hover:bg-red-50 transition-colors">
          {number}
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
          <p className="text-slate-500 text-base leading-relaxed mb-6">
            {description}
          </p>
          {children && <div className="mt-2">{children}</div>}
        </div>
      </div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-full pointer-events-none" />
    </div>
  );
};
