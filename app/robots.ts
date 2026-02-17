import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/system-core-v7/', '/api/'], // Hide admin and api
        },
        sitemap: 'https://robloxzapret.vercel.app/sitemap.xml',
    };
}
