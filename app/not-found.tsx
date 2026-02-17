'use client';

import Link from 'next/link';
import { FileQuestion, Home } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotFound() {
    const [errorId, setErrorId] = useState('');

    useEffect(() => {
        // Generate random error ID client-side to match the user's request
        setErrorId(`ERR-404-${Math.floor(Math.random() * 900000) + 100000}`);
    }, []);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center font-sans">
            <div className="bg-slate-50 p-12 rounded-[32px] border border-slate-200 shadow-xl max-w-lg w-full">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileQuestion size={48} className="text-slate-400" />
                </div>

                <h1 className="text-4xl font-black text-slate-800 mb-2">Страница не найдена</h1>
                <p className="text-slate-500 text-lg mb-8">
                    Мы обыскали всё, но не смогли найти то, что вы искали. Возможно, страница была удалена или перемещена.
                </p>

                <div className="bg-slate-100 rounded-lg p-3 mb-8 font-mono text-sm text-slate-500">
                    Код ошибки: <span className="text-slate-800 font-bold">{errorId}</span>
                </div>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20"
                >
                    <Home size={20} />
                    Вернуться на главную
                </Link>
            </div>
        </div>
    );
}
