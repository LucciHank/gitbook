"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../docs/styles.module.css';
import SearchModal from '../../components/SearchModal';
import NavigationButtons from '../../components/NavigationButtons';
import MobileMenu from '../../components/MobileMenu';
import Sidebar from '../../components/Sidebar';

export default function ChinhSachHoanTienPage() {
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
              <h1>Chính sách hoàn tiền</h1>

              <div className={styles.toc}>
                <h2>Mục lục</h2>
                <ul>
                  <li><a href="#chinh-sach">Chính sách hoàn tiền</a></li>
                  <li><a href="#truong-hop">Các trường hợp được hoàn tiền</a></li>
                  <li><a href="#ty-le">Tỷ lệ hoàn tiền</a></li>
                  <li><a href="#quy-trinh">Quy trình hoàn tiền</a></li>
                </ul>
              </div>

              <section>
                <h2 id="chinh-sach">Chính sách hoàn tiền</h2>
                <p>TomOi.vn cam kết mang đến sự hài lòng tuyệt đối cho khách hàng. Trong trường hợp không thể bảo hành hoặc thay thế sản phẩm, chúng tôi sẽ áp dụng chính sách hoàn tiền hợp lý và công bằng.</p>
              </section>

              <section>
                <h2 id="truong-hop">Các trường hợp được hoàn tiền</h2>
                <p>Khách hàng sẽ được hoàn tiền trong các trường hợp sau:</p>
                <ul>
                  <li>Sản phẩm hết hàng và không thể thay thế trong thời gian bảo hành</li>
                  <li>Không thể khắc phục lỗi sau 3 ngày làm việc</li>
                  <li>Sản phẩm không đáp ứng đúng mô tả hoặc cam kết ban đầu</li>
                  <li>Khách hàng không hài lòng với sản phẩm trong vòng 24 giờ đầu tiên sau khi mua (chính sách đảm bảo hài lòng)</li>
                </ul>
              </section>

              <section>
                <h2 id="ty-le">Tỷ lệ hoàn tiền</h2>
                <p>Tỷ lệ hoàn tiền được tính dựa trên thời gian sử dụng và thời hạn bảo hành còn lại:</p>
                <ul>
                  <li><strong>Hoàn tiền 100%:</strong>
                    <ul>
                      <li>Trong vòng 7 ngày đầu tiên đối với sản phẩm 1 tháng</li>
                      <li>Trong vòng 14 ngày đầu tiên đối với sản phẩm từ 2 tháng trở lên</li>
                      <li>Sản phẩm không đúng với mô tả hoặc cam kết ban đầu</li>
                    </ul>
                  </li>
                  <li><strong>Hoàn tiền theo tỷ lệ thời gian chưa sử dụng:</strong>
                    <ul>
                      <li>Sau thời gian quy định hoàn tiền 100%</li>
                      <li>Công thức tính: Số tiền hoàn = (Giá trị đơn hàng) x (Số ngày chưa sử dụng / Tổng số ngày của gói)</li>
                      <li>Ví dụ: Khách sử dụng sản phẩm 3 tháng (90 ngày), sau 30 ngày phát sinh lỗi thì hoàn 67% giá trị đơn hàng (60/90 = 67%)</li>
                    </ul>
                  </li>
                </ul>
              </section>

              <section>
                <h2 id="quy-trinh">Quy trình hoàn tiền</h2>
                <p>Quy trình hoàn tiền được thực hiện theo các bước sau:</p>
                <ol>
                  <li><strong>Gửi yêu cầu hoàn tiền:</strong> Khách hàng gửi yêu cầu hoàn tiền qua email, hotline hoặc trang hỗ trợ trực tuyến</li>
                  <li><strong>Xác minh thông tin:</strong> TomOi.vn sẽ xác minh thông tin đơn hàng, tài khoản và lý do hoàn tiền</li>
                  <li><strong>Phê duyệt hoàn tiền:</strong> Sau khi xác minh, TomOi.vn sẽ thông báo kết quả và số tiền được hoàn</li>
                  <li><strong>Thực hiện hoàn tiền:</strong> Số tiền được hoàn sẽ được chuyển vào tài khoản số dư của khách hàng tại TomOi.vn</li>
                  <li><strong>Rút tiền:</strong> Khách hàng có thể sử dụng số dư để mua sản phẩm khác hoặc yêu cầu rút về tài khoản ngân hàng</li>
                </ol>
                <p>Thời gian hoàn tiền: Trong vòng 24-48 giờ làm việc kể từ khi yêu cầu hoàn tiền được phê duyệt.</p>
                <p>Lưu ý: Đối với các giao dịch hoàn tiền về tài khoản ngân hàng, thời gian xử lý có thể kéo dài từ 3-5 ngày làm việc tùy theo ngân hàng của khách hàng.</p>
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
            title: "Quy trình bảo hành",
            url: "/chinh-sach-bao-hanh/quy-trinh-bao-hanh"
          }}
          nextPage={{
            title: "Liên hệ và hỗ trợ bảo hành",
            url: "/chinh-sach-bao-hanh/lien-he-ho-tro"
          }}
        />
        <p className={styles.lastUpdated}>Cập nhật lần cuối: {lastUpdated}</p>
      </footer>

      <SearchModal isOpen={searchModalOpen} onClose={closeSearchModal} />
    </div>
  );
} 