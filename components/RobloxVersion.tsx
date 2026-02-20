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
            // Direct fetch from Roblox CDN (Cross-Origin checks usually allowed for CDN)
            // If CORS fails, we might need a no-cors mode, but that makes body opaque.
            // setup.rbxcdn.com usually supports standard GETs.

            const [playerRes, studioRes] = await Promise.all([
                fetch('https://setup.rbxcdn.com/version'),
                fetch('https://setup.rbxcdn.com/versionStudio')
            ]);

            if (!playerRes.ok || !studioRes.ok) {
                throw new Error('Не удалось получить данные с CDN Roblox');
            }

            const playerVersion = await playerRes.text();
            const studioVersion = await studioRes.text();

            setPlayerData({
                version: playerVersion.trim(),
                clientVersionUpload: playerVersion.trim(), // CDN only provides version hash
                bootstrapperVersion: playerVersion.trim()
            });

            setStudioData({
                version: studioVersion.trim(),
                clientVersionUpload: studioVersion.trim(),
                bootstrapperVersion: studioVersion.trim()
            });

            setLastChecked(new Date());
        } catch (err) {
            console.error('Direct CDN check failed, falling back to proxy...', err);
            // Fallback to proxy if direct check fails (e.g. strict CORS settings)
            try {
                const proxyUrl = 'https://api.allorigins.win/get?url=';
                const [playerRes, studioRes] = await Promise.all([
                    fetch(proxyUrl + encodeURIComponent('https://setup.rbxcdn.com/version')),
                    fetch(proxyUrl + encodeURIComponent('https://setup.rbxcdn.com/versionStudio'))
                ]);

                const playerWrapper = await playerRes.json();
                const studioWrapper = await studioRes.json();

                setPlayerData({
                    version: playerWrapper.contents?.trim() || 'Error',
                    clientVersionUpload: '',
                    bootstrapperVersion: ''
                });

                setStudioData({
                    version: studioWrapper.contents?.trim() || 'Error',
                    clientVersionUpload: '',
                    bootstrapperVersion: ''
                });
                setLastChecked(new Date());

            } catch (fallbackErr) {
                setError('Не удалось проверить версии. Возможно, проблема с подключением.');
                console.error(fallbackErr);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVersions();
    }, []);

    const VersionCard = ({ title, data, imageSrc, color }: { title: string, data: VersionData | null, imageSrc: string, color: string }) => (
        <div className={`relative overflow-hidden bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-[32px] p-6 shadow-xl shadow-black/20 group hover:border-${color}-500/30 transition-all duration-300`}>
            <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className={`w-20 h-20 rounded-2xl bg-${color}-500/10 flex items-center justify-center text-${color}-400 shadow-inner overflow-hidden p-2 border border-${color}-500/20`}>
                    <img src={imageSrc} alt={title} className="w-full h-full object-contain drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-slate-100">{title}</h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-wider border border-green-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        Актуально
                    </span>
                </div>
            </div>

            <div className="relative z-10">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Текущая версия</div>
                <div className="font-mono text-xl font-black text-slate-100 tracking-tight break-all">
                    {data ? data.version : 'Загрузка...'}
                </div>
            </div>
            <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-${color}-500/5 rounded-full blur-2xl group-hover:bg-${color}-500/10 transition-colors`} />
        </div>
    );

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="text-center mb-10">
                <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest border border-indigo-500/20 mb-6 inline-block">Статус системы</span>
                <h1 className="text-4xl md:text-5xl font-black text-slate-100 mb-6 tracking-tight">Актуальные версии</h1>
                <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
                    Текущие версии клиента Roblox и Studio. Данные обновляются в реальном времени с официальных серверов.
                </p>
            </div>

            {loading && !playerData ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-8 h-8 border-4 border-slate-800 border-t-indigo-500 rounded-full animate-spin" />
                    <p className="text-slate-500 font-bold text-sm animate-pulse">Получение данных с Roblox API...</p>
                </div>
            ) : error ? (
                <div className="bg-red-500/10 border border-red-500/20 rounded-[32px] p-8 text-center max-w-md mx-auto backdrop-blur-sm">
                    <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4 border border-red-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <h3 className="text-lg font-black text-red-400 mb-2">Ошибка загрузки</h3>
                    <p className="text-red-300 text-sm mb-6">{error}</p>
                    <button
                        onClick={fetchVersions}
                        className="px-6 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl font-bold hover:bg-red-500/30 transition-colors"
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
                            imageSrc="/roblox-player-3d.png"
                        />
                        <VersionCard
                            title="Roblox Studio"
                            data={studioData}
                            color="blue"
                            imageSrc="/roblox-studio-3d.png"
                        />
                    </div>

                    <div className="flex justify-center mt-12">
                        <button
                            onClick={fetchVersions}
                            disabled={loading}
                            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-400 transition-colors bg-slate-900/50 px-6 py-3 rounded-full border border-slate-800 shadow-sm hover:border-slate-700 active:scale-95 duration-200"
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
