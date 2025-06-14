"use client";

import React from 'react';
import Link from 'next/link';
import styles from '../docs/styles.module.css';

interface NavigationButtonsProps {
  prevPage?: {
    title: string;
    url: string;
  };
  nextPage?: {
    title: string;
    url: string;
  };
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ prevPage, nextPage }) => {
  return (
    <div className={styles.navigationButtons}>
      {prevPage && prevPage.url ? (
        <Link href={prevPage.url} className={styles.navButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>{prevPage.title}</span>
        </Link>
      ) : (
        <div className={`${styles.navButton} ${styles.disabled}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Trang trước</span>
        </div>
      )}
      
      {nextPage && nextPage.url ? (
        <Link href={nextPage.url} className={styles.navButton}>
          <span>{nextPage.title}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      ) : (
        <div className={`${styles.navButton} ${styles.disabled}`}>
          <span>Trang sau</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      )}
    </div>
  );
};

export default NavigationButtons; 