"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Chuyển hướng đến trang giới thiệu sau 2 giây
    const redirectTimer = setTimeout(() => {
      router.push('/gioi-thieu');
    }, 2000);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logo}>TomOi.vn</div>
        <h1 className={styles.title}>Tài liệu hướng dẫn TomOi.vn</h1>
        <p className={styles.description}>
          Chào mừng bạn đến với trang tài liệu hướng dẫn của TomOi.vn
        </p>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Đang chuyển hướng đến trang tài liệu...</p>
        </div>
        <div className={styles.links}>
          <Link href="/gioi-thieu" className={styles.link}>
            Đi đến trang tài liệu ngay
          </Link>
        </div>
      </div>
    </main>
  );
} 