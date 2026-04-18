import { getPortfolioData } from '@/lib/cms';
import styles from './detail.module.css';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const data = await getPortfolioData();
  return data.works.map((work) => ({
    id: work.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const data = await getPortfolioData();
  const work = data.works.find(w => w.id === params.id);
  if (!work) return { title: 'Not Found' };
  
  return {
    title: `${work.title} | AyahuyA`,
  };
}

export default async function GalleryDetail({ params }: { params: { id: string } }) {
  const data = await getPortfolioData();
  const work = data.works.find((w) => w.id === params.id);

  if (!work) {
    notFound();
  }

  // 表示する画像のリスト（詳細画像がない場合はサムネイルのみ）
  const imagesToShow = work.images && work.images.length > 0 ? work.images : [work.imageUrl];

  return (
    <div className={styles.container}>
      <Link href="/gallery" className={styles.backButton}>
        ← Galleryに戻る
      </Link>

      <div className={`glass-container ${styles.detailCard} animate-fade-in`}>
        <div className={styles.header}>
          <span className={styles.category}>{work.category}</span>
          <h1 className={`${styles.title} text-gradient`}>{work.title}</h1>
          <p className={styles.description}>{work.description}</p>
          
          <a 
            href={work.boothUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.boothButton}
          >
            BOOTHで販売情報を確認する
          </a>
        </div>

        <div className={styles.imagesGrid}>
          {imagesToShow.map((img, i) => (
            <div key={i} className={styles.imageWrapper}>
              <img src={img} alt={`${work.title} - ${i + 1}`} className={styles.image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
