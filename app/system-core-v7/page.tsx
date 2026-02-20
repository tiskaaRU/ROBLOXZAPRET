import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-[#004e7c] flex items-center justify-center p-4 font-sans relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://files.catbox.moe/dy59p6.jpg')] bg-cover bg-center opacity-80" style={{ backgroundImage: 'linear-gradient(135deg, #0f3d4a 0%, #176663 100%)' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            <div className="relative z-10 w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden ring-1 ring-white/10 p-8 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6 border-2 border-red-500/30 shadow-inner text-red-400">
                    <ShieldAlert className="w-12 h-12" />
                </div>
                <h2 className="text-2xl text-white font-black mb-4 drop-shadow-md uppercase tracking-wide">Панель отключена</h2>
                <p className="text-slate-300 font-medium leading-relaxed">
                    Админ-панель временно недоступна в связи с достижением лимитов бесплатной облачной базы данных (Vercel KV).<br /><br />
                    Весь функционал сбора статистики и управления тикетами приостановлен.
                </p>
            </div>
        </div>
    );
}
