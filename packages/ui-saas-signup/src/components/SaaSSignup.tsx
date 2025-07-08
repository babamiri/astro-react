import React, { useState } from 'react';
import { Button } from '@astro-react/ui-button';
import { colors, spacing, borderRadius, typography, shadows } from '@astro-react/design-tokens';

interface Plan {
  id: 'basic' | 'pro' | 'enterprise';
  name: string;
  price: number;
  features: string[];
}

const plans: Plan[] = [
  { 
    id: 'basic', 
    name: 'پلن پایه', 
    price: 19,
    features: ['تا ۱۰ کاربر', 'پشتیبانی ایمیل', '۱ گیگابایت فضا']
  },
  { 
    id: 'pro', 
    name: 'پلن حرفه‌ای', 
    price: 49,
    features: ['تا ۱۰۰ کاربر', 'پشتیبانی ۲۴/۷', '۱۰ گیگابایت فضا']
  },
  { 
    id: 'enterprise', 
    name: 'پلن سازمانی', 
    price: 99,
    features: ['کاربران نامحدود', 'پشتیبانی اختصاصی', 'فضای نامحدود']
  },
];

interface SaaSSignupProps {
  onSuccess?: (data: { domain: string; planId: string }) => void;
  onError?: (error: string) => void;
}

const SaaSSignup: React.FC<SaaSSignupProps> = ({ onSuccess, onError }) => {
  const [domain, setDomain] = useState('');
  const [planId, setPlanId] = useState<Plan['id']>('basic');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateDomain = (value: string): boolean => {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]$/;
    return domainRegex.test(value) && value.length >= 3;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!domain.trim()) {
      const errorMsg = 'لطفاً یک دامنه وارد کنید';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    if (!validateDomain(domain)) {
      const errorMsg = 'دامنه وارد شده معتبر نیست';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      onSuccess?.({ domain, planId });
    } catch (err) {
      const errorMsg = 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.';
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.base,
    padding: spacing['2xl'],
    maxWidth: '600px',
    margin: '0 auto',
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xl,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: spacing.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.gray[800],
    fontSize: typography.fontSize.base,
  };

  const inputContainerStyle: React.CSSProperties = {
    display: 'flex',
    borderRadius: borderRadius.md,
    border: `1px solid ${error && !domain ? colors.orange[500] : colors.gray[300]}`,
    overflow: 'hidden',
    transition: 'border-color 0.2s ease',
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    padding: spacing.md,
    border: 'none',
    outline: 'none',
    fontSize: typography.fontSize.base,
    backgroundColor: colors.white,
  };

  const suffixStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${spacing.lg}`,
    backgroundColor: colors.gray[100],
    color: colors.gray[600],
    fontSize: typography.fontSize.sm,
    borderLeft: `1px solid ${colors.gray[300]}`,
  };

  const plansGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: spacing.lg,
  };

  const planCardStyle = (isActive: boolean): React.CSSProperties => ({
    border: `2px solid ${isActive ? colors.orange[500] : colors.gray[300]}`,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: isActive ? colors.orange[50] : colors.white,
    position: 'relative',
  });

  const errorStyle: React.CSSProperties = {
    color: colors.orange[600],
    fontSize: typography.fontSize.sm,
    marginTop: spacing.sm,
  };

  if (submitted) {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: spacing.lg }}>🚀</div>
          <h3 style={{ 
            fontSize: typography.fontSize['2xl'], 
            fontWeight: typography.fontWeight.bold,
            color: colors.orange[800],
            marginBottom: spacing.lg 
          }}>
            آزمون شما فعال شد!
          </h3>
          <p style={{ 
            color: colors.brown[600],
            marginBottom: spacing.xl,
            lineHeight: '1.6'
          }}>
            پلن {plans.find(p => p.id === planId)?.name} برای دامنه <strong>{domain}.example.com</strong> فعال شد.
            <br />
            ایمیل تأیید برای شما ارسال خواهد شد.
          </p>
          <Button 
            text="بازگشت به صفحه اصلی"
            variant="secondary"
            onClick={() => {
              setSubmitted(false);
              setDomain('');
              setPlanId('basic');
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label style={labelStyle}>نام دامنه دلخواه</label>
          <div style={inputContainerStyle}>
            <input
              type="text"
              style={inputStyle}
              placeholder="mycoolstartup"
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
                setError('');
              }}
              disabled={loading}
            />
            <span style={suffixStyle}>.example.com</span>
          </div>
          {error && <div style={errorStyle}>{error}</div>}
        </div>

        <div>
          <label style={labelStyle}>پلن موردنظر</label>
          <div style={plansGridStyle}>
            {plans.map((plan) => (
              <label
                key={plan.id}
                style={planCardStyle(planId === plan.id)}
                onClick={() => setPlanId(plan.id)}
              >
                <input
                  type="radio"
                  style={{ display: 'none' }}
                  name="plan"
                  value={plan.id}
                  checked={planId === plan.id}
                  onChange={() => setPlanId(plan.id)}
                />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontWeight: typography.fontWeight.bold,
                    fontSize: typography.fontSize.lg,
                    marginBottom: spacing.sm,
                    color: colors.gray[800]
                  }}>
                    {plan.name}
                  </div>
                  <div style={{ 
                    fontSize: typography.fontSize['2xl'],
                    color: colors.orange[600],
                    fontWeight: typography.fontWeight.extrabold,
                    marginBottom: spacing.sm
                  }}>
                    ${plan.price}
                  </div>
                  <div style={{ 
                    fontSize: typography.fontSize.sm,
                    color: colors.gray[600],
                    marginBottom: spacing.md
                  }}>
                    هر ماه
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {plan.features.map((feature, index) => (
                      <div key={index} style={{ 
                        fontSize: typography.fontSize.sm,
                        color: colors.gray[600],
                        marginBottom: spacing.xs,
                        display: 'flex',
                        alignItems: 'center',
                        gap: spacing.sm
                      }}>
                        <span style={{ color: colors.orange[500] }}>✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <Button 
          text="شروع آزمایش رایگان ۱۴ روزه"
          loading={loading}
          disabled={!domain.trim()}
        />
      </form>
    </div>
  );
};

export default SaaSSignup; 