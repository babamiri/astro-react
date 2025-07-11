import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import InsuranceSelector from './components/InsuranceSelector';
import DynamicWizard from './components/Wizard';
import insuranceTypes from './data/insuranceTypes.json';
import './index.css';

function App() {
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
    <div className="App">
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
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 