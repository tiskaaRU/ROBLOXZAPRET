'use client';

import React, { useState } from 'react';
import { StepCard } from '@/components/StepCard';
import { CopySection } from '@/components/CopySection';
import { VideoPlayer } from '@/components/VideoPlayer';
import {
    DOWNLOAD_LINK,
    ROBLOX_VN_APK,
    ROBLOX_SETTINGS,
    SOTA_VPN_TG,
    BYEBYEDPI_GITHUB,
    BYEBYEDPI_ARGS_1,
    BYEBYEDPI_ARGS_2,
    SITE_CONFIG
} from '@/lib/constants';
import { SiteClosedScreen } from '@/components/SiteClosedScreen';
import { RobloxVersion } from '@/components/RobloxVersion';
import { FeedbackButton } from '../components/FeedbackButton';
import { SupportForm } from '@/components/SupportForm';

type ViewType = 'main' | 'disclaimer' | 'support' | 'donate';
type TabType = 'zapret' | 'voice' | 'mobile' | 'faq' | 'versions' | 'vpn';

const CopySnippet = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);
    const handle = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="relative mt-2">
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 font-mono text-[11px] text-slate-300 break-all leading-relaxed pr-12">
                {text}
            </div>
            <button
                onClick={handle}
                className="absolute top-2 right-2 p-2 bg-slate-700 border border-slate-600 rounded-lg shadow-sm hover:bg-slate-600 text-slate-400 hover:text-purple-400 transition-all"
            >
                {copied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" /><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" /></svg>
                )}
            </button>
        </div>
    );
};

export default function HomePage() {
    const [activeTab, setActiveTab] = useState<TabType>('zapret');
    const [view, setView] = useState<ViewType>('main');

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const navigateToDisclaimer = () => {
        setView('disclaimer');
        scrollToTop();
    };

    const navigateToSupport = () => {
        setView('support');
        scrollToTop();
    };

    const navigateToMain = () => {
        setView('main');
        scrollToTop();
    };

    const navigateToDonate = () => {
        setView('donate');
        scrollToTop();
    };

    if (SITE_CONFIG.isClosed) {
        return <SiteClosedScreen />;
    }

    if (view === 'disclaimer') {
        return (
            <div className="min-h-screen bg-[#09090b] flex flex-col p-6 animate-in">
                <div className="max-w-2xl mx-auto w-full bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-[40px] p-8 md:p-12 shadow-2xl shadow-black/20 mt-12 mb-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/30 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none blur-3xl" />
                    <button onClick={navigateToMain} className="relative z-10 mb-8 flex items-center gap-2 text-slate-400 hover:text-slate-200 font-bold transition-all group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Вернуться назад
                    </button>
                    <h1 className="relative z-10 text-3xl font-black mb-6 text-slate-100">Disclaimer / Отказ от ответственности</h1>
                    <div className="relative z-10 space-y-6 text-slate-400 leading-loose text-sm md:text-base">
                        <p>Данный сайт и размещенная на нем информация предоставлены исключительно в ознакомительных и технических целях. Администрация ресурса не несет ответственности за использование данного программного обеспечения пользователями.</p>
                        <p>Программное обеспечение (Zapret, ByeByeDPI и др.) является инструментами с открытым исходным кодом, разработанными третьими лицами. Мы не призываем к нарушению законодательства РФ или обходу блокировок, установленных РКН, а лишь предоставляем техническую документацию по настройке сетевого ПО.</p>
                        <p>Все права на торговую марку Roblox принадлежат Roblox Corporation. Мы не являемся официальными представителями и не связаны с разработчиками игры. Использование любых методов обхода осуществляется пользователем на собственный страх и риск.</p>
                    </div>
                </div>
                <footer className="text-center pb-12 text-slate-500 text-xs font-bold uppercase tracking-widest">
                    Created by <span className="text-purple-400">BADAZZRED</span>
                </footer>
            </div>
        );
    }

    if (view === 'support') {
        return (
            <div className="min-h-screen bg-[#09090b] flex flex-col p-6 animate-in">
                <div className="max-w-3xl mx-auto w-full mt-12 mb-20">
                    <button onClick={navigateToMain} className="mb-8 flex items-center gap-2 text-slate-400 hover:text-slate-200 font-bold transition-all group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Вернуться на главную
                    </button>

                    <div className="mb-12">
                        <SupportForm />
                    </div>
                </div>
                <footer className="text-center pb-12 text-slate-500 text-xs font-bold uppercase tracking-widest mt-auto">
                    Created by <span className="text-purple-400">BADAZZRED</span>
                </footer>
            </div>
        );
    }

    if (view === 'donate') {
        return (
            <div className="min-h-screen bg-[#09090b] flex flex-col p-6 animate-in">
                <div className="max-w-2xl mx-auto w-full bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-[40px] p-8 md:p-12 shadow-2xl shadow-black/20 mt-12 mb-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/30 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none blur-3xl" />
                    <button onClick={navigateToMain} className="relative z-10 mb-8 flex items-center gap-2 text-slate-400 hover:text-slate-200 font-bold transition-all group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Вернуться назад
                    </button>
                    <h1 className="relative z-10 text-3xl font-black mb-6 text-slate-100 tracking-tight">Поддержать проект</h1>
                    <p className="relative z-10 text-slate-400 text-lg leading-relaxed mb-10">
                        Мы развиваем проект на чистом энтузиазме. Если наши инструкции помогли вам вернуть доступ к любимой игре, вы можете поддержать нас копеечкой.
                    </p>
                    <div className="relative z-10 grid md:grid-cols-2 gap-6">
                        {/* CloudTips Card */}
                        <a
                            href="https://pay.cloudtips.ru/p/5109cdcf"
                            target="_blank"
                            className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-[32px] p-8 text-white shadow-xl shadow-blue-500/20 hover:shadow-2xl transition-all group hover:-translate-y-1 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-20">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                            </div>

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <h3 className="text-2xl font-black mb-2">Банковская карта</h3>
                                    <p className="text-blue-100 text-sm font-medium">CloudTips (СБП, T-Pay)</p>
                                </div>
                                <div className="mt-8 flex items-center gap-2 font-bold text-sm bg-white/10 w-fit px-4 py-2 rounded-xl backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                                    <span>Отправить донат</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                </div>
                            </div>
                        </a>

                        {/* TON Crypto Card */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-[32px] p-8 shadow-xl shadow-black/20 hover:border-blue-500/30 transition-colors">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center overflow-hidden border border-blue-500/20">
                                    {/* TON Logo Placeholder / Generic Crypto Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V14.5h-2.82v3.59h2.82zM12 13a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm1.41-6.09h-2.82V10.5h2.82V6.91z" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-100">TON (Crypto)</h3>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">The Open Network</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Адрес кошелька</p>
                                    <CopySnippet text="UQAh_2xgOsbm-lES_2cLJt6x33nZIgZ7ZJxYlLLXXk45_i_3" />
                                </div>
                                <div className="p-4 bg-slate-800/50 rounded-2xl text-[11px] text-slate-400 font-medium leading-relaxed border border-slate-800">
                                    Отправляйте только <b>Toncoin</b> в сети TON. Другие токены могут быть утеряны навсегда.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="text-center pb-12 text-slate-500 text-xs font-bold uppercase tracking-widest">
                    Created by <span className="text-purple-400">BADAZZRED</span>
                </footer>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col selection:bg-purple-500/30 selection:text-purple-200 bg-[#09090b]">
            {/* Sticky Navigation */}
            <nav className="sticky top-0 z-50 glass-nav">
                <div className="container mx-auto max-w-7xl px-4 py-3 md:py-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                        {/* Logo & Brand */}
                        <div className="flex items-center gap-3 cursor-pointer group" onClick={navigateToMain}>
                            <div className="relative w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-xl font-extrabold tracking-tight text-slate-100 group-hover:text-purple-400 transition-colors">
                                Roblox Bypass <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Hub</span>
                            </span>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="w-full md:w-auto overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar touch-pan-x">
                            <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl w-max mx-auto">
                                {[
                                    { id: 'zapret', label: 'Zapret (ПК)' },
                                    { id: 'voice', label: 'Voice & Chat' },
                                    { id: 'mobile', label: 'Mobile' },
                                    { id: 'vpn', label: 'VPN 🔥' },
                                    { id: 'faq', label: 'FAQ' },
                                    { id: 'versions', label: 'Версии' }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as TabType)}
                                        className={`
                                            relative px-3.5 md:px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap text-center
                                            ${activeTab === tab.id
                                                ? 'bg-slate-800 text-white shadow-lg ring-1 ring-slate-700'
                                                : tab.id === 'vpn' ? 'text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 hover:text-indigo-300' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                            }
                                        `}
                                    >
                                        {tab.id === 'vpn' && (
                                            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                                            </span>
                                        )}
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
                            <a
                                href="https://t.me/sota?start=806639075"
                                target="_blank"
                                className="hidden md:flex items-center gap-2 px-4 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 rounded-xl font-bold text-xs transition-all shadow-lg active:scale-95 group border border-yellow-500/20 relative overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-yellow-500/5 animate-pulse"></span>
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                                </span>
                                <span>SOTA VPN</span>
                            </a>
                            <a
                                href="https://t.me/ROBLOXRUBYPASS"
                                target="_blank"
                                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-purple-500/25 active:scale-95 group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-rotate-12 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.48-.94-2.4-1.54-1.06-.7-.37-1.09.23-1.72.15-.16 2.8-2.57 2.85-2.78.01-.03.01-.13-.06-.18-.07-.05-.17-.03-.25-.02-.11.02-1.91 1.2-5.39 3.57-.51.35-.96.52-1.37.51-.45-.01-1.33-.26-1.98-.47-.8-.26-1.43-.4-1.37-.84.03-.22.32-.44.89-.67 3.5-1.52 5.83-2.53 7-3.02 3.33-1.39 4.02-1.63 4.47-1.64.1-.01.32.02.47.14.12.1.15.24.17.34.01.12.01.27.01.4z" />
                                </svg>
                                <span className="hidden lg:inline">Подписаться</span>
                                <span className="lg:hidden">Telegram</span>
                            </a>

                            <button
                                onClick={navigateToDonate}
                                className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white rounded-xl font-bold text-sm hover:bg-slate-700 transition-all shadow-lg shadow-black/20 active:scale-95 border border-slate-700"
                            >
                                <span>Поддержать</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Feedback Button */}
            {/* ВРЕМЕННО ОТКЛЮЧЕНО: ЛИМИТЫ VERCEL KV
            <div className="container mx-auto max-w-3xl px-6 pt-8">
                <FeedbackButton />
            </div>
            */}

            <main className="flex-grow container mx-auto max-w-3xl px-6 py-12 md:py-20">
                {/* Mobile bypass warning — main page */}
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-3xl p-5 md:p-6 mb-8 shadow-lg shadow-orange-500/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400 shrink-0 border border-orange-500/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <h3 className="text-base font-black text-orange-400 mb-1">⚠️ Обход на телефонах может не работать</h3>
                            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">ByeByeDPI и другие DPI-методы сейчас блокируются. Рекомендуем <a href={SOTA_VPN_TG} target="_blank" className="text-yellow-400 font-bold hover:text-yellow-300 underline underline-offset-2 decoration-yellow-500/30">SOTA VPN</a> и следите за обновлениями в <a href="https://t.me/ROBLOXRUBYPASS" target="_blank" className="text-indigo-400 font-bold hover:text-indigo-300 underline underline-offset-2 decoration-indigo-500/30">@ROBLOXRUBYPASS</a></p>
                        </div>
                    </div>
                </div>

                {/* T-Bank Banner */}
                <div className="mb-12 p-[1px] rounded-[32px] bg-gradient-to-r from-yellow-400 to-amber-600 shadow-xl shadow-yellow-500/10 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all group overflow-hidden animate-in fade-in slide-in-from-top-4 duration-700">
                    <a href="https://tbank.ru/baf/3aQbEHTLApg" target="_blank" rel="noopener noreferrer" className="block relative bg-slate-900 rounded-[31px] overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 gap-6 relative z-10">
                            <div className="flex-1 space-y-3 text-center sm:text-left">
                                <div className="inline-flex items-center justify-center sm:justify-start gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-[10px] font-bold uppercase tracking-widest border border-yellow-500/20">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                                    </span>
                                    Реклама
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-slate-100 leading-tight">
                                    Оформите дебетовую карту <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">Т-Банк</span>
                                </h3>
                                <p className="text-yellow-400/90 font-bold text-sm sm:text-base">🎁 И получите 500 ₽ на счет!</p>
                            </div>
                            <div className="relative w-full sm:w-[200px] md:w-[240px] aspect-[16/9] rounded-2xl overflow-hidden shadow-inner border border-white/10 shrink-0">
                                <img src="/Screenshot_1.png" alt="Т-Банк Баннер" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                            </div>
                        </div>
                    </a>
                </div>

                {/* SOTA VPN Banner */}
                <div className="mb-12 p-[1px] rounded-[32px] bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 shadow-xl shadow-yellow-500/10 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all group overflow-hidden animate-in fade-in slide-in-from-top-4 duration-700 delay-100">
                    <a href="https://t.me/sota?start=806639075" target="_blank" rel="noopener noreferrer" className="block relative bg-slate-900 rounded-[31px] overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 gap-6 relative z-10">
                            <div className="flex-1 space-y-3 text-center sm:text-left">
                                <div className="inline-flex items-center justify-center sm:justify-start gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-[10px] font-bold uppercase tracking-widest border border-yellow-500/20">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                                    </span>
                                    Лучший VPN
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-slate-100 leading-tight">
                                    Используйте <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">SOTA VPN</span> для Roblox
                                </h3>
                                <p className="text-yellow-400/90 font-bold text-sm sm:text-base">🚀 Лучший VPN сервис с высокой скоростью и низкой задержкой!</p>
                            </div>
                            <div className="flex items-center justify-center sm:justify-end shrink-0">
                                <div className="px-6 py-3 bg-yellow-500 text-slate-950 font-black rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300 flex items-center gap-2">
                                    Подключиться
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                {/* PC ZAPRET TAB */}
                {activeTab === 'zapret' && (
                    <div className="space-y-12 animate-in">
                        <div className="text-center mb-16">
                            <span className="px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-widest border border-purple-500/20 mb-6 inline-block">Инструкция для ПК</span>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-100 mb-6 tracking-tight">Инструкция по работе с <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Zapret</span></h1>
                            <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">Настройка сетевого уровня для восстановления доступа к Roblox на Windows. Смотрите видео-гайд от BADAZZREDSTUDIO ниже.</p>
                        </div>

                        <div className="mb-20">
                            <VideoPlayer />
                        </div>

                        <div className="space-y-8">
                            <StepCard number={1} title="Подготовка ПО" description="Загрузите архив Zapret (v1.9.6). Это универсальное решение для обхода региональных ограничений.">
                                <a href={DOWNLOAD_LINK} className="inline-flex items-center justify-center px-10 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-red-600/25">Скачать Zapret v1.9.7</a>
                            </StepCard>
                            <StepCard number={2} title="Конфигурация доменов" description="В папке 'lists' откройте 'list-general.txt'. Замените всё содержимое или добавьте в конец следующий список.">
                                <CopySection />
                            </StepCard>
                            <StepCard number={3} title="Системная настройка" description="Запустите service.bat от имени администратора. В окне настроек: ipset = any, включите Game Filter." />
                            <StepCard number={4} title="Выбор алгоритма" description="Запустите один из файлов: general (ALT10).bat или general (SIMPLE FAKE ALT).bat. Выбирайте тот, что лучше работает у вас." />
                        </div>
                    </div>
                )}

                {/* VOICE CHAT TAB */}
                {activeTab === 'voice' && (
                    <div className="space-y-12 animate-in">
                        <div className="text-center mb-16">
                            <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-500/20 mb-6 inline-block">Voice & Chat 2025</span>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-100 mb-6 tracking-tight">Обход <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Чата и Войса</span></h1>
                            <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">Метод смены региона на Вьетнам (VN) позволяет вернуть чат даже на аккаунтах, созданных в РФ.</p>
                        </div>

                        <div className="bg-amber-500/10 border-2 border-dashed border-amber-500/30 rounded-[32px] p-8 text-amber-200 mb-12 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-4 font-black uppercase tracking-wider text-xs text-amber-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1-1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                Внимание: Прочитайте перед действием!
                            </div>
                            <ul className="space-y-3 text-sm font-medium leading-relaxed">
                                <li>• После смены региона на Вьетнам вы <b>не сможете</b> вернуть обычный регион обратно.</li>
                                <li>• Работать будет только версия <b>Roblox VNG</b>.</li>
                                <li>• В версии VNG могут присутствовать специфические ограничения.</li>
                            </ul>
                        </div>

                        <div className="space-y-8">
                            <StepCard number={1} title="Верификация" description="Убедитесь, что ваш возраст подтвержден. Перейдите в настройки аккаунта и проверьте поле 'Account Location'.">
                                <a href={ROBLOX_SETTINGS} target="_blank" className="inline-flex items-center justify-center px-8 py-3 border-2 border-slate-700 hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl font-bold transition-all text-slate-300">Настройки аккаунта</a>
                            </StepCard>
                            <StepCard number={2} title="Скачивание Roblox VN" description="Скачайте специальную версию Roblox VNG для Android.">
                                <a href={ROBLOX_VN_APK} target="_blank" className="flex items-center gap-4 p-5 bg-slate-800 text-slate-100 rounded-3xl hover:bg-slate-700 transition-all group border border-slate-700 shadow-xl shadow-black/20">
                                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    </div>
                                    <div>
                                        <div className="font-black text-sm">Скачать Roblox VNG APK</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">v2025 Release</div>
                                    </div>
                                </a>
                            </StepCard>
                            <StepCard number={3} title="Первый вход (VPN)" description="Запустите клиент с любым VPN, войдите в аккаунт и примите соглашение. Дальше VPN обычно не нужен." />
                            <StepCard number={4} title="Использование чата" description="Если чат заблокирован — это баг интерфейса. Нажмите '/' для вызова окна. Войс чат также будет активен." />
                        </div>

                        <div className="mt-16 p-8 rounded-[40px] border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-xl shadow-black/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                            <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10 text-slate-100">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/30">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                </div>
                                Альтернатива: VPN
                            </h3>
                            <p className="text-slate-400 mb-8 text-sm font-medium leading-relaxed relative z-10">Классический метод — использование специализированных VPN сервисов. Рекомендуем SOTA VPN для стабильного пинга.</p>
                            <a href={SOTA_VPN_TG} target="_blank" className="relative z-10 flex items-center justify-between px-8 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-black shadow-lg shadow-blue-500/25 group hover:from-blue-500 hover:to-cyan-500 transition-all">
                                <span>Подключить SOTA VPN</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                            </a>
                        </div>
                    </div>
                )}

                {/* MOBILE TAB */}
                {activeTab === 'mobile' && (
                    <div className="space-y-12 animate-in">
                        <div className="text-center mb-10">
                            <span className="px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-widest border border-purple-500/20 mb-6 inline-block">Android Bypass</span>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-100 mb-6 tracking-tight">Обход на Телефонах</h1>
                            <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">Инструкция по настройке обхода блокировок для мобильных устройств.</p>
                        </div>

                        {/* WARNING BLOCK */}
                        <div className="bg-orange-500/10 border border-orange-500/30 rounded-3xl p-6 md:p-8 mb-12 shadow-xl shadow-orange-500/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
                                <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center text-orange-400 shrink-0 border border-orange-500/30 shadow-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                </div>
                                <div className="flex-1 text-center md:text-left space-y-4">
                                    <h3 className="text-xl md:text-2xl font-black text-orange-400 tracking-tight">Внимание: блокировки на телефонах</h3>
                                    <p className="text-slate-300 font-medium leading-relaxed text-sm md:text-base">
                                        В настоящее время методы вроде <strong>ByeByeDPI</strong> и другие приложения для подмены пакетов <span className="text-white font-bold bg-white/10 px-1 rounded">могут не работать</span> на мобильных сетях из-за ужесточения блокировок (ТСПУ).
                                    </p>
                                    <div className="bg-black/40 rounded-2xl p-5 border border-black/20 shadow-inner">
                                        <p className="text-orange-200 text-sm md:text-base font-bold mb-4 flex items-start gap-2">
                                            <span className="text-xl">✅</span>
                                            Пока единственный гарантированно рабочий и актуальный способ для смартфонов — использовать стабильный VPN.
                                        </p>
                                        <a href={SOTA_VPN_TG} target="_blank" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-900 rounded-xl font-black text-sm transition-all shadow-lg active:scale-95 group">
                                            Мы рекомендуем SOTA VPN
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                        </a>
                                    </div>
                                    <p className="text-slate-400 text-xs md:text-sm font-medium">
                                        Следите за самыми свежими обновлениями и рабочими методами обхода в нашем Telegram-канале: <a href="https://t.me/ROBLOXRUBYPASS" target="_blank" className="text-indigo-400 hover:text-indigo-300 font-bold underline decoration-indigo-500/30 underline-offset-4 transition-colors">@ROBLOXRUBYPASS</a>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[40px] p-10 text-white shadow-2xl shadow-purple-500/20 mb-12">
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black tracking-tight leading-none mb-1">ByeByeDPI APK</h2>
                                        <p className="text-purple-100 font-bold text-xs uppercase tracking-[0.2em]">v1.6.9 Stable</p>
                                    </div>
                                </div>
                                <a href={BYEBYEDPI_GITHUB} target="_blank" className="inline-flex items-center justify-center px-10 py-4 bg-white text-purple-700 rounded-2xl font-black hover:bg-purple-50 transition-all shadow-xl shadow-black/20">
                                    Скачать ByeByeDPI
                                </a>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
                        </div>

                        <div className="space-y-8">
                            <StepCard number={1} title="Системный DNS" description="Настройки → Поиск 'DNS' → 'Персональный DNS-сервер'. Выберите 'Имя хоста' и введите:">
                                <CopySnippet text="dns.google" />
                            </StepCard>
                            <StepCard number={2} title="Настройка команд" description="В приложении ByeByeDPI (Настройки → Шестерёнка) включите 'Командную строку' и вставьте аргумент ниже:">
                                <div className="space-y-6">
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                            Рекомендуемый вариант
                                        </div>
                                        <CopySnippet text={BYEBYEDPI_ARGS_1} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                            Альтернатива (если первый не работает)
                                        </div>
                                        <CopySnippet text={BYEBYEDPI_ARGS_2} />
                                    </div>
                                </div>
                            </StepCard>
                            <StepCard number={3} title="DNS в приложении" description="В настройках ByeByeDPI измените значение DNS с 8.8.8.8 на 1.1.1.1. Этот шаг критичен для стабильной связи." />
                            <StepCard number={4} title="Подключение" description="Вернитесь на главный экран и нажмите 'Подключить'. Когда появится значок в шторке, запускайте Roblox." />
                        </div>
                    </div>
                )}

                {/* VPN TAB */}
                {activeTab === 'vpn' && (
                    <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-16">
                            <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest border border-indigo-500/20 mb-6 inline-block">Рекомендация</span>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-100 mb-6 tracking-tight">Лучшие VPN для Roblox</h1>
                            <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">Проверенные сервисы, которые обеспечивают минимальный пинг и стабильное соединение.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            {/* SOTA VPN */}
                            <div className="bg-slate-900/40 backdrop-blur-sm border border-blue-500/30 rounded-[32px] p-8 shadow-xl shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50 transition-all relative overflow-hidden group hover:-translate-y-1">
                                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-amber-500 text-yellow-950 text-xs font-bold px-4 py-2 rounded-bl-2xl z-10 shadow-lg shadow-yellow-500/20">TOP 1</div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-4xl shadow-inner border border-blue-500/20">🚀</div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-100">SOTA VPN</h3>
                                        <p className="text-blue-400 font-medium text-sm">Максимальная скорость</p>
                                    </div>
                                </div>
                                <ul className="space-y-3 mb-8 text-slate-400 font-medium">
                                    <li className="flex items-center gap-2"><svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Низкий пинг в Roblox</li>
                                    <li className="flex items-center gap-2"><svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Работает YouTube 4K</li>
                                    <li className="flex items-center gap-2"><svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Discord голосовой чат</li>
                                </ul>
                                <a href="https://t.me/ROBLOXRUBYPASS" target="_blank" className="w-full flex items-center justify-center py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/25">Подключить SOTA VPN</a>
                            </div>

                            {/* HITVPN */}
                            <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-[32px] p-8 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-slate-700 transition-all group hover:-translate-y-1">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center text-4xl shadow-inner border border-purple-500/20">⚡</div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-100">HITVPN</h3>
                                        <p className="text-slate-400 font-medium text-sm">Стабильность</p>
                                    </div>
                                </div>
                                <ul className="space-y-3 mb-8 text-slate-400 font-medium">
                                    <li className="flex items-center gap-2"><svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Простая настройка</li>
                                    <li className="flex items-center gap-2"><svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Высокая надежность</li>
                                    <li className="flex items-center gap-2"><svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Поддержка 24/7</li>
                                </ul>
                                <a href="https://t.me/ROBLOXRUBYPASS" target="_blank" className="w-full flex items-center justify-center py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all shadow-lg shadow-black/30 border border-slate-700">Подключить HITVPN</a>
                            </div>
                        </div>
                    </div>
                )}

                {/* FAQ TAB */}
                {activeTab === 'faq' && (
                    <div className="space-y-12 animate-in">
                        <div className="text-center mb-16">
                            <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/20 mb-6 inline-block">FAQ & Support</span>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-100 mb-6 tracking-tight">Частые вопросы</h1>
                            <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">Ответы на самые популярные вопросы сообщества о безопасности и настройке.</p>
                        </div>

                        <div className="max-w-3xl mx-auto space-y-6">
                            <div className="bg-slate-900/40 backdrop-blur-sm rounded-[32px] p-8 border border-slate-800 shadow-xl shadow-black/20 hover:border-slate-700 transition-colors">
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center flex-shrink-0 text-red-500 border border-red-500/20">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-black text-slate-100">Zapret это вирус?</h3>
                                        <div className="prose prose-slate text-slate-400 leading-relaxed text-sm md:text-base">
                                            <p className="font-bold text-slate-200 mb-2">Краткий ответ: Нет.</p>
                                            <p>Zapret — это программное обеспечение с открытым исходным кодом, которое работает с сетевым драйвером для модификации пакетов (DPI Bypass). Из-за того, что программа "вмешивается" в интернет-трафик, многие антивирусы ошибочно принимают её за угрозу.</p>
                                            <ul className="list-disc list-inside mt-2 space-y-2 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                                                <li>Это называется <b>False Positive</b> (ложное срабатывание).</li>
                                                <li>Исходный код полностью открыт на GitHub, его проверяют тысячи людей.</li>
                                                <li>Программа не крадет пароли и не майнит криптовалюту.</li>
                                            </ul>
                                            <p className="mt-3 text-xs font-bold uppercase tracking-widest text-slate-500">Совет: Добавьте папку с программой в исключения антивируса.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* VERSIONS TAB */}
                {activeTab === 'versions' && (
                    <RobloxVersion />
                )}
            </main>

            {/* Footer */}
            <footer className="w-full border-t border-slate-800/50 bg-[#09090b]/80 backdrop-blur-xl py-16 px-6 mt-auto">
                <div className="container mx-auto max-w-4xl">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-1.5 bg-slate-800 rounded-full mb-10" />
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <button
                                onClick={navigateToDisclaimer}
                                className="px-8 py-3 rounded-2xl border border-slate-700 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 hover:text-slate-200 transition-all shadow-sm"
                            >
                                Отказ от ответственности
                            </button>
                            <button
                                onClick={navigateToSupport}
                                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-500/25 border border-purple-500/30"
                            >
                                Сотрудничество / Поддержка
                            </button>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-6 text-xs font-bold text-slate-500">
                            <div className="flex items-center gap-2">
                                <span>© {new Date().getFullYear()} Bypass Hub</span>
                                <span className="w-1 h-1 bg-slate-700 rounded-full" />
                                <span>Created by <span className="text-purple-400 hover:text-purple-300 transition-colors cursor-pointer text-shadow-sm">BADAZZRED</span></span>
                            </div>
                            <div className="hidden md:block w-1 h-1 bg-slate-700 rounded-full" />
                            <div className="flex items-center gap-2">
                                <span className="text-slate-400">Вдохновлено сообществом</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
