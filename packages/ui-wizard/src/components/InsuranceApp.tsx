import React, { useState } from 'react';
import InsuranceSelector from './InsuranceSelector';
import DynamicWizard from './Wizard';
import insuranceTypes from '../data/insuranceTypes.json';

const InsuranceApp: React.FC = () => {
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null);
  const [selectedConfigFile, setSelectedConfigFile] = useState<string>('');

  const handleInsuranceSelect = (insuranceId: string) => {
    const insurance = insuranceTypes.insuranceTypes.find(type => type.id === insuranceId);
    if (insurance && insurance.active) {
      setSelectedInsurance(insuranceId);
      setSelectedConfigFile(insurance.configFile);
    }
  };

  const handleBackToSelector = () => {
    setSelectedInsurance(null);
    setSelectedConfigFile('');
  };

  const getInsuranceTitle = (insuranceId: string): string => {
    const insurance = insuranceTypes.insuranceTypes.find(type => type.id === insuranceId);
    return insurance ? insurance.title : insuranceId;
  };

  return (
    <div className="insurance-app">
      {selectedInsurance ? (
        <DynamicWizard
          insuranceType={getInsuranceTitle(selectedInsurance)}
          configFile={selectedConfigFile}
          onBack={handleBackToSelector}
        />
      ) : (
        <InsuranceSelector onSelect={handleInsuranceSelect} />
      )}
    </div>
  );
};

export default InsuranceApp; 