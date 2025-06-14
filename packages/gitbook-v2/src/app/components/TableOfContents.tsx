"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from '../docs/styles.module.css';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>("");
  const tocRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLAnchorElement>(null);

  // Xử lý cuộn trang và cập nhật active ID
  useEffect(() => {
    const handleScroll = () => {
      const headings = items.map(item => document.getElementById(item.id)).filter(Boolean);
      
      // Tìm heading hiện tại đang hiển thị trong viewport
      let currentActiveId = "";
      
      // Duyệt từ dưới lên để tìm heading gần nhất với đỉnh màn hình
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading) {
          const rect = heading.getBoundingClientRect();
          if (rect.top <= 150) {
            currentActiveId = heading.id;
            break;
          }
        }
      }
      
      // Nếu không tìm thấy heading nào, sử dụng heading đầu tiên
      if (!currentActiveId && headings.length > 0 && headings[0]) {
        currentActiveId = headings[0].id;
      }
      
      setActiveId(currentActiveId);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Gọi ngay khi component được mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items]);

  // Cuộn mục lục để hiển thị mục đang active
  useEffect(() => {
    if (activeId && activeItemRef.current && tocRef.current) {
      const tocRect = tocRef.current.getBoundingClientRect();
      const activeItemRect = activeItemRef.current.getBoundingClientRect();
      
      // Kiểm tra xem mục active có nằm trong vùng nhìn thấy của mục lục không
      if (activeItemRect.top < tocRect.top || activeItemRect.bottom > tocRect.bottom) {
        activeItemRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }, [activeId]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles.tableOfContents} ref={tocRef}>
      <h2 className={styles.tocTitle}>Mục lục</h2>
      <ul className={styles.tocList}>
        {items.map((item) => (
          <li key={item.id} className={styles.tocItem}>
            <a
              href={`#${item.id}`}
              className={activeId === item.id ? styles.tocItem_active : ''}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                  // Cập nhật URL với hash mới
                  window.history.pushState(null, '', `#${item.id}`);
                  setActiveId(item.id);
                }
              }}
              ref={activeId === item.id ? activeItemRef : null}
              style={{
                paddingLeft: `${(item.level - 2) * 1}rem`
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents; 