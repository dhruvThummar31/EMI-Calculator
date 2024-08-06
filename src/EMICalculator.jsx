import React, { useState, useEffect } from 'react';
import { Slider, Typography, Box, TextField, InputAdornment } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const EMICalculator = ({ loanAmount, setLoanAmount, tenure, setTenure, interestRate, setInterestRate, emi }) => {
  const interestAmount = ((emi * tenure * 12) - loanAmount).toFixed(2);

  const data = {
    labels: ['Principal Amount', 'Interest Amount'],
    datasets: [{
      data: [loanAmount, interestAmount],
      backgroundColor: ['#3370A5', '#99b7D2'],
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

  return (
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
      <Typography variant="h4" align="center" gutterBottom sx={{ color: 'black', fontWeight: 'bold', marginBottom: 4 }}>
        Home Loan EMI Calculator
      </Typography>
      
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 9,
      }}>
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
                max={20}
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
              0.5% - 20%
            </Typography>
          </Box>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 6,
        }}>
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
                ₹ {parseFloat(emi * tenure * 12).toLocaleString()}
              </p>
            </Typography>
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: 0,
            flex: 1
          }}>
            <Typography sx={{ fontSize: 16, color: '#333', marginBottom: 1 ,fontWeight:"700" }}>
              Loan EMI Breakup
            </Typography>
            <Box sx={{
              width: { xs: '200px', md: '300px' },
              height: { xs: '200px', md: '300px' },
            }}>
              <Pie data={data} options={options} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EMICalculator;
