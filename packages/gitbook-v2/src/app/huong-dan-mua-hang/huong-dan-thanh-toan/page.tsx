"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../../docs/styles.module.css';
import SearchModal from '../../components/SearchModal';
import NavigationButtons from '../../components/NavigationButtons';
import MobileMenu from '../../components/MobileMenu';
import Sidebar from '../../components/Sidebar';

export default function HuongDanThanhToanPage() {
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

  // Cấu hình điều hướng
  const prevPage = {
    title: "Hướng dẫn nạp tiền",
    path: "/huong-dan-mua-hang/huong-dan-nap-tien"
  };
  
  const nextPage = {
    title: "Tra cứu lịch sử nạp tiền",
    path: "/huong-dan-mua-hang/tra-cuu-lich-su-nap-tien"
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
            <h1>Hướng dẫn thanh toán tại TomOi.vn</h1>
            <div className={styles.breadcrumbs}>
              <Link href="/">Trang chủ</Link> <span>/</span> <Link href="/huong-dan-mua-hang">Hướng dẫn mua hàng</Link> <span>/</span> <span>Hướng dẫn thanh toán</span>
            </div>
          </div>
          
          <div className={styles.content}>
            <div className={styles.contentCard}>
              <p className={styles['intro-text']}>
                Bài viết này sẽ hướng dẫn chi tiết, đầy đủ các bước để bạn có thể thanh toán nhanh chóng, an toàn và thuận tiện nhất tại TomOi.vn.
              </p>
              
              <section className={styles.section} id="chon-san-pham">
                <h2>Bước 1: Chọn sản phẩm muốn mua</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <p>Truy cập vào website TomOi.vn và tìm kiếm sản phẩm Premium bạn muốn mua.</p>
                    <p>Click vào nút "Mua Ngay" nếu bạn muốn mua ngay sản phẩm đó hoặc chọn "Thêm vào giỏ hàng" nếu muốn mua thêm sản phẩm khác.</p>
                    
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/thanh-toan-1.png" alt="Chọn sản phẩm muốn mua" className={styles.guideImage} />
                    </div>
                    
                    <h3>Phân loại sản phẩm:</h3>
                    
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
                          <li><strong>Tài khoản trả về ngay:</strong> Bạn sẽ nhận được tài khoản ngay lập tức sau khi thanh toán thành công.</li>
                          <li>
                            <strong>Tài khoản nâng cấp chính chủ:</strong> Khi thêm vào giỏ hàng, bạn cần cung cấp thông tin tài khoản để TomOi.vn tiến hành nâng cấp. Các thông tin cần thiết bao gồm:
                            <ul>
                              <li>Tên đăng nhập</li>
                              <li>Mật khẩu</li>
                              <li>Phương thức đăng nhập (Google, Facebook, Apple, trực tiếp, hoặc khác)</li>
                            </ul>
                          </li>
                        </ul>
                        <p><strong>Lưu ý:</strong> TomOi.vn cam kết bảo mật thông tin tài khoản của bạn tuyệt đối 100%, không sử dụng thông tin sai mục đích. Sau khi nâng cấp thành công, bạn nên đổi mật khẩu để đảm bảo an toàn cho tài khoản.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="kiem-tra-gio-hang">
                <h2>Bước 2: Kiểm tra và xác nhận giỏ hàng</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <ul>
                      <li>Sau khi chọn xong sản phẩm, truy cập vào biểu tượng giỏ hàng ở góc trên bên phải trang web.</li>
                      <li>Kiểm tra các sản phẩm đã chọn, số lượng và tổng số tiền cần thanh toán.</li>
                      <li>Nếu bạn muốn mua sản phẩm làm quà tặng, hãy nhập email của người nhận vào ô "Tặng cho bạn bè". Thông tin sản phẩm sẽ được gửi trực tiếp vào email này.</li>
                      <li>Nếu mua cho bản thân, để trống ô này.</li>
                    </ul>
                    
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/thanh-toan-2.png" alt="Kiểm tra và xác nhận giỏ hàng" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="thanh-toan-so-du">
                <h2>Bước 3: Thanh toán bằng số dư tài khoản</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <p>Nếu tài khoản của bạn chưa đủ số dư (Dcoin) để thanh toán, hệ thống sẽ hiển thị thông báo yêu cầu nạp thêm tiền.</p>
                    <p>Nhấn nút "Nạp thêm tiền" và thực hiện theo các bước trong hướng dẫn nạp tiền (xem lại tại <Link href="/huong-dan-mua-hang/huong-dan-nap-tien">hướng dẫn nạp tiền</Link>).</p>
                    
                    <h3>Các phương thức nạp tiền:</h3>
                    <ul>
                      <li>Chuyển khoản ngân hàng OCB (chi tiết xem lại <Link href="/huong-dan-mua-hang/huong-dan-nap-tien#chuyen-khoan-ngan-hang">tại đây</Link>)</li>
                      <li>Thẻ cào Viettel (chi tiết xem lại <Link href="/huong-dan-mua-hang/huong-dan-nap-tien#nap-the-cao">tại đây</Link>)</li>
                    </ul>
                    
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/thanh-toan-3.png" alt="Thanh toán bằng số dư tài khoản" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="hoan-tat-thanh-toan">
                <h2>Bước 4: Hoàn tất thanh toán</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <p>Sau khi nạp tiền thành công và số dư tài khoản đã đủ, quay trở lại giỏ hàng.</p>
                    <p>Click nút "Thanh toán bằng số dư" để tiến hành thanh toán.</p>
                    
                    <h3>Xác thực bảo mật hai lớp:</h3>
                    <ul>
                      <li>TomOi.vn mặc định kích hoạt bảo mật hai lớp (2FA) cho mọi giao dịch thanh toán.</li>
                      <li>Hệ thống sẽ gửi một mã OTP gồm 6 chữ số về email đăng ký của bạn.</li>
                      <li>Kiểm tra email, nhập mã OTP vào ô xác thực và bấm "Xác nhận".</li>
                    </ul>
                    
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/thanh-toan-4.png" alt="Hoàn tất thanh toán" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="nhan-san-pham">
                <h2>Bước 5: Nhận sản phẩm</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepContent}>
                    <h3>Với tài khoản trả về ngay:</h3>
                    <p>Sau khi thanh toán, bạn sẽ được chuyển tới trang đơn hàng và nhận ngay thông tin tài khoản Premium hoặc hướng dẫn sử dụng.</p>
                    
                    <h3>Với tài khoản nâng cấp chính chủ:</h3>
                    <ul>
                      <li>Sau khi thanh toán, TomOi.vn sẽ tiến hành nâng cấp theo thông tin bạn đã cung cấp. Quá trình này thường diễn ra từ 10 phút đến 24 giờ tùy sản phẩm.</li>
                      <li>Bạn hãy thường xuyên kiểm tra email, bộ phận hỗ trợ khách hàng sẽ cập nhật tình trạng xử lý cho bạn.</li>
                      <li>Sau khi nhận được email thông báo nâng cấp thành công, hãy nhanh chóng đổi mật khẩu tài khoản để đảm bảo an toàn tuyệt đối.</li>
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
                        <p>Nếu thời gian xử lý vượt quá thời gian cam kết và bạn chưa nhận được sản phẩm, vui lòng liên hệ ngay với bộ phận Chăm sóc khách hàng của TomOi.vn qua hotline hoặc email hỗ trợ để được giải quyết nhanh chóng nhất.</p>
                      </div>
                    </div>
                    
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/thanh-toan-5.png" alt="Nhận sản phẩm" className={styles.guideImage} />
                    </div>
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
                href="#chon-san-pham" 
                className={`${styles.tocLink} ${activeSection === "chon-san-pham" ? styles.tocLinkActive : ""}`}
              >
                Bước 1: Chọn sản phẩm muốn mua
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#kiem-tra-gio-hang" 
                className={`${styles.tocLink} ${activeSection === "kiem-tra-gio-hang" ? styles.tocLinkActive : ""}`}
              >
                Bước 2: Kiểm tra và xác nhận giỏ hàng
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#thanh-toan-so-du" 
                className={`${styles.tocLink} ${activeSection === "thanh-toan-so-du" ? styles.tocLinkActive : ""}`}
              >
                Bước 3: Thanh toán bằng số dư tài khoản
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#hoan-tat-thanh-toan" 
                className={`${styles.tocLink} ${activeSection === "hoan-tat-thanh-toan" ? styles.tocLinkActive : ""}`}
              >
                Bước 4: Hoàn tất thanh toán
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#nhan-san-pham" 
                className={`${styles.tocLink} ${activeSection === "nhan-san-pham" ? styles.tocLinkActive : ""}`}
              >
                Bước 5: Nhận sản phẩm
              </a>
            </li>
          </ul>
        </aside>
      </div>

      <SearchModal isOpen={searchModalOpen} onClose={closeSearchModal} />
    </div>
  );
}
