'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, RefreshCw, LogOut, ShieldAlert, Terminal, Lock, Mail, Trash2, Search, X, User, Calendar, MessageSquare } from 'lucide-react';

export default function AdminPage() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [creds, setCreds] = useState({ user: '', pass: '' });
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');

    // Selected ticket for "Mail View"
    const [selectedTicket, setSelectedTicket] = useState<any | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const authStr = btoa(`${creds.user}:${creds.pass}`);

        try {
            const res = await fetch('/api/admin/tickets', {
                headers: { 'Authorization': `Basic ${authStr}` }
            });

            if (res.ok) {
                const data = await res.json();
                setTickets(data);
                setIsAuthorized(true);
            } else {
                setError('ДОСТУП ЗАПРЕЩЕН: Неверные данные');
            }
        } catch (err) {
            setError('Ошибка соединения');
        } finally {
            setLoading(false);
        }
    };

    const refreshTickets = async () => {
        setLoading(true);
        const authStr = btoa(`${creds.user}:${creds.pass}`);
        try {
            const res = await fetch('/api/admin/tickets', {
                headers: { 'Authorization': `Basic ${authStr}` }
            });
            const data = await res.json();
            setTickets(data);
            setSelectedTicket(null);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const clearAllTickets = async () => {
        if (!window.confirm('Вы уверены? Это действие удалит ВСЕ письма НАВСЕГДА. Отменить нельзя.')) return;

        setLoading(true);
        const authStr = btoa(`${creds.user}:${creds.pass}`);
        try {
            const res = await fetch('/api/admin/tickets', {
                method: 'DELETE',
                headers: { 'Authorization': `Basic ${authStr}` }
            });
            if (res.ok) {
                setTickets([]);
                setSelectedTicket(null);
                alert('База данных очищена.');
            }
        } catch (err) {
            alert('Ошибка при удалении');
        } finally {
            setLoading(false);
        }
    }

    const filteredTickets = tickets.filter(t =>
        t?.name?.toLowerCase().includes(search.toLowerCase()) ||
        t?.email?.toLowerCase().includes(search.toLowerCase()) ||
        t?.message?.toLowerCase().includes(search.toLowerCase())
    );

    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-[#004e7c] flex items-center justify-center p-4 font-sans relative overflow-hidden">
                {/* Vista Wallpaper Effect */}
                <div className="absolute inset-0 bg-[url('https://files.catbox.moe/dy59p6.jpg')] bg-cover bg-center opacity-80" style={{ backgroundImage: 'linear-gradient(135deg, #0f3d4a 0%, #176663 100%)' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Vista Login Window */}
                <div className="relative z-10 w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden ring-1 ring-white/10">
                    <div className="bg-gradient-to-b from-white/20 to-transparent p-4 border-b border-white/10 flex items-center gap-2">
                        <Lock className="text-white/80 w-4 h-4" />
                        <span className="text-white/90 font-bold text-shadow-sm">System Core Authorization</span>
                    </div>

                    <div className="p-8 flex flex-col items-center">
                        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 border-2 border-white/30 shadow-inner">
                            <ShieldAlert className="w-12 h-12 text-white/80" />
                        </div>

                        <h2 className="text-2xl text-white font-medium mb-6 drop-shadow-md">Вход Администратора</h2>

                        <form onSubmit={handleLogin} className="w-full space-y-4">
                            <div className="space-y-1">
                                <input
                                    type="text"
                                    placeholder="Имя пользователя"
                                    className="w-full bg-white/90 border border-slate-400 rounded-sm px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-inner placeholder:text-slate-500"
                                    value={creds.user}
                                    onChange={e => setCreds({ ...creds, user: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <input
                                    type="password"
                                    placeholder="Пароль"
                                    className="w-full bg-white/90 border border-slate-400 rounded-sm px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-inner placeholder:text-slate-500"
                                    value={creds.pass}
                                    onChange={e => setCreds({ ...creds, pass: e.target.value })}
                                />
                            </div>

                            {error && (
                                <div className="text-red-300 text-sm bg-red-900/50 p-2 rounded border border-red-500/50 text-center font-mono">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full group mt-4 relative bg-gradient-to-b from-[#3c8fce] to-[#125894] hover:from-[#4fa7eb] hover:to-[#1a6cb0] border border-[#0d3d66] rounded-md py-2 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-all active:translate-y-[1px]"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    {loading && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                                    <span className="text-white font-bold drop-shadow-md">Войти</span>
                                    <div className="absolute right-2 text-white/50 group-hover:text-white transition-colors">→</div>
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#2c3e50] font-sans text-slate-100 flex flex-col h-screen overflow-hidden">
            {/* Aero Taskbar */}
            <header className="bg-black/80 backdrop-blur-md h-12 border-b border-white/10 flex items-center justify-between px-4 z-50 shadow-lg shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                        <Terminal size={16} className="text-white" />
                    </div>
                    <span className="font-bold text-white tracking-wide text-shadow">System Core <span className="text-blue-400">V7</span> Dashboard</span>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={clearAllTickets} className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-xs font-bold border border-red-400/50 text-white flex items-center gap-2 transition-all">
                        <Trash2 size={14} /> ОЧИСТИТЬ ВСЕ
                    </button>
                    <div className="w-px h-6 bg-white/20" />
                    <button onClick={refreshTickets} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Обновить">
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    </button>
                    <button onClick={() => setIsAuthorized(false)} className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-xs font-bold border border-slate-500 shadow-lg transition-all">
                        ВЫХОД
                    </button>
                </div>
            </header>

            {/* Main Content - Windows Mail Style Layout */}
            <main className="flex-1 p-4 md:p-6 overflow-hidden bg-[url('https://img.freepik.com/free-vector/abstract-digital-grid-background_53876-116812.jpg')] bg-cover bg-fixed flex flex-col">

                {/* Metrics Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 shrink-0">
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-xl flex items-center justify-between">
                        <div>
                            <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Всего писем</h3>
                            <p className="text-2xl font-mono text-blue-400">{tickets.length}</p>
                        </div>
                        <Mail className="text-blue-500/50 w-8 h-8" />
                    </div>
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-xl flex items-center justify-between">
                        <div>
                            <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Авто-удаление</h3>
                            <p className="text-xl font-mono text-emerald-400">7 Дней</p>
                            <p className="text-[10px] text-slate-500">TTL Active</p>
                        </div>
                        <Calendar className="text-emerald-500/50 w-8 h-8" />
                    </div>
                </div>

                {/* Mail Client Interface container */}
                <div className="flex-1 bg-white/95 rounded-xl shadow-2xl border border-slate-900/50 flex overflow-hidden backdrop-blur-sm">

                    {/* Left Sidebar: List of Emails */}
                    <div className={`${selectedTicket ? 'hidden md:flex' : 'flex'} w-full md:w-1/3 border-r border-slate-200 flex-col`}>
                        <div className="bg-slate-100 p-3 border-b border-slate-200 flex gap-2">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-2 text-slate-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Поиск писем..."
                                    className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded text-sm text-slate-800 focus:outline-none focus:border-blue-500"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {filteredTickets.length === 0 ? (
                                <div className="p-8 text-center text-slate-400 text-sm">
                                    Нет писем
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-100">
                                    {filteredTickets.map((t, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setSelectedTicket(t)}
                                            className={`p-4 cursor-pointer transition-colors hover:bg-blue-50 relative group ${selectedTicket?.id === t?.id ? 'bg-blue-100 border-l-4 border-blue-500' : 'border-l-4 border-transparent'}`}
                                        >
                                            <div className="flex justification-between items-start mb-1">
                                                <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${t?.type === 'problem' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-slate-600'}`}>
                                                    {t?.type || 'General'}
                                                </span>
                                                <span className="text-[10px] text-slate-400 ml-auto whitespace-nowrap">
                                                    {t?.createdAt ? new Date(t.createdAt).toLocaleDateString() : 'Unknown'}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-slate-800 text-sm truncate pr-4">{t?.name || 'Anonymous'}</h4>
                                            <p className="text-xs text-slate-500 truncate mt-1">{t?.message || 'No content'}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Content: Reading Pane */}
                    <div className={`${selectedTicket ? 'flex' : 'hidden md:flex'} w-full md:w-2/3 bg-slate-50 flex-col relative`}>
                        {!selectedTicket ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-10">
                                <Mail className="w-16 h-16 mb-4 opacity-20" />
                                <p>Выберите письмо для чтения</p>
                            </div>
                        ) : (
                            <div className="flex flex-col h-full">
                                {/* Letter Header */}
                                <div className="bg-white p-6 border-b border-slate-200 shadow-sm">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold">
                                                {selectedTicket.name?.[0]?.toUpperCase() || '?'}
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold text-slate-900">{selectedTicket.name}</h2>
                                                <p className="text-sm text-slate-500 flex items-center gap-2">
                                                    {selectedTicket.email}
                                                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                                    <span className="font-mono text-xs text-slate-400">{selectedTicket.ip}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <button
                                                onClick={() => setSelectedTicket(null)}
                                                className="md:hidden p-2 bg-slate-100 rounded-full"
                                            >
                                                <X size={20} className="text-slate-500" />
                                            </button>
                                            <span className="text-xs font-mono text-slate-400">ID: {selectedTicket.id}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="px-3 py-1 bg-slate-100 rounded border border-slate-200 text-xs font-bold text-slate-600">
                                            Тема: {selectedTicket.type}
                                        </div>
                                    </div>
                                </div>

                                {/* Letter Body */}
                                <div className="flex-1 p-8 overflow-y-auto bg-white">
                                    <div className="prose prose-slate max-w-none">
                                        <p className="whitespace-pre-wrap leading-relaxed text-slate-800 text-base">
                                            {selectedTicket.message}
                                        </p>
                                    </div>
                                </div>

                                {/* Letter Actions */}
                                <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                                    <a href={`mailto:${selectedTicket.email}`} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all">
                                        <MessageSquare size={16} /> Ответить
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}
