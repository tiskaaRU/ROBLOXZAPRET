import React, { useState, useEffect } from 'react';

interface VersionData {
    version: string;
    clientVersionUpload: string;
    bootstrapperVersion: string;
}

export const RobloxVersion: React.FC = () => {
    const [playerData, setPlayerData] = useState<VersionData | null>(null);
    const [studioData, setStudioData] = useState<VersionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastChecked, setLastChecked] = useState<Date | null>(null);

    const fetchVersions = async () => {
        setLoading(true);
        setError(null);
        try {
            // Using allorigins.win /get endpoint for better CORS support
            const proxyUrl = 'https://api.allorigins.win/get?url=';

            const [playerRes, studioRes] = await Promise.all([
                fetch(proxyUrl + encodeURIComponent('https://clientsettings.roblox.com/v2/client-version/WindowsPlayer')),
                fetch(proxyUrl + encodeURIComponent('https://clientsettings.roblox.com/v2/client-version/WindowsStudio'))
            ]);

            if (!playerRes.ok || !studioRes.ok) {
                throw new Error('Не удалось получить данные с серверов Roblox');
            }

            const playerWrapper = await playerRes.json();
            const studioWrapper = await studioRes.json();

            // allorigins /get returns the actual content in a 'contents' string field
            const playerJson = JSON.parse(playerWrapper.contents);
            const studioJson = JSON.parse(studioWrapper.contents);

            setPlayerData(playerJson);
            setStudioData(studioJson);
            setLastChecked(new Date());
        } catch (err) {
            setError('Ошибка подключения к API Roblox. Попробуйте позже.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVersions();
    }, []);

    const VersionCard = ({ title, data, icon, color }: { title: string, data: VersionData | null, icon: React.ReactNode, color: string }) => (
        <div className={`relative overflow-hidden bg-white border border-slate-200 rounded-[32px] p-6 shadow-xl shadow-slate-200/50 group hover:border-${color}-200 transition-all duration-300`}>
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-${color}-500`}>
                {icon}
            </div>

            <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-${color}-50 flex items-center justify-center text-${color}-600 shadow-sm`}>
                    {icon}
                </div>
                <div>
                    <h3 className="text-xl font-black text-slate-900">{title}</h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-wider border border-green-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Актуально
                    </span>
                </div>
            </div>

            <div className="relative z-10">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Текущая версия</div>
                <div className="font-mono text-xl font-black text-slate-900 tracking-tight break-all">
                    {data ? data.version : 'Загрузка...'}
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="text-center mb-10">
                <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest border border-indigo-100 mb-6 inline-block">Статус системы</span>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Актуальные версии</h1>
                <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
                    Текущие версии клиента Roblox и Studio. Данные обновляются в реальном времени с официальных серверов.
                </p>
            </div>

            {loading && !playerData ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-8 h-8 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
                    <p className="text-slate-400 font-bold text-sm animate-pulse">Получение данных с Roblox API...</p>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-100 rounded-[32px] p-8 text-center max-w-md mx-auto">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <h3 className="text-lg font-black text-red-900 mb-2">Ошибка загрузки</h3>
                    <p className="text-red-700 text-sm mb-6">{error}</p>
                    <button
                        onClick={fetchVersions}
                        className="px-6 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
                    >
                        Попробовать снова
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <VersionCard
                            title="Roblox Player"
                            data={playerData}
                            color="red"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>}
                        />
                        <VersionCard
                            title="Roblox Studio"
                            data={studioData}
                            color="blue"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>}
                        />
                    </div>

                    <div className="flex justify-center mt-12">
                        <button
                            onClick={fetchVersions}
                            disabled={loading}
                            className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors bg-white px-6 py-3 rounded-full border border-slate-200 shadow-sm hover:shadow-md active:scale-95 duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            {loading ? 'Обновление...' : `Обновлено: ${lastChecked?.toLocaleTimeString()}`}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
