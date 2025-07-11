import React, { useState, useEffect } from 'react';

interface Option {
  id: string;
  label: string;
  value: string;
  description?: string;
  nextStep?: string;
}

interface Step {
  id: string;
  title: string;
  type: string;
  required: boolean;
  options?: Option[];
  helpText?: string;
  condition?: {
    field: string;
    value: string;
  };
  nextStep?: string;
}

interface StepRendererProps {
  step: Step;
  onOptionSelect: (stepId: string, option: any, stepTitle: string) => void;
  formData: { [key: string]: any };
}

const StepRenderer: React.FC<StepRendererProps> = ({ step, onOptionSelect, formData }) => {
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Reset selected multiple when step changes or initialize from formData
  useEffect(() => {
    if (step.type === 'multiple_select') {
      const existingValue = formData[step.id];
      if (existingValue && Array.isArray(existingValue)) {
        setSelectedMultiple(existingValue);
      } else {
        setSelectedMultiple([]);
      }
    }
    setValidationError('');
  }, [step.id, step.type, formData]);

  // Haptic feedback for touch devices
  const triggerHapticFeedback = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const handleOptionClick = (option: Option) => {
    setIsProcessing(true);
    setValidationError('');
    triggerHapticFeedback();
    
    // Simulate processing time for better UX
    setTimeout(() => {
      onOptionSelect(step.id, option, step.title);
      setIsProcessing(false);
    }, 150);
  };

  const handleMultipleSelect = (option: Option) => {
    triggerHapticFeedback();
    let newSelected: string[];
    
    if (selectedMultiple.includes(option.value)) {
      newSelected = selectedMultiple.filter(val => val !== option.value);
    } else {
      newSelected = [...selectedMultiple, option.value];
    }
    
    setSelectedMultiple(newSelected);
    setValidationError('');
  };

  const handleContinueMultipleSelect = () => {
    if (selectedMultiple.length === 0 && step.required) {
      setValidationError('لطفاً حداقل یک گزینه را انتخاب کنید');
      return;
    }

    setIsProcessing(true);
    triggerHapticFeedback();
    
    // Create a combined option for multiple select
    const combinedOption = {
      id: 'multiple_final',
      label: selectedMultiple.map(val => 
        step.options?.find(opt => opt.value === val)?.label
      ).join(', '),
      value: selectedMultiple
    };
    
    setTimeout(() => {
      onOptionSelect(step.id, combinedOption, step.title);
      setIsProcessing(false);
    }, 150);
  };

  const renderSingleSelect = () => {
    if (!step.options) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 touch-spacing">
        {step.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option)}
            disabled={isProcessing}
            className={`option-button animate-fade-in ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="text-right flex-1">
                <span className="text-gray-700 font-medium block text-sm md:text-base">
                  {option.label}
                </span>
                {option.description && (
                  <span className="text-xs md:text-sm text-gray-500 mt-1 block">
                    {option.description}
                  </span>
                )}
              </div>
              <div className="touch-target flex items-center justify-center ml-3">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-blue-500 flex-shrink-0"></div>
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  };

  const renderMultipleSelect = () => {
    if (!step.options) return null;

    return (
      <div className="touch-spacing">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 touch-spacing">
          {step.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleMultipleSelect(option)}
              disabled={isProcessing}
              className={`option-button animate-fade-in ${
                selectedMultiple.includes(option.value)
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
              } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="text-right flex-1">
                  <span className="text-gray-700 font-medium block text-sm md:text-base">
                    {option.label}
                  </span>
                  {option.description && (
                    <span className="text-xs md:text-sm text-gray-500 mt-1 block">
                      {option.description}
                    </span>
                  )}
                </div>
                <div className="touch-target flex items-center justify-center ml-3">
                  <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                    selectedMultiple.includes(option.value)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedMultiple.includes(option.value) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {/* Validation Error */}
        {validationError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg animate-bounce-soft">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-red-700 text-sm">{validationError}</span>
            </div>
          </div>
        )}
        
        {/* Continue Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleContinueMultipleSelect}
            disabled={isProcessing || (selectedMultiple.length === 0 && step.required)}
            className={`btn-primary transition-all duration-300 ${
              isProcessing 
                ? 'opacity-50 cursor-not-allowed' 
                : selectedMultiple.length === 0 && step.required
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:scale-105'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>در حال پردازش...</span>
              </div>
            ) : selectedMultiple.length > 0 ? (
              `ادامه (${selectedMultiple.length} مورد انتخاب شده)`
            ) : (
              'لطفاً حداقل یک مورد انتخاب کنید'
            )}
          </button>
        </div>
      </div>
    );
  };

  const renderYesNo = () => {
    if (!step.options) return null;

    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center touch-spacing">
        {step.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option)}
            disabled={isProcessing}
            className={`px-8 py-4 rounded-xl border-2 font-medium transition-all duration-200 touch-target ${
              option.value === 'yes'
                ? 'border-green-500 text-green-700 hover:bg-green-50'
                : 'border-red-500 text-red-700 hover:bg-red-50'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                <span>در حال پردازش...</span>
              </div>
            ) : (
              option.label
            )}
          </button>
        ))}
      </div>
    );
  };

  const renderDate = () => {
    const [dateError, setDateError] = useState<string>('');

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const dateValue = event.target.value;
      
      // Validation
      if (!dateValue && step.required) {
        setDateError('لطفاً تاریخ را انتخاب کنید');
        return;
      }

      const selectedDate = new Date(dateValue);
      const today = new Date();
      
      if (selectedDate > today) {
        setDateError('تاریخ نمی‌تواند در آینده باشد');
        return;
      }

      setDateError('');
      triggerHapticFeedback();
      
      const option = {
        id: 'date',
        label: dateValue,
        value: dateValue
      };
      
      setTimeout(() => {
        onOptionSelect(step.id, option, step.title);
      }, 150);
    };

    return (
      <div className="flex flex-col items-center touch-spacing">
        <input
          type="date"
          onChange={handleDateChange}
          className="form-input max-w-xs text-center"
          style={{ direction: 'ltr' }}
        />
        
        {dateError && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg animate-bounce-soft">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-red-700 text-sm">{dateError}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mobile-spacing">
      <div className="text-center mb-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
          {step.title}
        </h2>
        
        {step.helpText && (
          <p className="text-center text-gray-600 mb-4 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            {step.helpText}
          </p>
        )}
      </div>
      
      <div className="max-w-4xl mx-auto">
        {step.type === 'single_select' && renderSingleSelect()}
        {step.type === 'multiple_select' && renderMultipleSelect()}
        {step.type === 'yes_no' && renderYesNo()}
        {step.type === 'date' && renderDate()}
      </div>
    </div>
  );
};

export default StepRenderer; 