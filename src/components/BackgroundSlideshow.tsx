/*
  JSのuseStateやuseEffectに依存せず、CSSアニメーションだけで
  スライドショーを実現。Hydration Mismatchを根本から回避する設計。
  Server Componentとして実装することで、SSG/SSRでも安全に動作する。
*/
import styles from './BackgroundSlideshow.module.css';

// スライドショーに使う画像一覧
// この配列に画像URLを追加・変更するだけで管理できる
const SLIDE_IMAGES = [
  'https://static.wixstatic.com/media/024420_676aca28495643239364f485bd84f562~mv2.png',
  'https://static.wixstatic.com/media/024420_7ea89d216aa14a4ba00bd7b4510f01e5~mv2.png',
  'https://static.wixstatic.com/media/024420_3433480a4d174c338dc6a02185d1b1f7~mv2.png',
  'https://static.wixstatic.com/media/024420_ed501ab3cdb44d99b966480accc687e1~mv2.png',
  'https://static.wixstatic.com/media/024420_1b6f4af4579041deb8a5d5a89cf95267~mv2.png',
];

// Server Componentとして実装（'use client'不要）
export default function BackgroundSlideshow() {
  return (
    <div className={styles.slideshowWrapper} aria-hidden="true">
      {SLIDE_IMAGES.map((imageUrl, index) => (
        <div
          key={index}
          className={styles.slide}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      ))}
      {/* 夜の都会の雰囲気を足すグラデーションオーバーレイ */}
      <div className={styles.colorOverlay} />
    </div>
  );
}
