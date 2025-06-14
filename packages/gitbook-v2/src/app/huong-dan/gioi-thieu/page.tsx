"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../docs/styles.module.css';

export default function HuongDanPage() {
  const router = useRouter();
  
  // Tạo ngày hiện tại theo định dạng DD/MM/YYYY
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();
  const lastUpdated = `${day}/${month}/${year}`;

  return (
    <div className={styles['docs-container']}>
      <header className={styles.header}>
        <div className={styles['header-content']}>
          <div className={styles.logo}>
            <Link href="/">
              <div className={styles.logoPlaceholder}>
                <span>TomOi.vn</span>
              </div>
            </Link>
            <div className={styles.helpBadge}>
              <span>Help</span>
            </div>
          </div>
          <nav className={styles.nav}>
            <ul>
              <li className={styles.searchContainer}>
                <div className={styles.searchBox}>
                  <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <span className={styles.searchPlaceholder}>Tìm kiếm...</span>
                  <span className={styles.searchShortcut}>
                    <kbd>Ctrl</kbd>
                    <kbd>K</kbd>
                  </span>
                </div>
              </li>
              <li><Link href="/">Tài liệu</Link></li>
              <li><Link href="/tutorials">Hướng dẫn</Link></li>
              <li><Link href="/api">API</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className={styles['content-wrapper']}>
        <aside className={styles.sidebar}>
          <nav className={styles['sidebar-nav']}>
            <div className={styles['sidebar-section']}>
              <h4 className={styles['sidebar-heading']}>Hướng dẫn sử dụng tài liệu</h4>
              <ul>
                <li className={styles.active}>
                  <Link href="/huong-dan/gioi-thieu">Giới thiệu</Link>
                </li>
              </ul>
            </div>
            <div className={styles['sidebar-section']}>
              <h4 className={styles['sidebar-heading']}>Giới thiệu</h4>
              <ul>
                <li>
                  <Link href="/gioi-thieu/gioi-thieu-ve-tomoivn">
                    Giới thiệu về TomOi.vn
                  </Link>
                </li>
                <li>
                  <Link href="/gioi-thieu/ly-do-mua-hang">
                    Lý do nên mua hàng tại TomOi.vn
                  </Link>
                </li>
                <li>
                  <Link href="/gioi-thieu/nen-tang-chinh-thuc">
                    Các nền tảng chính thức
                  </Link>
                </li>
                <li>
                  <Link href="/gioi-thieu/tong-quan-website">Tổng quan website</Link>
                </li>
                <li>
                  <Link href="/gioi-thieu/dieu-khoan-dich-vu">Điều khoản dịch vụ</Link>
                </li>
                <li>
                  <Link href="/gioi-thieu/chinh-sach-bao-mat">Chính sách bảo mật</Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        <main className={styles['main-content']}>
          <div className={styles['content-header']}>
            <h1>Hướng dẫn sử dụng Tài liệu hỗ trợ TomOi.vn</h1>
            <div className={styles.breadcrumbs}>
              <Link href="/">Trang chủ</Link> <span>/</span> <span>Hướng dẫn sử dụng tài liệu</span>
            </div>
          </div>
          
          <div className={styles.content}>
            <div className={styles.contentCard}>
              <p className={styles['intro-text']}>
                Chào mừng bạn đến với trang tài liệu hướng dẫn sử dụng dịch vụ tại TomOi.vn. Đây là nguồn thông tin đầy đủ, dễ hiểu và được cập nhật liên tục để giúp bạn trải nghiệm các dịch vụ tại TomOi.vn một cách thuận tiện và nhanh chóng nhất.
              </p>
              
              <section className={styles.section} id="gioi-thieu-chung">
                <h2>Giới thiệu chung</h2>
                <p>
                  Tại trang hướng dẫn này, bạn sẽ tìm thấy các bước hướng dẫn chi tiết từ cơ bản đến nâng cao, nhằm giúp bạn dễ dàng thực hiện các thao tác như:
                </p>
                <ul>
                  <li>
                    <div className={styles.featureBlock}>
                      <h3>
                        <span className={styles.icon}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </span>
                        Tạo và quản lý tài khoản
                      </h3>
                      <p>Hướng dẫn chi tiết về cách đăng ký, đăng nhập và quản lý thông tin cá nhân trên TomOi.vn.</p>
                    </div>
                  </li>
                  <li>
                    <div className={styles.featureBlock}>
                      <h3>
                        <span className={styles.icon}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                            <line x1="8" y1="21" x2="16" y2="21"></line>
                            <line x1="12" y1="17" x2="12" y2="21"></line>
                          </svg>
                        </span>
                        Cài đặt và sử dụng sản phẩm dịch vụ
                      </h3>
                      <p>Hướng dẫn chi tiết về cách kích hoạt, cài đặt và sử dụng các sản phẩm dịch vụ của TomOi.vn.</p>
                    </div>
                  </li>
                </ul>
              </section>

              <div className={styles.lastUpdated}>
                <p>Cập nhật lần cuối: {lastUpdated}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 