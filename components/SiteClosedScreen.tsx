import React from 'react';
import { SITE_CONFIG } from '../constants';

export const SiteClosedScreen: React.FC = () => {
    const { reason, maintenanceEndTime } = SITE_CONFIG;

    const getContent = () => {
        switch (reason) {
            case 'government':
                return {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    ),
                    title: "ДОСТУП ОГРАНИЧЕН",
                    subtitle: "По требованию государственных органов Российской Федерации",
                    description: "Ресурс заблокирован в соответствии с законодательством РФ. Доступ к размещенной информации ограничен.",
                    color: "red",
                    bgGradient: "from-slate-900 via-red-950 to-black"
                };
            case 'third_party':
                return {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                    ),
                    title: "САЙТ НЕДОСТУПЕН",
                    subtitle: "Действие ресурса приостановлено",
                    description: "Сайт закрыт по требованию третьих лиц или правообладателей. Обслуживание посетителей приостановлено на неопределенный срок.",
                    color: "slate",
                    bgGradient: "from-slate-800 via-slate-900 to-black"
                };
            case 'maintenance':
                return {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-500 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    ),
                    title: "ТЕХНИЧЕСКИЕ РАБОТЫ",
                    subtitle: "Мы обновляем серверную часть",
                    description: "Сайт временно недоступен в связи с плановым обновлением оборудования. Мы вернемся совсем скоро.",
                    extraInfo: maintenanceEndTime ? `Открытие запланировано: ${maintenanceEndTime}` : undefined,
                    color: "blue",
                    bgGradient: "from-blue-900 via-slate-900 to-black"
                };
            case 'unblocked':
                return {
                    icon: (
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20 animate-pulse"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-green-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    ),
                    title: "ROBLOX ДОСТУПЕН!",
                    subtitle: "Ограничения сняты официально",
                    description: "Хорошие новости! Блокировка Roblox на территории РФ была снята. Данный сайт больше не требуется, так как вы можете играть без дополнительных инструментов.",
                    color: "green",
                    bgGradient: "from-green-900 via-slate-900 to-black"
                };
        }
    };

    const content = getContent();

    return (
        <div className={`min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br ${content.bgGradient} text-white selection:bg-white/20`}>
            <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">

                {/* Icon Container */}
                <div className="flex justify-center mb-8">
                    <div className={`p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl shadow-${content.color}-900/20`}>
                        {content.icon}
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase drop-shadow-2xl">
                        {content.title}
                    </h1>
                    <p className={`text-xl md:text-2xl font-bold tracking-wide text-${content.color}-400 uppercase`}>
                        {content.subtitle}
                    </p>
                </div>

                {/* Description */}
                <div className="max-w-lg mx-auto">
                    <p className="text-slate-400 text-lg leading-relaxed font-medium">
                        {content.description}
                    </p>

                    {content.extraInfo && (
                        <div className="mt-8 inline-block px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-sm">
                            {content.extraInfo}
                        </div>
                    )}
                </div>

                {/* Footer info */}
                <div className="pt-12 text-white/20 text-xs font-black uppercase tracking-[0.3em]">
                    Roblox Bypass Hub • System Message
                </div>
            </div>
        </div>
    );
};
