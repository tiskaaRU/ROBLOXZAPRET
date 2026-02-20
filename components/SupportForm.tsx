'use client';

import React from 'react';
import { ShieldCheck, Mail, MessageSquare } from 'lucide-react';

export function SupportForm() {
    return (
        <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-[32px] p-6 md:p-10 shadow-2xl shadow-black/20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/30 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none blur-3xl" />

            <div className="relative z-10">
                <div className="mb-8">
                    <h3 className="text-2xl font-black text-slate-100 mb-2 flex items-center gap-2">
                        <ShieldCheck className="text-blue-400" />
                        Служба поддержки
                    </h3>
                    <p className="text-slate-400">
                        Возникли проблемы или есть предложение? Свяжитесь с нами напрямую по контактам ниже.
                    </p>
                </div>

                <div className="space-y-4">
                    <a href="mailto:argentikmanage@gmail.com" className="w-full py-4 px-6 bg-slate-800/50 hover:bg-slate-700/80 border border-slate-700 rounded-2xl flex items-center gap-4 transition-all group">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                            <Mail size={24} />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-slate-400 mb-1">Email для связи</div>
                            <div className="text-lg font-black text-slate-200">argentikmanage@gmail.com</div>
                        </div>
                    </a>

                    <a href="https://t.me/ARBITRAZNIG" target="_blank" className="w-full py-4 px-6 bg-slate-800/50 hover:bg-slate-700/80 border border-slate-700 rounded-2xl flex items-center gap-4 transition-all group">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                            <MessageSquare size={24} />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-slate-400 mb-1">Telegram (Быстрый ответ)</div>
                            <div className="text-lg font-black text-slate-200">@ARBITRAZNIG</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
