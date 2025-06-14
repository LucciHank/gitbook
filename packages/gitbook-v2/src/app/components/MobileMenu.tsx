"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../docs/styles.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (!pathname) return false;
    return pathname === path || pathname.startsWith(path + '/');
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Chỉ đóng menu khi click vào nền (background), không phải vào nội dung menu
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`} onClick={handleBackgroundClick}>
      <div className={styles.mobileMenuContent}>
        <div className={styles.mobileMenuHeader}>
          <button className={styles.mobileMenuClose} onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <nav>
          <div className={styles['sidebar-section']}>
            <h4 className={styles['sidebar-heading']}>Hướng dẫn sử dụng tài liệu</h4>
            <ul>
              <li className={isActive('/') ? styles.active : ''}>
                <Link href="/" onClick={onClose}>Hướng dẫn nhanh</Link>
              </li>
            </ul>
          </div>
          
          <div className={styles['sidebar-section']}>
            <h4 className={styles['sidebar-heading']}>Giới thiệu</h4>
            <ul>
              <li className={isActive('/gioi-thieu/gioi-thieu-ve-tomoivn') ? styles.active : ''}>
                <Link href="/gioi-thieu/gioi-thieu-ve-tomoivn" onClick={onClose}>
                  Giới thiệu về TomOi.vn
                </Link>
              </li>
              <li className={isActive('/gioi-thieu/ly-do-mua-hang') ? styles.active : ''}>
                <Link href="/gioi-thieu/ly-do-mua-hang" onClick={onClose}>
                  Lý do nên mua hàng tại TomOi.vn
                </Link>
              </li>
              <li className={isActive('/gioi-thieu/nen-tang-chinh-thuc') ? styles.active : ''}>
                <Link href="/gioi-thieu/nen-tang-chinh-thuc" onClick={onClose}>
                  Các nền tảng chính thức
                </Link>
              </li>
              <li className={isActive('/gioi-thieu/tong-quan-website') ? styles.active : ''}>
                <Link href="/gioi-thieu/tong-quan-website" onClick={onClose}>Tổng quan website</Link>
              </li>
              <li className={isActive('/gioi-thieu/dieu-khoan-dich-vu') ? styles.active : ''}>
                <Link href="/gioi-thieu/dieu-khoan-dich-vu" onClick={onClose}>Điều khoản dịch vụ</Link>
              </li>
              <li className={isActive('/gioi-thieu/chinh-sach-bao-mat') ? styles.active : ''}>
                <Link href="/gioi-thieu/chinh-sach-bao-mat" onClick={onClose}>Chính sách bảo mật</Link>
              </li>
            </ul>
          </div>
          
          <div className={styles['sidebar-section']}>
            <h4 className={styles['sidebar-heading']}>Hướng dẫn mua hàng</h4>
            <ul>
              <li className={isActive('/huong-dan-mua-hang/quan-ly-tai-khoan') ? styles.active : ''}>
                <Link href="/huong-dan-mua-hang/quan-ly-tai-khoan" onClick={onClose}>
                  Quản lý tài khoản
                </Link>
              </li>
              <li className={isActive('/huong-dan-mua-hang/huong-dan-nap-tien') ? styles.active : ''}>
                <Link href="/huong-dan-mua-hang/huong-dan-nap-tien" onClick={onClose}>
                  Hướng dẫn nạp tiền
                </Link>
              </li>
              <li className={isActive('/huong-dan-mua-hang/huong-dan-thanh-toan') ? styles.active : ''}>
                <Link href="/huong-dan-mua-hang/huong-dan-thanh-toan" onClick={onClose}>
                  Hướng dẫn thanh toán
                </Link>
              </li>
              <li className={isActive('/huong-dan-mua-hang/tra-cuu-lich-su-nap-tien') ? styles.active : ''}>
                <Link href="/huong-dan-mua-hang/tra-cuu-lich-su-nap-tien" onClick={onClose}>
                  Tra cứu lịch sử nạp tiền
                </Link>
              </li>
              <li className={isActive('/huong-dan-mua-hang/tra-cuu-lich-su-don-hang') ? styles.active : ''}>
                <Link href="/huong-dan-mua-hang/tra-cuu-lich-su-don-hang" onClick={onClose}>
                  Tra cứu lịch sử đơn hàng
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles['sidebar-section']}>
            <h4 className={styles['sidebar-heading']}>Hướng dẫn cài đặt và sử dụng</h4>
            <ul>
              <li className={isActive('/huong-dan-cai-dat') ? styles.active : ''}>
                <Link href="/huong-dan-cai-dat" onClick={onClose}>
                  Hướng dẫn cài đặt và sử dụng sản phẩm
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu; 