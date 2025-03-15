
import React from 'react';
import LoanEligibilityCalculator from '@/components/LoanEligibilityCalculator';

const LoanEligibility = () => {
  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-md shadow-sm p-6 border">
          <LoanEligibilityCalculator />
        </div>
      </div>
    </div>
  );
};

export default LoanEligibility;
