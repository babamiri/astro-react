import React from 'react';

interface SelectedItem {
  stepId: string;
  stepTitle: string;
  selectedOption: any;
}

interface SelectedItemsProps {
  selectedItems: SelectedItem[];
  onRemoveItem: (stepId: string) => void;
  isVisible: boolean;
}

const SelectedItems: React.FC<SelectedItemsProps> = ({ selectedItems, onRemoveItem, isVisible }) => {
  if (!isVisible || selectedItems.length === 0) return null;

  const formatValue = (value: any) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value;
  };

  return (
    <div className="mb-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-sm font-medium text-gray-700">انتخاب‌های شما:</h3>
        <span className="text-xs text-gray-500">
          {selectedItems.length} مورد
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {selectedItems.map((item) => (
          <div
            key={item.stepId}
            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm hover:bg-blue-100 transition-colors duration-200"
          >
            <span className="text-blue-800 font-medium">
              {item.stepTitle}:
            </span>
            <span className="text-blue-700">
              {formatValue(item.selectedOption?.label || item.selectedOption?.value)}
            </span>
            
            <button
              onClick={() => onRemoveItem(item.stepId)}
              className="ml-1 p-1 text-blue-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
              title="حذف این انتخاب"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedItems; 