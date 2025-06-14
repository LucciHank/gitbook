"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../docs/styles.module.css';

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className={styles['sidebar-nav']}>
      <div className={styles['sidebar-section']}>
        <h4 className={styles['sidebar-heading']}>Hướng dẫn sử dụng tài liệu</h4>
        <ul>
          <li className={isActive('/') ? styles.active : ''}>
            <Link href="/">Hướng dẫn nhanh</Link>
          </li>
        </ul>
      </div>
      
      <div className={styles['sidebar-section']}>
        <h4 className={styles['sidebar-heading']}>Giới thiệu</h4>
        <ul>
          <li className={isActive('/gioi-thieu/gioi-thieu-ve-tomoivn') ? styles.active : ''}>
            <Link href="/gioi-thieu/gioi-thieu-ve-tomoivn">
              Giới thiệu về TomOi.vn
            </Link>
          </li>
          <li className={isActive('/gioi-thieu/ly-do-mua-hang') ? styles.active : ''}>
            <Link href="/gioi-thieu/ly-do-mua-hang">
              Lý do nên mua hàng tại TomOi.vn
            </Link>
          </li>
          <li className={isActive('/gioi-thieu/nen-tang-chinh-thuc') ? styles.active : ''}>
            <Link href="/gioi-thieu/nen-tang-chinh-thuc">
              Các nền tảng chính thức
            </Link>
          </li>
          <li className={isActive('/gioi-thieu/tong-quan-website') ? styles.active : ''}>
            <Link href="/gioi-thieu/tong-quan-website">Tổng quan website</Link>
          </li>
          <li className={isActive('/gioi-thieu/dieu-khoan-dich-vu') ? styles.active : ''}>
            <Link href="/gioi-thieu/dieu-khoan-dich-vu">Điều khoản dịch vụ</Link>
          </li>
          <li className={isActive('/gioi-thieu/chinh-sach-bao-mat') ? styles.active : ''}>
            <Link href="/gioi-thieu/chinh-sach-bao-mat">Chính sách bảo mật</Link>
          </li>
        </ul>
      </div>
      
      <div className={styles['sidebar-section']}>
        <h4 className={styles['sidebar-heading']}>Hướng dẫn mua hàng</h4>
        <ul>
          <li className={isActive('/huong-dan-mua-hang/quan-ly-tai-khoan') ? styles.active : ''}>
            <Link href="/huong-dan-mua-hang/quan-ly-tai-khoan">
              Quản lý tài khoản
            </Link>
          </li>
          <li className={isActive('/huong-dan-mua-hang/huong-dan-nap-tien') ? styles.active : ''}>
            <Link href="/huong-dan-mua-hang/huong-dan-nap-tien">
              Hướng dẫn nạp tiền
            </Link>
          </li>
          <li className={isActive('/huong-dan-mua-hang/huong-dan-thanh-toan') ? styles.active : ''}>
            <Link href="/huong-dan-mua-hang/huong-dan-thanh-toan">
              Hướng dẫn thanh toán
            </Link>
          </li>
          <li className={isActive('/huong-dan-mua-hang/tra-cuu-lich-su-nap-tien') ? styles.active : ''}>
            <Link href="/huong-dan-mua-hang/tra-cuu-lich-su-nap-tien">
              Tra cứu lịch sử nạp tiền
            </Link>
          </li>
          <li className={isActive('/huong-dan-mua-hang/tra-cuu-lich-su-don-hang') ? styles.active : ''}>
            <Link href="/huong-dan-mua-hang/tra-cuu-lich-su-don-hang">
              Tra cứu lịch sử đơn hàng
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles['sidebar-section']}>
        <h4 className={styles['sidebar-heading']}>Hướng dẫn cài đặt và sử dụng</h4>
        <ul>
          <li className={isActive('/huong-dan-cai-dat') ? styles.active : ''}>
            <Link href="/huong-dan-cai-dat">
              Hướng dẫn cài đặt và sử dụng sản phẩm
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar; 