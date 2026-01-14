import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: {
        default: 'Roblox Bypass Hub — Обход блокировки Роблокс и Дискорд в России 2026',
        template: '%s | Roblox Bypass Hub'
    },
    description: 'Бесплатные инструкции по обходу блокировки Roblox, Discord и YouTube в России. Скачать Zapret, ByeByeDPI. Настройка VPN для голосового чата. Работающие методы 2026 года.',
    keywords: [
        'roblox', 'роблокс', 'обход блокировки', 'zapret', 'byebyedpi', 'россия', 'vpn', 'голосовой чат',
        'разблокировать роблокс', 'discord fix', 'дискорд не работает', 'ютуб замедление', 'youtube fix',
        'гудбай дпи', 'goodbyedpi', 'антизапрет', 'как зайти в роблокс', 'не работает роблокс', 'roblox ошибка',
        'voice chat roblox russia', 'roblox vng', 'warp', 'cloudflare'
    ],
    authors: [{ name: 'BADAZZRED' }],
    viewport: 'width=device-width, initial-scale=1',
    creator: 'BADAZZRED',
    openGraph: {
        title: 'Roblox Bypass Hub — Рабочий обход 2026',
        description: 'Почини Роблокс, Дискорд и Ютуб в один клик. Бесплатные утилиты и гайды.',
        url: 'https://robloxzapret.vercel.app',
        siteName: 'Roblox Bypass Hub',
        locale: 'ru_RU',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        // Добавьте свои коды верификации здесь или в Vercel Env Vars
        google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
        yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
            <body className="text-slate-900 antialiased selection:bg-red-100 selection:text-red-600">
                {children}
            </body>
        </html>
    );
}
