"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../../docs/styles.module.css';
import SearchModal from '../../components/SearchModal';
import NavigationButtons from '../../components/NavigationButtons';
import MobileMenu from '../../components/MobileMenu';
import Sidebar from '../../components/Sidebar';

export default function TraCuuLichSuNapTienPage() {
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
  const prevPage = {
    title: "Hướng dẫn thanh toán",
    path: "/huong-dan-mua-hang/huong-dan-thanh-toan"
  };
  
  const nextPage = {
    title: "Tra cứu lịch sử đơn hàng",
    path: "/huong-dan-mua-hang/tra-cuu-lich-su-don-hang"
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
            <h1>Hướng dẫn tra cứu lịch sử nạp tiền tại TomOi.vn</h1>
            <div className={styles.breadcrumbs}>
              <Link href="/">Trang chủ</Link> <span>/</span> <Link href="/huong-dan-mua-hang">Hướng dẫn mua hàng</Link> <span>/</span> <span>Tra cứu lịch sử nạp tiền</span>
            </div>
          </div>
          
          <div className={styles.content}>
            <div className={styles.contentCard}>
              <p className={styles['intro-text']}>
                Bài viết này hướng dẫn bạn cách tra cứu và kiểm soát chi tiết lịch sử các giao dịch nạp tiền vào tài khoản trên TomOi.vn một cách đầy đủ và dễ dàng.
              </p>
              
              <section className={styles.section} id="dang-nhap">
                <h2>Bước 1: Đăng nhập vào tài khoản</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <p>Truy cập vào website TomOi.vn và đăng nhập vào tài khoản cá nhân bằng username hoặc email đã đăng ký.</p>
                    <p>Nếu bạn chưa đăng nhập, vui lòng thực hiện đăng nhập để tiếp tục.</p>
                    
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/tra-cuu-nap-tien-1.png" alt="Đăng nhập vào tài khoản" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="truy-cap-lich-su">
                <h2>Bước 2: Truy cập vào mục "Lịch sử giao dịch"</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <p>Sau khi đăng nhập, click vào tên tài khoản của bạn ở góc trên bên phải màn hình.</p>
                    <p>Chọn mục "Lịch sử giao dịch" từ menu dropdown hiển thị.</p>
                    
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/tra-cuu-nap-tien-2.png" alt="Truy cập vào mục Lịch sử giao dịch" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="xem-chi-tiet">
                <h2>Bước 3: Xem chi tiết lịch sử nạp tiền</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <p>Trong mục "Lịch sử giao dịch", hệ thống sẽ hiển thị đầy đủ thông tin về các giao dịch đã thực hiện, bao gồm:</p>
                    
                    <ul>
                      <li><strong>Ngày và giờ nạp tiền:</strong> Thời gian chính xác khi giao dịch diễn ra.</li>
                      <li><strong>Hình thức nạp tiền:</strong> Chuyển khoản ngân hàng (OCB), thẻ cào Viettel.</li>
                      <li><strong>Số tiền nạp:</strong> Chính xác số tiền bạn đã nạp vào tài khoản.</li>
                      <li><strong>Trạng thái giao dịch:</strong> Thông báo giao dịch thành công hoặc đang chờ xử lý.</li>
                      <li><strong>Mã giao dịch:</strong> Dãy số hoặc ký tự đặc biệt giúp bạn xác minh giao dịch khi cần hỗ trợ.</li>
                    </ul>
                    
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/tra-cuu-nap-tien-3.png" alt="Xem chi tiết lịch sử nạp tiền" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="tinh-nang-loc">
                <h3>Tính năng lọc và tìm kiếm</h3>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <p>Bạn có thể dễ dàng lọc lịch sử giao dịch theo khoảng thời gian cụ thể (tuần, tháng, quý hoặc tùy chọn ngày cụ thể).</p>
                    <p>Hệ thống cho phép tìm kiếm theo mã giao dịch, số tiền nạp hoặc trạng thái giao dịch, giúp bạn quản lý tài khoản dễ dàng hơn.</p>
                    
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/tra-cuu-nap-tien-4.png" alt="Tính năng lọc và tìm kiếm" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="xuat-thong-tin">
                <h2>Bước 4: Xuất thông tin giao dịch</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <p>Bạn có thể chọn nút "Xuất file" để tải về lịch sử giao dịch dưới dạng file Excel hoặc PDF, tiện lợi cho việc theo dõi, quản lý tài chính hoặc giải quyết khiếu nại (nếu có).</p>
                    
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/tra-cuu-nap-tien-5.png" alt="Xuất thông tin giao dịch" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="luu-y">
                <h2>Lưu ý quan trọng</h2>
                
                <div className={styles.alertBox}>
                  <div className={styles.alertIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <div className={styles.alertContent}>
                    <ul>
                      <li>Hãy thường xuyên kiểm tra lịch sử giao dịch để đảm bảo các giao dịch đều chính xác.</li>
                      <li>Trong trường hợp phát hiện sai sót, vui lòng liên hệ ngay bộ phận hỗ trợ khách hàng TomOi.vn để xử lý nhanh nhất, thông thường hỗ trợ sẽ phản hồi trong vòng 5-10 phút kể từ khi nhận được yêu cầu của bạn.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <NavigationButtons prevPage={prevPage} nextPage={nextPage} />
              
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
                href="#dang-nhap" 
                className={`${styles.tocLink} ${activeSection === "dang-nhap" ? styles.tocLinkActive : ""}`}
              >
                Bước 1: Đăng nhập vào tài khoản
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#truy-cap-lich-su" 
                className={`${styles.tocLink} ${activeSection === "truy-cap-lich-su" ? styles.tocLinkActive : ""}`}
              >
                Bước 2: Truy cập vào mục "Lịch sử giao dịch"
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#xem-chi-tiet" 
                className={`${styles.tocLink} ${activeSection === "xem-chi-tiet" ? styles.tocLinkActive : ""}`}
              >
                Bước 3: Xem chi tiết lịch sử nạp tiền
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#tinh-nang-loc" 
                className={`${styles.tocLink} ${activeSection === "tinh-nang-loc" ? styles.tocLinkActive : ""}`}
              >
                Tính năng lọc và tìm kiếm
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#xuat-thong-tin" 
                className={`${styles.tocLink} ${activeSection === "xuat-thong-tin" ? styles.tocLinkActive : ""}`}
              >
                Bước 4: Xuất thông tin giao dịch
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#luu-y" 
                className={`${styles.tocLink} ${activeSection === "luu-y" ? styles.tocLinkActive : ""}`}
              >
                Lưu ý quan trọng
              </a>
            </li>
          </ul>
        </aside>
      </div>

      <SearchModal isOpen={searchModalOpen} onClose={closeSearchModal} />
    </div>
  );
} 