'use client';

import { useState, useEffect } from 'react';
import styles from './gallery.module.css';
import { WorkInfo } from '@/lib/cms';

export default function GalleryGrid({ works }: { works: WorkInfo[] }) {
  const [selectedWork, setSelectedWork] = useState<WorkInfo | null>(null);

  const openModal = (work: WorkInfo) => {
    setSelectedWork(work);
    // モーダルが開いている時は背面のスクロールを禁止する
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setSelectedWork(null);
    document.body.style.overflow = 'unset';
  };

  // 念のため、コンポーネントがアンマウントされた際にスクロールを元に戻す
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <div className={styles.grid}>
        {works.map((work, index) => (
          <div 
            key={work.id} 
            className={`glass-container hover-glow ${styles.card} animate-fade-in`}
            style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
          >
            <div 
              className={styles.imageWrapper} 
              onClick={() => openModal(work)}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={work.imageUrl} 
                alt={work.title} 
                className={styles.image}
              />
              <div className={styles.imageOverlay}>
                <span>詳細を見る</span>
              </div>
            </div>
            
            <div className={styles.content}>
              <span className={styles.category}>{work.category}</span>
              <h2 className={styles.itemTitle}>{work.title}</h2>
              <p className={styles.description}>{work.description}</p>
              
              <button 
                onClick={() => openModal(work)}
                className={styles.linkButton}
                style={{ width: '100%', border: 'none', cursor: 'pointer', outline: 'none' }}
              >
                詳細を見る 
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* モーダル (Lightbox) 部分 */}
      {selectedWork && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>×</button>
            
            <div className={styles.modalInner}>
              <div className={styles.modalHeader}>
                <h2 className={`text-gradient ${styles.modalTitle}`}>{selectedWork.title}</h2>
                {/* 
                  TODO: BOOTHボタンはいったん非表示にしており、
                  後々CMS等で復活させたい場合はここに置く想定です。
                */}
              </div>
              
              <div className={styles.modalImagesGrid}>
                {selectedWork.images && selectedWork.images.length > 0 ? (
                  selectedWork.images.map((img, i) => (
                    <img key={i} src={img} alt={`${selectedWork.title} - ${i}`} className={styles.modalImage} />
                  ))
                ) : (
                  <img src={selectedWork.imageUrl} alt={selectedWork.title} className={styles.modalImage} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
