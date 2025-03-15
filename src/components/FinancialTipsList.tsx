
import React from 'react';
import { Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type FinancialTip = {
  id: string;
  title: string;
  description: string;
};

const financialTipsEn: FinancialTip[] = [
  {
    id: 'emergency-fund',
    title: 'Emergency Fund',
    description: 'Aim to save 3-6 months of expenses in an easily accessible account for emergencies.'
  },
  {
    id: '50-30-20',
    title: '50/30/20 Rule',
    description: 'Allocate 50% of income to needs, 30% to wants, and 20% to savings and debt repayment.'
  },
  {
    id: 'debt-management',
    title: 'Debt Management',
    description: 'Pay off high-interest debt first while maintaining minimum payments on other debts.'
  },
  {
    id: 'credit-score',
    title: 'Credit Score',
    description: 'Check your credit report regularly and pay bills on time to maintain a good credit score.'
  },
  {
    id: 'retirement',
    title: 'Retirement Planning',
    description: 'Start saving for retirement early and take advantage of employer matching programs.'
  }
];

// We would normally have translations for all supported languages
// This is a simplified version
const getTranslatedTips = (languageCode: string): FinancialTip[] => {
  // For now, just return English tips
  return financialTipsEn;
};

const FinancialTipsList = () => {
  const { currentLanguage } = useLanguage();
  const tips = getTranslatedTips(currentLanguage.code);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Financial Literacy Tips</h2>
      <div className="space-y-4">
        {tips.map((tip) => (
          <div key={tip.id} className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="mt-1 bg-white p-1 rounded-full">
                <Info className="h-5 w-5 text-brand-blue" />
              </div>
              <div>
                <h3 className="font-medium text-brand-blue">{tip.title}</h3>
                <p className="text-gray-700">{tip.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialTipsList;
