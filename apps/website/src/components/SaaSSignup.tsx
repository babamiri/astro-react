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

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {submitted ? (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-orange-800 mb-4">آزمون شما فعال شد! 🚀</h3>
          <p className="text-brown-600">ما یک ایمیل تأیید برای شما ارسال کردیم.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">نام دامنه دلخواه</label>
            <div className="flex">
              <input
                type="text"
                className="flex-grow rounded-l-lg border border-gray-300 p-3 focus:outline-none"
                placeholder="mycoolstartup"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <span className="inline-flex items-center px-4 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-sm">
                .example.com
              </span>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">پلن موردنظر</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <label
                  key={plan.id}
                  className={`border rounded-lg p-4 cursor-pointer transition ${
                    planId === plan.id ? 'border-orange-600 ring-2 ring-orange-400' : 'border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    className="hidden"
                    name="plan"
                    value={plan.id}
                    checked={planId === plan.id}
                    onChange={() => setPlanId(plan.id)}
                  />
                  <div className="text-center">
                    <div className="font-bold text-lg mb-1">{plan.name}</div>
                    <div className="text-2xl text-orange-600 font-extrabold mb-1">${plan.price}</div>
                    <div className="text-sm text-gray-500">هر ماه</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <Button 
            text="شروع آزمایش رایگان ۱۴ روزه"
            onClick={handleSubmit}
          />
        </form>
      )}
    </div>
  );
};

export default SaaSSignup; 