import React from 'react';
import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const AmortizationSchedule = ({ loanAmount, tenure, interestRate }) => {
  const monthlyInterestRate = interestRate / 12 / 100;
  const totalPayments = tenure * 12;

  const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / 
              (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

  const generateSchedule = () => {
    const schedule = [];
    let balance = loanAmount;

    for (let i = 1; i <= totalPayments; i++) {
      const interestPayment = balance * monthlyInterestRate;
      const principalPayment = emi - interestPayment;
      const openingBalance = balance;
      balance -= principalPayment;

      schedule.push({
        month: i,
        emi: emi.toFixed(2),
        principalPayment: principalPayment.toFixed(2),
        interestPayment: interestPayment.toFixed(2),
        openingBalance: openingBalance.toFixed(2),
        balance: balance.toFixed(2),
      });
    }
    return schedule;
  };

  const schedule = generateSchedule();

  return (
    <Box sx={{ padding: 4, marginTop: 4, maxWidth: '1200px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold', marginBottom: 3, textAlign: "center" }}>
        Home Loan Amortization Schedule
      </Typography>

      <TableContainer component={Paper} sx={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
      }}>
        <Table sx={{ minWidth: 650, backgroundColor: '#fafafa' }}>
          <TableHead sx={{
            backgroundColor: '#1A4870',
            '& .MuiTableCell-root': {
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: 16,
              padding: '14px',
              borderBottom: '2px solid #ffffff',
            }
          }}>
            <TableRow>
              <TableCell align="center">Month</TableCell>
              <TableCell align="center">Opening Balance (₹)</TableCell>
              <TableCell align="center">EMI (₹)</TableCell>
              <TableCell align="center">Principal (₹)</TableCell>
              <TableCell align="center">Interest (₹)</TableCell>
              <TableCell align="center">Closing Balance (₹)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{
            '& .MuiTableRow-root': {
              '&:nth-of-type(even)': {
                backgroundColor: '#e3f2fd',
              },
              '&:nth-of-type(odd)': {
                backgroundColor: '#ffffff',
              },
              '&:hover': {
                backgroundColor: '#b3e5fc',
              }
            },
            '& .MuiTableCell-root': {
              padding: '12px',
              fontSize: 14,
              color: '#333',
              borderBottom: '1px solid #e0e0e0',
            }
          }}>
            {schedule.map((row) => (
              <TableRow key={row.month}>
                <TableCell align="center">{row.month}</TableCell>
                <TableCell align="center">{parseFloat(row.openingBalance).toLocaleString()}</TableCell>
                <TableCell align="center">{parseFloat(row.emi).toLocaleString()}</TableCell>
                <TableCell align="center">{parseFloat(row.principalPayment).toLocaleString()}</TableCell>
                <TableCell align="center">{parseFloat(row.interestPayment).toLocaleString()}</TableCell>
                <TableCell align="center">{parseFloat(row.balance).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AmortizationSchedule;
