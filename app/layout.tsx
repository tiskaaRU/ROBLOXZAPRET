import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Roblox Bypass Hub — Обход блокировки Роблокс в России 2025',
    description: 'Бесплатные инструкции по обходу блокировки Roblox в России. Zapret, ByeByeDPI, VPN для голосового чата. Работающие методы 2025 года.',
    keywords: 'roblox, роблокс, обход блокировки, zapret, byebyedpi, россия, vpn, голосовой чат, разблокировать роблокс',
    authors: [{ name: 'BADAZZRED' }],
    openGraph: {
        title: 'Roblox Bypass Hub — Обход блокировки Роблокс',
        description: 'Бесплатные инструкции по обходу блокировки Roblox в России. Работающие методы 2025.',
        type: 'website',
        locale: 'ru_RU',
        siteName: 'Roblox Bypass Hub',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Roblox Bypass Hub',
        description: 'Обход блокировки Roblox в России — бесплатные инструкции',
    },
    robots: {
        index: true,
        follow: true,
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
