const fs = require('fs-extra');
const path = require('path');

// Đường dẫn đúng đến thư mục public của gitbook
const sourceDir = path.resolve(__dirname, '../../gitbook/public');
const targetDir = path.resolve(__dirname, '../public');

try {
  // Tạo thư mục public nếu chưa tồn tại
  fs.ensureDirSync(targetDir);
  
  // Sao chép nội dung từ sourceDir sang targetDir
  fs.copySync(sourceDir, targetDir);
  console.log('Đã sao chép thư mục public thành công!');
} catch (err) {
  console.error('Lỗi khi sao chép thư mục:', err);
  process.exit(1);
} 