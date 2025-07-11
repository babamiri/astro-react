import React from 'react';

interface SelectedItem {
  id: string;
  label: string;
  value: string;
}

interface SelectedItemsProps {
  items: SelectedItem[];
  onRemoveItem: (itemId: string) => void;
}

const SelectedItems: React.FC<SelectedItemsProps> = ({ items, onRemoveItem }) => {
  if (items.length === 0) return null;

  const handleRemoveItem = (itemId: string) => {
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
    onRemoveItem(itemId);
  };

  return (
    <div className="mb-6 p-4 bg-blue-50 rounded-xl shadow-sm border border-blue-100 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm md:text-base font-medium text-blue-800 flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          انتخاب‌های شما
        </h3>
        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
          {items.length} مورد
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2 touch-spacing">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleRemoveItem(item.id)}
            className="selected-chip hover:scale-105 transition-all duration-200 touch-target group"
          >
            <span className="ml-2 text-xs md:text-sm truncate max-w-[200px]">
              {item.label}
            </span>
            <svg
              className="w-4 h-4 text-blue-600 hover:text-blue-800 transition-colors duration-200 group-hover:rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ))}
      </div>
      
      <div className="mt-3 p-2 bg-blue-100 rounded-lg">
        <p className="text-xs text-blue-700 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          برای تغییر هر انتخاب، روی آن کلیک کنید
        </p>
      </div>
    </div>
  );
};

export default SelectedItems; 