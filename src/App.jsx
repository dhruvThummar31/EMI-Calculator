import React, { useState,useEffect } from 'react';
import { Slider, Typography, Box, TextField, InputAdornment ,TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper} from '@mui/material';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const App = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [tenure, setTenure] = useState(8);
  const [interestRate, setInterestRate] = useState(7);
  const [emii, setEmii] = useState(0);

  
  const calculateEMI = () => {
    const r = interestRate / 12 / 100;
    const n = tenure * 12;
    const emi = loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    return emi.toFixed(2);
  };

  const emi = calculateEMI();
  const totalAmountPayable = (emi * tenure * 12).toFixed(2);
  const interestAmount = (totalAmountPayable - loanAmount).toFixed(2);

  const data = {
    labels: ['Principal Amount', 'Interest Amount'],
    datasets: [{
      data: [loanAmount, interestAmount],
      backgroundColor: ['#0077B6', '#90E0EF'],
      hoverBackgroundColor: ['#023E8A', '#00B4D8'],
    }],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  useEffect(() => {
    // EMI calculation
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = tenure * 12;
    const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    setEmii(emi.toFixed(2));
  }, [loanAmount, interestRate, tenure]);

  const calculateAmortizationSchedule = () => {
    let balance = loanAmount;
    const schedule = [];
    const numberOfPayments = tenure * 12;

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPaid = balance * (interestRate / 100) / 12;
      const principalPaid = emii - interestPaid;
      const closingBalance = balance - principalPaid;

      schedule.push({
        month,
        openingBalance: balance.toFixed(2),
        emi: emii,
        interestPaid: interestPaid.toFixed(2),
        principalPaid: principalPaid.toFixed(2),
        closingBalance: closingBalance.toFixed(2),
      });

      balance = closingBalance;
    }

    return schedule;
  };

  const amortizationSchedule = calculateAmortizationSchedule();


  return (
    <>
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      padding: 4,
      maxWidth: '1200px',
      margin: 'auto',
      backgroundColor: '#f7f7f7',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    }}>
      {/* Title Section */}
      <Typography variant="h4" align="center" gutterBottom sx={{ color: 'black', fontWeight: 'bold', marginBottom: 4 }}>
        Home Loan EMI Calculator
      </Typography>
      
      {/* Main Content Section */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 9,
      }}>
        {/* Sliders Section */}
        <Box sx={{ flex: 1 }}>
          <Box sx={{ marginY: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
              <Typography gutterBottom sx={{ fontSize: 18, color: '#333', fontWeight: 500, marginBottom: -1.7 }}>
                Loan Amount
              </Typography>
              <TextField
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                variant="outlined"
                size="small"
                sx={{ width: '140px', marginBottom: -1, fontWeight: 'bold' }}
                inputProps={{ min: 100000, max: 100000000, step: 100000 }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Slider
                value={loanAmount}
                min={100000}
                max={100000000}
                step={100000}
                onChange={(e, value) => setLoanAmount(value)}
                sx={{
                  color: '#0077B6',
                  height: 8,
                  flex: 1,
                  '& .MuiSlider-thumb': {
                    height: 24,
                    width: 24,
                    backgroundColor: '#fff',
                    border: '2px solid currentColor',
                  },
                  '& .MuiSlider-track': {
                    border: 'none',
                  },
                  '& .MuiSlider-rail': {
                    opacity: 0.5,
                    backgroundColor: '#bfbfbf',
                  },
                }}
              />
            </Box>
            <Typography sx={{ color: '#888', fontSize: 14, marginTop: 0 }}>
              ₹1 Lac - ₹10 Cr
            </Typography>
          </Box>

          {/* Tenure Slider */}
          <Box sx={{ marginY: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
              <Typography gutterBottom sx={{ fontSize: 18, color: '#333', fontWeight: 500, marginBottom: -1.7 }}>
                Tenure (Years)
              </Typography>
              <TextField
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                variant="outlined"
                size="small"
                sx={{ width: '150px', marginBottom: -1, fontWeight: 'bold' }}
                inputProps={{ min: 1, max: 30, step: 1 }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Slider
                value={tenure}
                min={1}
                max={30}
                step={1}
                onChange={(e, value) => setTenure(value)}
                sx={{
                  color: '#0077B6',
                  height: 8,
                  flex: 1,
                  '& .MuiSlider-thumb': {
                    height: 24,
                    width: 24,
                    backgroundColor: '#fff',
                    border: '2px solid currentColor',
                  },
                  '& .MuiSlider-track': {
                    border: 'none',
                  },
                  '& .MuiSlider-rail': {
                    opacity: 0.5,
                    backgroundColor: '#bfbfbf',
                  },
                }}
              />
            </Box>
            <Typography sx={{ color: '#888', fontSize: 14, marginTop: 0 }}>
              1 - 30 Years
            </Typography>
          </Box>

          {/* Interest Rate Slider */}
          <Box sx={{ marginY: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
              <Typography gutterBottom sx={{ fontSize: 18, color: '#333', fontWeight: 500, marginBottom: -1.7 }}>
                Interest Rate (% P.A.)
              </Typography>
              <TextField
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                variant="outlined"
                size="small"
                sx={{ width: '150px', marginBottom: -1, fontWeight: 'bold' }}
                inputProps={{ min: 0.5, max: 15, step: 0.1 }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Slider
                value={interestRate}
                min={0.5}
                max={15}
                step={0.1}
                onChange={(e, value) => setInterestRate(value)}
                sx={{
                  color: '#0077B6',
                  height: 8,
                  flex: 1,
                  '& .MuiSlider-thumb': {
                    height: 24,
                    width: 24,
                    backgroundColor: '#fff',
                    border: '2px solid currentColor',
                  },
                  '& .MuiSlider-track': {
                    border: 'none',
                  },
                  '& .MuiSlider-rail': {
                    opacity: 0.5,
                    backgroundColor: '#bfbfbf',
                  },
                }}
              />
            </Box>
            <Typography sx={{ color: '#888', fontSize: 14, marginTop: 0 }}>
              0.5% - 15%
            </Typography>
          </Box>
        </Box>

        <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 6, // Space between the calculation and chart sections
      }}>
        {/* Calculation Section */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography align="start" sx={{ color: 'black', marginTop: 3, marginBottom: 2 }}>
            Monthly Home Loan EMI <br />  
            <p style={{ color: "#0077B6", fontWeight: "700", marginTop: "3px", fontSize: "28px" }}>
              ₹ {parseFloat(emi).toLocaleString()}
            </p>
          </Typography>
          <Typography align="start" sx={{ fontSize: 16, color: '#333', marginY: 2.5 }}>
            Principal Amount: <br />
            <p style={{ fontWeight: "700", marginTop: "3px", fontSize: "22px" }}>
              ₹ {loanAmount.toLocaleString()}
            </p>
          </Typography>
          <Typography align="start" sx={{ fontSize: 16, color: '#333', marginY: 2.5 }}>
            Interest Amount <br />
            <p style={{ fontWeight: "700", marginTop: "3px", fontSize: "22px" }}>
              ₹ {parseFloat(interestAmount).toLocaleString()}
            </p>
          </Typography>
          <Typography align="start" sx={{ fontSize: 16, color: '#333', marginY: 2.5 }}>
            Total Amount Payable <br />
            <p style={{ fontWeight: "700", marginTop: "3px", fontSize: "22px" }}>
              ₹ {parseFloat(totalAmountPayable).toLocaleString()}
            </p>
          </Typography>
        </Box>

        {/* Chart Section */}
        { <Box sx={{ flex: 1, height: '250px',marginY: 7, 
            }}>
          <Pie data={data} options={options}    style={{ height: '100%', width: '100%'}} />
        </Box> }
      </Box>
      </Box>
    </Box>



    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
  <Typography variant="h4" align="center" gutterBottom sx={{ color: 'black', fontWeight: 'bold', marginY: 4 }}>
    Home Loan Amortization Schedule
  </Typography>
  <Table sx={{ borderCollapse: 'collapse' }}>
    <TableHead>
      <TableRow>
        {['Month', 'Opening Balance', 'EMI', 'Interest Paid', 'Principal Paid', 'Closing Balance'].map((header) => (
          <TableCell
            key={header}
            sx={{
              fontWeight: 'bold',
              borderBottom: '2px solid #000',
              borderTop: '2px solid #000',
              textAlign: 'center',
            }}
          >
            {header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {amortizationSchedule.map((row) => (
        <TableRow key={row.month}>
          <TableCell sx={{ borderRight: '1px solid #ddd', textAlign: 'center' }}>{row.month}</TableCell>
          <TableCell sx={{ borderRight: '1px solid #ddd', textAlign: 'center' }}>{`₹${Number(row.openingBalance).toLocaleString()}`}</TableCell>
          <TableCell sx={{ borderRight: '1px solid #ddd', textAlign: 'center' }}>{`₹${Number(row.emi).toLocaleString()}`}</TableCell>
          <TableCell sx={{ borderRight: '1px solid #ddd', textAlign: 'center' }}>{`₹${Number(row.interestPaid).toLocaleString()}`}</TableCell>
          <TableCell sx={{ borderRight: '1px solid #ddd', textAlign: 'center' }}>{`₹${Number(row.principalPaid).toLocaleString()}`}</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>{`₹${Number(row.closingBalance).toLocaleString()}`}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

      </>

  );
};

export default App;

