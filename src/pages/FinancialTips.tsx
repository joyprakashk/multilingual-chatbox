
import React from 'react';
import FinancialTipsList from '@/components/FinancialTipsList';

const FinancialTips = () => {
  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-md shadow-sm p-6 border">
          <FinancialTipsList />
        </div>
      </div>
    </div>
  );
};

export default FinancialTips;
