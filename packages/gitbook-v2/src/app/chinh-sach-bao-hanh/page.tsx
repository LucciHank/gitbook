"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../docs/styles.module.css';
import SearchModal from '../components/SearchModal';
import NavigationButtons from '../components/NavigationButtons';
import MobileMenu from '../components/MobileMenu';
import Sidebar from '../components/Sidebar';
import TableOfContents from '../components/TableOfContents';

export default function ChinhSachBaoHanhPage() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openSearchModal = () => {
    setSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setSearchModalOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Cấu hình điều hướng
  const lastUpdated = "15/08/2023";
  
  const prevPage = {
    title: "Hướng dẫn cài đặt",
    url: "/huong-dan-cai-dat"
  };
  
  const nextPage = {
    title: "Quy trình bảo hành",
    url: "/chinh-sach-bao-hanh/quy-trinh-bao-hanh"
  };

  // Mục lục
  const tocItems = [
    { id: "gioi-thieu", title: "Giới thiệu", level: 2 },
    { id: "chinh-sach", title: "Chính sách bảo hành", level: 2 },
    { id: "thoi-gian", title: "Thời gian bảo hành", level: 2 },
    { id: "huong-dan", title: "Hướng dẫn chi tiết", level: 2 }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoAndToggle}>
            <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className={styles.logo}>
              <Link href="/">
                <span>TomOi.vn</span>
              </Link>
            </div>
          </div>
          <div className={styles.searchButton} onClick={openSearchModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Tìm kiếm</span>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={toggleMobileMenu} />

      <div className={styles['content-wrapper']}>
        <aside className={styles.sidebar}>
          <Sidebar />
        </aside>

        <main className={styles['main-content']}>
          <div className={styles['main-container']}>
            <div className={styles['content']}>
              <h1>Chính sách bảo hành tại TomOi.vn</h1>

              <TableOfContents items={tocItems} />

              <section id="gioi-thieu">
                <h2>Giới thiệu</h2>
                <p>TomOi.vn cam kết cung cấp dịch vụ bảo hành chuyên nghiệp, nhanh chóng và minh bạch nhất cho tất cả các sản phẩm tài khoản Premium. Chính sách bảo hành được xây dựng nhằm bảo vệ tối đa quyền lợi và mang đến sự hài lòng tuyệt đối cho khách hàng.</p>
              </section>

              <section id="chinh-sach">
                <h2>Chính sách bảo hành</h2>
                <p>TomOi.vn cam kết cung cấp dịch vụ bảo hành chuyên nghiệp, nhanh chóng và minh bạch nhất cho tất cả các sản phẩm tài khoản Premium. Chính sách bảo hành được xây dựng nhằm bảo vệ tối đa quyền lợi và mang đến sự hài lòng tuyệt đối cho khách hàng.</p>
                <p>Để tìm hiểu chi tiết về quy trình bảo hành, vui lòng truy cập <Link href="/chinh-sach-bao-hanh/quy-trinh-bao-hanh">Quy trình bảo hành</Link>.</p>
              </section>

              <section id="thoi-gian">
                <h2>Thời gian bảo hành</h2>
                <p>Thời gian bảo hành tại TomOi.vn được xác định cụ thể và rõ ràng dựa trên gói sản phẩm khách hàng lựa chọn, như sau:</p>
                <ul>
                  <li>Sản phẩm 1 tháng: Bảo hành đầy đủ 30 ngày (kể từ ngày kích hoạt sản phẩm).</li>
                  <li>Sản phẩm 2 tháng: Bảo hành đầy đủ 60 ngày (kể từ ngày kích hoạt sản phẩm).</li>
                  <li>Sản phẩm 3 tháng: Bảo hành đầy đủ 90 ngày (kể từ ngày kích hoạt sản phẩm).</li>
                  <li>Sản phẩm 6 tháng: Bảo hành đầy đủ 180 ngày (kể từ ngày kích hoạt sản phẩm).</li>
                  <li>Sản phẩm 12 tháng: Bảo hành đầy đủ 365 ngày (kể từ ngày kích hoạt sản phẩm).</li>
                </ul>
              </section>

              <section id="huong-dan">
                <h2>Hướng dẫn chi tiết</h2>
                <p>Để hiểu rõ hơn về chính sách bảo hành của TomOi.vn, vui lòng tham khảo các hướng dẫn chi tiết sau:</p>
                <ul>
                  <li><Link href="/chinh-sach-bao-hanh/quy-trinh-bao-hanh">Quy trình bảo hành</Link> - Hướng dẫn từng bước về quy trình bảo hành</li>
                  <li><Link href="/chinh-sach-bao-hanh/chinh-sach-hoan-tien">Chính sách hoàn tiền</Link> - Quy định về hoàn tiền khi không thể bảo hành</li>
                  <li><Link href="/chinh-sach-bao-hanh/lien-he-ho-tro">Liên hệ và hỗ trợ bảo hành</Link> - Thông tin liên hệ để được hỗ trợ bảo hành</li>
                </ul>
              </section>

              <div className={styles.lastUpdated}>
                <p>Cập nhật lần cuối: {lastUpdated}</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className={styles.footer}>
        <NavigationButtons 
          prevPage={prevPage}
          nextPage={nextPage}
        />
        <p className={styles.lastUpdated}>Cập nhật lần cuối: {lastUpdated}</p>
      </footer>

      <SearchModal isOpen={searchModalOpen} onClose={closeSearchModal} />
    </div>
  );
} 