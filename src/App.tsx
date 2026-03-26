import { useEffect } from 'react';

declare global {
  interface Window {
    fbq: any;
  }
}

export default function App() {
  const REDIRECT_URL = 'https://smartstore.naver.com/midsen2023/products/11528313271';
  // Using a high-quality product-related placeholder image
  const THUMBNAIL_URL = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'; 

  useEffect(() => {
    // 1. Meta Pixel 'Contact' Event Tracking
    if (window.fbq) {
      window.fbq('track', 'Contact');
    }

    // 2. Technical Redirect Logic
    // Using window.location.replace to prevent back-button loops
    // 300ms delay ensures Meta Pixel data is sent successfully
    const timer = setTimeout(() => {
      window.location.replace(REDIRECT_URL);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full text-center space-y-6 border border-gray-100">
        {/* Product Image Container */}
        <div className="relative w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-inner">
          <img
            src={THUMBNAIL_URL}
            alt="Product Preview"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Status Text */}
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-gray-900">
            상품 페이지로 이동 중
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            잠시만 기다려주세요.<br />
            안전하게 스마트스토어로 연결하고 있습니다.
          </p>
        </div>

        {/* Progress Bar Animation */}
        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
          <div className="bg-green-500 h-full w-full origin-left animate-[loading_1s_ease-in-out_infinite]"></div>
        </div>

        {/* Manual Redirect Button (Fallback) */}
        <div className="pt-4">
          <a
            href={REDIRECT_URL}
            className="inline-block w-full py-3 px-6 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors shadow-md active:scale-95"
          >
            지금 바로 이동하기
          </a>
        </div>
      </div>

      {/* Trust Footer */}
      <div className="mt-8 text-gray-400 text-xs flex items-center gap-2">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 4.946-2.597 9.29-6.5 11.454a12.023 12.023 0 01-6.5-11.454c0-.681.056-1.35.166-2.001zm8.341 1.441a1 1 0 00-1.014 1.014V10a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11.5 9.586V7.454a1 1 0 00-.993-1.014z" clipRule="evenodd" />
        </svg>
        보안 연결됨 (Midsen Official)
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: scaleX(0); opacity: 0.5; }
          50% { transform: scaleX(0.7); opacity: 1; }
          100% { transform: scaleX(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
