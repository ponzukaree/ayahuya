import Link from 'next/link';
import styles from './components.module.css';
import { getPortfolioData } from '@/lib/cms';

export default async function Header() {
  const data = await getPortfolioData();

  return (
    <header className={`${styles.header} animate-fade-in delay-100`}>
      <div className={styles.logo}>
        <Link href="/" className="text-gradient">
          {data.site.title.split(' - ')[0]}
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/profile" className={styles.navLink}>Profile</Link>
        <Link href="/gallery" className={styles.navLink}>Gallery</Link>
        <Link href="/contact" className={styles.navLink}>Contact</Link>
      </nav>
    </header>
  );
}
