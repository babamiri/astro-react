import React from 'react';

interface ResultProps {
  formData: { [key: string]: any };
  premium: number;
}

const Result: React.FC<ResultProps> = ({ formData, premium }) => {
  const formatNumber = (num: number): string => {
    return num.toLocaleString('fa-IR');
  };

  const getCoverageType = () => {
    const coverageTypes: { [key: string]: string } = {
      third_party: 'شخص ثالث',
      comprehensive: 'بدنه',
      full: 'کامل'
    };
    return coverageTypes[formData.coverage_type] || 'نامشخص';
  };

  const getDiscountInfo = () => {
    const discount = formData.discount_percentage;
    return discount ? `${discount}%` : '0%';
  };

  const handleButtonClick = (action: string) => {
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    // Here you would implement the actual action
    console.log(`${action} clicked`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 touch-spacing mb-6 md:mb-8">
        <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            مشخصات خودرو
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">نوع خودرو:</span>
              <span className="font-medium text-gray-800">{formData.vehicle_type}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">برند:</span>
              <span className="font-medium text-gray-800">{formData.vehicle_brand}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">مدل:</span>
              <span className="font-medium text-gray-800">{formData.vehicle_model}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">سال تولید:</span>
              <span className="font-medium text-gray-800">{formData.vehicle_year}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            مشخصات بیمه
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">نوع پوشش:</span>
              <span className="font-medium text-gray-800">{getCoverageType()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">درصد تخفیف:</span>
              <span className="font-medium text-green-600">{getDiscountInfo()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">سن راننده:</span>
              <span className="font-medium text-gray-800">{formData.driver_age}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">سابقه رانندگی:</span>
              <span className="font-medium text-gray-800">{formData.driver_experience}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 md:p-6 rounded-xl mb-6 shadow-lg animate-bounce-soft">
        <div className="text-center">
          <h3 className="text-base md:text-lg font-semibold mb-2">مبلغ حق بیمه سالانه</h3>
          <div className="text-2xl md:text-3xl font-bold">
            {formatNumber(premium)} <span className="text-sm">ریال</span>
          </div>
          <p className="text-sm mt-2 opacity-90">
            معادل {formatNumber(Math.round(premium / 10))} تومان
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 touch-spacing mb-6">
        <button 
          onClick={() => handleButtonClick('خرید آنلاین')}
          className="btn-primary bg-green-500 hover:bg-green-600 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          خرید آنلاین
        </button>
        <button 
          onClick={() => handleButtonClick('مشاوره تلفنی')}
          className="btn-primary bg-blue-500 hover:bg-blue-600 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          مشاوره تلفنی
        </button>
      </div>

      <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl shadow-sm">
        <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
          <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          نکات مهم
        </h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 mt-1">•</span>
            <span>این محاسبه تقریبی است و مبلغ نهایی ممکن است متفاوت باشد</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 mt-1">•</span>
            <span>برای دریافت قیمت دقیق با کارشناسان ما تماس بگیرید</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 mt-1">•</span>
            <span>امکان پرداخت اقساطی موجود است</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Result; 