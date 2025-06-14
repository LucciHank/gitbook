"use client"; 

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../../docs/styles.module.css';
import SearchModal from '../../components/SearchModal';
import NavigationButtons from '../../components/NavigationButtons';
import MobileMenu from '../../components/MobileMenu';
import Sidebar from '../../components/Sidebar';

export default function TraCuuLichSuDonHangPage() {
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
    title: "Tra cứu lịch sử nạp tiền",
    path: "/huong-dan-mua-hang/tra-cuu-lich-su-nap-tien"
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
            <h1>Hướng dẫn tra cứu lịch sử đơn hàng tại TomOi.vn</h1>
            <div className={styles.breadcrumbs}>
              <Link href="/">Trang chủ</Link> <span>/</span> <Link href="/huong-dan-mua-hang">Hướng dẫn mua hàng</Link> <span>/</span> <span>Tra cứu lịch sử đơn hàng</span>
            </div>
          </div>
          
          <div className={styles.content}>
            <div className={styles.contentCard}>
              <p className={styles['intro-text']}>
                Bài viết này sẽ hướng dẫn bạn cách xem và quản lý chi tiết lịch sử các đơn hàng đã giao dịch trên TomOi.vn một cách rõ ràng, đầy đủ và dễ dàng nhất.
              </p>
              
              <section className={styles.section} id="dang-nhap">
                <h2>Bước 1: Đăng nhập vào tài khoản</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <p>Truy cập vào TomOi.vn và đăng nhập tài khoản bằng username hoặc email bạn đã đăng ký.</p>
                    <p>Nếu chưa đăng nhập, vui lòng đăng nhập để tiếp tục.</p>
                    
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/tra-cuu-don-hang-1.png" alt="Đăng nhập vào tài khoản" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="truy-cap-lich-su">
                <h2>Bước 2: Truy cập vào mục "Lịch sử đơn hàng"</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <p>Sau khi đăng nhập, click vào tên tài khoản của bạn ở góc trên bên phải.</p>
                    <p>Chọn mục "Lịch sử đơn hàng" từ menu dropdown hiển thị.</p>
                    
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/tra-cuu-don-hang-2.png" alt="Truy cập vào mục Lịch sử đơn hàng" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="xem-danh-sach">
                <h2>Bước 3: Xem danh sách lịch sử đơn hàng</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <p>Danh sách các đơn hàng sẽ được hiển thị đầy đủ với các thông tin cụ thể như:</p>
                    
                    <ul>
                      <li><strong>Mã đơn hàng:</strong> Mã duy nhất giúp bạn theo dõi và xác nhận giao dịch.</li>
                      <li><strong>Ngày đặt hàng:</strong> Thời điểm chính xác bạn thực hiện mua hàng.</li>
                      <li><strong>Tên sản phẩm:</strong> Sản phẩm Premium bạn đã mua.</li>
                      <li><strong>Số tiền thanh toán:</strong> Giá trị cụ thể của từng đơn hàng.</li>
                      <li><strong>Trạng thái đơn hàng:</strong> Đã hoàn thành, Đang xử lý, Chờ thanh toán hoặc Đã hủy.</li>
                    </ul>
                    
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/tra-cuu-don-hang-3.png" alt="Xem danh sách lịch sử đơn hàng" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="bo-loc-tim-kiem">
                <h2>Bước 4: Bộ lọc tìm kiếm đơn hàng</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <p>Bạn có thể sử dụng bộ lọc tìm kiếm để tìm đơn hàng theo các điều kiện cụ thể:</p>
                    
                    <ul>
                      <li><strong>Mã đơn hàng:</strong> Nhập mã chính xác của đơn hàng.</li>
                      <li><strong>Ngày đặt hàng:</strong> Chọn khoảng thời gian cụ thể (từ ngày – đến ngày).</li>
                      <li><strong>Giá trị đơn hàng:</strong> Lọc theo mức tiền cụ thể (từ số tiền – đến số tiền).</li>
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
                        <p><strong>Ví dụ cụ thể:</strong></p>
                        <p>Nếu muốn kiểm tra đơn hàng trong tháng 5/2024, bạn chọn:</p>
                        <ul>
                          <li>Ngày tạo từ: 01/05/2024</li>
                          <li>Ngày tạo đến: 31/05/2024</li>
                        </ul>
                        <p>Sau khi nhấn tìm kiếm, hệ thống sẽ hiển thị danh sách đơn hàng kèm tổng tiền phát sinh trong tháng 5/2024.</p>
                      </div>
                    </div>
                    
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/tra-cuu-don-hang-4.png" alt="Bộ lọc tìm kiếm đơn hàng" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="chi-tiet-don-hang">
                <h2>Bước 5: Chi tiết từng đơn hàng</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <p>Để xem thông tin chi tiết của đơn hàng, click vào "Xem chi tiết" tại mỗi đơn hàng. Các thông tin chi tiết bao gồm:</p>
                    
                    <ul>
                      <li><strong>Tình trạng đơn hàng:</strong> Xác nhận chính xác tình trạng giao dịch (Hoàn thành, Đang xử lý, Chờ thanh toán, Đã hủy).</li>
                      <li><strong>Thông tin tài khoản sản phẩm:</strong> Tài khoản Premium, key kích hoạt (nếu có).</li>
                      <li><strong>Hướng dẫn sử dụng:</strong> Chi tiết cách kích hoạt và sử dụng sản phẩm.</li>
                      <li><strong>Biên lai giao dịch:</strong> Hiển thị đầy đủ biên lai chi tiết để bạn dễ dàng theo dõi và đối chiếu khi cần thiết.</li>
                    </ul>
                    
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/tra-cuu-don-hang-5.png" alt="Chi tiết từng đơn hàng" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="xuat-file">
                <h2>Bước 6: Xuất file thông tin đơn hàng</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <p>Nếu bạn cần lưu giữ hoặc theo dõi lịch sử giao dịch chi tiết, hãy chọn nút "Xuất file" để tải xuống thông tin đơn hàng dưới dạng Excel hoặc PDF.</p>
                    
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/tra-cuu-don-hang-6.png" alt="Xuất file thông tin đơn hàng" className={styles.guideImage} />
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
                      <li>Thường xuyên kiểm tra lịch sử đơn hàng để đảm bảo tất cả giao dịch đều chính xác.</li>
                      <li>Nếu phát hiện sai sót hoặc cần hỗ trợ thêm, vui lòng liên hệ ngay bộ phận chăm sóc khách hàng TomOi.vn. Thời gian phản hồi thông thường từ bộ phận hỗ trợ chỉ từ 5-10 phút kể từ khi tiếp nhận yêu cầu của bạn.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <NavigationButtons prevPage={prevPage} />
              
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
                Bước 2: Truy cập vào mục "Lịch sử đơn hàng"
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#xem-danh-sach" 
                className={`${styles.tocLink} ${activeSection === "xem-danh-sach" ? styles.tocLinkActive : ""}`}
              >
                Bước 3: Xem danh sách lịch sử đơn hàng
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#bo-loc-tim-kiem" 
                className={`${styles.tocLink} ${activeSection === "bo-loc-tim-kiem" ? styles.tocLinkActive : ""}`}
              >
                Bước 4: Bộ lọc tìm kiếm đơn hàng
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#chi-tiet-don-hang" 
                className={`${styles.tocLink} ${activeSection === "chi-tiet-don-hang" ? styles.tocLinkActive : ""}`}
              >
                Bước 5: Chi tiết từng đơn hàng
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#xuat-file" 
                className={`${styles.tocLink} ${activeSection === "xuat-file" ? styles.tocLinkActive : ""}`}
              >
                Bước 6: Xuất file thông tin đơn hàng
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
