"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../docs/styles.module.css';
import SearchModal from '../../components/SearchModal';
import NavigationButtons from '../../components/NavigationButtons';
import MobileMenu from '../../components/MobileMenu';
import Sidebar from '../../components/Sidebar';

export default function ChinhSachBaoMatPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  
  // Tạo ngày hiện tại theo định dạng DD/MM/YYYY
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();
  const lastUpdated = `${day}/${month}/${year}`;

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
    title: "Điều khoản dịch vụ",
    path: "/gioi-thieu/dieu-khoan-dich-vu",
    url: "/gioi-thieu/dieu-khoan-dich-vu"
  };
  
  const nextPage = {
    title: "Quản lý tài khoản",
    path: "/huong-dan-mua-hang/quan-ly-tai-khoan",
    url: "/huong-dan-mua-hang/quan-ly-tai-khoan"
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
      {searchModalOpen && <SearchModal isOpen={searchModalOpen} onClose={closeSearchModal} />}

      <div className={styles['content-wrapper']}>
        <aside className={styles.sidebar}>
          <Sidebar />
        </aside>

        <main className={styles['main-content']}>
          <div className={styles['content-header']}>
            <h1>Chính sách bảo mật</h1>
            <div className={styles.breadcrumbs}>
              <Link href="/">Trang chủ</Link> <span>/</span> <Link href="/gioi-thieu">Giới thiệu</Link> <span>/</span> <span>Chính sách bảo mật</span>
            </div>
          </div>
          
          <div className={styles.content}>
            <div className={styles.contentCard}>
              <div className={styles.toc}>
                <h2>Mục lục</h2>
                <ul>
                  <li><a href="#gioi-thieu">1. Giới thiệu</a></li>
                  <li><a href="#thu-thap-thong-tin">2. Thu thập thông tin</a></li>
                  <li><a href="#su-dung-thong-tin">3. Sử dụng thông tin</a></li>
                  <li><a href="#bao-mat-thong-tin">4. Bảo mật thông tin</a></li>
                  <li><a href="#quyen-cua-nguoi-dung">5. Quyền của người dùng</a></li>
                  <li><a href="#thay-doi-chinh-sach">6. Thay đổi chính sách</a></li>
                </ul>
              </div>
              
              <section className={styles.section} id="gioi-thieu">
                <h2>1. Giới thiệu</h2>
                <p>
                  TomOi.vn cam kết bảo vệ quyền riêng tư và thông tin cá nhân của khách hàng. Chính sách bảo mật này mô tả cách chúng tôi thu thập, sử dụng, bảo vệ và chia sẻ thông tin của bạn khi bạn truy cập hoặc sử dụng dịch vụ của TomOi.vn.
                </p>
                <p>
                  Bằng việc sử dụng dịch vụ của chúng tôi, bạn đồng ý với các điều khoản được nêu trong chính sách bảo mật này. Nếu bạn không đồng ý với chính sách của chúng tôi, vui lòng không sử dụng dịch vụ của TomOi.vn.
                </p>
              </section>
              
              <section className={styles.section} id="thu-thap-thong-tin">
                <h2>2. Thu thập thông tin</h2>
                <p>
                  TomOi.vn thu thập thông tin cá nhân của bạn khi:
                </p>
                <ul>
                  <li>Bạn đăng ký tài khoản trên TomOi.vn</li>
                  <li>Bạn thực hiện giao dịch mua hàng</li>
                  <li>Bạn liên hệ với bộ phận hỗ trợ khách hàng</li>
                  <li>Bạn tham gia các chương trình khuyến mãi hoặc khảo sát</li>
                  <li>Bạn truy cập và sử dụng website của chúng tôi</li>
                </ul>
                <p>
                  Thông tin chúng tôi thu thập có thể bao gồm:
                </p>
                <ul>
                  <li>Họ tên, địa chỉ email, số điện thoại</li>
                  <li>Thông tin thanh toán (không lưu trữ đầy đủ thông tin thẻ)</li>
                  <li>Lịch sử mua hàng và sử dụng dịch vụ</li>
                  <li>Thông tin thiết bị và trình duyệt khi bạn truy cập website</li>
                  <li>Dữ liệu về cách bạn tương tác với website của chúng tôi</li>
                </ul>
              </section>
              
              <section className={styles.section} id="su-dung-thong-tin">
                <h2>3. Sử dụng thông tin</h2>
                <p>
                  Chúng tôi sử dụng thông tin thu thập được để:
                </p>
                <ul>
                  <li>Cung cấp, duy trì và cải thiện dịch vụ của chúng tôi</li>
                  <li>Xử lý giao dịch và gửi thông báo liên quan đến giao dịch</li>
                  <li>Cung cấp hỗ trợ khách hàng và phản hồi yêu cầu</li>
                  <li>Gửi thông tin cập nhật, thông báo kỹ thuật và thông báo bảo mật</li>
                  <li>Phát hiện, ngăn chặn và xử lý các hoạt động gian lận hoặc bất hợp pháp</li>
                  <li>Nghiên cứu và phân tích để cải thiện trải nghiệm người dùng</li>
                </ul>
              </section>
              
              <section className={styles.section} id="bao-mat-thong-tin">
                <h2>4. Bảo mật thông tin</h2>
                <p>
                  TomOi.vn áp dụng các biện pháp bảo mật hợp lý để bảo vệ thông tin cá nhân của bạn khỏi truy cập trái phép, sửa đổi, tiết lộ hoặc phá hủy. Các biện pháp này bao gồm:
                </p>
                <ul>
                  <li>Mã hóa dữ liệu nhạy cảm sử dụng công nghệ SSL</li>
                  <li>Hạn chế quyền truy cập vào thông tin cá nhân</li>
                  <li>Duy trì các biện pháp bảo mật vật lý, điện tử và quy trình</li>
                  <li>Thường xuyên đánh giá và cập nhật các biện pháp bảo mật</li>
                </ul>
                <p>
                  Tuy nhiên, không có phương thức truyền qua internet hoặc phương thức lưu trữ điện tử nào là an toàn 100%. Do đó, mặc dù chúng tôi nỗ lực bảo vệ thông tin cá nhân của bạn, chúng tôi không thể đảm bảo an ninh tuyệt đối.
                </p>
              </section>
              
              <section className={styles.section} id="quyen-cua-nguoi-dung">
                <h2>5. Quyền của người dùng</h2>
                <p>
                  Bạn có các quyền sau đối với thông tin cá nhân của mình:
                </p>
                <ul>
                  <li>Quyền truy cập và xem thông tin cá nhân mà chúng tôi lưu giữ về bạn</li>
                  <li>Quyền yêu cầu sửa đổi hoặc cập nhật thông tin không chính xác</li>
                  <li>Quyền yêu cầu xóa thông tin cá nhân trong một số trường hợp</li>
                  <li>Quyền phản đối hoặc hạn chế việc xử lý thông tin cá nhân</li>
                  <li>Quyền rút lại sự đồng ý đã cung cấp trước đó</li>
                </ul>
                <p>
                  Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi qua email: support@tomoi.vn
                </p>
              </section>
              
              <section className={styles.section} id="thay-doi-chinh-sach">
                <h2>6. Thay đổi chính sách</h2>
                <p>
                  Chúng tôi có thể cập nhật Chính sách Bảo mật này theo thời gian để phản ánh những thay đổi về thực tiễn thông tin của chúng tôi hoặc vì các lý do hoạt động, pháp lý hoặc quy định khác.
                </p>
                <p>
                  Chúng tôi sẽ thông báo cho bạn về những thay đổi quan trọng bằng cách đăng thông báo rõ ràng trên trang web của chúng tôi hoặc bằng cách gửi email trực tiếp cho bạn.
                </p>
                <p>
                  Chúng tôi khuyến khích bạn xem xét định kỳ Chính sách Bảo mật này để biết cách chúng tôi bảo vệ thông tin của bạn.
                </p>
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
              <a href="#gioi-thieu" className={styles.tocLink}>
                Giới thiệu
              </a>
            </li>
            <li className={styles.tocItem}>
              <a href="#thu-thap-thong-tin" className={styles.tocLink}>
                Thu thập thông tin
              </a>
            </li>
            <li className={styles.tocItem}>
              <a href="#su-dung-thong-tin" className={styles.tocLink}>
                Sử dụng thông tin
              </a>
            </li>
            <li className={styles.tocItem}>
              <a href="#bao-mat-thong-tin" className={styles.tocLink}>
                Bảo mật thông tin
              </a>
            </li>
            <li className={styles.tocItem}>
              <a href="#quyen-cua-nguoi-dung" className={styles.tocLink}>
                Quyền của người dùng
              </a>
            </li>
            <li className={styles.tocItem}>
              <a href="#thay-doi-chinh-sach" className={styles.tocLink}>
                Thay đổi chính sách
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
} 