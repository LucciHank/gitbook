"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './docs/styles.module.css';
import SearchModal from './components/SearchModal';
import NavigationButtons from './components/NavigationButtons';
import MobileMenu from './components/MobileMenu';
import Sidebar from './components/Sidebar';

export default function HomePage() {
  const router = useRouter();
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
    title: "Hướng dẫn cài đặt và sử dụng",
    url: "/huong-dan-cai-dat"
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
            <h1>Hướng dẫn nhanh</h1>
            <div className={styles.breadcrumbs}>
              <Link href="/">Trang chủ</Link> <span>/</span> <span>Hướng dẫn sử dụng tài liệu</span> <span>/</span> <span>Hướng dẫn nhanh</span>
            </div>
          </div>
          
          <div className={styles.content}>
            <div className={styles.contentCard}>
              <p className={styles['intro-text']}>
                Chào mừng bạn đến với tài liệu hướng dẫn của TomOi.vn! Trang này cung cấp tổng quan về cách sử dụng tài liệu và tìm kiếm thông tin bạn cần.
              </p>
              
              <section className={styles.section} id="tim-kiem">
                <h2>Tìm kiếm thông tin</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <p>Bạn có thể tìm kiếm thông tin trong tài liệu này bằng nhiều cách:</p>
                    
                    <ul>
                      <li><strong>Thanh tìm kiếm:</strong> Sử dụng thanh tìm kiếm ở góc trên bên phải hoặc nhấn <kbd>Ctrl</kbd> + <kbd>K</kbd> để mở hộp tìm kiếm.</li>
                      <li><strong>Menu bên trái:</strong> Duyệt qua các danh mục và trang trong menu điều hướng bên trái.</li>
                      <li><strong>Mục lục:</strong> Sử dụng mục lục bên phải để di chuyển đến các phần cụ thể trong trang hiện tại.</li>
                    </ul>
                    
                    <div className={styles.infoBox}>
                      <div className={styles.infoIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                      </div>
                      <div className={styles.infoContent}>
                        <p>Bạn cũng có thể sử dụng phím tắt <kbd>Ctrl</kbd> + <kbd>K</kbd> để mở hộp tìm kiếm từ bất kỳ trang nào.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="cau-truc">
                <h2>Cấu trúc tài liệu</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <p>Tài liệu được tổ chức thành các phần chính sau:</p>
                    
                    <ul>
                      <li><strong>Giới thiệu:</strong> Thông tin tổng quan về TomOi.vn và các dịch vụ.</li>
                      <li><strong>Hướng dẫn mua hàng:</strong> Các hướng dẫn chi tiết về quy trình mua hàng, thanh toán và quản lý tài khoản.</li>
                      <li><strong>Hướng dẫn cài đặt và sử dụng:</strong> Hướng dẫn cài đặt và sử dụng các sản phẩm.</li>
                      <li><strong>Chính sách bảo hành:</strong> Thông tin về chính sách bảo hành và hỗ trợ.</li>
                      <li><strong>Ưu đãi:</strong> Thông tin về các chương trình khuyến mãi và ưu đãi.</li>
                      <li><strong>Câu hỏi thường gặp:</strong> Giải đáp các câu hỏi phổ biến.</li>
                      <li><strong>Hướng dẫn khác:</strong> Các hướng dẫn bổ sung khác.</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="ho-tro">
                <h2>Hỗ trợ thêm</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <p>Nếu bạn không tìm thấy thông tin cần thiết trong tài liệu này, vui lòng liên hệ với chúng tôi qua:</p>
                    
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
                        <p>Đội ngũ hỗ trợ của chúng tôi sẽ phản hồi trong vòng 5-10 phút kể từ khi nhận được yêu cầu của bạn.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className={styles.lastUpdated}>
                <p>Cập nhật lần cuối: {lastUpdated}</p>
              </div>
              
              <div className={styles.navigationWrapper}>
                <NavigationButtons 
                  nextPage={{
                    title: "Giới thiệu về TomOi.vn",
                    url: "/gioi-thieu/gioi-thieu-ve-tomoivn"
                  }}
                />
              </div>
            </div>
          </div>
        </main>
        
        <aside className={styles.tableOfContents}>
          <div className={styles.tocTitle}>Mục lục</div>
          <ul className={styles.tocList}>
            <li className={styles.tocItem}>
              <a 
                href="#tim-kiem" 
                className={activeSection === "tim-kiem" ? styles.active : ""}
              >
                Tìm kiếm thông tin
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#cau-truc" 
                className={activeSection === "cau-truc" ? styles.active : ""}
              >
                Cấu trúc tài liệu
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#ho-tro" 
                className={activeSection === "ho-tro" ? styles.active : ""}
              >
                Hỗ trợ thêm
              </a>
            </li>
          </ul>
        </aside>
      </div>

      <footer className={styles.footer}>
        <p className={styles.lastUpdated}>Cập nhật lần cuối: {lastUpdated}</p>
      </footer>

      <SearchModal isOpen={searchModalOpen} onClose={closeSearchModal} />
    </div>
  );
} 