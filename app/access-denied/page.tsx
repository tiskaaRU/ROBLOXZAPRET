'use client';

import { Ban, ShieldAlert, AlertTriangle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AccessDenied() {
    const searchParams = useSearchParams();
    const reason = searchParams.get('reason');
    const country = searchParams.get('country');
    const [errorId, setErrorId] = useState('');

    useEffect(() => {
        // Generate random error ID
        // Unique ID every time page is loaded
        setErrorId(`ERR-${Math.floor(Math.random() * 9000000) + 1000000}`);
    }, []);

    const getContent = () => {
        switch (reason) {
            case 'geo':
                // Localized messages based on country
                if (country === 'DE') {
                    return {
                        icon: <Ban size={64} className="text-red-500" />,
                        title: 'Zugriff verweigert',
                        message: 'Diese Website ist in Ihrem Land (Deutschland) nach Entscheidung des Eigentümers nicht verfügbar.',
                        color: 'text-red-600',
                        lang: 'de'
                    };
                }
                if (country === 'US') {
                    return {
                        icon: <Ban size={64} className="text-red-500" />,
                        title: 'Access Denied',
                        message: 'This website is not available in your country (United States) by decision of the site owner.',
                        color: 'text-red-600',
                        lang: 'en'
                    };
                }
                if (country === 'UA') {
                    return {
                        icon: <Ban size={64} className="text-red-500" />,
                        title: 'Доступ обмежено',
                        message: 'Цей веб-сайт недоступний у вашій країні (Україна) за рішенням власника сайту.',
                        color: 'text-red-600',
                        lang: 'uk'
                    };
                }
                // Fallback for other blocked countries (if any added later)
                return {
                    icon: <Ban size={64} className="text-red-500" />,
                    title: 'Access Denied / Доступ ограничен',
                    message: 'Access to this website is restricted in your region. / Доступ к сайту ограничен в вашем регионе.',
                    color: 'text-red-600'
                };

            case '429':
                return {
                    icon: <AlertTriangle size={64} className="text-amber-500" />,
                    title: 'Слишком много запросов',
                    message: 'Вы отправляете слишком много запросов. Пожалуйста, подождите немного и попробуйте снова.',
                    color: 'text-amber-600'
                };
            default: // Generic 403
                return {
                    icon: <ShieldAlert size={64} className="text-slate-500" />,
                    title: 'Доступ запрещен',
                    message: 'У вас нет прав для просмотра этой страницы.',
                    color: 'text-slate-600'
                };
        }
    };

    const content = getContent();

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 text-center font-sans selection:bg-red-100 selection:text-red-900">
            <div className="bg-white p-10 md:p-14 rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full relative overflow-hidden">

                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-slate-500 to-blue-500 opacity-20" />

                <div className="mb-8 flex justify-center animate-bounce-slow">
                    <div className="p-6 bg-slate-50 rounded-full shadow-inner ring-1 ring-slate-100">
                        {content.icon}
                    </div>
                </div>

                <h1 className={`text-3xl md:text-4xl font-black mb-4 ${content.color}`}>
                    {content.title}
                </h1>

                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                    {content.message}
                </p>

                <div className="border-t border-slate-100 pt-6">
                    <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                        Идентификатор ошибки
                    </p>
                    <div className="font-mono text-xl text-slate-800 bg-slate-100 py-2 px-4 rounded-lg inline-block select-all cursor-text border border-slate-200 shadow-sm">
                        {errorId || 'GENERATING...'}
                    </div>
                </div>

                {reason !== 'geo' && (
                    <button
                        onClick={() => window.location.href = '/'}
                        className="mt-8 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
                    >
                        Вернуться на главную
                    </button>
                )}
            </div>

            <div className="mt-8 text-slate-400 text-xs font-mono">
                System protection by ZapretGuard
            </div>
        </div>
    );
}
