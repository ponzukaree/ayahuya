/*
  CMS（content.json）のギャラリーデータからすべての画像を自動収集し
  スライドショーにする。作品を追加・変更すれば背景も自動的に更新される。
  Server Componentとして動作するため、Hydration Mismatchの心配がない。
*/
import styles from './BackgroundSlideshow.module.css';
import { getPortfolioData } from '@/lib/cms';

export default async function BackgroundSlideshow() {
  const data = await getPortfolioData();

  // 全作品から画像URLをフラットに収集する
  // imagesが設定されていればそれを、なければサムネイル(imageUrl)を使う
  const allImages = data.works.flatMap((work) => {
    if (work.images && work.images.length > 0) {
      return work.images;
    }
    return [work.imageUrl];
  });

  // CSSアニメーションの周期を画像枚数に合わせて計算
  // スライド1枚あたり15秒で計算し、delayも動的に設定
  const slideIntervalSeconds = 15;
  const totalDurationSeconds = allImages.length * slideIntervalSeconds;

  return (
    <div className={styles.slideshowWrapper} aria-hidden="true">
      {allImages.map((imageUrl, index) => (
        <div
          key={index}
          className={styles.slide}
          style={{
            backgroundImage: `url(${imageUrl})`,
            // 枚数に合わせてアニメーション周期とdelayを動的に設定
            animationDuration: `${totalDurationSeconds}s`,
            animationDelay: `${index * slideIntervalSeconds}s`,
          }}
        />
      ))}
      <div className={styles.colorOverlay} />
    </div>
  );
}
