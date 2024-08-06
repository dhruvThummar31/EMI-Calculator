import React, { useState } from 'react';
import EMICalculator from './EMICalculator';
import AmortizationSchedule from './AmortizationSchedule';

const App = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [tenure, setTenure] = useState(10);
  const [interestRate, setInterestRate] = useState(7);

  const monthlyInterestRate = interestRate / 12 / 100;
  const totalPayments = tenure * 12;

  const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) /
              (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

  return (
    <div>
      <EMICalculator 
        loanAmount={loanAmount}
        setLoanAmount={setLoanAmount}
        tenure={tenure}
        setTenure={setTenure}
        interestRate={interestRate}
        setInterestRate={setInterestRate}
        emi={emi}
      />
      
      <AmortizationSchedule 
        loanAmount={loanAmount}
        tenure={tenure}
        interestRate={interestRate}
      />
    </div>
  );
};

export default App;





