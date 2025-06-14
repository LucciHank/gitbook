"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../../docs/styles.module.css';
import SearchModal from '../../components/SearchModal';
import NavigationButtons from '../../components/NavigationButtons';
import MobileMenu from '../../components/MobileMenu';
import Sidebar from '../../components/Sidebar';

export default function QuanLyTaiKhoanPage() {
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
    title: "Tổng quan website",
    path: "/gioi-thieu/tong-quan-website"
  };
  
  const nextPage = {
    title: "Hướng dẫn nạp tiền",
    path: "/huong-dan-mua-hang/huong-dan-nap-tien"
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
            <h1>Quản lý tài khoản tại TomOi.vn</h1>
            <div className={styles.breadcrumbs}>
              <Link href="/">Trang chủ</Link> <span>/</span> <Link href="/huong-dan-mua-hang">Hướng dẫn mua hàng</Link> <span>/</span> <span>Quản lý tài khoản</span>
            </div>
          </div>
          
          <div className={styles.content}>
            <div className={styles.contentCard}>
              <p className={styles['intro-text']}>
                Tài liệu này hướng dẫn chi tiết cách quản lý tài khoản TomOi.vn, bao gồm đăng ký, đăng nhập, khôi phục mật khẩu và bảo mật tài khoản với xác thực hai lớp (2FA).
              </p>
              
              <section className={styles.section} id="dang-ky-tai-khoan">
                <h2>1. Hướng dẫn đăng ký tài khoản</h2>
                
                <div className={styles.featureBlock}>
                  <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <p>
                      TomOi.vn cung cấp hai phương thức đăng ký tài khoản đơn giản và bảo mật: đăng ký trực tiếp với xác minh OTP qua email hoặc đăng ký nhanh thông qua tài khoản Google.
                    </p>
                  </div>
                </div>
                
                <h3>Đăng ký trực tiếp (có xác minh OTP 6 số qua email)</h3>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h4>Truy cập trang chủ TomOi.vn, chọn nút "Đăng ký" ở góc trên cùng bên phải.</h4>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/dang-ky-1.png" alt="Bước 1: Truy cập trang đăng ký" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h4>Điền đầy đủ thông tin:</h4>
                    <ul>
                      <li><strong>Tên đăng nhập (Username):</strong> viết liền không dấu, không ký tự đặc biệt, dễ nhớ, dài từ 6-15 ký tự.</li>
                      <li><strong>Email:</strong> nhập chính xác, sử dụng email thường xuyên vì mã OTP xác minh và thông tin giao dịch sẽ được gửi qua email này.</li>
                      <li><strong>Mật khẩu:</strong> mạnh, từ 8-20 ký tự, bao gồm ít nhất một chữ cái viết hoa, một chữ số và một ký tự đặc biệt.</li>
                    </ul>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/dang-ky-2.png" alt="Bước 2: Điền thông tin đăng ký" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h4>Kiểm tra lại thông tin và nhấn nút "Tạo tài khoản".</h4>
                    <p>Một mã OTP gồm 6 chữ số sẽ ngay lập tức được gửi tới email bạn vừa đăng ký (thời gian nhận mã thông thường dưới 60 giây).</p>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/dang-ky-3.png" alt="Bước 3: Nhấn nút tạo tài khoản" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>4</div>
                  <div className={styles.stepContent}>
                    <h4>Mở email, nhập mã OTP nhận được vào ô xác nhận trên website, sau đó click "Xác nhận" để hoàn tất.</h4>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/dang-ky-4.png" alt="Bước 4: Nhập mã OTP xác nhận" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.alertBox}>
                  <div className={styles.alertIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <div className={styles.alertContent}>
                    <p><strong>Lưu ý:</strong> Nếu không nhận được mã OTP sau 60 giây, vui lòng kiểm tra thư mục spam/junk trong email hoặc nhấn "Gửi lại OTP".</p>
                  </div>
                </div>
                
                <h3>Đăng ký bằng Google</h3>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h4>Tại trang đăng ký, click vào nút "Đăng ký bằng Google".</h4>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/dang-ky-google-1.png" alt="Bước 1: Chọn đăng ký bằng Google" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h4>Chọn tài khoản Google bạn muốn sử dụng.</h4>
                    <p>Đảm bảo rằng tài khoản Google của bạn đã được xác minh và hoạt động bình thường.</p>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/dang-ky-google-2.png" alt="Bước 2: Chọn tài khoản Google" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h4>Hệ thống tự động nhập thông tin từ tài khoản Google và hoàn tất đăng ký.</h4>
                    <p>Quá trình này diễn ra nhanh chóng, chỉ trong khoảng từ 10-20 giây.</p>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/dang-ky-google-3.png" alt="Bước 3: Hoàn tất đăng ký bằng Google" className={styles.guideImage} />
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
                    <p><strong>Lưu ý quan trọng:</strong> Khi đăng ký bằng Google, hệ thống sẽ tự động liên kết tài khoản TomOi.vn với tài khoản Google của bạn. Hãy ghi nhớ bạn đã sử dụng tài khoản Google nào để đăng ký.</p>
                  </div>
                </div>
              </section>
              
              <section className={styles.section} id="dang-nhap-tai-khoan">
                <h2>2. Hướng dẫn đăng nhập tài khoản</h2>
                
                <div className={styles.featureBlock}>
                  <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                      <polyline points="10 17 15 12 10 7"></polyline>
                      <line x1="15" y1="12" x2="3" y2="12"></line>
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <p>
                      TomOi.vn cung cấp hai phương thức đăng nhập tiện lợi và bảo mật: đăng nhập bằng Email/Username hoặc đăng nhập nhanh thông qua tài khoản Google đã liên kết.
                    </p>
                  </div>
                </div>
                
                <h3>Đăng nhập bằng Email/Username</h3>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h4>Truy cập trang chủ, click nút "Đăng nhập".</h4>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/dang-nhap-1.png" alt="Bước 1: Truy cập trang đăng nhập" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h4>Nhập chính xác Email hoặc Username đã đăng ký và mật khẩu.</h4>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/dang-nhap-2.png" alt="Bước 2: Nhập thông tin đăng nhập" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h4>Click "Đăng nhập" để hoàn tất đăng nhập.</h4>
                    <p>Quá trình đăng nhập diễn ra nhanh chóng chỉ trong khoảng 5-10 giây.</p>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/dang-nhap-3.png" alt="Bước 3: Hoàn tất đăng nhập" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.alertBox}>
                  <div className={styles.alertIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <div className={styles.alertContent}>
                    <p><strong>Lưu ý:</strong> Nếu bạn đã bật xác thực hai lớp (2FA), sau khi nhập thông tin đăng nhập, hệ thống sẽ yêu cầu bạn nhập mã xác thực từ email hoặc ứng dụng xác thực.</p>
                  </div>
                </div>
                
                <h3>Đăng nhập bằng Google</h3>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h4>Click vào nút "Đăng nhập bằng Google" tại trang đăng nhập.</h4>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/dang-nhap-google-1.png" alt="Bước 1: Chọn đăng nhập bằng Google" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h4>Chọn tài khoản Google bạn đã sử dụng để đăng ký.</h4>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/dang-nhap-google-2.png" alt="Bước 2: Chọn tài khoản Google" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h4>Đăng nhập ngay lập tức, hệ thống xác minh và hoàn tất trong vài giây.</h4>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/dang-nhap-google-3.png" alt="Bước 3: Hoàn tất đăng nhập bằng Google" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.tipBox}>
                  <div className={styles.tipIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                      <line x1="9" y1="9" x2="9.01" y2="9"></line>
                      <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    </svg>
                  </div>
                  <div className={styles.tipContent}>
                    <p><strong>Mẹo:</strong> Đăng nhập bằng Google là cách nhanh nhất và an toàn nhất để truy cập vào tài khoản TomOi.vn mà không cần phải nhớ mật khẩu.</p>
                  </div>
                </div>
              </section>

              <section className={styles.section} id="dat-lai-mat-khau">
                <h2>3. Hướng dẫn đặt lại mật khẩu khi quên</h2>
                
                <div className={styles.featureBlock}>
                  <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <p>
                      TomOi.vn cung cấp quy trình đặt lại mật khẩu an toàn và nhanh chóng thông qua xác minh OTP gửi đến email đã đăng ký.
                    </p>
                  </div>
                </div>
                
                <h3>Đặt lại mật khẩu (xác minh OTP 6 số qua email)</h3>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h4>Tại trang đăng nhập, click vào liên kết "Quên mật khẩu?".</h4>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/quen-mat-khau-1.png" alt="Bước 1: Chọn Quên mật khẩu" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h4>Nhập email bạn dùng để đăng ký tài khoản và click "Gửi OTP".</h4>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/quen-mat-khau-2.png" alt="Bước 2: Nhập email và gửi OTP" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h4>Kiểm tra email và nhập mã OTP gồm 6 số được gửi về.</h4>
                    <p>Thời gian gửi OTP tối đa khoảng 60 giây. Nếu không nhận được, hãy kiểm tra thư mục spam hoặc nhấn "Gửi lại OTP".</p>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/quen-mat-khau-3.png" alt="Bước 3: Nhập mã OTP xác nhận" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>4</div>
                  <div className={styles.stepContent}>
                    <h4>Tạo mật khẩu mới an toàn và click "Xác nhận".</h4>
                    <p>Hệ thống sẽ cập nhật mật khẩu ngay lập tức và bạn có thể đăng nhập với mật khẩu mới.</p>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/quen-mat-khau-4.png" alt="Bước 4: Tạo mật khẩu mới" className={styles.guideImage} />
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
                    <p><strong>Lưu ý quan trọng:</strong> Mật khẩu mới phải đảm bảo từ 8-20 ký tự, bao gồm ít nhất một chữ cái viết hoa, một chữ số và một ký tự đặc biệt. Không sử dụng mật khẩu đã dùng trước đó để đảm bảo an toàn cho tài khoản.</p>
                  </div>
                </div>
                
                <div className={styles.tipBox}>
                  <div className={styles.tipIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </div>
                  <div className={styles.tipContent}>
                    <p><strong>Mẹo bảo mật:</strong> Nếu bạn thường xuyên quên mật khẩu, hãy cân nhắc sử dụng phương thức đăng nhập bằng Google để truy cập tài khoản TomOi.vn một cách an toàn và tiện lợi.</p>
                  </div>
                </div>
              </section>

              <section className={styles.section} id="bao-mat-tai-khoan">
                <h2>4. Bảo mật tài khoản với xác thực hai lớp (2FA)</h2>
                
                <div className={styles.featureBlock}>
                  <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div className={styles.featureContent}>
                    <p>
                      TomOi.vn hỗ trợ tính năng xác thực hai lớp (2FA) nhằm bảo vệ tài khoản của bạn một cách toàn diện, đặc biệt quan trọng khi thực hiện các giao dịch tài chính và đăng nhập.
                    </p>
                  </div>
                </div>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h4>Đăng nhập vào tài khoản TomOi.vn, chọn mục "Bảo mật tài khoản" từ menu tài khoản.</h4>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/2fa-1.png" alt="Bước 1: Truy cập mục Bảo mật tài khoản" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h4>Bật tính năng "Xác thực hai lớp" bằng email hoặc ứng dụng xác thực theo hướng dẫn.</h4>
                    <p>Bạn có thể chọn phương thức xác thực qua email hoặc qua ứng dụng xác thực như Google Authenticator.</p>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/2fa-2.png" alt="Bước 2: Bật tính năng xác thực hai lớp" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h4>Nhập mã OTP 6 số xác thực mà bạn nhận được qua email hoặc từ ứng dụng xác thực.</h4>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/2fa-3.png" alt="Bước 3: Nhập mã OTP xác thực" className={styles.guideImage} />
                    </div>
                  </div>
                </div>
                
                <div className={styles.stepBlock}>
                  <div className={styles.stepNumber}>4</div>
                  <div className={styles.stepContent}>
                    <h4>Click nút "Xác nhận". Hệ thống thông báo xác thực hai lớp được kích hoạt thành công.</h4>
                    <p>Từ giờ, mỗi lần đăng nhập hoặc giao dịch quan trọng, bạn sẽ cần nhập mã OTP, đảm bảo mức độ bảo mật cao nhất cho tài khoản.</p>
                    <div className={styles.imageContainer}>
                      <img src="/images/huong-dan/2fa-4.png" alt="Bước 4: Hoàn tất kích hoạt 2FA" className={styles.guideImage} />
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
                    <p><strong>Lưu ý quan trọng:</strong> Nếu bạn chọn xác thực qua ứng dụng như Google Authenticator, hãy lưu lại mã dự phòng được cung cấp. Mã này sẽ giúp bạn truy cập tài khoản trong trường hợp mất thiết bị hoặc không thể sử dụng ứng dụng xác thực.</p>
                  </div>
                </div>
                
                <div className={styles.tipBox}>
                  <div className={styles.tipIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                      <line x1="9" y1="9" x2="9.01" y2="9"></line>
                      <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    </svg>
                  </div>
                  <div className={styles.tipContent}>
                    <p><strong>Mẹo bảo mật:</strong> Kích hoạt xác thực hai lớp là biện pháp bảo mật tốt nhất để bảo vệ tài khoản TomOi.vn của bạn khỏi các truy cập trái phép, đặc biệt nếu tài khoản của bạn có số dư lớn hoặc thường xuyên thực hiện giao dịch.</p>
                  </div>
                </div>
              </section>
              
              <div className={styles.lastUpdated}>
                <p>Cập nhật lần cuối: {lastUpdated}</p>
              </div>
              
              <NavigationButtons prevPage={prevPage} nextPage={nextPage} />
            </div>
          </div>
        </main>
        
        <aside className={styles.tableOfContents}>
          <div className={styles.tocTitle}>Mục lục</div>
          <ul className={styles.tocList}>
            <li className={styles.tocItem}>
              <a 
                href="#dang-ky-tai-khoan" 
                className={`${styles.tocLink} ${activeSection === "dang-ky-tai-khoan" ? styles.tocLinkActive : ""}`}
              >
                Hướng dẫn đăng ký tài khoản
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#dang-nhap-tai-khoan" 
                className={`${styles.tocLink} ${activeSection === "dang-nhap-tai-khoan" ? styles.tocLinkActive : ""}`}
              >
                Hướng dẫn đăng nhập tài khoản
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#dat-lai-mat-khau" 
                className={`${styles.tocLink} ${activeSection === "dat-lai-mat-khau" ? styles.tocLinkActive : ""}`}
              >
                Hướng dẫn đặt lại mật khẩu khi quên
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#bao-mat-tai-khoan" 
                className={`${styles.tocLink} ${activeSection === "bao-mat-tai-khoan" ? styles.tocLinkActive : ""}`}
              >
                Bảo mật tài khoản với xác thực hai lớp (2FA)
              </a>
            </li>
          </ul>
        </aside>
      </div>

      <SearchModal isOpen={searchModalOpen} onClose={closeSearchModal} />
    </div>
  );
} 