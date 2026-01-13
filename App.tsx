
import React, { useState } from 'react';
import { StepCard } from './components/StepCard';
import { CopySection } from './components/CopySection';
import { VideoPlayer } from './components/VideoPlayer';
import {
  DOWNLOAD_LINK,
  ROBLOX_VN_APK,
  ROBLOX_SETTINGS,
  SOTA_VPN_TG,
  BYEBYEDPI_GITHUB,
  BYEBYEDPI_ARGS_1,
  BYEBYEDPI_ARGS_2,
  SITE_CONFIG
} from './constants';
import { SiteClosedScreen } from './components/SiteClosedScreen';

import { RobloxVersion } from './components/RobloxVersion';

type ViewType = 'main' | 'disclaimer' | 'support' | 'donate';
type TabType = 'zapret' | 'voice' | 'mobile' | 'faq' | 'versions';

const App: React.FC = () => {
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

  const CopySnippet = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);
    const handle = () => {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    return (
      <div className="relative mt-2">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-[11px] text-slate-500 break-all leading-relaxed pr-12">
          {text}
        </div>
        <button
          onClick={handle}
          className="absolute top-2 right-2 p-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 text-slate-400 hover:text-red-500 transition-all"
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



  if (SITE_CONFIG.isClosed) {
    return <SiteClosedScreen />;
  }

  if (view === 'disclaimer') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col p-6 animate-in fade-in duration-500">
        <div className="max-w-2xl mx-auto w-full bg-white border border-slate-200 rounded-[40px] p-8 md:p-12 shadow-2xl shadow-slate-200/50 mt-12 mb-20">
          <button onClick={navigateToMain} className="mb-8 flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold transition-all group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Вернуться назад
          </button>
          <h1 className="text-3xl font-black mb-6 text-slate-900">Disclaimer / Отказ от ответственности</h1>
          <div className="space-y-6 text-slate-500 leading-loose text-sm md:text-base">
            <p>Данный сайт и размещенная на нем информация предоставлены исключительно в ознакоительных и технических целях. Администрация ресурса не несет ответственности за использование данного программного обеспечения пользователями.</p>
            <p>Программное обеспечение (Zapret, ByeByeDPI и др.) является инструментами с открытым исходным кодом, разработанными третьими лицами. Мы не призываем к нарушению законодательства РФ или обходу блокировок, установленных РКН, а лишь предоставляем техническую документацию по настройке сетевого ПО.</p>
            <p>Все права на торговую марку Roblox принадлежат Roblox Corporation. Мы не являемся официальными представителями и не связаны с разработчиками игры. Использование любых методов обхода осуществляется пользователем на собственный страх и риск. Администрация не гарантирует стабильную работу ПО и не несет ответственности за возможные блокировки аккаунтов или технические сбои.</p>
          </div>
        </div>
        <footer className="text-center pb-12 text-slate-400 text-xs font-bold uppercase tracking-widest">
          Created by <span className="text-red-500">BADAZZRED</span>
        </footer>
      </div>
    );
  }

  if (view === 'support') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col p-6 animate-in fade-in duration-500">
        <div className="max-w-2xl mx-auto w-full bg-white border border-slate-200 rounded-[40px] p-8 md:p-12 shadow-2xl shadow-slate-200/50 mt-12 mb-20">
          <button onClick={navigateToMain} className="mb-8 flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold transition-all group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Вернуться на главную
          </button>

          <h1 className="text-3xl font-black mb-6 text-slate-900 tracking-tight">Сотрудничество и Поддержка</h1>

          <div className="bg-red-50 border border-red-100 rounded-3xl p-6 mb-8 flex items-start gap-4">
            <div className="w-10 h-10 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <p className="text-sm font-bold text-red-800 leading-relaxed">
              Важное сообщение: любые письма, не имеющие смысла или содержащие спам, будут проигнорированы без рассмотрения. Пишите только по делу.
            </p>
          </div>

          <div className="space-y-8">
            <div className="group">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Email для связи</label>
              <div className="flex items-center gap-4 p-6 bg-slate-50 border border-slate-200 rounded-[32px] hover:border-slate-300 transition-all">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <a href="mailto:badazzredstudio@proton.me" className="text-lg font-black text-slate-900 hover:text-red-500 transition-colors">badazzredstudio@proton.me</a>
                  <p className="text-xs font-bold text-slate-400 mt-1">Ожидайте ответ в течение 48 часов</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-900 rounded-[32px] text-white">
              <h3 className="text-lg font-black mb-4">О чем можно писать?</h3>
              <ul className="space-y-3 text-sm text-slate-400 font-medium">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /> Предложения о сотрудничестве и рекламе</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /> Помощь в развитии проекта</li>
              </ul>
            </div>


          </div>
        </div>
        <footer className="text-center pb-12 text-slate-400 text-xs font-bold uppercase tracking-widest">
          Created by <span className="text-red-500">BADAZZRED</span>
        </footer>
      </div>
    );
  }

  if (view === 'donate') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col p-6 animate-in fade-in duration-500">
        <div className="max-w-2xl mx-auto w-full bg-white border border-slate-200 rounded-[40px] p-8 md:p-12 shadow-2xl shadow-slate-200/50 mt-12 mb-20">
          <button onClick={navigateToMain} className="mb-8 flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold transition-all group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Вернуться назад
          </button>

          <h1 className="text-3xl font-black mb-6 text-slate-900 tracking-tight">Поддержать проект</h1>
          <p className="text-slate-500 text-lg leading-relaxed mb-10">
            Мы развиваем проект на чистом энтузиазме. Если наши инструкции помогли вам вернуть доступ к любимой игре, вы можете поддержать нас копеечкой.
          </p>

          <div className="bg-emerald-50 border border-emerald-100 rounded-[32px] p-8">
            <h3 className="text-xl font-black text-emerald-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </span>
              Реквизиты для доната
            </h3>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm">
                <p className="text-emerald-800 text-sm font-medium leading-relaxed text-center">
                  <span className="font-bold block text-lg mb-2">Раздел в разработке</span>
                  Мы настраиваем приём платежей. Реквизиты появятся здесь в ближайшее время.<br />
                  Спасибо, что вы с нами! ❤️
                </p>
              </div>
            </div>
          </div>
        </div>
        <footer className="text-center pb-12 text-slate-400 text-xs font-bold uppercase tracking-widest">
          Created by <span className="text-red-500">BADAZZRED</span>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col selection:bg-red-500 selection:text-white bg-[#f8fafc]">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 glass-nav border-b border-slate-200 py-4 px-6">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={navigateToMain}>
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">Roblox Bypass Hub</span>
          </div>

          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto max-w-full no-scrollbar">
            {[
              { id: 'zapret', label: 'Zapret (ПК)' },
              { id: 'voice', label: 'Обход для голосового войса и чата' },
              { id: 'mobile', label: 'Обход для телефонов' },
              { id: 'faq', label: 'Помощь' },
              { id: 'versions', label: 'Версии' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={navigateToDonate}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
            Поддержать проект
          </button>
        </div>
      </nav>

      <main className="flex-grow container mx-auto max-w-3xl px-6 py-12 md:py-20">

        {/* PC ZAPRET TAB */}
        {activeTab === 'zapret' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-16">
              <span className="px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest border border-red-100 mb-6 inline-block">Инструкция для ПК</span>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Инструкция по работе с Zapret</h1>
              <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">Настройка сетевого уровня для восстановления доступа к Roblox на Windows. Смотрите видео-гайд от BADAZZREDSTUDIO ниже.</p>
            </div>

            {/* Video Instruction */}
            <div className="mb-20">
              <VideoPlayer />
            </div>

            <div className="space-y-8">
              <StepCard number={1} title="Подготовка ПО" description="Загрузите архив Zapret (v1.9.3). Это универсальное решение для обхода региональных ограничений.">
                <a href={DOWNLOAD_LINK} className="inline-flex items-center justify-center px-10 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-red-600/25">Скачать Zapret v1.9.3</a>
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
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-16">
              <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest border border-blue-100 mb-6 inline-block">Voice & Chat 2025</span>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Обход чата и войса</h1>
              <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">Метод смены региона на Вьетнам (VN) позволяет вернуть чат даже на аккаунтах, созданных в РФ.</p>
            </div>

            {/* Warning Card */}
            <div className="bg-amber-50 border-2 border-dashed border-amber-200 rounded-[32px] p-8 text-amber-900 mb-12">
              <div className="flex items-center gap-3 mb-4 font-black uppercase tracking-wider text-xs">
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
                <a href={ROBLOX_SETTINGS} target="_blank" className="inline-flex items-center justify-jcenter px-8 py-3 border-2 border-slate-200 hover:border-blue-500 hover:text-blue-600 rounded-xl font-bold transition-all text-slate-600">Настройки аккаунта</a>
              </StepCard>
              <StepCard number={2} title="Скачивание Roblox VN" description="Скачайте специальную версию Roblox VNG для Android.">
                <a href={ROBLOX_VN_APK} target="_blank" className="flex items-center gap-4 p-5 bg-slate-900 text-white rounded-3xl hover:bg-slate-800 transition-all group">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </div>
                  <div>
                    <div className="font-black text-sm">Скачать Roblox VNG APK</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">v2025 Release</div>
                  </div>
                </a>
              </StepCard>
              <StepCard number={3} title="Первый вход (VPN)" description="Запустите клиент с любым VPN, войдите в аккаунт и примите соглашение. Дальше VPN обычно не нужен (но может понадобиться Zapret для самой игры)." />
              <StepCard number={4} title="Использование чата" description="Если чат заблокирован — это баг интерфейса. Нажмите '/' для вызова окна. Войс чат также будет активен." />
            </div>

            <div className="mt-16 p-8 rounded-[40px] border-2 border-slate-100 bg-white shadow-xl shadow-slate-200/50">
              <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                Альтернатива: VPN
              </h3>
              <p className="text-slate-500 mb-8 text-sm font-medium leading-relaxed">Классический метод — использование специализированных VPN сервисов. Рекомендуем SOTA VPN для стабильного пинга.</p>
              <a href={SOTA_VPN_TG} target="_blank" className="flex items-center justify-between px-8 py-5 bg-[#24A1DE] text-white rounded-2xl font-black shadow-lg shadow-blue-500/20 group">
                <span>Подключить SOTA VPN</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </a>
            </div>
          </div>
        )}

        {/* MOBILE TAB */}
        {activeTab === 'mobile' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-16">
              <span className="px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-widest border border-purple-100 mb-6 inline-block">Android Bypass</span>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">ByeByeDPI Mobile</h1>
              <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">Инструкция по настройке приложения ByeByeDPI и системного DNS для Android устройств.</p>
            </div>

            {/* App Banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[40px] p-10 text-white shadow-2xl shadow-purple-200 mb-12">
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

              <StepCard number={3} title="DNS в приложении" description="В настройках ByeByeDPI измените значение DNS с 8.8.8.8 на 1.1.1.1. Этот шаг критичен для стабильной связи с серверами Roblox." />

              <StepCard number={4} title="Подключение" description="Вернитесь на главный экран и нажмите 'Подключить'. Когда появится значок в шторке, запускайте Roblox." />
            </div>
          </div>
        )}

        {/* FAQ TAB */}
        {
          activeTab === 'faq' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-16">
                <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest border border-emerald-100 mb-6 inline-block">FAQ & Support</span>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Частые вопросы</h1>
                <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">Ответы на самые популярные вопросы сообщества о безопасности и настройке.</p>
              </div>

              <div className="max-w-3xl mx-auto space-y-6">
                {/* Question 1 */}
                <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-xl shadow-slate-200/40">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-slate-900">Zapret это вирус?</h3>
                      <div className="prose prose-slate text-slate-500 leading-relaxed text-sm md:text-base">
                        <p className="font-bold text-slate-800 mb-2">Краткий ответ: Нет.</p>
                        <p>Zapret — это программное обеспечение с открытым исходным кодом, которое работает с сетевым драйвером для модификации пакетов (DPI Bypass). Из-за того, что программа "вмешивается" в интернет-трафик, многие антивирусы ошибочно принимают её за угрозу.</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 bg-slate-50 p-4 rounded-2xl">
                          <li>Это называется <b>False Positive</b> (ложное срабатывание).</li>
                          <li>Исходный код полностью открыт на GitHub, его проверяют тысячи людей.</li>
                          <li>Программа не крадет пароли и не майнит криптовалюту.</li>
                        </ul>
                        <p className="mt-3 text-xs font-bold uppercase tracking-widest text-slate-400">Совет: Добавьте папку с программой в исключения антивируса.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }

        {/* VERSIONS TAB */}
        {
          activeTab === 'versions' && (
            <RobloxVersion />
          )
        }
      </main >

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center">
            <div className="w-12 h-1.5 bg-slate-100 rounded-full mb-10" />

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={navigateToDisclaimer}
                className="px-8 py-3 rounded-2xl border border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-50 hover:text-slate-900 transition-all"
              >
                Отказ от ответственности
              </button>
              <button
                onClick={navigateToSupport}
                className="px-8 py-3 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-600 transition-all shadow-xl shadow-slate-200"
              >
                Сотрудничество / Поддержка
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 text-xs font-bold text-slate-400">
              <div className="flex items-center gap-2">
                <span>© {new Date().getFullYear()} Bypass Hub</span>
                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                <span>Created by <span className="text-red-500">BADAZZRED</span></span>
              </div>
              <div className="hidden md:block w-1 h-1 bg-slate-200 rounded-full" />
              <div className="flex items-center gap-2">
                <span className="text-slate-300">Вдохновлено сообществом</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div >
  );
};

export default App;
