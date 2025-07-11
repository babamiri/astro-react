import React, { useState } from 'react';
import insuranceTypes from '../data/insuranceTypes.json';

interface InsuranceType {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  color: string;
  active: boolean;
  estimatedTime: string;
}

interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface InsuranceSelectorProps {
  onSelect: (insuranceId: string) => void;
}

const InsuranceSelector: React.FC<InsuranceSelectorProps> = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const insuranceTypesList: InsuranceType[] = insuranceTypes.insuranceTypes;
  const categories: Category[] = insuranceTypes.categories;

  // Filter insurance types based on category and search term
  const filteredInsuranceTypes = insuranceTypesList.filter(type => {
    const matchesCategory = selectedCategory === 'all' || type.category === selectedCategory;
    const matchesSearch = type.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         type.description.toLowerCase().includes(searchTerm.toLowerCase());
    const isActive = insuranceTypes.settings.showInactiveTypes || type.active;
    
    return matchesCategory && matchesSearch && isActive;
  });

  const handleInsuranceSelect = (insuranceId: string) => {
    const selectedType = insuranceTypesList.find(type => type.id === insuranceId);
    if (!selectedType?.active) return;
    
    setLoading(true);
    
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    // Simulate loading time for better UX
    setTimeout(() => {
      onSelect(insuranceId);
      setLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 md:py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-4">
            {insuranceTypes.metadata.title}
          </h1>
          <p className="text-base md:text-xl text-gray-600 mb-4 md:mb-8">
            {insuranceTypes.metadata.description}
          </p>
          
          {/* Search Bar */}
          {insuranceTypes.settings.enableSearch && (
            <div className="max-w-md mx-auto mb-6 md:mb-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="جستجو در انواع بیمه..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10 pr-4 text-right"
                />
              </div>
            </div>
          )}
        </div>

        {/* Category Filter */}
        {insuranceTypes.settings.enableCategoryFilter && (
          <div className="mb-6 md:mb-8 animate-slide-in">
            <div className="flex flex-wrap gap-2 justify-center touch-spacing">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 touch-target ${
                  selectedCategory === 'all'
                    ? 'bg-blue-500 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                همه
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 touch-target ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span className="hidden sm:inline">{category.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Insurance Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 touch-spacing">
          {filteredInsuranceTypes.map(type => (
            <div
              key={type.id}
              onClick={() => handleInsuranceSelect(type.id)}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 animate-fade-in ${
                !type.active ? 'opacity-60' : ''
              } ${loading ? 'pointer-events-none' : ''}`}
              style={{ borderTop: `4px solid ${type.color}` }}
            >
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl md:text-4xl">{type.icon}</div>
                  {!type.active && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      به زودی
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                  {type.title}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm md:text-base leading-relaxed">
                  {type.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-gray-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {type.estimatedTime}
                  </span>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 touch-target ${
                      type.active
                        ? 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!type.active}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>بارگذاری...</span>
                      </div>
                    ) : type.active ? (
                      'شروع محاسبه'
                    ) : (
                      'غیرفعال'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-2xl animate-bounce-soft">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">در حال بارگذاری...</p>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredInsuranceTypes.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-4xl md:text-6xl mb-4">🔍</div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
              هیچ بیمه‌ای یافت نشد
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              لطفاً کلمه جستجو یا دسته‌بندی را تغییر دهید
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 md:mt-12 animate-fade-in">
          <p className="text-gray-500 text-xs md:text-sm">
            سیستم جامع محاسبه بیمه • نسخه {insuranceTypes.metadata.version}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsuranceSelector; 