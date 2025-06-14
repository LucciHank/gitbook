"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../docs/styles.module.css';
import SearchModal from '../../components/SearchModal';
import NavigationButtons from '../../components/NavigationButtons';
import MobileMenu from '../../components/MobileMenu';
import Sidebar from '../../components/Sidebar';

export default function QuyTrinhBaoHanhPage() {
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
              <h1>Quy trình bảo hành</h1>

              <div className={styles.toc}>
                <h2>Mục lục</h2>
                <ul>
                  <li><a href="#quy-trinh">Quy trình bảo hành tài khoản</a></li>
                  <li><a href="#buoc-1">Bước 1: Gửi yêu cầu bảo hành</a></li>
                  <li><a href="#buoc-2">Bước 2: Xác minh thông tin</a></li>
                  <li><a href="#buoc-3">Bước 3: Tiến hành bảo hành</a></li>
                  <li><a href="#buoc-4">Bước 4: Hoàn tất bảo hành</a></li>
                </ul>
              </div>

              <section>
                <h2 id="quy-trinh">Quy trình bảo hành tài khoản</h2>
                <p>TomOi.vn cam kết quy trình bảo hành nhanh chóng, minh bạch và hiệu quả để đảm bảo quyền lợi tối đa cho khách hàng. Dưới đây là quy trình bảo hành chi tiết mà chúng tôi áp dụng:</p>
              </section>

              <section>
                <h2 id="buoc-1">Bước 1: Gửi yêu cầu bảo hành</h2>
                <p>Khi gặp vấn đề với tài khoản đã mua, khách hàng có thể gửi yêu cầu bảo hành thông qua một trong các kênh sau:</p>
                <ul>
                  <li>Trang hỗ trợ trực tuyến tại website TomOi.vn</li>
                  <li>Gửi email đến địa chỉ support@tomoi.vn</li>
                  <li>Liên hệ qua Fanpage Facebook chính thức của TomOi.vn</li>
                  <li>Gọi điện đến hotline hỗ trợ: 0123 456 789</li>
                </ul>
                <p>Khi gửi yêu cầu bảo hành, vui lòng cung cấp đầy đủ các thông tin sau:</p>
                <ul>
                  <li>Mã đơn hàng hoặc mã tài khoản cần bảo hành</li>
                  <li>Thời gian mua hàng</li>
                  <li>Mô tả chi tiết vấn đề gặp phải</li>
                  <li>Hình ảnh hoặc video minh họa lỗi (nếu có)</li>
                </ul>
              </section>

              <section>
                <h2 id="buoc-2">Bước 2: Xác minh thông tin</h2>
                <p>Sau khi nhận được yêu cầu bảo hành, đội ngũ hỗ trợ của TomOi.vn sẽ:</p>
                <ul>
                  <li>Kiểm tra tính hợp lệ của yêu cầu bảo hành</li>
                  <li>Xác minh thông tin đơn hàng và tài khoản</li>
                  <li>Xác nhận thời hạn bảo hành còn hiệu lực</li>
                  <li>Phân loại và đánh giá mức độ lỗi</li>
                </ul>
                <p>Thời gian xác minh thông tin thường không quá 24 giờ kể từ khi nhận được yêu cầu.</p>
              </section>

              <section>
                <h2 id="buoc-3">Bước 3: Tiến hành bảo hành</h2>
                <p>Sau khi xác minh thông tin, TomOi.vn sẽ tiến hành bảo hành theo các phương thức sau:</p>
                <ul>
                  <li>Khắc phục lỗi trực tiếp (nếu có thể)</li>
                  <li>Cung cấp tài khoản thay thế mới</li>
                  <li>Gia hạn thời gian sử dụng tài khoản</li>
                  <li>Hoàn tiền theo quy định (trong trường hợp không thể khắc phục hoặc thay thế)</li>
                </ul>
                <p>Thời gian thực hiện bảo hành tối đa là 3 ngày làm việc kể từ khi xác minh thông tin thành công.</p>
              </section>

              <section>
                <h2 id="buoc-4">Bước 4: Hoàn tất bảo hành</h2>
                <p>Sau khi hoàn tất quy trình bảo hành, TomOi.vn sẽ:</p>
                <ul>
                  <li>Thông báo kết quả bảo hành đến khách hàng qua email hoặc tin nhắn</li>
                  <li>Hướng dẫn khách hàng cách sử dụng tài khoản mới (nếu có)</li>
                  <li>Cộng thêm từ 1-3 ngày sử dụng để bù đắp thời gian chờ bảo hành</li>
                  <li>Ghi nhận phản hồi của khách hàng về chất lượng dịch vụ bảo hành</li>
                </ul>
                <p>Trong trường hợp khách hàng không hài lòng với kết quả bảo hành, vui lòng liên hệ lại với chúng tôi trong vòng 24 giờ để được hỗ trợ thêm.</p>
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
            title: "Thời hạn bảo hành",
            url: "/chinh-sach-bao-hanh/thoi-han-bao-hanh"
          }}
          nextPage={{
            title: "Chính sách hoàn tiền",
            url: "/chinh-sach-bao-hanh/chinh-sach-hoan-tien"
          }}
        />
        <p className={styles.lastUpdated}>Cập nhật lần cuối: {lastUpdated}</p>
      </footer>

      <SearchModal isOpen={searchModalOpen} onClose={closeSearchModal} />
    </div>
  );
} 