"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../docs/styles.module.css';
import SearchModal from '../components/SearchModal';
import NavigationButtons from '../components/NavigationButtons';
import MobileMenu from '../components/MobileMenu';
import Sidebar from '../components/Sidebar';

export default function HuongDanCaiDatPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  
  // Tạo ngày hiện tại theo định dạng DD/MM/YYYY
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();
  const lastUpdated = `${day}/${month}/${year}`;

  // Cấu hình điều hướng
  const nextPage = {
    title: "Chính sách bảo hành",
    path: "/chinh-sach-bao-hanh"
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('h2[id], h3[id]');
      let currentSection = "";
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < 150) {
          currentSection = section.getAttribute('id') || "";
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Xử lý phím tắt Ctrl + K để mở modal tìm kiếm
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openSearchModal = () => {
    setSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setSearchModalOpen(false);
  };

  return (
    <div className={styles['docs-container']}>
      <header className={styles.header}>
        <div className={styles['header-content']}>
          <div className={styles.logo}>
            <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
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
                <div className={styles.searchBox} onClick={openSearchModal}>
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
              <li><Link href="/">Mua hàng</Link></li>
              <li><Link href="/tutorials">Tools</Link></li>
              <li><Link href="/api">Tin tức</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={toggleMobileMenu} />

      <div className={styles['content-wrapper']}>
        <aside className={styles.sidebar}>
          <Sidebar />
        </aside>

        <main className={styles['main-content']}>
          <div className={styles['content-header']}>
            <h1>Hướng dẫn cài đặt và sử dụng sản phẩm</h1>
            <div className={styles.breadcrumbs}>
              <Link href="/">Trang chủ</Link> <span>/</span> <span>Hướng dẫn cài đặt và sử dụng</span>
            </div>
          </div>
          
          <div className={styles.content}>
            <div className={styles.contentCard}>
              <p className={styles['intro-text']}>
                Trang này cung cấp hướng dẫn chi tiết về cách cài đặt và sử dụng các sản phẩm của TomOi.vn. Vui lòng chọn loại sản phẩm từ danh sách bên dưới để xem hướng dẫn cụ thể.
              </p>
              
              <section className={styles.section} id="tong-quan">
                <h2>Tổng quan về hướng dẫn cài đặt</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <p>Tại TomOi.vn, chúng tôi cung cấp nhiều loại sản phẩm số khác nhau, mỗi loại đều có quy trình cài đặt và sử dụng riêng. Trang này sẽ giúp bạn tìm hiểu cách cài đặt và sử dụng sản phẩm một cách hiệu quả nhất.</p>
                    
                    <div className={styles.infoBox}>
                      <div className={styles.infoIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                      </div>
                      <div className={styles.infoContent}>
                        <p><strong>Lưu ý quan trọng:</strong></p>
                        <p>Mỗi sản phẩm sẽ có hướng dẫn cài đặt riêng. Vui lòng đọc kỹ hướng dẫn trước khi tiến hành cài đặt để đảm bảo quá trình diễn ra suôn sẻ.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="phan-loai">
                <h2>Phân loại sản phẩm</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <p>Sản phẩm tại TomOi.vn được phân loại thành các nhóm chính sau:</p>
                    
                    <ul>
                      <li><strong>Phần mềm bản quyền:</strong> Office, Windows, Adobe, Antivirus...</li>
                      <li><strong>Tài khoản Premium:</strong> Netflix, Spotify, YouTube Premium...</li>
                      <li><strong>Khóa học trực tuyến:</strong> Các khóa học từ các nền tảng giáo dục hàng đầu</li>
                      <li><strong>Dịch vụ số khác:</strong> VPN, lưu trữ đám mây, công cụ thiết kế...</li>
                    </ul>
                    
                    <p>Mỗi loại sản phẩm sẽ có quy trình cài đặt và kích hoạt khác nhau. Vui lòng chọn loại sản phẩm phù hợp để xem hướng dẫn chi tiết.</p>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="ho-tro">
                <h2>Hỗ trợ kỹ thuật</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <p>Nếu bạn gặp khó khăn trong quá trình cài đặt hoặc sử dụng sản phẩm, vui lòng liên hệ với đội ngũ hỗ trợ kỹ thuật của chúng tôi qua:</p>
                    
                    <ul>
                      <li><strong>Hotline:</strong> 1900 xxxx</li>
                      <li><strong>Email:</strong> support@tomoi.vn</li>
                      <li><strong>Live Chat:</strong> Có sẵn trên website từ 8:00 - 22:00 hàng ngày</li>
                    </ul>
                    
                    <div className={styles.alertBox}>
                      <div className={styles.alertIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                          <line x1="12" y1="9" x2="12" y2="13"></line>
                          <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                      </div>
                      <div className={styles.alertContent}>
                        <p>Đội ngũ hỗ trợ kỹ thuật của chúng tôi sẽ phản hồi trong vòng 5-10 phút kể từ khi nhận được yêu cầu của bạn.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className={styles.lastUpdated}>
                <p>Cập nhật lần cuối: {lastUpdated}</p>
              </div>
            </div>
          </div>
        </main>
        
        <aside className={styles.tableOfContents}>
          <div className={styles.tocTitle}>Mục lục</div>
          <ul className={styles.tocList}>
            <li className={styles.tocItem}>
              <a 
                href="#tong-quan" 
                className={`${styles.tocLink} ${activeSection === "tong-quan" ? styles.tocLinkActive : ""}`}
              >
                Tổng quan về hướng dẫn cài đặt
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#phan-loai" 
                className={`${styles.tocLink} ${activeSection === "phan-loai" ? styles.tocLinkActive : ""}`}
              >
                Phân loại sản phẩm
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#ho-tro" 
                className={`${styles.tocLink} ${activeSection === "ho-tro" ? styles.tocLinkActive : ""}`}
              >
                Hỗ trợ kỹ thuật
              </a>
            </li>
          </ul>
        </aside>
      </div>

      <SearchModal isOpen={searchModalOpen} onClose={closeSearchModal} />

      <footer className={styles.footer}>
        <NavigationButtons 
          prevPage={{
            title: "Hướng dẫn nhanh",
            url: "/"
          }}
          nextPage={{
            title: "Chính sách bảo hành",
            url: "/chinh-sach-bao-hanh"
          }}
        />
        <p className={styles.lastUpdated}>Cập nhật lần cuối: {lastUpdated}</p>
      </footer>
    </div>
  );
} 