import React, { useState } from 'react';
import { Button } from '@astro-react/ui-button';

interface Plan {
  id: 'basic' | 'pro' | 'enterprise';
  name: string;
  price: number;
}

const plans: Plan[] = [
  { id: 'basic', name: 'پلن پایه', price: 19 },
  { id: 'pro', name: 'پلن حرفه‌ای', price: 49 },
  { id: 'enterprise', name: 'پلن سازمانی', price: 99 },
];

// Define inline styles as React style objects
const styles = {
  container: {
    backgroundColor: '#ffffff',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    padding: '1.5rem'
  },
  successContainer: {
    textAlign: 'center' as const
  },
  successHeading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#9a3412', // text-orange-800
    marginBottom: '1rem'
  },
  successText: {
    color: '#a66f44' // text-brown-600
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem'
  },
  labelBlock: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500'
  },
  inputContainer: {
    display: 'flex'
  },
  input: {
    flexGrow: 1,
    borderTopLeftRadius: '0.5rem',
    borderBottomLeftRadius: '0.5rem',
    borderWidth: '1px',
    borderColor: '#d1d5db',
    padding: '0.75rem',
    outline: 'none'
  },
  inputSuffix: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0 1rem',
    backgroundColor: '#f3f4f6',
    borderWidth: '1px',
    borderLeftWidth: '0',
    borderColor: '#d1d5db',
    borderTopRightRadius: '0.5rem',
    borderBottomRightRadius: '0.5rem',
    fontSize: '0.875rem'
  },
  plansGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1rem',
    '@media (min-width: 640px)': {
      gridTemplateColumns: 'repeat(3, 1fr)'
    }
  },
  planLabel: (isActive: boolean) => ({
    border: '1px solid',
    borderColor: isActive ? '#ea580c' : '#d1d5db',
    borderRadius: '0.5rem',
    padding: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: isActive ? '0 0 0 2px rgba(251, 146, 60, 0.5)' : 'none'
  }),
  planRadio: {
    display: 'none'
  },
  planContent: {
    textAlign: 'center' as const
  },
  planName: {
    fontWeight: 'bold',
    fontSize: '1.125rem',
    marginBottom: '0.25rem'
  },
  planPrice: {
    fontSize: '1.5rem',
    color: '#ea580c',
    fontWeight: '800',
    marginBottom: '0.25rem'
  },
  planPeriod: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  divContainer: {
    marginBottom: '1rem'
  }
};

const SaaSSignup: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [planId, setPlanId] = useState<Plan['id']>('basic');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) {
      alert('لطفاً یک دامنه وارد کنید');
      return;
    }
    setSubmitted(true);
    alert(`تبریک! آزمون ۱۴ روزه پلن ${plans.find((p) => p.id === planId)?.name} برای دامنه ${domain}.example.com فعال شد.`);
  };
  
  const handleButtonClick = () => {
    if (!domain.trim()) {
      alert('لطفاً یک دامنه وارد کنید');
      return;
    }
    setSubmitted(true);
    alert(`تبریک! آزمون ۱۴ روزه پلن ${plans.find((p) => p.id === planId)?.name} برای دامنه ${domain}.example.com فعال شد.`);
  };

  return (
    <div style={styles.container}>
      {submitted ? (
        <div style={styles.successContainer}>
          <h3 style={styles.successHeading}>آزمون شما فعال شد! 🚀</h3>
          <p style={styles.successText}>ما یک ایمیل تأیید برای شما ارسال کردیم.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.divContainer}>
            <label style={styles.labelBlock}>نام دامنه دلخواه</label>
            <div style={styles.inputContainer}>
              <input
                type="text"
                style={styles.input}
                placeholder="mycoolstartup"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <span style={styles.inputSuffix}>
                .example.com
              </span>
            </div>
          </div>

          <div style={styles.divContainer}>
            <label style={styles.labelBlock}>پلن موردنظر</label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem'
            }}>
              {plans.map((plan) => (
                <label
                  key={plan.id}
                  style={styles.planLabel(planId === plan.id)}
                >
                  <input
                    type="radio"
                    style={styles.planRadio}
                    name="plan"
                    value={plan.id}
                    checked={planId === plan.id}
                    onChange={() => setPlanId(plan.id)}
                  />
                  <div style={styles.planContent}>
                    <div style={styles.planName}>{plan.name}</div>
                    <div style={styles.planPrice}>${plan.price}</div>
                    <div style={styles.planPeriod}>هر ماه</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <Button 
            text="شروع آزمایش رایگان ۱۴ روزه"
            onClick={handleButtonClick}
          />
        </form>
      )}
    </div>
  );
};

export default SaaSSignup; 