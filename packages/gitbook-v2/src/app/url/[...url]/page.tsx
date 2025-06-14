import { redirect } from 'next/navigation';

export default function Page({ params }: { params: { url: string[] } }) {
  // Chuyển hướng đến trang tài liệu cá nhân
  redirect('/docs');
} 