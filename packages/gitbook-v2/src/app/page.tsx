"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Chuyển hướng đến trang giới thiệu
    router.push('/gioi-thieu');
  }, [router]);

  return (
    <main className={styles.main}>
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Đang tải trang TomOi.vn...</p>
      </div>
    </main>
  );
} 