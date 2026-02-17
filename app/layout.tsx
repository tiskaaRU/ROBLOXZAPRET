import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: {
        default: 'Roblox Bypass Hub — Почини Роблокс, Дискорд и Ютуб в РФ 2026',
        template: '%s | Roblox Bypass Hub'
    },
    description: 'Рабочий способ обхода блокировки Roblox, Discord и YouTube в России. Скачать Zapret 2026, ByeByeDPI Android. Настройка Sota VPN для низкого пинга.',
    keywords: [
        'roblox', 'роблокс', 'обход блокировки', 'zapret', 'byebyedpi', 'россия', 'vpn', 'голосовой чат',
        'разблокировать роблокс', 'как зайти в роблокс', 'не работает роблокс', 'roblox ошибка',
        'voice chat roblox russia', 'roblox vng', 'warp', 'cloudflare', 'roblox ios', 'roblox android',
        'роблокс на айфоне', 'роблокс на телефоне', 'gearup booster', 'обход на телефоне',
        'sota vpn', 'сота впн', 'discord fix', 'youtube fix', 'починить дискорд', 'починить ютуб',
        'низкий пинг', 'low ping vpn', 'бесплатный впн', 'free vpn roblox'
    ],
    authors: [{ name: 'BADAZZRED' }],
    creator: 'BADAZZRED',
    openGraph: {
        title: 'Roblox Bypass Hub — Рабочий обход 2026 (Roblox, Discord, YouTube)',
        description: 'Почини Роблокс, Дискорд и Ютуб в один клик. Бесплатные утилиты Zapret/ByeByeDPI и быстрый Sota VPN.',
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

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

import { Analytics } from "@vercel/analytics/react"

// ... imports remain the same ...

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
            <body className="text-slate-900 antialiased selection:bg-red-100 selection:text-red-600">
                {children}
                <Analytics />
            </body>
        </html>
    );
}
