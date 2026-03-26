import { useEffect } from 'react';

declare global {
  interface Window {
    fbq: any;
  }
}

export default function App() {
  const REDIRECT_URL = 'https://smartstore.naver.com/midsen2023/products/11528313271';
  const THUMBNAIL_URL = 'https://picsum.photos/seed/product/400/400'; // Placeholder for product thumbnail

  useEffect(() => {
    // 1. Track 'Contact' event before redirect
    if (window.fbq) {
      window.fbq('track', 'Contact');
    }

    // 2. Redirect with a slight delay to ensure pixel tracking
    const timer = setTimeout(() => {
      window.location.replace(REDIRECT_URL);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="max-w-sm w-full space-y-8 text-center">
        {/* Product Thumbnail */}
        <div className="relative aspect-square w-64 mx-auto overflow-hidden rounded-2xl shadow-lg border border-gray-100">
          <img
            src={THUMBNAIL_URL}
            alt="Product Thumbnail"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Loading Message */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
          <p className="text-lg font-medium text-gray-800 animate-pulse">
            상품페이지에 연결 중입니다.
          </p>
          <p className="text-sm text-gray-500">
            잠시만 기다려주세요...
          </p>
        </div>
      </div>

      {/* Footer / Trust signal for bot review */}
      <div className="fixed bottom-8 text-xs text-gray-400">
        © 2026 Midsen. All rights reserved.
      </div>
    </div>
  );
}
