import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'Gestão Simples - ERP para ME, MEI e EPP',
  description: 'Sistema completo de gestão empresarial para Microempresas, Microempreendedores Individuais e Empresas de Pequeno Porte.',
  keywords: 'gestão, erp, me, mei, epp, sistema, empresarial, financeiro, estoque, vendas',
  authors: [{ name: 'Gestão Simples' }],
  creator: 'Gestão Simples',
  publisher: 'Gestão Simples',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://gestaosimples.com.br',
    title: 'Gestão Simples - ERP para ME, MEI e EPP',
    description: 'Sistema completo de gestão empresarial para Microempresas, Microempreendedores Individuais e Empresas de Pequeno Porte.',
    siteName: 'Gestão Simples',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gestão Simples - ERP para ME, MEI e EPP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gestão Simples - ERP para ME, MEI e EPP',
    description: 'Sistema completo de gestão empresarial para Microempresas, Microempreendedores Individuais e Empresas de Pequeno Porte.',
    creator: '@gestaosimples',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
