"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../../docs/styles.module.css';
import SearchModal from '../../components/SearchModal';
import NavigationButtons from '../../components/NavigationButtons';

export default function NenTangChinhThucPage() {
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
    title: "Lý do nên mua hàng tại TomOi.vn",
    url: "/gioi-thieu/ly-do-mua-hang"
  };
  
  const nextPage = {
    title: "Tổng quan website",
    url: "/gioi-thieu/tong-quan-website"
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
              <li>
                <Link href="/gioi-thieu/ly-do-mua-hang" onClick={toggleMobileMenu}>
                  Lý do nên mua hàng tại TomOi.vn
                </Link>
              </li>
              <li className={styles.active}>
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
                <li>
                  <Link href="/gioi-thieu/ly-do-mua-hang">
                    Lý do nên mua hàng tại TomOi.vn
                  </Link>
                </li>
                <li className={styles.active}>
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
            <h1>Các nền tảng chính thức của TomOi.vn</h1>
            <div className={styles.breadcrumbs}>
              <Link href="/">Trang chủ</Link> <span>/</span> <Link href="/gioi-thieu">Giới thiệu</Link> <span>/</span> <span>Các nền tảng chính thức</span>
            </div>
          </div>
          
          <div className={styles.content}>
            <div className={styles.contentCard}>
              <p className={styles['intro-text']}>
                TomOi.vn hiện diện trên nhiều nền tảng mạng xã hội và kênh truyền thông khác nhau để đảm bảo khách hàng luôn có thể kết nối và cập nhật thông tin mới nhất từ chúng tôi. Dưới đây là danh sách các kênh chính thức của TomOi.vn.
              </p>
              
              <section className={styles.section} id="website-chinh-thuc">
                <h2>Website chính thức</h2>
                
                <div className={styles.featureBlock}>
                  <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <p>
                      Website chính thức của TomOi.vn là nơi cập nhật đầy đủ và chính xác nhất các thông tin về sản phẩm, dịch vụ, chương trình khuyến mãi và chính sách của chúng tôi.
                    </p>
                  </div>
                </div>
                
                <ul>
                  <li>
                    <strong>Website chính thức:</strong> <a href="https://tomoi.vn" target="_blank" rel="noopener noreferrer">https://tomoi.vn</a>
                  </li>
                  <li>
                    <strong>Trang hỗ trợ khách hàng:</strong> <a href="https://help.tomoi.vn" target="_blank" rel="noopener noreferrer">https://help.tomoi.vn</a>
                  </li>
                  <li>
                    <strong>Blog:</strong> <a href="https://blog.tomoi.vn" target="_blank" rel="noopener noreferrer">https://blog.tomoi.vn</a>
                  </li>
                </ul>
              </section>
              
              <section className={styles.section} id="mang-xa-hoi">
                <h2>Mạng xã hội</h2>
                
                <div className={styles.featureBlock}>
                  <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                      <line x1="6" y1="1" x2="6" y2="4"></line>
                      <line x1="10" y1="1" x2="10" y2="4"></line>
                      <line x1="14" y1="1" x2="14" y2="4"></line>
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <p>
                      Theo dõi TomOi.vn trên các nền tảng mạng xã hội để cập nhật thông tin mới nhất, tham gia các sự kiện và nhận các ưu đãi đặc biệt.
                    </p>
                  </div>
                </div>
                
                <ul>
                  <li>
                    <strong>Facebook:</strong> <a href="https://facebook.com/tomoivn" target="_blank" rel="noopener noreferrer">facebook.com/tomoivn</a>
                    <p>Fanpage chính thức với hơn 500.000 người theo dõi, cập nhật thông tin khuyến mãi và hỗ trợ khách hàng.</p>
                  </li>
                  <li>
                    <strong>Instagram:</strong> <a href="https://instagram.com/tomoi.vn" target="_blank" rel="noopener noreferrer">instagram.com/tomoi.vn</a>
                    <p>Hình ảnh, video và stories về các sản phẩm, dịch vụ mới nhất.</p>
                  </li>
                  <li>
                    <strong>TikTok:</strong> <a href="https://tiktok.com/@tomoi.vn" target="_blank" rel="noopener noreferrer">tiktok.com/@tomoi.vn</a>
                    <p>Video ngắn hướng dẫn sử dụng sản phẩm và các mẹo hữu ích.</p>
                  </li>
                  <li>
                    <strong>YouTube:</strong> <a href="https://youtube.com/c/TomoiVN" target="_blank" rel="noopener noreferrer">youtube.com/c/TomoiVN</a>
                    <p>Kênh video chính thức với các hướng dẫn chi tiết, review sản phẩm và giải đáp thắc mắc.</p>
                  </li>
                  <li>
                    <strong>Threads:</strong> <a href="https://threads.net/@tomoi.vn" target="_blank" rel="noopener noreferrer">threads.net/@tomoi.vn</a>
                    <p>Cập nhật tin tức ngắn và tương tác với cộng đồng người dùng.</p>
                  </li>
                  <li>
                    <strong>X (Twitter):</strong> <a href="https://x.com/tomoivn" target="_blank" rel="noopener noreferrer">x.com/tomoivn</a>
                    <p>Thông báo nhanh về các sự kiện, khuyến mãi và tin tức mới nhất.</p>
                  </li>
                </ul>
              </section>
              
              <section className={styles.section} id="kenh-ho-tro">
                <h2>Kênh hỗ trợ khách hàng</h2>
                
                <div className={styles.featureBlock}>
                  <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <p>
                      TomOi.vn cung cấp nhiều kênh hỗ trợ khách hàng để đảm bảo bạn luôn nhận được sự trợ giúp kịp thời khi cần.
                    </p>
                  </div>
                </div>
                
                <ul>
                  <li>
                    <strong>Hotline:</strong> 0562.147.786 (8h-22h hàng ngày)
                  </li>
                  <li>
                    <strong>Email hỗ trợ:</strong> <a href="mailto:support@tomoi.vn">support@tomoi.vn</a>
                  </li>
                  <li>
                    <strong>Live Chat:</strong> Có sẵn trên website chính thức <a href="https://tomoi.vn" target="_blank" rel="noopener noreferrer">tomoi.vn</a>
                  </li>
                  <li>
                    <strong>Zalo:</strong> <a href="https://zalo.me/0562147786" target="_blank" rel="noopener noreferrer">zalo.me/0562147786</a>
                  </li>
                </ul>
              </section>
              
              <section className={styles.section} id="cong-dong-nguoi-dung">
                <h2>Cộng đồng người dùng</h2>
                
                <div className={styles.featureBlock}>
                  <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <p>
                      Tham gia cộng đồng người dùng TomOi.vn để chia sẻ kinh nghiệm, nhận tư vấn và kết nối với những người dùng khác.
                    </p>
                  </div>
                </div>
                
                <ul>
                  <li>
                    <strong>Nhóm Facebook:</strong> <a href="https://facebook.com/groups/tomoivn.community" target="_blank" rel="noopener noreferrer">facebook.com/groups/tomoivn.community</a>
                    <p>Cộng đồng người dùng với hơn 50.000 thành viên, nơi chia sẻ kinh nghiệm và hỗ trợ lẫn nhau.</p>
                  </li>
                  <li>
                    <strong>Group Zalo:</strong> <a href="https://zalo.me/g/abcxyz" target="_blank" rel="noopener noreferrer">zalo.me/g/abcxyz</a>
                    <p>Nhóm trao đổi nhanh chóng qua Zalo cho người dùng Việt Nam.</p>
                  </li>
                  <li>
                    <strong>Discord:</strong> <a href="https://discord.gg/tomoivn" target="_blank" rel="noopener noreferrer">discord.gg/tomoivn</a>
                    <p>Kênh chat trực tiếp dành cho cộng đồng người dùng và game thủ.</p>
                  </li>
                </ul>
              </section>

              <div className={styles.alert}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>
                  <strong>Lưu ý:</strong> Hãy cẩn thận với các trang mạo danh! TomOi.vn chỉ sử dụng các kênh chính thức được liệt kê ở trên. Nếu bạn nghi ngờ về tính xác thực của bất kỳ trang nào tự xưng là TomOi.vn, vui lòng liên hệ với chúng tôi qua các kênh chính thức để xác minh.
                </div>
              </div>

              <div className={styles.lastUpdated}>
                <p>Cập nhật lần cuối: {lastUpdated}</p>
              </div>
              
              <NavigationButtons 
                prevPage={{
                  title: "Lý do nên mua hàng tại TomOi.vn",
                  url: "/gioi-thieu/ly-do-mua-hang"
                }}
                nextPage={{
                  title: "Tổng quan website",
                  url: "/gioi-thieu/tong-quan-website"
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
                href="#website-chinh-thuc" 
                className={`${styles.tocLink} ${activeSection === "website-chinh-thuc" ? styles.tocLinkActive : ""}`}
              >
                Website chính thức
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#mang-xa-hoi" 
                className={`${styles.tocLink} ${activeSection === "mang-xa-hoi" ? styles.tocLinkActive : ""}`}
              >
                Mạng xã hội
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#kenh-ho-tro" 
                className={`${styles.tocLink} ${activeSection === "kenh-ho-tro" ? styles.tocLinkActive : ""}`}
              >
                Kênh hỗ trợ khách hàng
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#cong-dong-nguoi-dung" 
                className={`${styles.tocLink} ${activeSection === "cong-dong-nguoi-dung" ? styles.tocLinkActive : ""}`}
              >
                Cộng đồng người dùng
              </a>
            </li>
          </ul>
        </aside>
      </div>
      
      <SearchModal isOpen={searchModalOpen} onClose={closeSearchModal} />
    </div>
  );
} 