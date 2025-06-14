"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../../docs/styles.module.css';
import SearchModal from '../../components/SearchModal';
import NavigationButtons from '../../components/NavigationButtons';

export default function TongQuanWebsitePage() {
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
    title: "Các nền tảng chính thức",
    path: "/gioi-thieu/nen-tang-chinh-thuc"
  };
  
  const nextPage = {
    title: "Điều khoản dịch vụ",
    path: "/gioi-thieu/dieu-khoan-dich-vu"
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
                <Link href="/">Hướng dẫn nhanh</Link>
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
              <li>
                <Link href="/gioi-thieu/nen-tang-chinh-thuc" onClick={toggleMobileMenu}>
                  Các nền tảng chính thức
                </Link>
              </li>
              <li className={pathname === "/gioi-thieu/tong-quan-website" ? styles.active : ""}>
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
                <li>
                  <Link href="/gioi-thieu/nen-tang-chinh-thuc">
                    Các nền tảng chính thức
                  </Link>
                </li>
                <li className={pathname === "/gioi-thieu/tong-quan-website" ? styles.active : ""}>
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
            <h1>Tổng quan website TomOi.vn</h1>
            <div className={styles.breadcrumbs}>
              <Link href="/">Trang chủ</Link> <span>/</span> <Link href="/gioi-thieu">Giới thiệu</Link> <span>/</span> <span>Tổng quan website</span>
            </div>
          </div>
          
          <div className={styles.content}>
            <div className={styles.contentCard}>
              <p className={styles['intro-text']}>
                TomOi.vn luôn chú trọng phát triển giao diện website và mobile nhằm mang đến trải nghiệm tốt nhất và tiện lợi nhất cho khách hàng. Trang web được thiết kế với giao diện hiện đại, tối ưu hóa trên cả máy tính và thiết bị di động.
              </p>
              
              <section className={styles.section} id="giao-dien-web">
                <h2>Giao diện Web</h2>
                
                <div className={styles.featureBlock}>
                  <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <p>
                      Giao diện website TomOi.vn được thiết kế hiện đại, tối ưu hóa trải nghiệm người dùng trên máy tính và laptop, đảm bảo sự tiện lợi và trực quan khi tìm kiếm và sử dụng các sản phẩm Premium.
                    </p>
                  </div>
                </div>
                
                <ul>
                  <li>
                    <strong>Bố cục trực quan:</strong> Các danh mục sản phẩm rõ ràng, dễ dàng điều hướng.
                  </li>
                  <li>
                    <strong>Tốc độ tải trang nhanh:</strong> Thời gian tải trung bình chỉ khoảng 2 giây, giúp bạn tiết kiệm thời gian và trải nghiệm mượt mà.
                  </li>
                  <li>
                    <strong>Giao diện thân thiện:</strong> Thiết kế giao diện rõ ràng với màu sắc hài hòa, dễ nhìn, hỗ trợ chế độ tối (Dark Mode).
                  </li>
                  <li>
                    <strong>Tìm kiếm nhanh chóng:</strong> Công cụ tìm kiếm thông minh giúp bạn nhanh chóng tìm thấy sản phẩm cần thiết chỉ trong vài giây.
                  </li>
                </ul>
                
                <div className={styles.imageContainer}>
                  <img src="/placeholder-image-1.jpg" alt="Giao diện web TomOi.vn" />
                  <p className={styles.imageCaption}>Hình ảnh minh họa giao diện web chi tiết</p>
                </div>
              </section>
              
              <section className={styles.section} id="giao-dien-mobile">
                <h2>Giao diện Mobile</h2>
                
                <div className={styles.featureBlock}>
                  <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                      <line x1="12" y1="18" x2="12.01" y2="18"></line>
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <p>
                      Phiên bản di động của TomOi.vn được tối ưu hoàn hảo cho người dùng smartphone và tablet, mang đến trải nghiệm mượt mà, nhanh chóng và tiện lợi.
                    </p>
                  </div>
                </div>
                
                <ul>
                  <li>
                    <strong>Tối ưu hóa hoàn toàn trên di động:</strong> Đảm bảo tương thích tốt trên cả iOS và Android với hơn 90% người dùng đánh giá tốt.
                  </li>
                  <li>
                    <strong>Thao tác đơn giản và nhanh chóng:</strong> Các nút điều hướng và lựa chọn sản phẩm được thiết kế dễ dàng thao tác bằng một tay.
                  </li>
                  <li>
                    <strong>Thanh toán di động tiện lợi:</strong> Hỗ trợ thanh toán trực tiếp trên di động với tốc độ giao dịch trung bình chỉ 1-2 giây.
                  </li>
                  <li>
                    <strong>Tính năng push thông báo:</strong> Thông báo ngay lập tức khi có chương trình ưu đãi hoặc cập nhật mới, giúp khách hàng không bỏ lỡ thông tin quan trọng.
                  </li>
                </ul>
                
                <div className={styles.imageContainer}>
                  <img src="/placeholder-image-2.jpg" alt="Giao diện mobile TomOi.vn" />
                  <p className={styles.imageCaption}>Hình ảnh minh họa giao diện mobile chi tiết</p>
                </div>
                
                <div className={styles.conclusion}>
                  <p>TomOi.vn luôn chú trọng phát triển giao diện website và mobile nhằm mang đến trải nghiệm tốt nhất và tiện lợi nhất cho khách hàng.</p>
                </div>
              </section>

              <div className={styles.lastUpdated}>
                <p>Cập nhật lần cuối: {lastUpdated}</p>
              </div>
              
              <NavigationButtons 
                prevPage={{
                  title: "Các nền tảng chính thức",
                  url: "/gioi-thieu/nen-tang-chinh-thuc"
                }}
                nextPage={{
                  title: "Điều khoản dịch vụ",
                  url: "/gioi-thieu/dieu-khoan-dich-vu"
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
                href="#giao-dien-web" 
                className={`${styles.tocLink} ${activeSection === "giao-dien-web" ? styles.tocLinkActive : ""}`}
              >
                Giao diện Web
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#giao-dien-mobile" 
                className={`${styles.tocLink} ${activeSection === "giao-dien-mobile" ? styles.tocLinkActive : ""}`}
              >
                Giao diện Mobile
              </a>
            </li>
          </ul>
        </aside>
      </div>
      
      <SearchModal isOpen={searchModalOpen} onClose={closeSearchModal} />
    </div>
  );
} 