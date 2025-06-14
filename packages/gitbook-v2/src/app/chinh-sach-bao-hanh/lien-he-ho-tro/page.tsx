"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../docs/styles.module.css';
import SearchModal from '../../components/SearchModal';
import NavigationButtons from '../../components/NavigationButtons';
import MobileMenu from '../../components/MobileMenu';
import Sidebar from '../../components/Sidebar';

export default function LienHeHoTroPage() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openSearchModal = () => {
    setSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setSearchModalOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Cấu hình điều hướng
  const lastUpdated = "15/08/2023";

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoAndToggle}>
            <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className={styles.logo}>
              <Link href="/">
                <span>TomOi.vn</span>
              </Link>
            </div>
          </div>
          <div className={styles.searchButton} onClick={openSearchModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Tìm kiếm</span>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={toggleMobileMenu} />

      <div className={styles['content-wrapper']}>
        <aside className={styles.sidebar}>
          <Sidebar />
        </aside>

        <main className={styles['main-content']}>
          <div className={styles['main-container']}>
            <div className={styles['content']}>
              <h1>Liên hệ và hỗ trợ bảo hành</h1>

              <div className={styles.toc}>
                <h2>Mục lục</h2>
                <ul>
                  <li><a href="#kenh-ho-tro">Các kênh hỗ trợ bảo hành</a></li>
                  <li><a href="#thoi-gian">Thời gian hỗ trợ</a></li>
                  <li><a href="#cau-hoi">Câu hỏi thường gặp về bảo hành</a></li>
                  <li><a href="#form-lien-he">Form liên hệ hỗ trợ</a></li>
                </ul>
              </div>

              <section>
                <h2 id="kenh-ho-tro">Các kênh hỗ trợ bảo hành</h2>
                <p>TomOi.vn cung cấp nhiều kênh hỗ trợ bảo hành để đảm bảo khách hàng luôn nhận được sự trợ giúp kịp thời:</p>
                <ul>
                  <li><strong>Hỗ trợ trực tuyến:</strong> Chat trực tiếp trên website TomOi.vn</li>
                  <li><strong>Email:</strong> support@tomoi.vn (phản hồi trong vòng 24 giờ)</li>
                  <li><strong>Hotline:</strong> 0123 456 789 (8:00 - 22:00, tất cả các ngày trong tuần)</li>
                  <li><strong>Fanpage Facebook:</strong> facebook.com/tomoivn (phản hồi trong vòng 2-4 giờ)</li>
                  <li><strong>Zalo Official Account:</strong> zalo.me/tomoivn</li>
                </ul>
                <p>Để được hỗ trợ nhanh nhất, vui lòng cung cấp đầy đủ thông tin về đơn hàng và mô tả chi tiết vấn đề bạn đang gặp phải.</p>
              </section>

              <section>
                <h2 id="thoi-gian">Thời gian hỗ trợ</h2>
                <p><strong>Thời gian hỗ trợ qua các kênh:</strong></p>
                <ul>
                  <li>Chat trực tuyến: 8:00 - 22:00, tất cả các ngày trong tuần</li>
                  <li>Hotline: 8:00 - 22:00, tất cả các ngày trong tuần</li>
                  <li>Email và mạng xã hội: Phản hồi trong vòng 24 giờ</li>
                </ul>
                <p><strong>Thời gian xử lý yêu cầu bảo hành:</strong></p>
                <ul>
                  <li>Tiếp nhận yêu cầu: Ngay lập tức qua chat và hotline; trong vòng 24 giờ qua email</li>
                  <li>Xác minh thông tin: Trong vòng 24 giờ</li>
                  <li>Xử lý bảo hành: Tối đa 3 ngày làm việc</li>
                  <li>Hoàn tiền (nếu có): 24-48 giờ làm việc sau khi được phê duyệt</li>
                </ul>
              </section>

              <section>
                <h2 id="cau-hoi">Câu hỏi thường gặp về bảo hành</h2>
                <div className={styles.faqItem}>
                  <h3>1. Làm thế nào để kiểm tra thời hạn bảo hành còn lại của sản phẩm?</h3>
                  <p>Bạn có thể kiểm tra thời hạn bảo hành còn lại bằng cách đăng nhập vào tài khoản TomOi.vn, vào mục "Lịch sử đơn hàng" và chọn sản phẩm cần kiểm tra. Thông tin về thời hạn bảo hành sẽ được hiển thị chi tiết.</p>
                </div>
                <div className={styles.faqItem}>
                  <h3>2. Tôi cần chuẩn bị những thông tin gì khi yêu cầu bảo hành?</h3>
                  <p>Khi yêu cầu bảo hành, bạn cần chuẩn bị: Mã đơn hàng hoặc mã tài khoản, thời gian mua hàng, mô tả chi tiết về lỗi gặp phải, và hình ảnh/video minh họa lỗi (nếu có).</p>
                </div>
                <div className={styles.faqItem}>
                  <h3>3. Tôi có thể yêu cầu hoàn tiền thay vì bảo hành không?</h3>
                  <p>Có, bạn có thể yêu cầu hoàn tiền trong trường hợp không thể bảo hành hoặc thay thế sản phẩm. Tỷ lệ hoàn tiền sẽ được tính dựa trên thời gian sử dụng và thời hạn bảo hành còn lại.</p>
                </div>
                <div className={styles.faqItem}>
                  <h3>4. Bảo hành có áp dụng cho tất cả các sản phẩm không?</h3>
                  <p>Có, tất cả các sản phẩm tài khoản Premium tại TomOi.vn đều được áp dụng chính sách bảo hành. Thời hạn bảo hành cụ thể sẽ được ghi rõ trong thông tin sản phẩm.</p>
                </div>
                <div className={styles.faqItem}>
                  <h3>5. Tôi có bị mất phí khi yêu cầu bảo hành không?</h3>
                  <p>Không, dịch vụ bảo hành tại TomOi.vn hoàn toàn miễn phí trong suốt thời gian bảo hành của sản phẩm.</p>
                </div>
              </section>

              <section>
                <h2 id="form-lien-he">Form liên hệ hỗ trợ</h2>
                <p>Nếu bạn cần hỗ trợ về bảo hành, vui lòng điền đầy đủ thông tin vào form liên hệ trên trang web của chúng tôi tại <a href="https://tomoi.vn/contact" target="_blank" rel="noopener noreferrer">đây</a> hoặc liên hệ trực tiếp qua các kênh hỗ trợ được liệt kê ở trên.</p>
                <p>Đội ngũ hỗ trợ của TomOi.vn luôn sẵn sàng giải đáp mọi thắc mắc và hỗ trợ bạn trong quá trình bảo hành sản phẩm.</p>
              </section>

              <div className={styles.lastUpdated}>
                <p>Cập nhật lần cuối: {lastUpdated}</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className={styles.footer}>
        <NavigationButtons 
          prevPage={{
            title: "Chính sách hoàn tiền",
            url: "/chinh-sach-bao-hanh/chinh-sach-hoan-tien"
          }}
          nextPage={{
            title: "Ưu đãi",
            url: "/uu-dai"
          }}
        />
        <p className={styles.lastUpdated}>Cập nhật lần cuối: {lastUpdated}</p>
      </footer>

      <SearchModal isOpen={searchModalOpen} onClose={closeSearchModal} />
    </div>
  );
} 