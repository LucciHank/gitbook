"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Head from 'next/head';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../docs/styles.module.css';
import SearchModal from '../../components/SearchModal';
import NavigationButtons from '../../components/NavigationButtons';
import MobileMenu from '../../components/MobileMenu';
import Sidebar from '../../components/Sidebar';

// Lazy load components
const LazyImage = (props: any) => (
  <Suspense fallback={<div className={styles.imagePlaceholder}></div>}>
    <Image {...props} loading="lazy" />
  </Suspense>
);

// Metadata được di chuyển vào trong component để sử dụng với Head
const pageMetadata = {
  title: 'Hướng dẫn nạp tiền tại TomOi.vn - Chi tiết các phương thức nạp tiền',
  description: 'Hướng dẫn chi tiết cách nạp tiền vào tài khoản TomOi.vn bằng chuyển khoản ngân hàng OCB và thẻ cào Viettel. Thực hiện nhanh chóng, an toàn và dễ dàng.',
  keywords: 'nạp tiền, TomOi.vn, chuyển khoản ngân hàng, thẻ cào Viettel, hướng dẫn nạp tiền, tài khoản TomOi',
  openGraph: {
    title: 'Hướng dẫn nạp tiền tại TomOi.vn - Chi tiết các phương thức nạp tiền',
    description: 'Hướng dẫn chi tiết cách nạp tiền vào tài khoản TomOi.vn bằng chuyển khoản ngân hàng OCB và thẻ cào Viettel.',
    url: 'https://tomoi.vn/huong-dan-mua-hang/huong-dan-nap-tien',
    type: 'article',
  }
};

export default function HuongDanNapTienPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  
  // Tạo ngày hiện tại theo định dạng DD/MM/YYYY
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();
  const lastUpdated = `${day}/${month}/${year}`;

  // Hàm sao chép văn bản vào clipboard
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopySuccess(type);
        setTimeout(() => setCopySuccess(null), 2000);
      })
      .catch(err => {
        console.error('Không thể sao chép văn bản: ', err);
      });
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

  // Cấu hình điều hướng
  const prevPage = {
    title: "Quản lý tài khoản",
    path: "/huong-dan-mua-hang/quan-ly-tai-khoan",
    url: "/huong-dan-mua-hang/quan-ly-tai-khoan"
  };
  
  const nextPage = {
    title: "Hướng dẫn thanh toán",
    path: "/huong-dan-mua-hang/huong-dan-thanh-toan",
    url: "/huong-dan-mua-hang/huong-dan-thanh-toan"
  };

  return (
    <div className={styles['docs-container']}>
      <Head>
        <title>{pageMetadata.title}</title>
        <meta name="description" content={pageMetadata.description} />
        <meta name="keywords" content={pageMetadata.keywords} />
        <meta property="og:title" content={pageMetadata.openGraph.title} />
        <meta property="og:description" content={pageMetadata.openGraph.description} />
        <meta property="og:url" content={pageMetadata.openGraph.url} />
        <meta property="og:type" content={pageMetadata.openGraph.type} />
      </Head>
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
                Tài liệu này hướng dẫn chi tiết cách nạp tiền vào tài khoản TomOi.vn một cách nhanh chóng, an toàn và thuận tiện nhất. Hiện tại, TomOi.vn hỗ trợ hai phương thức nạp tiền chính để bạn có thể linh hoạt lựa chọn phù hợp với nhu cầu của mình.
              </p>
              
              <div className={styles.methodsContainer}>
                <div className={styles.methodCard}>
                  <div className={styles.methodIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DF2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                      <line x1="2" y1="10" x2="22" y2="10"></line>
                    </svg>
                  </div>
                  <div className={styles.methodContent}>
                    <h3 className={styles.methodTitle}>Chuyển khoản ngân hàng</h3>
                    <p className={styles.methodDesc}>Nạp tiền nhanh chóng và an toàn qua Ngân hàng OCB - Ngân hàng Phương Đông. Tiền được cộng tự động vào tài khoản trong vòng 1-5 phút.</p>
                    <a href="#chuyen-khoan-ngan-hang" className={styles.methodLink}>Xem hướng dẫn</a>
                  </div>
                </div>
                <div className={styles.methodCard}>
                  <div className={styles.methodIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DF2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  <div className={styles.methodContent}>
                    <h3 className={styles.methodTitle}>Thẻ cào điện thoại</h3>
                    <p className={styles.methodDesc}>Nạp tiền tiện lợi thông qua thẻ cào Viettel. Phù hợp khi bạn không có tài khoản ngân hàng hoặc cần nạp tiền nhanh.</p>
                    <a href="#nap-the-cao" className={styles.methodLink}>Xem hướng dẫn</a>
                  </div>
                </div>
              </div>
              
              <div className={styles.infoBox}>
                <div className={styles.infoIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DF2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </div>
                <div className={styles.infoContent}>
                  <h3>Lưu ý về nạp tiền</h3>
                  <p>Để đảm bảo quá trình nạp tiền diễn ra suôn sẻ, vui lòng đọc kỹ hướng dẫn trước khi thực hiện. Nếu gặp bất kỳ khó khăn nào, hãy liên hệ ngay với đội ngũ hỗ trợ khách hàng của TomOi.vn qua email <a href="mailto:support@tomoi.vn">support@tomoi.vn</a> hoặc hotline <a href="tel:0987654321">0987.654.321</a>.</p>
                </div>
              </div>

              <section className={styles.section} id="chuyen-khoan-ngan-hang">
                <h2>1. Hướng dẫn nạp tiền bằng chuyển khoản ngân hàng</h2>
                
                <div className={styles.stepContainer}>
                  <div className={styles.stepCard}>
                    <div className={styles.stepHeader}>
                      <div className={styles.stepBadge}>1</div>
                      <h3 className={styles.stepTitle}>Truy cập trang nạp tiền</h3>
                    </div>
                    <div className={styles.stepBody}>
                      <ul className={styles.stepList}>
                        <li>Đăng nhập vào tài khoản của bạn trên TomOi.vn</li>
                        <li>Chọn vào mục <strong>"Nạp tiền"</strong> tại biểu tượng số dư trên thanh menu</li>
                      </ul>
                      <div className={styles.imageWrapper}>
                        <LazyImage 
                          src="/images/huong-dan/nap-tien-1.png" 
                          alt="Bước 1: Truy cập trang nạp tiền" 
                          width={600} 
                          height={350} 
                          className={styles.guideImage} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.stepCard}>
                    <div className={styles.stepHeader}>
                      <div className={styles.stepBadge}>2</div>
                      <h3 className={styles.stepTitle}>Chọn phương thức chuyển khoản ngân hàng</h3>
                    </div>
                    <div className={styles.stepBody}>
                      <p>Trong các phương thức thanh toán hiển thị, hãy chọn mục <strong>"Chuyển khoản ngân hàng"</strong></p>
                      <div className={styles.imageWrapper}>
                        <LazyImage 
                          src="/images/huong-dan/nap-tien-2.png" 
                          alt="Bước 2: Chọn phương thức chuyển khoản ngân hàng" 
                          width={600} 
                          height={350} 
                          className={styles.guideImage} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.stepCard}>
                    <div className={styles.stepHeader}>
                      <div className={styles.stepBadge}>3</div>
                      <h3 className={styles.stepTitle}>Thực hiện chuyển khoản</h3>
                    </div>
                    <div className={styles.stepBody}>
                      <p>Sử dụng thông tin chuyển khoản dưới đây để thực hiện giao dịch:</p>
                      
                      <div className={styles.bankInfoCard}>
                        <div className={styles.bankHeader}>
                          <div className={styles.bankLogo}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#DF2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                              <line x1="2" y1="10" x2="22" y2="10"></line>
                            </svg>
                          </div>
                          <div className={styles.bankName}>OCB - Ngân hàng Phương Đông</div>
                        </div>
                        <div className={styles.bankDetails}>
                          <div className={styles.bankInfoRow}>
                            <div className={styles.bankInfoLabel}>Số tài khoản:</div>
                            <div className={styles.bankInfoValue}>
                              <span className={styles.copyText}>0562147786</span>
                              <button className={styles.copyButton} title="Sao chép số tài khoản" onClick={() => copyToClipboard("0562147786", "Số tài khoản")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                              </button>
                              {copySuccess === "Số tài khoản" && (
                                <span className={styles.copySuccess}>Đã sao chép!</span>
                              )}
                            </div>
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
                            <div className={styles.bankInfoValue}>
                              <span className={styles.copyText}>CK [Tên đăng nhập của bạn]</span>
                              <button className={styles.copyButton} title="Sao chép nội dung chuyển khoản" onClick={() => copyToClipboard("CK [Tên đăng nhập của bạn]", "Nội dung chuyển khoản")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                              </button>
                              {copySuccess === "Nội dung chuyển khoản" && (
                                <span className={styles.copySuccess}>Đã sao chép!</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={styles.imageWrapper}>
                        <LazyImage 
                          src="/images/huong-dan/nap-tien-3.png" 
                          alt="Bước 3: Thực hiện chuyển khoản" 
                          width={600} 
                          height={350} 
                          className={styles.guideImage} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.alertCard}>
                  <div className={styles.alertHeader}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DF2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <h3>Lưu ý quan trọng</h3>
                  </div>
                  <div className={styles.alertBody}>
                    <ul className={styles.alertList}>
                      <li>Bạn nên chuyển khoản cùng ngân hàng để tiền vào tài khoản nhanh nhất (thường trong vòng 1-5 phút). Nếu chuyển từ ngân hàng khác, hãy sử dụng dịch vụ chuyển tiền nhanh 24/7 để tiền vào tài khoản kịp thời.</li>
                      <li>Bắt buộc phải ghi <strong>chính xác nội dung chuyển khoản</strong> (CK [Tên đăng nhập]), nếu sai, hệ thống sẽ không thể tự động cộng tiền vào tài khoản của bạn.</li>
                      <li>Trong trường hợp đã chuyển khoản nhưng sau 30 phút vẫn chưa được cộng tiền, vui lòng liên hệ ngay với bộ phận hỗ trợ khách hàng để được hỗ trợ.</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="nap-the-cao">
                <h2>2. Hướng dẫn nạp tiền bằng thẻ cào Viettel</h2>
                
                <div className={styles.stepContainer}>
                  <div className={styles.stepCard}>
                    <div className={styles.stepHeader}>
                      <div className={styles.stepBadge}>1</div>
                      <h3 className={styles.stepTitle}>Chọn phương thức nạp thẻ cào Viettel</h3>
                    </div>
                    <div className={styles.stepBody}>
                      <ul className={styles.stepList}>
                        <li>Đăng nhập vào tài khoản TomOi.vn và chọn vào mục <strong>"Nạp tiền"</strong></li>
                        <li>Click vào phương thức <strong>"Nạp tiền qua thẻ cào Viettel"</strong></li>
                      </ul>
                      <div className={styles.imageWrapper}>
                        <LazyImage 
                          src="/images/huong-dan/nap-the-cao-1.png" 
                          alt="Bước 1: Chọn phương thức nạp thẻ cào Viettel" 
                          width={600} 
                          height={350} 
                          className={styles.guideImage} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.stepCard}>
                    <div className={styles.stepHeader}>
                      <div className={styles.stepBadge}>2</div>
                      <h3 className={styles.stepTitle}>Nhập thông tin thẻ cào</h3>
                    </div>
                    <div className={styles.stepBody}>
                      <p>Điền đầy đủ và chính xác các thông tin sau:</p>
                      <div className={styles.cardInfoBox}>
                        <div className={styles.cardInfoItem}>
                          <div className={styles.cardInfoIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DF2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                              <line x1="2" y1="10" x2="22" y2="10"></line>
                            </svg>
                          </div>
                          <div className={styles.cardInfoContent}>
                            <h4>Mệnh giá thẻ cào</h4>
                            <p>Chọn đúng mệnh giá của thẻ cào bạn đang có</p>
                          </div>
                        </div>
                        <div className={styles.cardInfoItem}>
                          <div className={styles.cardInfoIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DF2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                          </div>
                          <div className={styles.cardInfoContent}>
                            <h4>Số Serial của thẻ</h4>
                            <p>Dãy số in ở mặt sau của thẻ cào</p>
                          </div>
                        </div>
                        <div className={styles.cardInfoItem}>
                          <div className={styles.cardInfoIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DF2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                              <path d="M7 7h.01M7 12h.01M7 17h.01M12 7h.01M12 12h.01M12 17h.01M17 7h.01M17 12h.01M17 17h.01"></path>
                            </svg>
                          </div>
                          <div className={styles.cardInfoContent}>
                            <h4>Mã thẻ cào</h4>
                            <p>Dãy số được phủ lớp bạc cần cào để lấy mã</p>
                          </div>
                        </div>
                      </div>
                      <div className={styles.imageWrapper}>
                        <LazyImage 
                          src="/images/huong-dan/nap-the-cao-2.png" 
                          alt="Bước 2: Nhập thông tin thẻ cào" 
                          width={600} 
                          height={350} 
                          className={styles.guideImage} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.stepCard}>
                    <div className={styles.stepHeader}>
                      <div className={styles.stepBadge}>3</div>
                      <h3 className={styles.stepTitle}>Kiểm tra và xác nhận</h3>
                    </div>
                    <div className={styles.stepBody}>
                      <ul className={styles.stepList}>
                        <li>Kiểm tra kỹ lại thông tin thẻ cào vừa nhập</li>
                        <li>Bấm <strong>"Nạp tiền"</strong> để hoàn tất quá trình nạp tiền</li>
                      </ul>
                      <div className={styles.imageWrapper}>
                        <LazyImage 
                          src="/images/huong-dan/nap-the-cao-3.png" 
                          alt="Bước 3: Kiểm tra và xác nhận" 
                          width={600} 
                          height={350} 
                          className={styles.guideImage} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.alertCard}>
                  <div className={styles.alertHeader}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DF2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <h3>Lưu ý quan trọng</h3>
                  </div>
                  <div className={styles.alertBody}>
                    <ul className={styles.alertList}>
                      <li>Nhập <strong>chính xác</strong> thông tin mệnh giá, số Serial và mã thẻ. Nếu sai sót trong việc nhập các thông tin này, bạn sẽ mất thẻ và TomOi.vn sẽ không chịu trách nhiệm trong trường hợp này.</li>
                      <li>Sau khi gửi thẻ, bạn sẽ nhận được thông báo xác nhận qua email trong vòng 1-3 phút.</li>
                      <li>Hiện tại, TomOi.vn chỉ hỗ trợ nạp thẻ cào Viettel. Các loại thẻ khác sẽ được cập nhật trong thời gian tới.</li>
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