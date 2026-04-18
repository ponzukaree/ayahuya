'use client';

import { useState, useEffect } from 'react';

// スライドショーに使う画像一覧
// この配列を変えるだけで表示する画像を管理できる
const SLIDE_IMAGES = [
  'https://static.wixstatic.com/media/024420_676aca28495643239364f485bd84f562~mv2.png',
  'https://static.wixstatic.com/media/024420_7ea89d216aa14a4ba00bd7b4510f01e5~mv2.png',
  'https://static.wixstatic.com/media/024420_3433480a4d174c338dc6a02185d1b1f7~mv2.png',
  'https://static.wixstatic.com/media/024420_ed501ab3cdb44d99b966480accc687e1~mv2.png',
  'https://static.wixstatic.com/media/024420_1b6f4af4579041deb8a5d5a89cf95267~mv2.png',
];

// 各画像の表示時間（ミリ秒）
const SLIDE_INTERVAL_MS = 6000;

export default function BackgroundSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      // フェードアウト開始
      setIsFading(true);

      setTimeout(() => {
        // 画像を切り替えてフェードイン
        setCurrentIndex((prev) => (prev + 1) % SLIDE_IMAGES.length);
        setNextIndex((prev) => (prev + 1) % SLIDE_IMAGES.length);
        setIsFading(false);
      }, 1000); // 1秒かけてクロスフェード
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <div aria-hidden="true" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      // コンテンツより必ず背面に置く
      zIndex: -1,
      overflow: 'hidden',
    }}>
      {/* 現在の背景画像 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${SLIDE_IMAGES[currentIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(8px) brightness(0.25)',
        // 画像のブラー処理でエッジに白線が出るのを防ぐためスケールを少し大きくする
        transform: 'scale(1.05)',
        transition: 'opacity 1s ease-in-out',
        opacity: isFading ? 0 : 1,
      }} />

      {/* 次の背景画像（クロスフェード用に重ねておく） */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${SLIDE_IMAGES[nextIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(8px) brightness(0.25)',
        transform: 'scale(1.05)',
        transition: 'opacity 1s ease-in-out',
        opacity: isFading ? 1 : 0,
      }} />

      {/* 夜の都会の空気感を足すグラデーションオーバーレイ */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(circle at 15% 50%, rgba(58, 123, 213, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 85% 30%, rgba(58, 123, 213, 0.08) 0%, transparent 50%),
          linear-gradient(to bottom, rgba(3, 8, 22, 0.3) 0%, rgba(3, 8, 22, 0.5) 100%)
        `,
      }} />
    </div>
  );
}
