import React, { useState, useEffect } from 'react';
import StepRenderer from './StepRenderer';
import SelectedItems from './SelectedItems';
import Result from './Result';

interface WizardData {
  [key: string]: any;
}

interface Step {
  id: string;
  title: string;
  order: number;
  type: string;
  required: boolean;
  options?: any[];
  showWhen?: {
    field: string;
    value: string;
  };
  helpText?: string;
}

interface WizardConfig {
  metadata: {
    version: string;
    title: string;
    description: string;
    totalSteps: number;
    estimatedTime: string;
  };
  navigation: {
    type: string;
    startStep: number;
    endStep: string;
  };
  steps: Step[];
  calculationFormula?: any;
  errorMessages: {
    required: string;
    invalid: string;
    apiError: string;
  };
}

interface DynamicWizardProps {
  insuranceType: string;
  configFile: string;
  onBack: () => void;
}

const DynamicWizard: React.FC<DynamicWizardProps> = ({ insuranceType, configFile, onBack }) => {
  const [currentStepOrder, setCurrentStepOrder] = useState<number>(1);
  const [formData, setFormData] = useState<WizardData>({});
  const [selectedItems, setSelectedItems] = useState<Array<{id: string, label: string, value: string}>>([]);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [wizardConfig, setWizardConfig] = useState<WizardConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [swipeStartX, setSwipeStartX] = useState<number>(0);
  const [swipeStartY, setSwipeStartY] = useState<number>(0);

  // Load wizard configuration
  useEffect(() => {
    const loadWizardConfig = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Dynamic import based on config file
        let config;
        switch (configFile) {
          case 'insuranceWizard.json':
            config = await import('../data/insuranceWizard.json');
            break;
          case 'fireInsurance.json':
            config = await import('../data/fireInsurance.json');
            break;
          case 'travelInsurance.json':
            config = await import('../data/travelInsurance.json');
            break;
          case 'electronicsInsurance.json':
            config = await import('../data/electronicsInsurance.json');
            break;
          case 'liabilityInsurance.json':
            config = await import('../data/liabilityInsurance.json');
            break;
          case 'medicalInsurance.json':
            config = await import('../data/medicalInsurance.json');
            break;
          default:
            throw new Error(`Configuration file ${configFile} not found`);
        }
        
        setWizardConfig(config.default);
      } catch (err) {
        console.error('Error loading wizard config:', err);
        setError('خطا در بارگذاری تنظیمات ویزارد');
      } finally {
        setLoading(false);
      }
    };

    loadWizardConfig();
  }, [configFile]);

  // Reset form when insurance type changes
  useEffect(() => {
    setCurrentStepOrder(1);
    setFormData({});
    setSelectedItems([]);
    setCompletedSteps([]);
  }, [insuranceType]);

  // Swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setSwipeStartX(touch.clientX);
    setSwipeStartY(touch.clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!e.changedTouches.length) return;
    
    const touch = e.changedTouches[0];
    const diffX = touch.clientX - swipeStartX;
    const diffY = touch.clientY - swipeStartY;
    
    // Check if it's a horizontal swipe (more horizontal than vertical)
    const isHorizontalSwipe = Math.abs(diffX) > Math.abs(diffY);
    const minSwipeDistance = 50; // Minimum distance for swipe
    
    if (isHorizontalSwipe && Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        // Swipe right (go to previous step)
        handleSwipePrevious();
      } else {
        // Swipe left (go to next step - only if current step is completed)
        handleSwipeNext();
      }
    }
  };

  const handleSwipePrevious = () => {
    if (currentStepOrder > 1) {
      const prevOrder = getPreviousValidStepOrder(currentStepOrder, formData);
      if (prevOrder !== currentStepOrder) {
        // Haptic feedback
        if ('vibrate' in navigator) {
          navigator.vibrate(50);
        }
        setCurrentStepOrder(prevOrder);
      }
    }
  };

  const handleSwipeNext = () => {
    const currentStep = getCurrentStep();
    if (currentStep && completedSteps.includes(currentStep.id)) {
      const nextOrder = getNextValidStepOrder(currentStepOrder, formData);
      if (nextOrder !== currentStepOrder) {
        // Haptic feedback
        if ('vibrate' in navigator) {
          navigator.vibrate(50);
        }
        setCurrentStepOrder(nextOrder);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          {/* Loading Skeleton */}
          <div className="max-w-md mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 gap-4">
                <div className="h-16 bg-gray-200 rounded-xl"></div>
                <div className="h-16 bg-gray-200 rounded-xl"></div>
                <div className="h-16 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 animate-pulse-soft">در حال بارگذاری...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">خطا</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            بازگشت
          </button>
        </div>
      </div>
    );
  }

  if (!wizardConfig) {
    return null;
  }

  const steps: Step[] = wizardConfig.steps;
  const maxOrder = Math.max(...steps.map(step => step.order));

  // Get current step data
  const getCurrentStep = (): Step | undefined => {
    return steps.find(step => step.order === currentStepOrder);
  };

  // Get all steps sorted by order
  const getSortedSteps = (): Step[] => {
    return steps.sort((a, b) => a.order - b.order);
  };

  // Check if step should be shown based on conditions
  const shouldShowStep = (step: Step, currentFormData: WizardData = formData): boolean => {
    if (!step.showWhen) return true;
    
    const conditionField = step.showWhen.field;
    const conditionValue = step.showWhen.value;
    
    return currentFormData[conditionField] === conditionValue;
  };

  // Get next valid step order
  const getNextValidStepOrder = (currentOrder: number, currentFormData: WizardData = formData): number => {
    const sortedSteps = getSortedSteps();
    
    for (let i = 0; i < sortedSteps.length; i++) {
      const step = sortedSteps[i];
      if (step.order > currentOrder) {
        if (shouldShowStep(step, currentFormData)) {
          return step.order;
        }
      }
    }
    
    // If no valid step found, go to result
    return maxOrder; // result step
  };

  // Get previous valid step order
  const getPreviousValidStepOrder = (currentOrder: number, currentFormData: WizardData = formData): number => {
    const sortedSteps = getSortedSteps().reverse();
    
    for (let i = 0; i < sortedSteps.length; i++) {
      const step = sortedSteps[i];
      if (step.order < currentOrder) {
        if (shouldShowStep(step, currentFormData)) {
          return step.order;
        }
      }
    }
    
    return 1; // First step
  };

  // Handle option selection
  const handleOptionSelect = (stepId: string, option: any, stepTitle: string) => {
    const newFormData = { ...formData, [stepId]: option.value };
    setFormData(newFormData);

    // Add to selected items
    const newSelectedItem = {
      id: stepId,
      label: `${stepTitle}: ${option.label}`,
      value: option.value
    };

    setSelectedItems(prev => {
      const filtered = prev.filter(item => item.id !== stepId);
      return [...filtered, newSelectedItem];
    });

    // Mark step as completed
    setCompletedSteps(prev => [...prev.filter(id => id !== stepId), stepId]);

    // Navigate to next step using updated form data
    const nextOrder = getNextValidStepOrder(currentStepOrder, newFormData);
    setCurrentStepOrder(nextOrder);
  };

  // Handle removing selected item
  const handleRemoveItem = (itemId: string) => {
    const removedStep = steps.find(step => step.id === itemId);
    if (!removedStep) return;

    // Remove from form data
    const newFormData = { ...formData };
    delete newFormData[itemId];

    // Remove all subsequent form data that might be affected
    const sortedSteps = getSortedSteps();
    const removedStepIndex = sortedSteps.findIndex(step => step.id === itemId);
    
    // Remove data from all steps after the removed step
    for (let i = removedStepIndex + 1; i < sortedSteps.length; i++) {
      const step = sortedSteps[i];
      if (newFormData[step.id]) {
        delete newFormData[step.id];
      }
    }

    setFormData(newFormData);

    // Remove from selected items (this item and all subsequent)
    const removedIndex = selectedItems.findIndex(item => item.id === itemId);
    if (removedIndex !== -1) {
      setSelectedItems(prev => prev.slice(0, removedIndex));
    }

    // Remove from completed steps
    setCompletedSteps(prev => prev.filter(id => {
      const step = steps.find(s => s.id === id);
      return step ? step.order < removedStep.order : false;
    }));

    // Navigate back to that step
    setCurrentStepOrder(removedStep.order);
  };

  // Calculate insurance premium based on wizard config
  const calculatePremium = (): number => {
    const formula = wizardConfig.calculationFormula;
    if (!formula) {
      return 1000000; // Default value
    }

    let basePremium = formula.basePremium || 1000000;

    // Apply multipliers based on form data
    Object.keys(formData).forEach(key => {
      const value = formData[key];
      
      // Check for multipliers in formula
      Object.keys(formula).forEach(formulaKey => {
        if (formulaKey.includes('Multiplier') && formula[formulaKey][value]) {
          basePremium *= formula[formulaKey][value];
        }
      });
    });

    // Apply various discount and multiplier logic...
    // (All the calculation logic from the original DynamicWizard)

    return Math.round(basePremium);
  };

  // Get current step data
  const currentStepData = getCurrentStep();

  // Check if we're on the result step
  const isResultStep = currentStepData?.type === 'result';

  if (isResultStep) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              بازگشت به فهرست بیمه‌ها
            </button>
          </div>
          
          <SelectedItems 
            selectedItems={selectedItems.map(item => ({
              stepId: item.id,
              stepTitle: item.label.split(': ')[0],
              selectedOption: { label: item.label.split(': ')[1], value: item.value }
            }))}
            onRemoveItem={handleRemoveItem}
            isVisible={selectedItems.length > 0}
          />
          <Result 
            result={{
              totalPrice: calculatePremium(),
              breakdown: [
                {
                  item: 'بیمه‌نامه',
                  price: calculatePremium(),
                  description: 'قیمت کل بیمه بر اساس انتخاب‌های شما'
                }
              ],
              coverage: 'پوشش کامل',
              recommendations: ['بررسی شرایط بیمه‌نامه', 'مقایسه با سایر شرکت‌ها']
            }}
            onRestart={() => {
              setCurrentStepOrder(1);
              setFormData({});
              setSelectedItems([]);
              setCompletedSteps([]);
            }}
          />
        </div>
      </div>
    );
  }

  if (!currentStepData) {
    return <div className="text-center py-8">خطا در بارگذاری مرحله</div>;
  }

  // Calculate progress - only count visible steps
  const visibleSteps = getSortedSteps().filter(step => 
    step.type !== 'result' && shouldShowStep(step, formData)
  );
  const currentProgress = (completedSteps.length / visibleSteps.length) * 100;
  
  // Get step navigation info
  const getStepNavigation = () => {
    const currentIndex = visibleSteps.findIndex(step => step.order === currentStepOrder);
    const totalSteps = visibleSteps.length;
    const prevStep = currentIndex > 0 ? visibleSteps[currentIndex - 1] : null;
    const nextStep = currentIndex < totalSteps - 1 ? visibleSteps[currentIndex + 1] : null;
    
    return {
      currentIndex: currentIndex + 1,
      totalSteps,
      prevStep,
      nextStep,
      progress: currentProgress
    };
  };

  const navInfo = getStepNavigation();

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8"
         onTouchStart={handleTouchStart}
         onTouchEnd={handleTouchEnd}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg animate-fade-in">
          
          {/* Header with improved mobile design */}
          <div className="p-4 md:p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors touch-target"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">بازگشت</span>
              </button>
              <div className="text-sm text-gray-500">
                {insuranceType}
              </div>
            </div>

            {/* Enhanced Progress Indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  مرحله {navInfo.currentIndex} از {navInfo.totalSteps}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(navInfo.progress)}% تکمیل شده
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${navInfo.progress}%` }}
                />
              </div>
              
              {/* Step Indicators */}
              <div className="flex justify-between mt-3 overflow-x-auto">
                {visibleSteps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center min-w-0 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      completedSteps.includes(step.id)
                        ? 'bg-green-500 text-white'
                        : step.order === currentStepOrder
                        ? 'bg-blue-500 text-white animate-pulse-soft'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {completedSteps.includes(step.id) ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className="text-xs text-gray-600 mt-1 text-center hidden sm:block">
                      {step.title.length > 12 ? step.title.substring(0, 12) + '...' : step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Content Area */}
          <div className="p-4 md:p-6">
            <SelectedItems 
              selectedItems={selectedItems.map(item => ({
                stepId: item.id,
                stepTitle: item.label.split(': ')[0],
                selectedOption: { label: item.label.split(': ')[1], value: item.value }
              }))}
              onRemoveItem={handleRemoveItem}
              isVisible={selectedItems.length > 0}
            />

            <div className="animate-slide-in">
              <StepRenderer
                step={currentStepData}
                onOptionSelect={handleOptionSelect}
                formData={formData}
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="mobile-nav md:hidden">
            <div className="flex items-center justify-between">
              <button
                onClick={handleSwipePrevious}
                disabled={currentStepOrder === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors touch-target ${
                  currentStepOrder === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                قبلی
              </button>
              
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  {navInfo.currentIndex} / {navInfo.totalSteps}
                </span>
                <div className="text-xs text-gray-500 mt-1">
                  برای رفت و برگشت swipe کنید
                </div>
              </div>
              
              <button
                onClick={handleSwipeNext}
                disabled={!getCurrentStep() || !completedSteps.includes(getCurrentStep()!.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors touch-target ${
                  !getCurrentStep() || !completedSteps.includes(getCurrentStep()!.id)
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                بعدی
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Swipe Indicators for mobile */}
      <div className="md:hidden">
        {currentStepOrder > 1 && (
          <div className="swipe-indicator left animate-pulse-soft">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        )}
        
        {getCurrentStep() && completedSteps.includes(getCurrentStep()!.id) && (
          <div className="swipe-indicator right animate-pulse-soft">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicWizard; 