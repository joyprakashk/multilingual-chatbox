
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const LoanEligibilityCalculator = () => {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  
  const [loanType, setLoanType] = useState('Education Loan');
  const [annualIncome, setAnnualIncome] = useState(50000);
  const [creditScore, setCreditScore] = useState(700);
  const [loanAmount, setLoanAmount] = useState(100000);
  const [debtToIncome, setDebtToIncome] = useState(30);
  const [yearsOfEmployment, setYearsOfEmployment] = useState(2);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  const checkEligibility = () => {
    // Simple eligibility check logic
    const eligible = 
      creditScore >= 650 && 
      debtToIncome <= 36 && 
      yearsOfEmployment >= 2;
    
    setIsEligible(eligible);
    
    toast({
      title: eligible ? "Eligible for Loan" : "Not Eligible",
      description: eligible 
        ? "Based on your inputs, you are likely eligible for this loan!" 
        : "Based on your inputs, you might not be eligible for this loan. Consider improving your credit score or reducing your debt-to-income ratio.",
      variant: eligible ? "default" : "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Loan Eligibility Calculator</h2>
      <p className="text-gray-600">Use this tool to get a quick estimate of your loan eligibility.</p>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Loan Type</label>
          <select 
            value={loanType}
            onChange={(e) => setLoanType(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option>Education Loan</option>
            <option>Home Loan</option>
            <option>Personal Loan</option>
            <option>Business Loan</option>
            <option>Auto Loan</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Annual Income</label>
          <div className="flex items-center">
            <input 
              type="text" 
              value={`$${annualIncome.toLocaleString()}`}
              readOnly
              className="w-full p-2 border rounded-md"
            />
          </div>
          <Slider 
            defaultValue={[50000]} 
            max={200000} 
            step={1000}
            onValueChange={(value) => setAnnualIncome(value[0])}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Credit Score</label>
          <div className="flex items-center">
            <input 
              type="text" 
              value={creditScore}
              readOnly
              className="w-full p-2 border rounded-md"
            />
          </div>
          <Slider 
            defaultValue={[700]} 
            min={300}
            max={850} 
            step={1}
            onValueChange={(value) => setCreditScore(value[0])}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Loan Amount</label>
          <div className="flex items-center">
            <input 
              type="text" 
              value={`$${loanAmount.toLocaleString()}`}
              readOnly
              className="w-full p-2 border rounded-md"
            />
          </div>
          <Slider 
            defaultValue={[100000]} 
            max={500000} 
            step={5000}
            onValueChange={(value) => setLoanAmount(value[0])}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Debt-to-Income Ratio (%)</label>
          <div className="flex items-center">
            <input 
              type="text" 
              value={`${debtToIncome}%`}
              readOnly
              className="w-full p-2 border rounded-md"
            />
          </div>
          <Slider 
            defaultValue={[30]} 
            max={60} 
            step={1}
            onValueChange={(value) => setDebtToIncome(value[0])}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Years of Employment</label>
          <div className="flex items-center">
            <input 
              type="text" 
              value={yearsOfEmployment}
              readOnly
              className="w-full p-2 border rounded-md"
            />
          </div>
          <Slider 
            defaultValue={[2]} 
            max={20} 
            step={0.5}
            onValueChange={(value) => setYearsOfEmployment(value[0])}
          />
        </div>
        
        <Button 
          onClick={checkEligibility}
          className="w-full bg-brand-blue hover:bg-blue-700"
        >
          Check Eligibility
        </Button>
      </div>
      
      <div className="pt-4">
        <h3 className="font-bold mb-2">Key Eligibility Factors</h3>
        <ul className="space-y-2 list-disc pl-5">
          <li>Credit score typically 650+ for most loans</li>
          <li>Debt-to-income ratio ideally below 36%</li>
          <li>Employment stability (minimum 2 years preferred)</li>
          <li>Collateral (for secured loans)</li>
          <li>Down payment (for home and auto loans)</li>
        </ul>
      </div>
    </div>
  );
};

export default LoanEligibilityCalculator;
