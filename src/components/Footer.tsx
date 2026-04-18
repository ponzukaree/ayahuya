import styles from './components.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={`${styles.footer} animate-fade-in delay-300`}>
      <p>&copy; {year} AyahuyA. All rights reserved.</p>
    </footer>
  );
}
