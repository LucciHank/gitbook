"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../../docs/styles.module.css';
import SearchModal from '../../components/SearchModal';
import NavigationButtons from '../../components/NavigationButtons';

export default function DieuKhoanDichVuPage() {
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
    url: "/gioi-thieu/tong-quan-website"
  };
  
  const nextPage = {
    title: "Chính sách bảo mật",
    url: "/gioi-thieu/chinh-sach-bao-mat"
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
              <li>
                <Link href="/gioi-thieu/nen-tang-chinh-thuc" onClick={toggleMobileMenu}>
                  Các nền tảng chính thức
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu/tong-quan-website" onClick={toggleMobileMenu}>Tổng quan website</Link>
              </li>
              <li className={styles.active}>
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
                <li>
                  <Link href="/gioi-thieu/tong-quan-website">Tổng quan website</Link>
                </li>
                <li className={styles.active}>
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
            <h1>Điều khoản dịch vụ</h1>
            <div className={styles.breadcrumbs}>
              <Link href="/">Trang chủ</Link> <span>/</span> <Link href="/gioi-thieu">Giới thiệu</Link> <span>/</span> <span>Điều khoản dịch vụ</span>
            </div>
          </div>
          
          <div className={styles.content}>
            <div className={styles.contentCard}>
              <section className={styles.section} id="dieu-kien-su-dung">
                <h2>1. Điều kiện sử dụng website</h2>
                <ul>
                  <li>Mọi người đều có thể sử dụng website TomOi.vn, đối với trẻ nhỏ khi truy cập dưới sự giám sát của cha mẹ/người giám hộ hợp pháp.</li>
                  <li>Khi đăng ký tài khoản, khách hàng phải cung cấp thông tin chính xác, đầy đủ và cập nhật thường xuyên nếu có thay đổi.</li>
                  <li>Cấm tuyệt đối việc sử dụng nội dung, tài nguyên từ TomOi.vn cho mục đích thương mại hoặc thay mặt bên thứ ba nếu chưa được phép bằng văn bản của TomOi.vn.</li>
                </ul>
              </section>
              
              <section className={styles.section} id="quyen-so-huu">
                <h2>2. Quyền sở hữu phản hồi và nhận xét</h2>
                <p>
                  Tất cả các ý kiến, đóng góp từ khách hàng khi gửi đến TomOi.vn sẽ trở thành tài sản của chúng tôi. Nếu phát hiện thông tin giả mạo hoặc gây hại uy tín của TomOi.vn, tài khoản của người dùng sẽ bị khóa ngay lập tức và có thể bị truy tố theo luật pháp Việt Nam.
                </p>
              </section>
              
              <section className={styles.section} id="chinh-sach-xu-ly">
                <h2>4. Chính sách xử lý đơn hàng</h2>
                <p>
                  TomOi.vn có quyền từ chối hoặc hủy bỏ đơn hàng nếu phát sinh:
                </p>
                <ul>
                  <li>Lỗi kỹ thuật, lỗi hệ thống hoặc sai sót khách quan trong quá trình vận hành.</li>
                  <li>Đặt hàng vượt số lượng giới hạn cho phép hoặc nhằm mục đích thương mại trái phép.</li>
                  <li>Sai sót về giá cả hoặc thông tin sản phẩm. Trong các trường hợp này, TomOi.vn sẽ thông báo tới khách hàng để điều chỉnh hoặc hủy đơn hàng.</li>
                </ul>
              </section>
              
              <section className={styles.section} id="trach-nhiem-thong-tin">
                <h2>5. Trách nhiệm cung cấp thông tin chính xác</h2>
                <p>
                  Khách hàng có trách nhiệm cung cấp thông tin đầy đủ, chính xác và rõ ràng khi giao dịch. TomOi.vn không chịu trách nhiệm về các thiệt hại phát sinh do lỗi nhập thông tin từ phía khách hàng.
                </p>
                <p>
                  Nếu lỗi phát sinh từ phía TomOi.vn, chúng tôi cam kết hỗ trợ khách hàng bằng các biện pháp cụ thể như cấp mã giảm giá, đổi mới tài khoản hoặc hoàn tiền tùy theo từng trường hợp.
                </p>
              </section>
              
              <section className={styles.section} id="quyen-phap-ly">
                <h2>6. Quyền pháp lý</h2>
                <p>
                  Mọi điều khoản trong văn bản này được điều chỉnh theo luật pháp Việt Nam. Các tranh chấp phát sinh sẽ do các cơ quan có thẩm quyền tại Việt Nam xử lý và giải quyết.
                </p>
              </section>
              
              <section className={styles.section} id="bao-mat-thong-tin">
                <h2>7. Bảo mật thông tin</h2>
                <p>
                  TomOi.vn cam kết bảo vệ thông tin khách hàng bằng các biện pháp bảo mật hiện đại nhất:
                </p>
                <ul>
                  <li>Mã hóa toàn bộ giao dịch và dữ liệu khách hàng.</li>
                  <li>Không tiết lộ thông tin cho bên thứ ba, trừ trường hợp yêu cầu từ cơ quan chức năng.</li>
                  <li>Nghiêm cấm các hành vi xâm nhập, can thiệp vào hệ thống dữ liệu. Vi phạm sẽ bị xử lý nghiêm theo luật pháp.</li>
                </ul>
              </section>
              
              <section className={styles.section} id="phuong-thuc-thanh-toan">
                <h2>8. Phương thức thanh toán</h2>
                <p>
                  Khách hàng có thể thanh toán an toàn thông qua các hình thức:
                </p>
                <ul>
                  <li>Chuyển khoản ngân hàng</li>
                  <li>Nạp thẻ cào </li>
                </ul>
                <p>
                  Khách hàng sẽ nhận được thông tin tài khoản Premium ngay lập tức qua email sau khi thanh toán. (Áp dụng cho 1 số loại tài khoản)
                </p>
              </section>
              
              <section className={styles.section} id="dam-bao-an-toan">
                <h2>9. Đảm bảo an toàn giao dịch</h2>
                <p>
                  TomOi.vn cam kết bảo đảm các giao dịch an toàn tuyệt đối, giảm thiểu tối đa các rủi ro phát sinh, giúp khách hàng hoàn toàn yên tâm khi sử dụng dịch vụ.
                </p>
              </section>
              
              <section className={styles.section} id="quy-dinh-ngung-cung-cap">
                <h2>10. Quy định ngừng cung cấp dịch vụ</h2>
                <p>
                  TomOi.vn sẽ ngừng cung cấp dịch vụ trong các trường hợp:
                </p>
                <ul>
                  <li>Khách hàng cung cấp thông tin sai lệch hoặc giả mạo.</li>
                  <li>Có hành vi gian lận, trục lợi từ hệ thống.</li>
                  <li>Thái độ thiếu tôn trọng, gây khó khăn cho nhân viên hỗ trợ.</li>
                  <li>Spam, sử dụng sai mục đích hoặc vi phạm các chính sách dịch vụ của chúng tôi.</li>
                </ul>
                
                <p>Các bước xử lý khi xảy ra vi phạm:</p>
                <ol>
                  <li>Thông báo hủy đơn hàng, hoàn tiền vào tài khoản trên TomOi.vn.</li>
                  <li>Xác minh thông tin chính chủ của khách hàng để hoàn trả tiền về tài khoản ngân hàng.</li>
                  <li>Hoàn tiền đầy đủ về tài khoản ngân hàng của khách.</li>
                  <li>Gửi email xác nhận rõ lý do và chi tiết hoàn tiền.</li>
                </ol>
                
                <div className={styles.infoBox}>
                  <h3>Thông tin quan trọng bổ sung</h3>
                  <ul>
                    <li>Chính sách đổi mới tài khoản rõ ràng khi có lỗi.</li>
                    <li>Bảo hành theo từng loại tài khoản, được nêu rõ trong mô tả sản phẩm.</li>
                    <li>Chính sách hoàn tiền chi tiết theo từng sản phẩm và trường hợp cụ thể.</li>
                    <li>Quyết định của TomOi.vn là cuối cùng trong tất cả các trường hợp phát sinh và không cần thông báo trước.</li>
                  </ul>
                </div>
                
                <p className={styles.conclusion}>
                  TomOi.vn luôn cam kết phục vụ khách hàng một cách tận tâm, chuyên nghiệp và hiệu quả nhất để mang lại trải nghiệm tuyệt vời nhất.
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
              <a 
                href="#dieu-kien-su-dung" 
                className={`${styles.tocLink} ${activeSection === "dieu-kien-su-dung" ? styles.tocLinkActive : ""}`}
              >
                1. Điều kiện sử dụng website
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#quyen-so-huu" 
                className={`${styles.tocLink} ${activeSection === "quyen-so-huu" ? styles.tocLinkActive : ""}`}
              >
                2. Quyền sở hữu phản hồi và nhận xét
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#chinh-sach-xu-ly" 
                className={`${styles.tocLink} ${activeSection === "chinh-sach-xu-ly" ? styles.tocLinkActive : ""}`}
              >
                4. Chính sách xử lý đơn hàng
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#trach-nhiem-thong-tin" 
                className={`${styles.tocLink} ${activeSection === "trach-nhiem-thong-tin" ? styles.tocLinkActive : ""}`}
              >
                5. Trách nhiệm cung cấp thông tin chính xác
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#quyen-phap-ly" 
                className={`${styles.tocLink} ${activeSection === "quyen-phap-ly" ? styles.tocLinkActive : ""}`}
              >
                6. Quyền pháp lý
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#bao-mat-thong-tin" 
                className={`${styles.tocLink} ${activeSection === "bao-mat-thong-tin" ? styles.tocLinkActive : ""}`}
              >
                7. Bảo mật thông tin
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#phuong-thuc-thanh-toan" 
                className={`${styles.tocLink} ${activeSection === "phuong-thuc-thanh-toan" ? styles.tocLinkActive : ""}`}
              >
                8. Phương thức thanh toán
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#dam-bao-an-toan" 
                className={`${styles.tocLink} ${activeSection === "dam-bao-an-toan" ? styles.tocLinkActive : ""}`}
              >
                9. Đảm bảo an toàn giao dịch
              </a>
            </li>
            <li className={styles.tocItem}>
              <a 
                href="#quy-dinh-ngung-cung-cap" 
                className={`${styles.tocLink} ${activeSection === "quy-dinh-ngung-cung-cap" ? styles.tocLinkActive : ""}`}
              >
                10. Quy định ngừng cung cấp dịch vụ
              </a>
            </li>
          </ul>
        </aside>
      </div>

      <SearchModal isOpen={searchModalOpen} onClose={closeSearchModal} />
    </div>
  );
} 