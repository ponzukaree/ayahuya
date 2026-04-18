import styles from './contact.module.css';
import { getPortfolioData } from '@/lib/cms';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | AyahuyA',
};

export default async function Contact() {
  const data = await getPortfolioData();

  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} text-gradient animate-fade-in`}>Contact</h1>
      
      <div className={`glass-container ${styles.contactCard} animate-fade-in delay-200`}>
        <p className={styles.message}>
          {data.contact.message}
        </p>

        <div className={styles.links}>
          <a 
            href={`mailto:${data.contact.email}`} 
            className={`${styles.linkButton} ${styles.email}`}
          >
            <span>✉️</span> メールでご相談
          </a>
          <a 
            href={data.contact.twitter} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`${styles.linkButton} ${styles.twitter}`}
          >
            <span>𝕏</span> X (Twitter)でDMを送る
          </a>
          <a 
            href={data.contact.booth} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`${styles.linkButton} ${styles.booth}`}
          >
            <span>🛍️</span> BOOTHでメッセージを送る
          </a>
        </div>
      </div>
    </div>
  );
}
