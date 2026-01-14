'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, RefreshCw, LogOut, ShieldAlert, Terminal, Lock } from 'lucide-react';

export default function AdminPage() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [creds, setCreds] = useState({ user: '', pass: '' });
    const [error, setError] = useState('');

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
                // Save session minimally (just in memory for security as requested, or localStorage if convenient. Security preferred.)
            } else {
                setError('ACCESS DENIED: Invalid Credentials');
            }
        } catch (err) {
            setError('Connection Failure');
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
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-[#004e7c] flex items-center justify-center p-4 font-sans relative overflow-hidden">
                {/* Vista Wallpaper Effect */}
                <div className="absolute inset-0 bg-[url('https://files.catbox.moe/dy59p6.jpg')] bg-cover bg-center opacity-80" style={{ backgroundImage: 'linear-gradient(135deg, #0f3d4a 0%, #176663 100%)' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Vista Login Window */}
                <div className="relative z-10 w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden ring-1 ring-white/10">
                    {/* Glass Header */}
                    <div className="bg-gradient-to-b from-white/20 to-transparent p-4 border-b border-white/10 flex items-center gap-2">
                        <Lock className="text-white/80 w-4 h-4" />
                        <span className="text-white/90 font-bold text-shadow-sm">System Core Authorization</span>
                    </div>

                    <div className="p-8 flex flex-col items-center">
                        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 border-2 border-white/30 shadow-inner">
                            <ShieldAlert className="w-12 h-12 text-white/80" />
                        </div>

                        <h2 className="text-2xl text-white font-medium mb-6 drop-shadow-md">Administrator Login</h2>

                        <form onSubmit={handleLogin} className="w-full space-y-4">
                            <div className="space-y-1">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="w-full bg-white/90 border border-slate-400 rounded-sm px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-inner placeholder:text-slate-500"
                                    value={creds.user}
                                    onChange={e => setCreds({ ...creds, user: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <input
                                    type="password"
                                    placeholder="Password"
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
                                    <span className="text-white font-bold drop-shadow-md">Log On</span>
                                    <div className="absolute right-2 text-white/50 group-hover:text-white transition-colors">→</div>
                                </div>
                            </button>
                        </form>
                    </div>
                    <div className="bg-black/30 p-3 text-center">
                        <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Secure Access V7.0</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#2c3e50] font-sans text-slate-100 flex flex-col h-screen overflow-hidden">
            {/* Aero Taskbar / Header */}
            <header className="bg-black/80 backdrop-blur-md h-12 border-b border-white/10 flex items-center justify-between px-4 z-50 shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                        <Terminal size={16} className="text-white" />
                    </div>
                    <span className="font-bold text-white tracking-wide text-shadow">System Core <span className="text-blue-400">V7</span> Dashboard</span>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={refreshTickets} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Refresh Database">
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    </button>
                    <button onClick={() => setIsAuthorized(false)} className="bg-red-600/80 hover:bg-red-500 px-3 py-1 rounded text-xs font-bold border border-red-400/50 shadow-lg transition-all">
                        SHUTDOWN
                    </button>
                </div>
            </header>

            {/* Main Content Areas */}
            <main className="flex-1 p-6 overflow-auto bg-[url('https://img.freepik.com/free-vector/abstract-digital-grid-background_53876-116812.jpg')] bg-cover bg-fixed">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Status Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl">
                            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Database Config</h3>
                            <p className="text-2xl font-mono text-emerald-400">Redis List (KV)</p>
                            <p className="text-xs text-slate-500 mt-2">Optimized for high volume</p>
                        </div>
                        <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl">
                            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Tickets</h3>
                            <p className="text-2xl font-mono text-blue-400">{tickets.length}</p>
                            <p className="text-xs text-slate-500 mt-2">Stored in secure cloud</p>
                        </div>
                        <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl">
                            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Security Status</h3>
                            <p className="text-2xl font-mono text-green-400">ENCRYPTED</p>
                            <p className="text-xs text-slate-500 mt-2">Turnstile Active</p>
                        </div>
                    </div>

                    {/* Window Container */}
                    <div className="bg-white/95 text-slate-900 rounded-t-lg shadow-2xl overflow-hidden border border-slate-900/50 flex flex-col h-[600px]">
                        {/* Wrapper Header */}
                        <div className="bg-gradient-to-b from-[#e0ebf5] to-[#d0e0f0] px-4 py-2 border-b border-[#a0b0c0] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ShieldAlert size={16} className="text-slate-600" />
                                <span className="font-bold text-slate-700 text-sm drop-shadow-sm">Support Tickets Viewer.exe</span>
                            </div>
                            <div className="flex gap-1">
                                <div className="w-3 h-3 rounded-full bg-slate-300 border border-slate-400"></div>
                                <div className="w-3 h-3 rounded-full bg-slate-300 border border-slate-400"></div>
                                <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500 shadow-sm"></div>
                            </div>
                        </div>

                        {/* Toolbar */}
                        <div className="bg-[#f0f4f8] border-b border-[#d0dbe5] p-2 flex gap-2">
                            <div className="bg-white border border-[#c0d0e0] px-3 py-1 text-xs text-slate-600 rounded-sm shadow-sm flex items-center gap-2 w-full max-w-sm">
                                <span className="text-slate-400">Filter:</span>
                                <input type="text" placeholder="Search..." className="bg-transparent outline-none w-full" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-auto bg-white">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-100 text-slate-600 font-bold sticky top-0 shadow-sm z-10">
                                    <tr>
                                        <th className="px-4 py-3 border-b border-slate-200 w-20">ID</th>
                                        <th className="px-4 py-3 border-b border-slate-200 w-32">Date</th>
                                        <th className="px-4 py-3 border-b border-slate-200 w-40">User</th>
                                        <th className="px-4 py-3 border-b border-slate-200 w-32">Type</th>
                                        <th className="px-4 py-3 border-b border-slate-200">Message</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {tickets.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-4 py-12 text-center text-slate-400">
                                                No tickets found in database.
                                            </td>
                                        </tr>
                                    ) : (
                                        tickets.map((t, i) => (
                                            <tr key={i} className="hover:bg-blue-50 transition-colors group">
                                                <td className="px-4 py-3 font-mono text-xs text-slate-400 truncate max-w-[80px]" title={t.id}>{t.id}</td>
                                                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{new Date(t.createdAt).toLocaleDateString()}</td>
                                                <td className="px-4 py-3">
                                                    <div className="font-bold text-slate-800">{t.name}</div>
                                                    <div className="text-xs text-slate-400">{t.email}</div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
                                                        ${t.type === 'problem' ? 'bg-red-100 text-red-600' :
                                                            t.type === 'suggestion' ? 'bg-amber-100 text-amber-600' :
                                                                'bg-blue-100 text-blue-600'}`}>
                                                        {t.type}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-slate-600 leading-relaxed max-w-md">
                                                    {t.message}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer */}
                        <div className="bg-[#f0f4f8] border-t border-[#d0dbe5] p-1 px-4 text-xs text-slate-500 flex justify-between">
                            <span>{tickets.length} items</span>
                            <span>Connected to Vercel KV</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
