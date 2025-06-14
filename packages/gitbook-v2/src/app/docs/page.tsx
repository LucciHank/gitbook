"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

interface SearchResult {
  title: string;
  url: string;
}

const DocsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<string>("gioi-thieu-tomoi");
  
  // Tạo ngày hiện tại theo định dạng DD/MM/YYYY
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();
  const lastUpdated = `${day}/${month}/${year}`;

  // Mô phỏng kết quả tìm kiếm
  const mockSearchResults: SearchResult[] = [
    { title: "Giới thiệu về TomOi.vn", url: "/gioi-thieu/gioi-thieu-ve-tomoivn" },
    { title: "Lý do nên mua hàng tại TomOi.vn", url: "/gioi-thieu/ly-do-mua-hang" },
    { title: "Các nền tảng chính thức của TomOi.vn", url: "/gioi-thieu/nen-tang-chinh-thuc" },
    { title: "Tổng quan website", url: "/gioi-thieu/tong-quan-website" },
    { title: "Điều khoản dịch vụ", url: "/gioi-thieu/dieu-khoan-dich-vu" },
    { title: "Chính sách bảo mật", url: "/gioi-thieu/chinh-sach-bao-mat" },
    { title: "Hướng dẫn sử dụng tài liệu", url: "/huong-dan/gioi-thieu" },
  ];

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

  useEffect(() => {
    // Xử lý phím tắt Ctrl+K
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // Focus vào input khi modal search mở
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    // Xử lý tìm kiếm khi người dùng nhập
    if (searchQuery.trim() !== '') {
      // Trong thực tế, đây sẽ là một API call hoặc tìm kiếm local
      const filteredResults = mockSearchResults.filter(
        item => item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const navigateToSection = (url: string) => {
    router.push(url);
    setIsSearchOpen(false);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

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
                <div 
                  className={styles.searchBox}
                  onClick={handleSearchClick}
                >
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

      {isSearchOpen && (
        <div className={styles.searchModal}>
          <div className={styles.searchModalOverlay} onClick={handleSearchClose}></div>
          <div className={styles.searchModalContent}>
            <div className={styles.searchModalHeader}>
              <svg className={styles.searchModalIcon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder="Tìm kiếm tài liệu..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchModalInput}
              />
              <button className={styles.searchModalClose} onClick={handleSearchClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className={styles.searchModalResults}>
              {searchResults.length > 0 ? (
                <ul>
                  {searchResults.map((result, index) => (
                    <li key={index} onClick={() => navigateToSection(result.url)}>
                      <div className={styles.searchResultItem}>
                        <svg className={styles.searchResultIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        <span>{result.title}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : searchQuery ? (
                <div className={styles.noResults}>
                  <p>Không tìm thấy kết quả phù hợp với "{searchQuery}"</p>
                </div>
              ) : (
                <div className={styles.searchTips}>
                  <p>Gợi ý tìm kiếm:</p>
                  <ul>
                    <li>Tìm kiếm theo tên tính năng hoặc sản phẩm</li>
                    <li>Tìm kiếm theo các vấn đề thường gặp</li>
                    <li>Tìm kiếm theo hướng dẫn cụ thể</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className={styles['content-wrapper']}>
        <aside className={styles.sidebar}>
          <nav className={styles['sidebar-nav']}>
            <div className={styles['sidebar-section']}>
              <h4 className={styles['sidebar-heading']}>Hướng dẫn sử dụng tài liệu</h4>
              <ul>
                <li className={pathname === "/huong-dan/gioi-thieu" ? styles.active : ""}>
                  <Link href="/huong-dan/gioi-thieu">Hướng dẫn nhanh</Link>
                </li>
              </ul>
            </div>
            <div className={styles['sidebar-section']}>
              <h4 className={styles['sidebar-heading']}>Giới thiệu</h4>
              <ul>
                <li className={pathname === "/gioi-thieu/gioi-thieu-ve-tomoivn" ? styles.active : ""}>
                  <Link href="/gioi-thieu/gioi-thieu-ve-tomoivn">
                    Giới thiệu về TomOi.vn
                  </Link>
                </li>
                <li className={pathname === "/gioi-thieu/ly-do-mua-hang" ? styles.active : ""}>
                  <Link href="/gioi-thieu/ly-do-mua-hang">
                    Lý do nên mua hàng tại TomOi.vn
                  </Link>
                </li>
                <li className={pathname === "/gioi-thieu/nen-tang-chinh-thuc" ? styles.active : ""}>
                  <Link href="/gioi-thieu/nen-tang-chinh-thuc">
                    Các nền tảng chính thức
                  </Link>
                </li>
                <li className={pathname === "/gioi-thieu/tong-quan-website" ? styles.active : ""}>
                  <Link href="/gioi-thieu/tong-quan-website">Tổng quan website</Link>
                </li>
                <li className={pathname === "/gioi-thieu/dieu-khoan-dich-vu" ? styles.active : ""}>
                  <Link href="/gioi-thieu/dieu-khoan-dich-vu">Điều khoản dịch vụ</Link>
                </li>
                <li className={pathname === "/gioi-thieu/chinh-sach-bao-mat" ? styles.active : ""}>
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
              
              <section className={styles.section} id="gioi-thieu-tomoi" style={{display: activeTab === "gioi-thieu-tomoi" ? 'block' : 'none'}}>
                <h2>Giới thiệu về TomOi.vn</h2>
                
                <div className={styles.featureBlock}>
                  <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <p>
                      TomOi.vn là nền tảng uy tín tại Việt Nam chuyên cung cấp các tài khoản Premium chất lượng cao, được sáng lập và điều hành bởi ông Đỗ Hoàng Anh – người có hơn 7 năm kinh nghiệm trong lĩnh vực cung cấp tài khoản bản quyền và dịch vụ số từ năm 2018 đến nay.
                    </p>
                    <p>
                      Trong suốt hành trình phát triển, TomOi.vn luôn đặt sự hài lòng và niềm tin của khách hàng làm kim chỉ nam, xây dựng nền tảng vững chắc trên sự chuyên nghiệp, minh bạch và chất lượng vượt trội.
                    </p>
                  </div>
                </div>
                
                <h3>Số liệu nổi bật minh chứng cho uy tín của TomOi.vn</h3>
                
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
                      <li>Hơn 7 năm kinh nghiệm hoạt động ổn định và bền vững trong lĩnh vực bán tài khoản Premium tại thị trường Việt Nam.</li>
                      <li>Được hơn 100.000 khách hàng tin tưởng và sử dụng dịch vụ hàng tháng.</li>
                      <li>95% khách hàng đánh giá hài lòng và quay lại sử dụng dịch vụ lần thứ hai trở lên.</li>
                      <li>Trung bình mỗi tháng, TomOi.vn tiếp nhận và xử lý thành công hơn 20.000 đơn hàng.</li>
                    </ul>
                  </div>
                </div>
                
                <h3>Giá trị cốt lõi tại TomOi.vn</h3>
                
                <div className={styles.valueCards}>
                  <div className={styles.valueCard}>
                    <div className={styles.valueIcon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="2" x2="12" y2="6"></line>
                        <line x1="12" y1="18" x2="12" y2="22"></line>
                        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                        <line x1="2" y1="12" x2="6" y2="12"></line>
                        <line x1="18" y1="12" x2="22" y2="12"></line>
                        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                      </svg>
                    </div>
                    <h4>Tốc độ</h4>
                    <p>Quy trình giao dịch tự động hoàn toàn, thời gian kích hoạt sản phẩm nhanh chóng trong vòng 1-3 phút.</p>
                  </div>
                  
                  <div className={styles.valueCard}>
                    <div className={styles.valueIcon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <h4>Uy tín và minh bạch</h4>
                    <p>Cam kết rõ ràng, chính sách bảo hành minh bạch và hỗ trợ khách hàng tận tình, kịp thời.</p>
                  </div>
                  
                  <div className={styles.valueCard}>
                    <div className={styles.valueIcon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </div>
                    <h4>Chất lượng</h4>
                    <p>Tài khoản Premium chính hãng 100%, cung cấp trải nghiệm tốt nhất với các dịch vụ như Netflix, Spotify, YouTube Premium, Canva Pro, v.v.</p>
                  </div>
                </div>
                
                <h3>Phản hồi từ khách hàng</h3>
                
                <div className={styles.testimonials}>
                  <div className={styles.testimonialCard}>
                    <div className={styles.quoteIcon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                      </svg>
                    </div>
                    <p className={styles.testimonialText}>
                      "Dịch vụ nhanh chóng, tư vấn nhiệt tình. Tôi rất hài lòng khi mua tài khoản Premium tại TomOi.vn!"
                    </p>
                    <p className={styles.testimonialAuthor}>- Anh Nguyễn Văn An</p>
                  </div>
                  
                  <div className={styles.testimonialCard}>
                    <div className={styles.quoteIcon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                      </svg>
                    </div>
                    <p className={styles.testimonialText}>
                      "Thanh toán dễ dàng, sản phẩm luôn hoạt động tốt và bảo hành nhanh chóng khi gặp vấn đề."
                    </p>
                    <p className={styles.testimonialAuthor}>- Chị Lê Thị Thu Hương</p>
                  </div>
                  
                  <div className={styles.testimonialCard}>
                    <div className={styles.quoteIcon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                      </svg>
                    </div>
                    <p className={styles.testimonialText}>
                      "TomOi.vn không ngừng cải tiến và phát triển, với mong muốn luôn đồng hành cùng khách hàng Việt Nam trong hành trình trải nghiệm các dịch vụ Premium chất lượng cao, an toàn và đáng tin cậy nhất."
                    </p>
                    <p className={styles.testimonialAuthor}>- Anh Trần Hoàng Nam</p>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="ly-do-mua-hang" style={{display: activeTab === "ly-do-mua-hang" ? 'block' : 'none'}}>
                <h2>Lý do nên mua hàng tại TomOi.vn</h2>
                
                <div className={styles.featureBlock}>
                  <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <p>
                      TomOi.vn là lựa chọn hàng đầu tại Việt Nam trong việc cung cấp các tài khoản Premium chất lượng, đã được hàng ngàn khách hàng tin dùng. Dưới đây là những lý do cụ thể khiến TomOi.vn trở thành lựa chọn đáng tin cậy:
                    </p>
                  </div>
                </div>
                
                <h3>1. Số liệu ấn tượng về độ tin cậy</h3>
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
                      <li>Hơn 5 năm kinh nghiệm cung cấp tài khoản Premium cho thị trường Việt Nam.</li>
                      <li>Trên 100.000 khách hàng hài lòng và tin tưởng sử dụng dịch vụ hàng tháng.</li>
                      <li>99% khách hàng quay lại mua hàng lần thứ hai trở lên sau khi trải nghiệm dịch vụ tại TomOi.vn.</li>
                    </ul>
                  </div>
                </div>
                
                <h3>2. Sản phẩm Premium chất lượng cao</h3>
                <div className={styles.infoBox}>
                  <div className={styles.infoIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <ul>
                      <li>Tài khoản Premium chính hãng từ các nền tảng lớn như Netflix, Spotify, YouTube Premium, Canva Pro, Grammarly Premium, LinkedIn Learning, Coursera, Quillbot, v.v.</li>
                      <li>Đảm bảo không có quảng cáo, truy cập đầy đủ các tính năng cao cấp nhất, và không giới hạn nội dung.</li>
                    </ul>
                  </div>
                </div>
                
                <h3>3. An toàn và bảo mật tuyệt đối</h3>
                <div className={styles.infoBox}>
                  <div className={styles.infoIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <ul>
                      <li>100% tài khoản chính hãng và được kiểm tra kỹ lưỡng trước khi giao cho khách hàng.</li>
                      <li>Không chứa mã độc, virus hay bất kỳ phần mềm độc hại nào, giúp bạn bảo vệ tuyệt đối thông tin cá nhân và dữ liệu cá nhân.</li>
                    </ul>
                  </div>
                </div>
                
                <h3>4. Cài đặt và kích hoạt siêu nhanh</h3>
                <div className={styles.infoBox}>
                  <div className={styles.infoIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="2" x2="12" y2="6"></line>
                      <line x1="12" y1="18" x2="12" y2="22"></line>
                      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                      <line x1="2" y1="12" x2="6" y2="12"></line>
                      <line x1="18" y1="12" x2="22" y2="12"></line>
                      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <ul>
                      <li>Thời gian xử lý đơn hàng trung bình chỉ từ 1-3 phút, giúp bạn tiết kiệm thời gian tối đa.</li>
                      <li>Hướng dẫn rõ ràng, chi tiết kèm theo mỗi sản phẩm, hỗ trợ khách hàng ngay lập tức khi cần thiết.</li>
                    </ul>
                  </div>
                </div>
                
                <h3>5. Quản lý tài khoản thuận tiện và linh hoạt</h3>
                <div className={styles.infoBox}>
                  <div className={styles.infoIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <ul>
                      <li>Dễ dàng quản lý và sử dụng tài khoản trên nhiều thiết bị khác nhau (điện thoại, máy tính, máy tính bảng, Smart TV).</li>
                      <li>Dữ liệu cá nhân và lịch sử sử dụng luôn được đồng bộ hoá liền mạch, đảm bảo trải nghiệm xuyên suốt, không gián đoạn.</li>
                    </ul>
                  </div>
                </div>
                
                <h3>6. Giá cả tốt nhất và chương trình ưu đãi hấp dẫn</h3>
                <div className={styles.infoBox}>
                  <div className={styles.infoIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <ul>
                      <li>Cam kết mức giá cạnh tranh nhất thị trường, đặc biệt ưu đãi cho người dùng tại Việt Nam.</li>
                      <li>Các chương trình ưu đãi diễn ra thường xuyên như giảm giá đặc biệt, hoàn tiền sau mỗi giao dịch, ưu đãi cho khách hàng VIP.</li>
                    </ul>
                  </div>
                </div>
                
                <h3>7. Dịch vụ hỗ trợ khách hàng hàng đầu</h3>
                <div className={styles.infoBox}>
                  <div className={styles.infoIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <ul>
                      <li>Đội ngũ hỗ trợ khách hàng với thời gian phản hồi trung bình chỉ 1-2 phút.</li>
                      <li>Hỗ trợ khách hàng liên tục từ 08:30 đến 23:00 hàng ngày, cả lễ và Tết.</li>
                      <li>Chính sách bảo hành rõ ràng, minh bạch với từng sản phẩm Premium.</li>
                    </ul>
                  </div>
                </div>
                
                <div className={styles.conclusion}>
                  <p>TomOi.vn luôn đồng hành cùng bạn để mang lại trải nghiệm tốt nhất, an toàn nhất và đáng tin cậy nhất cho các dịch vụ tài khoản Premium.</p>
                </div>
              </section>
              
              <section className={styles.section} id="nen-tang-chinh-thuc" style={{display: activeTab === "nen-tang-chinh-thuc" ? 'block' : 'none'}}>
                <h2>Các nền tảng chính thức của TomOi.vn</h2>
                
                <div className={styles.featureBlock}>
                  <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <p>
                      Dưới đây là danh sách chi tiết các kênh truyền thông và hỗ trợ chính thức của TomOi.vn. Các kênh này được quản lý chặt chẽ, giúp khách hàng cập nhật thông tin mới nhất, nhận được hỗ trợ nhanh chóng và hiệu quả nhất:
                    </p>
                  </div>
                </div>
                
                <h3>1. Fanpage Facebook chính thức</h3>
                <div className={styles.infoBox}>
                  <div className={styles.infoIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <ul>
                      <li>Thông tin nhanh chóng, cập nhật các chương trình ưu đãi và tin tức liên tục.</li>
                      <li>Hơn 50.000 lượt theo dõi và đánh giá tích cực từ cộng đồng.</li>
                      <li><strong>Link:</strong> <Link href="https://facebook.com/tomoi.vn" target="_blank">Fanpage Facebook TomOi.vn</Link></li>
                    </ul>
                  </div>
                </div>
                
                <h3>2. Kênh Zalo hỗ trợ</h3>
                <div className={styles.infoBox}>
                  <div className={styles.infoIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <ul>
                      <li>Kênh liên lạc nhanh chóng, tiện lợi, hỗ trợ trực tiếp 1-1.</li>
                      <li>Phản hồi nhanh trong vòng 2-3 phút.</li>
                      <li><strong>Link:</strong> <Link href="https://zalo.me/tomoi" target="_blank">Zalo TomOi.vn</Link></li>
                    </ul>
                  </div>
                </div>
                
                <h3>3. Kênh YouTube TomOi.vn</h3>
                <div className={styles.infoBox}>
                  <div className={styles.infoIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <ul>
                      <li>Hướng dẫn sử dụng sản phẩm và dịch vụ Premium một cách trực quan nhất.</li>
                      <li>Các video được cập nhật thường xuyên, hơn 100 video hướng dẫn chi tiết.</li>
                      <li><strong>Link:</strong> <Link href="https://youtube.com/c/tomoivn" target="_blank">YouTube TomOi.vn</Link></li>
                    </ul>
                  </div>
                </div>
                
                <h3>4. TomOi News (Facebook)</h3>
                <div className={styles.infoBox}>
                  <div className={styles.infoIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <ul>
                      <li>Chuyên cung cấp các tin tức mới nhất về game, phần mềm, và cập nhật thông tin quan trọng liên quan tới tài khoản Premium.</li>
                      <li>Cộng đồng hơn 10.000 người dùng tương tác thường xuyên.</li>
                      <li><strong>Link:</strong> <Link href="https://facebook.com/tomoinews" target="_blank">TomOi News Facebook</Link></li>
                    </ul>
                  </div>
                </div>
                
                <h3>5. Threads</h3>
                <div className={styles.infoBox}>
                  <div className={styles.infoIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <circle cx="12" cy="12" r="4"></circle>
                      <path d="M12 12L12 8"></path>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <ul>
                      <li>Nơi chia sẻ nhanh các thông tin ngắn gọn, súc tích về sản phẩm và dịch vụ.</li>
                      <li>Cập nhật nhanh chóng các chương trình flash sale và ưu đãi đặc biệt.</li>
                      <li><strong>Link:</strong> <Link href="https://threads.net/@tomoi.vn" target="_blank">Threads TomOi.vn</Link></li>
                    </ul>
                  </div>
                </div>
                
                <h3>6. TikTok TomOi.vn</h3>
                <div className={styles.infoBox}>
                  <div className={styles.infoIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <ul>
                      <li>Kênh giải trí kết hợp hướng dẫn sử dụng sản phẩm qua video ngắn, thu hút hơn 30.000 người theo dõi.</li>
                      <li>Tương tác nhanh và gần gũi với cộng đồng khách hàng trẻ.</li>
                      <li><strong>Link:</strong> <Link href="https://tiktok.com/@tomoi.vn" target="_blank">TikTok TomOi.vn</Link></li>
                    </ul>
                  </div>
                </div>
                
                <h3>7. X (Twitter)</h3>
                <div className={styles.infoBox}>
                  <div className={styles.infoIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <ul>
                      <li>Cập nhật thông tin nhanh chóng và tức thì.</li>
                      <li>Kết nối dễ dàng với cộng đồng công nghệ và người dùng sản phẩm bản quyền.</li>
                      <li><strong>Link:</strong> <Link href="https://twitter.com/tomoivn" target="_blank">X TomOi.vn</Link></li>
                    </ul>
                  </div>
                </div>
                
                <div className={styles.conclusion}>
                  <p>TomOi.vn luôn mong muốn tạo điều kiện thuận lợi nhất để khách hàng có thể tiếp cận thông tin nhanh chóng, rõ ràng và đáng tin cậy nhất.</p>
                </div>
              </section>
              
              <section className={styles.section} id="gioi-thieu-chung" style={{display: activeTab !== "gioi-thieu-tomoi" && activeTab !== "ly-do-mua-hang" && activeTab !== "nen-tang-chinh-thuc" ? 'block' : 'none'}}>
                <h2 id="gioi-thieu-chung">Giới thiệu chung</h2>
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
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                            <line x1="8" y1="21" x2="16" y2="21"></line>
                            <line x1="12" y1="17" x2="12" y2="21"></line>
                          </svg>
                        </span>
                        Nạp tiền và thanh toán nhanh chóng
                      </h3>
                      <p>Các phương thức nạp tiền và thanh toán đơn giản, an toàn trên hệ thống TomOi.vn.</p>
                    </div>
                  </li>
                  <li>
                    <div className={styles.featureBlock}>
                      <h3>
                        <span className={styles.icon}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                          </svg>
                        </span>
                        Mua sắm sản phẩm và quản lý đơn hàng
                      </h3>
                      <p>Hướng dẫn quy trình mua sắm, quản lý và theo dõi đơn hàng một cách hiệu quả.</p>
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
                  <li>
                    <div className={styles.featureBlock}>
                      <h3>
                        <span className={styles.icon}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                        </span>
                        Chính sách bảo hành và hậu mãi
                      </h3>
                      <p>Thông tin về quyền lợi bảo hành, điều kiện áp dụng và quy trình hỗ trợ sau mua hàng.</p>
                    </div>
                  </li>
                  <li>
                    <div className={styles.featureBlock}>
                      <h3>
                        <span className={styles.icon}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                          </svg>
                        </span>
                        Hỗ trợ các vấn đề kỹ thuật phổ biến
                      </h3>
                      <p>Giải pháp cho các vấn đề kỹ thuật thường gặp và cách khắc phục nhanh chóng.</p>
                    </div>
                  </li>
                </ul>
              </section>
              
              <section className={styles.section}>
                <h2 id="cau-truc-tai-lieu">Cấu trúc của Tài liệu</h2>
                <p>
                  Tài liệu hướng dẫn được tổ chức rõ ràng thành các nhóm chính như sau:
                </p>
                
                <div className={styles.infoBox}>
                  <div className={styles.infoIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <p>
                      Tài liệu được thiết kế theo hướng người dùng, giúp bạn dễ dàng tìm kiếm thông tin cần thiết dựa trên nhu cầu cụ thể.
                    </p>
                  </div>
                </div>
                
                <h3 id="bat-dau-su-dung">Bắt đầu sử dụng</h3>
                <p>Dành cho người dùng mới, bao gồm hướng dẫn tạo tài khoản, nạp tiền và thiết lập thanh toán.</p>
                <div className={styles.imageContainer}>
                  <img src="/placeholder-image-1.jpg" alt="Hướng dẫn bắt đầu sử dụng" />
                </div>
                
                <h3 id="quy-trinh-mua-hang">Quy trình mua hàng</h3>
                <p>Hướng dẫn từng bước chi tiết, bao gồm các trường hợp đặc biệt như mua hàng không cần tài khoản, mua bằng Steam Wallet và nhận ưu đãi.</p>
                
                <h3 id="quan-ly-tai-khoan">Quản lý tài khoản và đơn hàng</h3>
                <p>Giải thích rõ cách quản lý thông tin cá nhân, lịch sử giao dịch, thay đổi và hủy đơn hàng.</p>
                
                <h3 id="huong-dan-cai-dat">Hướng dẫn cài đặt và sử dụng sản phẩm</h3>
                <p>Bao gồm hướng dẫn rõ ràng về cách kích hoạt, sử dụng và giải quyết các vấn đề kỹ thuật liên quan đến các dịch vụ.</p>
                
                <h3 id="chinh-sach-bao-hanh">Chính sách bảo hành và hậu mãi</h3>
                <p>Trình bày chi tiết quyền lợi bảo hành, điều kiện bảo hành và cách thức liên hệ hỗ trợ nhanh nhất.</p>
                
                <h3 id="cau-hoi-thuong-gap">Câu hỏi thường gặp (FAQ)</h3>
                <p>Tổng hợp các thắc mắc phổ biến để giúp bạn giải quyết vấn đề nhanh chóng.</p>
              </section>
              
              <section className={styles.section}>
                <h2 id="cach-tim-kiem">Cách tìm kiếm thông tin</h2>
                <p>
                  Bạn có thể dễ dàng tìm kiếm nhanh thông tin bằng cách sử dụng hộp tìm kiếm ("Search") ở góc trên cùng bên phải của trang. Chỉ cần nhập từ khóa hoặc câu hỏi liên quan, hệ thống sẽ hiển thị kết quả phù hợp nhất.
                </p>
                <div className={styles.features}>
                  <div className={styles['feature-card']}>
                    <h3>Tìm kiếm theo từ khóa</h3>
                    <p>Nhập từ khóa liên quan đến vấn đề bạn đang tìm kiếm.</p>
                    <div className={styles.tagList}>
                      <span className={styles.tag}>Nhanh chóng</span>
                      <span className={styles.tag}>Chính xác</span>
                      <span className={styles.tag}>Toàn diện</span>
                    </div>
                  </div>
                  <div className={styles['feature-card']}>
                    <h3>Tìm theo danh mục</h3>
                    <p>Duyệt qua các danh mục chính để tìm thông tin cần thiết.</p>
                    <div className={styles.tagList}>
                      <span className={styles.tag}>Có cấu trúc</span>
                      <span className={styles.tag}>Dễ điều hướng</span>
                    </div>
                  </div>
                </div>
              </section>
              
              <section className={styles.section}>
                <h2 id="huong-dan-xem-anh">Hướng dẫn xem ảnh chi tiết</h2>
                <p>
                  Để dễ dàng theo dõi các bước hướng dẫn trực quan, bạn có thể nhấp chuột vào bất kỳ hình ảnh nào trong bài viết để phóng to và quan sát rõ ràng hơn.
                </p>
                <div className={styles.imageContainer}>
                  <img src="/placeholder-image-2.jpg" alt="Hướng dẫn xem ảnh chi tiết" />
                </div>
              </section>
              
              <section className={styles.section}>
                <h2 id="khong-tim-thay-thong-tin">Không tìm thấy thông tin bạn cần?</h2>
                <p>
                  Trong trường hợp bạn không tìm thấy hướng dẫn cụ thể hoặc gặp khó khăn nào đó, vui lòng liên hệ ngay với bộ phận Chăm sóc Khách hàng của chúng tôi để nhận được hỗ trợ nhanh nhất:
                </p>
                
                <div className={styles.contactSection}>
                  <div className={styles.contactOption}>
                    <div className={styles.contactIcon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3>Trò chuyện trực tuyến (Live Chat)</h3>
                      <p>Hỗ trợ nhanh chóng, hoạt động liên tục 24/7.</p>
                    </div>
                  </div>
                  
                  <div className={styles.contactOption}>
                    <div className={styles.contactIcon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3>Hotline & Email</h3>
                      <p>Liên hệ trực tiếp để được tư vấn và xử lý nhanh các vấn đề quan trọng.</p>
                    </div>
                  </div>
                </div>
                
                <p>
                  TomOi.vn luôn sẵn sàng hỗ trợ bạn trong mọi tình huống, đảm bảo bạn có trải nghiệm dịch vụ tốt nhất và hài lòng nhất. Chúng tôi luôn nỗ lực hoàn thiện hơn mỗi ngày để phục vụ bạn chu đáo hơn.
                </p>
                
                <div className={styles['cta-buttons']}>
                  <Link href="/contact" className={`${styles.button} ${styles.primary}`}>Liên hệ hỗ trợ</Link>
                  <Link href="/faq" className={`${styles.button} ${styles.secondary}`}>Xem câu hỏi thường gặp</Link>
                </div>
                
                <p className={styles['intro-text']} style={{ marginTop: '2rem', textAlign: 'center', fontStyle: 'italic' }}>
                  Cảm ơn bạn đã đồng hành và tin tưởng TomOi.vn!
                </p>
              </section>

              <div className={styles.lastUpdated}>
                <p>Cập nhật lần cuối: {lastUpdated}</p>
              </div>
            </div>
          </div>
        </main>
        
        <div className={styles.tableOfContents}>
          <div className={styles.tocTitle}>Mục lục</div>
          <ul className={styles.tocList}>
            <li className={styles.tocItem}>
              <a 
                href="#gioi-thieu-tomoi" 
                className={`${styles.tocLink} ${activeSection === "gioi-thieu-tomoi" ? styles.tocLinkActive : ""}`}
                onClick={(e) => { e.preventDefault(); navigateToSection("gioi-thieu-tomoi"); }}
              >
                Giới thiệu về TomOi.vn
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#gioi-thieu-chung" 
                className={`${styles.tocLink} ${activeSection === "gioi-thieu-chung" ? styles.tocLinkActive : ""}`}
                onClick={(e) => { e.preventDefault(); navigateToSection("gioi-thieu-chung"); }}
              >
                Giới thiệu chung
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#cau-truc-tai-lieu" 
                className={`${styles.tocLink} ${activeSection === "cau-truc-tai-lieu" ? styles.tocLinkActive : ""}`}
                onClick={(e) => { e.preventDefault(); navigateToSection("cau-truc-tai-lieu"); }}
              >
                Cấu trúc của Tài liệu
              </a>
              <ul className={styles.tocList} style={{ paddingLeft: '1rem' }}>
                <li className={styles.tocItem}>
                  <a 
                    href="#bat-dau-su-dung" 
                    className={`${styles.tocLink} ${activeSection === "bat-dau-su-dung" ? styles.tocLinkActive : ""}`}
                    onClick={(e) => { e.preventDefault(); navigateToSection("bat-dau-su-dung"); }}
                  >
                    Bắt đầu sử dụng
                  </a>
                </li>
                <li className={styles.tocItem}>
                  <a 
                    href="#quy-trinh-mua-hang" 
                    className={`${styles.tocLink} ${activeSection === "quy-trinh-mua-hang" ? styles.tocLinkActive : ""}`}
                    onClick={(e) => { e.preventDefault(); navigateToSection("quy-trinh-mua-hang"); }}
                  >
                    Quy trình mua hàng
                  </a>
                </li>
                <li className={styles.tocItem}>
                  <a 
                    href="#quan-ly-tai-khoan" 
                    className={`${styles.tocLink} ${activeSection === "quan-ly-tai-khoan" ? styles.tocLinkActive : ""}`}
                    onClick={(e) => { e.preventDefault(); navigateToSection("quan-ly-tai-khoan"); }}
                  >
                    Quản lý tài khoản
                  </a>
                </li>
                <li className={styles.tocItem}>
                  <a 
                    href="#huong-dan-cai-dat" 
                    className={`${styles.tocLink} ${activeSection === "huong-dan-cai-dat" ? styles.tocLinkActive : ""}`}
                    onClick={(e) => { e.preventDefault(); navigateToSection("huong-dan-cai-dat"); }}
                  >
                    Hướng dẫn cài đặt
                  </a>
                </li>
                <li className={styles.tocItem}>
                  <a 
                    href="#chinh-sach-bao-hanh" 
                    className={`${styles.tocLink} ${activeSection === "chinh-sach-bao-hanh" ? styles.tocLinkActive : ""}`}
                    onClick={(e) => { e.preventDefault(); navigateToSection("chinh-sach-bao-hanh"); }}
                  >
                    Chính sách bảo hành
                  </a>
                </li>
                <li className={styles.tocItem}>
                  <a 
                    href="#cau-hoi-thuong-gap" 
                    className={`${styles.tocLink} ${activeSection === "cau-hoi-thuong-gap" ? styles.tocLinkActive : ""}`}
                    onClick={(e) => { e.preventDefault(); navigateToSection("cau-hoi-thuong-gap"); }}
                  >
                    Câu hỏi thường gặp
                  </a>
                </li>
              </ul>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#cach-tim-kiem" 
                className={`${styles.tocLink} ${activeSection === "cach-tim-kiem" ? styles.tocLinkActive : ""}`}
                onClick={(e) => { e.preventDefault(); navigateToSection("cach-tim-kiem"); }}
              >
                Cách tìm kiếm thông tin
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#huong-dan-xem-anh" 
                className={`${styles.tocLink} ${activeSection === "huong-dan-xem-anh" ? styles.tocLinkActive : ""}`}
                onClick={(e) => { e.preventDefault(); navigateToSection("huong-dan-xem-anh"); }}
              >
                Hướng dẫn xem ảnh chi tiết
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#khong-tim-thay-thong-tin" 
                className={`${styles.tocLink} ${activeSection === "khong-tim-thay-thong-tin" ? styles.tocLinkActive : ""}`}
                onClick={(e) => { e.preventDefault(); navigateToSection("khong-tim-thay-thong-tin"); }}
              >
                Không tìm thấy thông tin?
              </a>
            </li>
          </ul>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles['footer-content']}>
          <p>&copy; {new Date().getFullYear()} TomOi.vn. Tất cả các quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
};

export default DocsPage; 