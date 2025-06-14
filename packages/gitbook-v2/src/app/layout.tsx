import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import MobileMenu from './components/MobileMenu';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  title: 'TomOi.vn - Tài liệu hướng dẫn sử dụng',
  description: 'Tài liệu hướng dẫn sử dụng chính thức từ TomOi.vn. Tìm hiểu cách sử dụng sản phẩm, chính sách bảo hành, và các thông tin hữu ích khác.',
  keywords: 'TomOi, TomOi.vn, tài liệu, hướng dẫn sử dụng, hỗ trợ, bảo hành, tài khoản premium, hướng dẫn mua hàng',
  authors: [{ name: 'TomOi.vn' }],
  creator: 'TomOi.vn',
  publisher: 'TomOi.vn',
  openGraph: {
    title: 'TomOi.vn - Tài liệu hướng dẫn sử dụng',
    description: 'Tài liệu hướng dẫn sử dụng chính thức từ TomOi.vn. Tìm hiểu cách sử dụng sản phẩm, chính sách bảo hành, và các thông tin hữu ích khác.',
    url: 'https://docs.tomoi.vn',
    siteName: 'TomOi.vn Docs',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: 'https://tomoi.vn/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TomOi.vn Documentation'
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://docs.tomoi.vn'
  },
  verification: {
    google: 'verification_token',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TomOi.vn - Tài liệu hướng dẫn sử dụng',
    description: 'Tài liệu hướng dẫn sử dụng chính thức từ TomOi.vn',
    images: ['https://tomoi.vn/images/twitter-image.jpg'],
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#DF2626'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 