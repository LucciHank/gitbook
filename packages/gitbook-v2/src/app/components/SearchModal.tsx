"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../docs/styles.module.css';

// Định nghĩa cấu trúc dữ liệu tìm kiếm
interface SearchResult {
  id: string;
  title: string;
  category: string;
  url: string;
  excerpt: string;
}

// Dữ liệu tìm kiếm mẫu - trong thực tế sẽ được lấy từ API hoặc tệp JSON
const searchIndex: SearchResult[] = [
  {
    id: '1',
    title: 'Chính sách bảo hành',
    category: 'Chính sách',
    url: '/chinh-sach-bao-hanh',
    excerpt: 'TomOi.vn cam kết cung cấp dịch vụ bảo hành chuyên nghiệp, nhanh chóng và minh bạch nhất...'
  },
  {
    id: '2',
    title: 'Quy trình bảo hành',
    category: 'Hướng dẫn',
    url: '/chinh-sach-bao-hanh/quy-trinh-bao-hanh',
    excerpt: 'Hướng dẫn chi tiết về quy trình bảo hành sản phẩm tại TomOi.vn...'
  },
  {
    id: '3',
    title: 'Hướng dẫn nạp tiền',
    category: 'Hướng dẫn',
    url: '/huong-dan-mua-hang/huong-dan-nap-tien',
    excerpt: 'Các bước nạp tiền vào tài khoản TomOi.vn của bạn...'
  },
  {
    id: '4',
    title: 'Hướng dẫn nhanh',
    category: 'Hướng dẫn sử dụng tài liệu',
    url: '/',
    excerpt: 'Chào mừng bạn đến với tài liệu hướng dẫn của TomOi.vn! Trang này cung cấp tổng quan về cách sử dụng tài liệu và tìm kiếm thông tin bạn cần.'
  },
  {
    id: '5',
    title: 'Giới thiệu về TomOi.vn',
    category: 'Giới thiệu',
    url: '/gioi-thieu/gioi-thieu-ve-tomoivn',
    excerpt: 'TomOi.vn là nền tảng cung cấp tài khoản Premium hàng đầu tại Việt Nam, được thành lập vào năm 2018.'
  },
  {
    id: '6',
    title: 'Lý do nên mua hàng tại TomOi.vn',
    category: 'Giới thiệu',
    url: '/gioi-thieu/ly-do-mua-hang',
    excerpt: 'Những lý do khiến TomOi.vn trở thành lựa chọn hàng đầu của người dùng khi mua sắm tài khoản Premium.'
  },
  {
    id: '7',
    title: 'Các nền tảng chính thức',
    category: 'Giới thiệu',
    url: '/gioi-thieu/nen-tang-chinh-thuc',
    excerpt: 'Danh sách các kênh chính thức của TomOi.vn trên các nền tảng mạng xã hội.'
  },
  {
    id: '8',
    title: 'Tổng quan website',
    category: 'Giới thiệu',
    url: '/gioi-thieu/tong-quan-website',
    excerpt: 'Tìm hiểu về giao diện và các tính năng cơ bản của website TomOi.vn.'
  },
  {
    id: '9',
    title: 'Điều khoản dịch vụ',
    category: 'Giới thiệu',
    url: '/gioi-thieu/dieu-khoan-dich-vu',
    excerpt: 'Các điều khoản và điều kiện khi sử dụng dịch vụ của TomOi.vn.'
  },
  {
    id: '10',
    title: 'Chính sách bảo mật',
    category: 'Giới thiệu',
    url: '/gioi-thieu/chinh-sach-bao-mat',
    excerpt: 'Thông tin về cách TomOi.vn thu thập, sử dụng và bảo vệ thông tin cá nhân của khách hàng.'
  },
  {
    id: '11',
    title: 'Quản lý tài khoản',
    category: 'Hướng dẫn mua hàng',
    url: '/huong-dan-mua-hang/quan-ly-tai-khoan',
    excerpt: 'Hướng dẫn chi tiết về cách đăng ký, đăng nhập và quản lý thông tin tài khoản TomOi.vn.'
  },
  {
    id: '12',
    title: 'Hướng dẫn nạp tiền',
    category: 'Hướng dẫn mua hàng',
    url: '/huong-dan-mua-hang/huong-dan-nap-tien',
    excerpt: 'Các phương thức nạp tiền vào tài khoản TomOi.vn và hướng dẫn thực hiện từng bước.'
  },
  {
    id: '13',
    title: 'Hướng dẫn thanh toán',
    category: 'Hướng dẫn mua hàng',
    url: '/huong-dan-mua-hang/huong-dan-thanh-toan',
    excerpt: 'Hướng dẫn chi tiết về các phương thức thanh toán và quy trình mua hàng tại TomOi.vn.'
  },
  {
    id: '14',
    title: 'Tra cứu lịch sử nạp tiền',
    category: 'Hướng dẫn mua hàng',
    url: '/huong-dan-mua-hang/tra-cuu-lich-su-nap-tien',
    excerpt: 'Hướng dẫn cách tra cứu lịch sử nạp tiền và quản lý giao dịch tài chính trên tài khoản TomOi.vn.'
  },
  {
    id: '15',
    title: 'Tra cứu lịch sử đơn hàng',
    category: 'Hướng dẫn mua hàng',
    url: '/huong-dan-mua-hang/tra-cuu-lich-su-don-hang',
    excerpt: 'Hướng dẫn cách tra cứu và theo dõi lịch sử đơn hàng đã mua tại TomOi.vn.'
  },
  {
    id: '16',
    title: 'Hướng dẫn cài đặt và sử dụng',
    category: 'Hướng dẫn cài đặt và sử dụng',
    url: '/huong-dan-cai-dat',
    excerpt: 'Tổng quan về hướng dẫn cài đặt và sử dụng các sản phẩm từ TomOi.vn.'
  },
  {
    id: '17',
    title: 'Chính sách bảo hành',
    category: 'Chính sách bảo hành',
    url: '/chinh-sach-bao-hanh',
    excerpt: 'Thông tin chi tiết về chính sách bảo hành áp dụng cho các sản phẩm và dịch vụ của TomOi.vn.'
  },
  {
    id: '18',
    title: 'Ưu đãi',
    category: 'Ưu đãi',
    url: '/uu-dai',
    excerpt: 'Thông tin về các chương trình khuyến mãi, ưu đãi và mã giảm giá tại TomOi.vn.'
  },
  {
    id: '19',
    title: 'Câu hỏi thường gặp',
    category: 'Câu hỏi thường gặp',
    url: '/cau-hoi-thuong-gap',
    excerpt: 'Giải đáp các câu hỏi thường gặp khi sử dụng sản phẩm và dịch vụ của TomOi.vn.'
  },
  {
    id: '20',
    title: 'Hướng dẫn khác',
    category: 'Hướng dẫn khác',
    url: '/huong-dan-khac',
    excerpt: 'Các hướng dẫn bổ sung và thông tin hữu ích khác về TomOi.vn.'
  }
];

// Danh sách gợi ý tìm kiếm
const suggestionTags = [
  "Tài khoản Premium",
  "Nạp tiền",
  "Thanh toán",
  "Đăng ký",
  "Đăng nhập",
  "Bảo hành",
  "Hỗ trợ",
  "Khuyến mãi",
  "Ưu đãi",
  "Netflix",
  "Spotify",
  "YouTube Premium"
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestedSearches = ['Bảo hành', 'Nạp tiền', 'Tài khoản', 'Thanh toán', 'Cài đặt'];
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setSearchResults([]);
      setSelectedResultIndex(-1);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedResultIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedResultIndex(prev => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter' && selectedResultIndex >= 0) {
        e.preventDefault();
        router.push(searchResults[selectedResultIndex].url);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, searchResults, selectedResultIndex, router]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    // Mô phỏng tìm kiếm
    if (term.trim().length > 0) {
      // Kết quả giả
      const mockResults: SearchResult[] = [
        {
          id: '1',
          title: 'Chính sách bảo hành',
          category: 'Chính sách',
          url: '/chinh-sach-bao-hanh',
          excerpt: 'TomOi.vn cam kết cung cấp dịch vụ bảo hành chuyên nghiệp, nhanh chóng và minh bạch nhất...'
        },
        {
          id: '2',
          title: 'Quy trình bảo hành',
          category: 'Hướng dẫn',
          url: '/chinh-sach-bao-hanh/quy-trinh-bao-hanh',
          excerpt: 'Hướng dẫn chi tiết về quy trình bảo hành sản phẩm tại TomOi.vn...'
        },
        {
          id: '3',
          title: 'Hướng dẫn nạp tiền',
          category: 'Hướng dẫn',
          url: '/huong-dan-mua-hang/huong-dan-nap-tien',
          excerpt: 'Các bước nạp tiền vào tài khoản TomOi.vn của bạn...'
        },
      ].filter(result => 
        result.title.toLowerCase().includes(term.toLowerCase()) || 
        result.excerpt.toLowerCase().includes(term.toLowerCase())
      );
      
      setSearchResults(mockResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    handleSearch(suggestion);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchResults([]);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.searchModalOverlay} onClick={onClose}>
      <div className={styles.searchModal} onClick={e => e.stopPropagation()}>
        <div className={styles.searchModalHeader}>
          <div className={styles.searchModalInputContainer}>
            <svg className={styles.searchModalIcon} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              ref={inputRef}
              type="text"
              className={styles.searchModalInput}
              placeholder="Tìm kiếm tài liệu..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchTerm && (
              <button className={styles.searchModalClear} onClick={handleClear}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
            <button className={styles.searchModalClose} onClick={onClose}>
              <span className={styles.searchModalCloseText}>ESC</span>
            </button>
          </div>
        </div>

        {!searchTerm && (
          <div className={styles.searchModalSuggestions}>
            <div className={styles.searchModalSuggestionTitle}>Tìm kiếm phổ biến</div>
            <div className={styles.searchModalSuggestionTags}>
              {suggestedSearches.map((suggestion, index) => (
                <div
                  key={index}
                  className={styles.searchModalSuggestionTag}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.searchModalContent}>
          {searchTerm && searchResults.length === 0 ? (
            <div className={styles.searchModalNoResults}>
              Không tìm thấy kết quả phù hợp với "{searchTerm}"
            </div>
          ) : (
            <div className={styles.searchModalResults}>
              {searchResults.map((result, index) => (
                <a
                  key={result.id}
                  href={result.url}
                  className={`${styles.searchModalResult} ${
                    index === selectedResultIndex ? styles.searchModalResultSelected : ''
                  }`}
                  onClick={onClose}
                >
                  <span className={styles.searchModalResultCategory}>{result.category}</span>
                  <div className={styles.searchModalResultTitle}>{result.title}</div>
                  <div className={styles.searchModalResultExcerpt}>{result.excerpt}</div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal; 