import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button } from './index';

const App = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Button Component Test</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Default Button</h2>
        <Button text="Click me!" onClick={() => alert('Button clicked!')} />
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Usage Examples</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <Button text="Submit" />
          <Button text="Cancel" />
          <Button text="Save" />
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 