import styles from './page.module.css';
import Link from 'next/link';
import { getPortfolioData } from '@/lib/cms';

export default async function Home() {
  const data = await getPortfolioData();
  const latestWorks = data.works.slice(0, 3); // Get first 3

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`glass-container ${styles.heroCard} animate-fade-in delay-200`}>
          <h1 className={`${styles.title} text-gradient`}>
            {data.site.title.split(' - ')[0]}
          </h1>
          <p className={styles.tagline}>{data.site.tagline}</p>
          <p className={styles.heroDesc}>
            {data.site.description}
          </p>
          <div className={styles.heroButtons}>
             <Link href="/gallery" className={styles.ctaButton}>
               View Works
             </Link>
             <Link href="/contact" className={`${styles.ctaButton} ${styles.primaryButton}`}>
               Contact
             </Link>
          </div>
        </div>
      </section>

      {/* Latest Works Section */}
      <section className={styles.latestWorksSection}>
         <div className={styles.sectionHeader}>
           <h2 className={`${styles.sectionTitle} text-gradient`}>Latest Works</h2>
           <Link href="/gallery" className={styles.viewAllLink}>View All Works →</Link>
         </div>
         <div className={styles.worksGrid}>
           {latestWorks.map((work) => (
             <Link href="/gallery" key={work.id} className={`glass-container hover-glow ${styles.workCard}`}>
               <div className={styles.workImageWrapper}>
                 <img src={work.imageUrl} alt={work.title} className={styles.workImage} />
               </div>
               <div className={styles.workCardContent}>
                 <h3>{work.title}</h3>
                 <span className={styles.category}>{work.category}</span>
               </div>
             </Link>
           ))}
         </div>
      </section>

      {/* Contact CTA Section */}
      <section className={styles.ctaSection}>
        <div className={`glass-container ${styles.ctaContainer}`}>
          <h2 className={`text-gradient ${styles.sectionTitle}`}>Ready to create together?</h2>
          <p>
            VRChat向けのワールド制作やアバターアクセサリーのご依頼を承っております。<br/>
            お気軽にご相談ください。
          </p>
          <Link href="/contact" className={`${styles.ctaButton} ${styles.primaryButton} ${styles.largeButton}`}>
            Contact Me ✉️
          </Link>
        </div>
      </section>
    </div>
  );
}
