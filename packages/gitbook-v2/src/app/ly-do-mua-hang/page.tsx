"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../docs/styles.module.css';
import SearchModal from '../components/SearchModal';

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
              <li><Link href="/">Tài liệu</Link></li>
              <li><Link href="/tutorials">Hướng dẫn</Link></li>
              <li><Link href="/api">API</Link></li>
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
                <Link href="/huong-dan/gioi-thieu" onClick={toggleMobileMenu}>Giới thiệu</Link>
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
                  <Link href="/" onClick={toggleMobileMenu}>Hướng dẫn nhanh</Link>
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
              <Link href="/">Trang chủ</Link> <span>/</span> <Link href="/gioi-thieu">Giới thiệu</Link> <span>/</span> <span>Lý do nên mua hàng</span>
            </div>
          </div>
          
          <div className={styles.content}>
            <div className={styles.contentCard}>
              <p className={styles['intro-text']}>
                TomOi.vn tự hào là đơn vị tiên phong trong lĩnh vực cung cấp tài khoản Premium chất lượng cao tại Việt Nam. Dưới đây là những lý do khiến hơn 100.000 khách hàng mỗi tháng tin tưởng và lựa chọn chúng tôi.
              </p>
              
              <section className={styles.section} id="gia-ca-canh-tranh">
                <h2>Giá cả cạnh tranh nhất thị trường</h2>
                
                <div className={styles.featureBlock}>
                  <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <p>
                      TomOi.vn cam kết mang đến cho khách hàng mức giá tối ưu nhất cho các tài khoản Premium. Chúng tôi liên tục cập nhật và điều chỉnh giá để đảm bảo khách hàng luôn nhận được giá trị tốt nhất.
                    </p>
                  </div>
                </div>
                
                <ul>
                  <li>Tiết kiệm đến 70% so với giá gốc của các dịch vụ Premium.</li>
                  <li>Chính sách giảm giá hấp dẫn cho khách hàng thân thiết và mua số lượng lớn.</li>
                  <li>Nhiều gói combo tiết kiệm chi phí cho người dùng nhiều dịch vụ.</li>
                  <li>Thường xuyên có các chương trình khuyến mãi, flash sale với giá cực kỳ ưu đãi.</li>
                </ul>
              </section>
              
              <section className={styles.section} id="chat-luong-san-pham">
                <h2>Chất lượng sản phẩm đảm bảo</h2>
                
                <div className={styles.featureBlock}>
                  <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <p>
                      Tất cả tài khoản Premium tại TomOi.vn đều được kiểm tra kỹ lưỡng trước khi đến tay khách hàng, đảm bảo hoạt động ổn định và không gặp vấn đề khi sử dụng.
                    </p>
                  </div>
                </div>
                
                <ul>
                  <li>Tài khoản hoạt động ổn định, không bị gián đoạn trong suốt thời gian sử dụng.</li>
                  <li>Hỗ trợ đầy đủ các tính năng cao cấp của dịch vụ Premium.</li>
                  <li>Tương thích với mọi thiết bị: máy tính, điện thoại, tablet, smart TV...</li>
                  <li>Được kiểm tra và xác thực tự động bởi hệ thống trước khi giao cho khách hàng.</li>
                </ul>
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
                    <p>
                      TomOi.vn tự hào với chính sách bảo hành rõ ràng và đội ngũ hỗ trợ chuyên nghiệp, luôn sẵn sàng giải đáp mọi thắc mắc và hỗ trợ khách hàng 24/7.
                    </p>
                  </div>
                </div>
                
                <ul>
                  <li>Bảo hành 1:1 trong suốt thời gian sử dụng: nếu tài khoản gặp vấn đề, chúng tôi sẽ thay thế ngay lập tức.</li>
                  <li>Đội ngũ hỗ trợ chuyên nghiệp, nhiệt tình, sẵn sàng phục vụ 24/7.</li>
                  <li>Nhiều kênh hỗ trợ: chat trực tuyến, hotline, email, fanpage.</li>
                  <li>Thời gian phản hồi nhanh chóng, giải quyết vấn đề trong vòng 5-15 phút.</li>
                </ul>
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
                    <p>
                      Hệ thống thanh toán tại TomOi.vn được bảo mật theo tiêu chuẩn quốc tế, đảm bảo an toàn tuyệt đối cho mọi giao dịch của khách hàng.
                    </p>
                  </div>
                </div>
                
                <ul>
                  <li>Hỗ trợ đa dạng phương thức thanh toán: chuyển khoản ngân hàng, ví điện tử, thẻ ATM, thẻ quốc tế.</li>
                  <li>Bảo mật thông tin cá nhân và giao dịch theo tiêu chuẩn SSL.</li>
                  <li>Hệ thống tự động xác thực và gửi tài khoản ngay sau khi thanh toán thành công.</li>
                  <li>Lưu trữ lịch sử giao dịch chi tiết, minh bạch, dễ dàng tra cứu.</li>
                </ul>
              </section>
              
              <section className={styles.section} id="da-dang-san-pham">
                <h2>Đa dạng sản phẩm và dịch vụ</h2>
                
                <div className={styles.featureBlock}>
                  <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                      <polyline points="2 17 12 22 22 17"></polyline>
                      <polyline points="2 12 12 17 22 12"></polyline>
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <p>
                      TomOi.vn cung cấp đa dạng các loại tài khoản Premium từ nhiều nền tảng phổ biến, đáp ứng mọi nhu cầu giải trí, học tập và làm việc của khách hàng.
                    </p>
                  </div>
                </div>
                
                <ul>
                  <li>Dịch vụ giải trí: Netflix, Spotify, YouTube Premium, Disney+, HBO, Amazon Prime...</li>
                  <li>Dịch vụ học tập: Coursera, Udemy, Skillshare, Grammarly...</li>
                  <li>Dịch vụ làm việc: Office 365, Adobe Creative Cloud, Canva Pro, Notion...</li>
                  <li>Dịch vụ lưu trữ: Google Drive, OneDrive, Dropbox...</li>
                  <li>Và nhiều dịch vụ khác luôn được cập nhật theo xu hướng thị trường.</li>
                </ul>
              </section>

              <div className={styles.conclusion}>
                <p>
                  Với những lý do trên, TomOi.vn tự tin là lựa chọn hàng đầu khi bạn cần mua tài khoản Premium chất lượng cao. Chúng tôi luôn nỗ lực không ngừng để mang đến trải nghiệm mua sắm tốt nhất cho khách hàng.
                </p>
              </div>

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
                href="#gia-ca-canh-tranh" 
                className={`${styles.tocLink} ${activeSection === "gia-ca-canh-tranh" ? styles.tocLinkActive : ""}`}
              >
                Giá cả cạnh tranh nhất thị trường
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#chat-luong-san-pham" 
                className={`${styles.tocLink} ${activeSection === "chat-luong-san-pham" ? styles.tocLinkActive : ""}`}
              >
                Chất lượng sản phẩm đảm bảo
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
            <li className={styles.tocItem}>
              <a 
                href="#da-dang-san-pham" 
                className={`${styles.tocLink} ${activeSection === "da-dang-san-pham" ? styles.tocLinkActive : ""}`}
              >
                Đa dạng sản phẩm và dịch vụ
              </a>
            </li>
          </ul>
        </aside>
      </div>

      <SearchModal isOpen={searchModalOpen} onClose={closeSearchModal} />
    </div>
  );
} 