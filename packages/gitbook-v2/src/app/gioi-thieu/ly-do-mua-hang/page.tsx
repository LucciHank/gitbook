"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../../docs/styles.module.css';
import SearchModal from '../../components/SearchModal';
import NavigationButtons from '../../components/NavigationButtons';

export default function LyDoMuaHangPage() {
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
    title: "Giới thiệu về TomOi.vn",
    url: "/gioi-thieu/gioi-thieu-ve-tomoivn"
  };
  
  const nextPage = {
    title: "Các nền tảng chính thức",
    url: "/gioi-thieu/nen-tang-chinh-thuc"
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

      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenuHeader}>
          <div className={styles.logoPlaceholder}>
            <span>TomOi.vn</span>
          </div>
          <button className={styles.mobileMenuClose} onClick={toggleMobileMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <nav className={styles.mobileMenuContent}>
          <div className={styles['sidebar-section']}>
            <h4 className={styles['sidebar-heading']}>Hướng dẫn sử dụng tài liệu</h4>
            <ul>
              <li>
                <Link href="/" onClick={toggleMobileMenu}>Hướng dẫn nhanh</Link>
              </li>
            </ul>
          </div>
          <div className={styles['sidebar-section']}>
            <h4 className={styles['sidebar-heading']}>Giới thiệu</h4>
            <ul>
              <li>
                <Link href="/gioi-thieu/gioi-thieu-ve-tomoivn" onClick={toggleMobileMenu}>
                  Giới thiệu về TomOi.vn
                </Link>
              </li>
              <li className={styles.active}>
                <Link href="/gioi-thieu/ly-do-mua-hang" onClick={toggleMobileMenu}>
                  Lý do nên mua hàng tại TomOi.vn
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu/nen-tang-chinh-thuc" onClick={toggleMobileMenu}>
                  Các nền tảng chính thức
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu/tong-quan-website" onClick={toggleMobileMenu}>Tổng quan website</Link>
              </li>
              <li>
                <Link href="/gioi-thieu/dieu-khoan-dich-vu" onClick={toggleMobileMenu}>Điều khoản dịch vụ</Link>
              </li>
              <li>
                <Link href="/gioi-thieu/chinh-sach-bao-mat" onClick={toggleMobileMenu}>Chính sách bảo mật</Link>
              </li>
            </ul>
          </div>
          <div className={styles['sidebar-section']}>
            <h4 className={styles['sidebar-heading']}>Hướng dẫn mua hàng</h4>
            <ul>
              <li>
                <Link href="/huong-dan-mua-hang/quan-ly-tai-khoan" onClick={toggleMobileMenu}>
                  Quản lý tài khoản
                </Link>
              </li>
              <li>
                <Link href="/huong-dan-mua-hang/huong-dan-nap-tien" onClick={toggleMobileMenu}>
                  Hướng dẫn nạp tiền
                </Link>
              </li>
              <li>
                <Link href="/huong-dan-mua-hang/huong-dan-thanh-toan" onClick={toggleMobileMenu}>
                  Hướng dẫn thanh toán
                </Link>
              </li>
              <li>
                <Link href="/huong-dan-mua-hang/mua-hang-sieu-toc" onClick={toggleMobileMenu}>
                  Mua hàng siêu tốc không cần tài khoản
                </Link>
              </li>
              <li>
                <Link href="/huong-dan-mua-hang/tra-cuu-lich-su-nap-tien" onClick={toggleMobileMenu}>
                  Tra cứu lịch sử nạp tiền
                </Link>
              </li>
              <li>
                <Link href="/huong-dan-mua-hang/tra-cuu-lich-su-don-hang" onClick={toggleMobileMenu}>
                  Tra cứu lịch sử đơn hàng
                </Link>
              </li>
              <li>
                <Link href="/huong-dan-mua-hang/cai-dat-va-su-dung" onClick={toggleMobileMenu}>
                  Cài đặt và sử dụng sản phẩm
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className={styles['content-wrapper']}>
        <aside className={styles.sidebar}>
          <nav className={styles['sidebar-nav']}>
            <div className={styles['sidebar-section']}>
              <h4 className={styles['sidebar-heading']}>Hướng dẫn sử dụng tài liệu</h4>
              <ul>
                <li>
                  <Link href="/">Hướng dẫn nhanh</Link>
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
                <li className={styles.active}>
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
            <div className={styles['sidebar-section']}>
              <h4 className={styles['sidebar-heading']}>Hướng dẫn mua hàng</h4>
              <ul>
                <li>
                  <Link href="/huong-dan-mua-hang/quan-ly-tai-khoan">
                    Quản lý tài khoản
                  </Link>
                </li>
                <li>
                  <Link href="/huong-dan-mua-hang/huong-dan-nap-tien">
                    Hướng dẫn nạp tiền
                  </Link>
                </li>
                <li>
                  <Link href="/huong-dan-mua-hang/huong-dan-thanh-toan">
                    Hướng dẫn thanh toán
                  </Link>
                </li>
                <li>
                  <Link href="/huong-dan-mua-hang/mua-hang-sieu-toc">
                    Mua hàng siêu tốc không cần tài khoản
                  </Link>
                </li>
                <li>
                  <Link href="/huong-dan-mua-hang/tra-cuu-lich-su-nap-tien">
                    Tra cứu lịch sử nạp tiền
                  </Link>
                </li>
                <li>
                  <Link href="/huong-dan-mua-hang/tra-cuu-lich-su-don-hang">
                    Tra cứu lịch sử đơn hàng
                  </Link>
                </li>
                <li>
                  <Link href="/huong-dan-mua-hang/cai-dat-va-su-dung">
                    Cài đặt và sử dụng sản phẩm
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        <main className={styles['main-content']}>
          <div className={styles['content-header']}>
            <h1>Lý do nên mua hàng tại TomOi.vn</h1>
            <div className={styles.breadcrumbs}>
              <Link href="/">Trang chủ</Link> <span>/</span> <Link href="/gioi-thieu">Giới thiệu</Link> <span>/</span> <span>Lý do nên mua hàng tại TomOi.vn</span>
            </div>
          </div>
          
          <div className={styles.content}>
            <div className={styles.contentCard}>
              <p className={styles['intro-text']}>
                TomOi.vn là lựa chọn hàng đầu tại Việt Nam trong việc cung cấp các tài khoản Premium chất lượng, đã được hàng ngàn khách hàng tin dùng. Dưới đây là những lý do cụ thể khiến TomOi.vn trở thành lựa chọn đáng tin cậy:
              </p>
              
              <section className={styles.section} id="do-tin-cay">
                <h2>Số liệu ấn tượng về độ tin cậy</h2>
                
                <div className={styles.featureBlock}>
                  <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <p>
                      TomOi.vn đã xây dựng được uy tín vững chắc với những con số ấn tượng qua nhiều năm hoạt động:
                    </p>
                  </div>
                </div>
                
                <ul>
                  <li>Hơn 100.000 khách hàng thường xuyên sử dụng dịch vụ</li>
                  <li>Tỷ lệ hài lòng đạt 95% theo khảo sát khách hàng</li>
                  <li>Trung bình 20.000+ đơn hàng được xử lý thành công mỗi tháng</li>
                  <li>Hơn 7 năm kinh nghiệm trong ngành</li>
                </ul>
              </section>
              
              <section className={styles.section} id="chat-luong-san-pham">
                <h2>Chất lượng sản phẩm vượt trội</h2>
                
                <div className={styles.infoBox}>
                  <div className={styles.infoIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <ul>
                      <li>Tài khoản Premium 100% chính hãng, không bị giới hạn tính năng</li>
                      <li>Trải nghiệm sử dụng mượt mà, không gặp lỗi</li>
                      <li>Hỗ trợ đầy đủ các thiết bị: PC, laptop, điện thoại, TV, máy tính bảng</li>
                      <li>Đa dạng dịch vụ: Netflix, Spotify, YouTube Premium, Canva Pro, Microsoft Office, v.v.</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="gia-ca-canh-tranh">
                <h2>Giá cả cạnh tranh và minh bạch</h2>
                
                <div className={styles.featureBlock}>
                  <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <ul>
                      <li>Giá thấp hơn 70-80% so với giá niêm yết chính hãng</li>
                      <li>Không có phí ẩn, giá cuối cùng là giá hiển thị</li>
                      <li>Nhiều gói thời gian linh hoạt: 1 tháng, 3 tháng, 6 tháng, 1 năm</li>
                      <li>Chương trình khuyến mãi thường xuyên và ưu đãi đặc biệt cho khách hàng thân thiết</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="bao-hanh-ho-tro">
                <h2>Chính sách bảo hành và hỗ trợ vượt trội</h2>
                
                <div className={styles.featureBlock}>
                  <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <ul>
                      <li>Bảo hành 1:1 trong suốt thời gian sử dụng</li>
                      <li>Đội ngũ hỗ trợ chuyên nghiệp, nhiệt tình 24/7</li>
                      <li>Nhiều kênh hỗ trợ: chat trực tuyến, hotline, email, fanpage</li>
                      <li>Thời gian phản hồi nhanh chóng, giải quyết vấn đề trong vòng 5-15 phút</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="giao-dich-an-toan">
                <h2>Giao dịch an toàn, bảo mật</h2>
                
                <div className={styles.featureBlock}>
                  <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <ul>
                      <li>Hỗ trợ đa dạng phương thức thanh toán</li>
                      <li>Bảo mật thông tin cá nhân và giao dịch theo tiêu chuẩn SSL</li>
                      <li>Hệ thống tự động xác thực và gửi tài khoản ngay sau khi thanh toán thành công</li>
                      <li>Lưu trữ lịch sử giao dịch chi tiết, minh bạch, dễ dàng tra cứu</li>
                    </ul>
                  </div>
                </div>
              </section>

              <div className={styles.lastUpdated}>
                <p>Cập nhật lần cuối: {lastUpdated}</p>
              </div>
              
              <NavigationButtons 
                prevPage={{
                  title: "Giới thiệu về TomOi.vn",
                  url: "/gioi-thieu/gioi-thieu-ve-tomoivn"
                }}
                nextPage={{
                  title: "Các nền tảng chính thức",
                  url: "/gioi-thieu/nen-tang-chinh-thuc"
                }}
              />
            </div>
          </div>
        </main>
        
        <aside className={styles.tableOfContents}>
          <div className={styles.tocTitle}>Mục lục</div>
          <ul className={styles.tocList}>
            <li className={styles.tocItem}>
              <a 
                href="#do-tin-cay" 
                className={`${styles.tocLink} ${activeSection === "do-tin-cay" ? styles.tocLinkActive : ""}`}
              >
                Số liệu ấn tượng về độ tin cậy
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#chat-luong-san-pham" 
                className={`${styles.tocLink} ${activeSection === "chat-luong-san-pham" ? styles.tocLinkActive : ""}`}
              >
                Chất lượng sản phẩm vượt trội
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#gia-ca-canh-tranh" 
                className={`${styles.tocLink} ${activeSection === "gia-ca-canh-tranh" ? styles.tocLinkActive : ""}`}
              >
                Giá cả cạnh tranh và minh bạch
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#bao-hanh-ho-tro" 
                className={`${styles.tocLink} ${activeSection === "bao-hanh-ho-tro" ? styles.tocLinkActive : ""}`}
              >
                Chính sách bảo hành và hỗ trợ vượt trội
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#giao-dich-an-toan" 
                className={`${styles.tocLink} ${activeSection === "giao-dich-an-toan" ? styles.tocLinkActive : ""}`}
              >
                Giao dịch an toàn, bảo mật
              </a>
            </li>
          </ul>
        </aside>
      </div>

      <SearchModal isOpen={searchModalOpen} onClose={closeSearchModal} />
    </div>
  );
} 