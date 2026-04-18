import styles from './gallery.module.css';
import { getPortfolioData } from '@/lib/cms';
import { Metadata } from 'next';
import GalleryGrid from './GalleryGrid';

export const metadata: Metadata = {
  title: 'Gallery | AyahuyA',
};

export default async function Gallery() {
  const data = await getPortfolioData();

  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} text-gradient animate-fade-in`}>Gallery</h1>
      <GalleryGrid works={data.works} />
    </div>
  );
}
