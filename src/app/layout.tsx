import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'AyahuyA - 3D Modeler Portfolio',
  description: 'VRChat向けの高品質な3Dモデル・ワールド制作。深海と都会の静寂を感じる空間構築。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main style={{ minHeight: 'calc(100vh - 70px - 100px)', paddingTop: '70px' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
