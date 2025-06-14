"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../../docs/styles.module.css';
import SearchModal from '../../components/SearchModal';
import NavigationButtons from '../../components/NavigationButtons';
import MobileMenu from '../../components/MobileMenu';
import Sidebar from '../../components/Sidebar';

export default function HuongDanNapTienPage() {
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
    title: "Quản lý tài khoản",
    path: "/huong-dan-mua-hang/quan-ly-tai-khoan"
  };
  
  const nextPage = {
    title: "Hướng dẫn thanh toán",
    path: "/huong-dan-mua-hang/huong-dan-thanh-toan"
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
            <h1>Hướng dẫn nạp tiền tại TomOi.vn</h1>
            <div className={styles.breadcrumbs}>
              <Link href="/">Trang chủ</Link> <span>/</span> <Link href="/huong-dan-mua-hang">Hướng dẫn mua hàng</Link> <span>/</span> <span>Hướng dẫn nạp tiền</span>
            </div>
          </div>
          
          <div className={styles.content}>
            <div className={styles.contentCard}>
              <p className={styles['intro-text']}>
                Bài viết này sẽ hướng dẫn chi tiết từng bước để bạn thực hiện nạp tiền vào tài khoản TomOi.vn một cách nhanh chóng, an toàn và thuận tiện nhất. Hiện tại, TomOi.vn hỗ trợ hai hình thức nạp tiền chính:
              </p>
              
              <div className={styles.methodsContainer}>
                <div className={styles.method}>
                  <div className={styles.methodIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                      <line x1="2" y1="10" x2="22" y2="10"></line>
                    </svg>
                  </div>
                  <div className={styles.methodName}>Chuyển khoản ngân hàng</div>
                  <div className={styles.methodDesc}>(Ngân hàng OCB - Ngân hàng Phương Đông)</div>
                </div>
                <div className={styles.method}>
                  <div className={styles.methodIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <line x1="6" y1="12" x2="6" y2="12.01"></line>
                      <line x1="10" y1="12" x2="10" y2="12.01"></line>
                      <line x1="14" y1="12" x2="14" y2="12.01"></line>
                      <line x1="18" y1="12" x2="18" y2="12.01"></line>
                      <line x1="6" y1="16" x2="6" y2="16.01"></line>
                      <line x1="10" y1="16" x2="10" y2="16.01"></line>
                      <line x1="14" y1="16" x2="14" y2="16.01"></line>
                      <line x1="18" y1="16" x2="18" y2="16.01"></line>
                    </svg>
                  </div>
                  <div className={styles.methodName}>Nạp tiền thông qua thẻ cào điện thoại</div>
                  <div className={styles.methodDesc}>(Thẻ cào Viettel)</div>
                </div>
              </div>
              
              <section className={styles.section} id="chuyen-khoan-ngan-hang">
                <h2>1. Hướng dẫn nạp tiền bằng chuyển khoản ngân hàng</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h4>Truy cập trang nạp tiền</h4>
                    <ul>
                      <li>Đăng nhập vào tài khoản của bạn trên TomOi.vn.</li>
                      <li>Chọn vào mục "Nạp tiền" tại biểu tượng số dư trên thanh menu.</li>
                    </ul>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/nap-tien-1.png" alt="Bước 1: Truy cập trang nạp tiền" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h4>Chọn phương thức chuyển khoản ngân hàng</h4>
                    <ul>
                      <li>Chọn mục "Chuyển khoản ngân hàng" trong các phương thức thanh toán.</li>
                    </ul>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/nap-tien-2.png" alt="Bước 2: Chọn phương thức chuyển khoản ngân hàng" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h4>Thực hiện chuyển khoản</h4>
                    <p>Sử dụng thông tin chuyển khoản dưới đây để thực hiện giao dịch:</p>
                    
                    <div className={styles.bankInfoBox}>
                      <div className={styles.bankInfoRow}>
                        <div className={styles.bankInfoLabel}>Ngân hàng:</div>
                        <div className={styles.bankInfoValue}>OCB - Ngân hàng Phương Đông</div>
                      </div>
                      <div className={styles.bankInfoRow}>
                        <div className={styles.bankInfoLabel}>Số tài khoản:</div>
                        <div className={styles.bankInfoValue}>0562147786</div>
                      </div>
                      <div className={styles.bankInfoRow}>
                        <div className={styles.bankInfoLabel}>Chủ tài khoản:</div>
                        <div className={styles.bankInfoValue}>Do Hoang Anh</div>
                      </div>
                      <div className={styles.bankInfoRow}>
                        <div className={styles.bankInfoLabel}>Chi nhánh:</div>
                        <div className={styles.bankInfoValue}>Hà Nội</div>
                      </div>
                      <div className={styles.bankInfoRow}>
                        <div className={styles.bankInfoLabel}>Nội dung chuyển khoản:</div>
                        <div className={styles.bankInfoValue}>CK [Tên đăng nhập của bạn]</div>
                      </div>
                    </div>
                    
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/nap-tien-3.png" alt="Bước 3: Thực hiện chuyển khoản" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.alertBox}>
                  <div className={styles.alertIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <div className={styles.alertContent}>
                    <p><strong>Lưu ý quan trọng:</strong></p>
                    <ul>
                      <li>Bạn nên chuyển khoản cùng ngân hàng để tiền vào tài khoản nhanh nhất (thường trong vòng 1-5 phút). Nếu chuyển từ ngân hàng khác, hãy sử dụng dịch vụ chuyển tiền nhanh 24/7 để tiền vào tài khoản kịp thời.</li>
                      <li>Bắt buộc phải ghi chính xác nội dung chuyển khoản (CK [Tên đăng nhập]), nếu sai, hệ thống sẽ không thể tự động cộng tiền vào tài khoản của bạn. Trong trường hợp sai sót này, bạn phải liên hệ hỗ trợ khách hàng để được xử lý thủ công.</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="nap-the-cao">
                <h2>2. Hướng dẫn nạp tiền bằng thẻ cào Viettel</h2>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h4>Chọn phương thức nạp thẻ cào Viettel</h4>
                    <ul>
                      <li>Đăng nhập vào tài khoản TomOi.vn và chọn vào mục "Nạp tiền".</li>
                      <li>Click vào phương thức "Nạp tiền qua thẻ cào Viettel".</li>
                    </ul>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/nap-the-cao-1.png" alt="Bước 1: Chọn phương thức nạp thẻ cào Viettel" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h4>Nhập thông tin thẻ cào</h4>
                    <p>Điền đầy đủ và chính xác các thông tin sau:</p>
                    <ul>
                      <li>Mệnh giá thẻ cào</li>
                      <li>Số Serial của thẻ (dãy số phía sau thẻ)</li>
                      <li>Mã thẻ cào (dãy số được phủ kín)</li>
                    </ul>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/nap-the-cao-2.png" alt="Bước 2: Nhập thông tin thẻ cào" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h4>Kiểm tra và xác nhận</h4>
                    <ul>
                      <li>Kiểm tra kỹ lại thông tin thẻ cào vừa nhập.</li>
                      <li>Bấm "Nạp tiền" để hoàn tất quá trình nạp tiền.</li>
                    </ul>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/nap-the-cao-3.png" alt="Bước 3: Kiểm tra và xác nhận" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.alertBox}>
                  <div className={styles.alertIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <div className={styles.alertContent}>
                    <p><strong>Lưu ý quan trọng:</strong></p>
                    <ul>
                      <li>Nhập chính xác thông tin mệnh giá, số Serial và mã thẻ. Nếu sai sót trong việc nhập các thông tin này, bạn sẽ mất thẻ và TomOi.vn sẽ không chịu trách nhiệm trong trường hợp này.</li>
                      <li>Sau khi gửi thẻ, bạn sẽ nhận được thông báo xác nhận qua email trong vòng 1-3 phút.</li>
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
                href="#chuyen-khoan-ngan-hang" 
                className={`${styles.tocLink} ${activeSection === "chuyen-khoan-ngan-hang" ? styles.tocLinkActive : ""}`}
              >
                Hướng dẫn nạp tiền bằng chuyển khoản ngân hàng
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#nap-the-cao" 
                className={`${styles.tocLink} ${activeSection === "nap-the-cao" ? styles.tocLinkActive : ""}`}
              >
                Hướng dẫn nạp tiền bằng thẻ cào Viettel
              </a>
            </li>
          </ul>
        </aside>
      </div>

      <SearchModal isOpen={searchModalOpen} onClose={closeSearchModal} />
    </div>
  );
}