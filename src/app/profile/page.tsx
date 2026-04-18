import styles from './profile.module.css';
import { getPortfolioData } from '@/lib/cms';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile | AyahuyA',
};

export default async function Profile() {
  const data = await getPortfolioData();
  const { profile } = data;

  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} text-gradient animate-fade-in`}>Profile</h1>
      
      <div className={`glass-container ${styles.profileCard} animate-fade-in delay-200`}>
        <div className={styles.header}>
          <img src={profile.imageUrl} alt={profile.name} className={styles.profileImage} />
          <h2 className={styles.name}>{profile.name}</h2>
          <span className={styles.role}>{profile.role}</span>
        </div>
        
        <div className={styles.bio}>
          <p>{profile.bio}</p>
        </div>

        <div className={styles.skillsArea}>
          <h3 className={styles.skillsTitle}>Skills & Tools</h3>
          <ul className={styles.skillsList}>
            {profile.skills.map((skill) => (
              <li key={skill} className={styles.skillItem}>
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {profile.history && profile.history.length > 0 && (
          <div className={styles.historyArea}>
            <h3 className={styles.skillsTitle}>Works & History</h3>
            <ul className={styles.historyList}>
              {profile.history.map((item, i) => (
                <li key={i} className={styles.historyItem}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
