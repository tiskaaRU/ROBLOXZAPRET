'use client';

import React, { useState, useRef } from 'react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { Send, AlertCircle, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';

export function SupportForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [turnstileToken, setTurnstileToken] = useState('');
    const turnstileRef = useRef<TurnstileInstance>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!turnstileToken) {
            setErrorMessage('Пожалуйста, пройдите проверку на безопасность (капчу)');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            type: formData.get('type'),
            message: formData.get('message'),
            token: turnstileToken,
        };

        try {
            const res = await fetch('/api/support', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || 'Ошибка отправки');
            }

            setStatus('success');
            e.currentTarget.reset();
            turnstileRef.current?.reset();
        } catch (error) {
            console.error(error);
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Произошла ошибка. Попробуйте позже.');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-[32px] p-8 md:p-12 text-center shadow-xl shadow-emerald-500/10">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                    <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Сообщение отправлено!</h3>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                    Спасибо за обращение. Мы прочитаем его в ближайшее время.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
                >
                    Отправить еще одно сообщение
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-10 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none" />

            <div className="relative z-10">
                <div className="mb-8">
                    <h3 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-2">
                        <ShieldCheck className="text-blue-500" />
                        Служба поддержки
                    </h3>
                    <p className="text-slate-500">
                        Возникли проблемы или есть предложение? Напишите нам напрямую.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-bold text-slate-700 ml-1">Как вас зовут?</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                placeholder="Ваше имя"
                                className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1">Email для ответа</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                placeholder="name@example.com"
                                className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="type" className="text-sm font-bold text-slate-700 ml-1">Тип обращения</label>
                        <div className="relative">
                            <select
                                name="type"
                                id="type"
                                className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-800 appearance-none cursor-pointer"
                                defaultValue="problem"
                            >
                                <option value="problem">⚠️ Сообщить о проблеме</option>
                                <option value="suggestion">💡 Предложить идею</option>
                                <option value="collaboration">🤝 Сотрудничество</option>
                                <option value="other">📝 Другое</option>
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-bold text-slate-700 ml-1">Сообщение</label>
                        <textarea
                            name="message"
                            id="message"
                            required
                            rows={4}
                            placeholder="Опишите вашу ситуацию подробно..."
                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 resize-none"
                        ></textarea>
                    </div>

                    {/* Captcha */}
                    <div className="flex justify-center md:justify-start">
                        <Turnstile
                            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                            ref={turnstileRef}
                            onSuccess={setTurnstileToken}
                            options={{
                                theme: 'light',
                                size: 'flexible'
                            }}
                        />
                    </div>


                    {status === 'error' && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm font-medium animate-shake">
                            <AlertCircle size={18} />
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-500/30 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        {status === 'loading' ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Отправка...
                            </>
                        ) : (
                            <>
                                <Send size={20} />
                                Отправить сообщение
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
