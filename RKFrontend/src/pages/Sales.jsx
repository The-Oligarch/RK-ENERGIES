import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Tooltip
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RefreshIcon from '@mui/icons-material/Refresh';
import dayjs from 'dayjs';

const Sales = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    total_amount: 0,
    total_transactions: 0,
    fuel_totals: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      let url = 'https://rk-energies-u9cj.onrender.com/backendapi/transactions/?status=2';
      
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (startDate) url += `&start_date=${startDate.format('YYYY-MM-DD')}`;
      if (endDate) url += `&end_date=${endDate.format('YYYY-MM-DD')}`;
      
      const response = await axios.get(url);
      setTransactions(response.data.transactions);
      setSummary(response.data.summary);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch transactions');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 30000);
    return () => clearInterval(interval);
  }, [search, startDate, endDate]);

  const exportToCSV = () => {
    const headers = ['Date', 'Phone', 'Amount', 'Fuel Type', 'Fuel Station', 'M-Pesa Receipt'];
    const csvData = transactions.map(t => [
      dayjs(t.created_at).format('YYYY-MM-DD HH:mm:ss'),
      t.phone,
      t.amount,
      t.fuel,
      t.fuelstation,
      t.mpesa_receipt || 'N/A'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales_${dayjs().format('YYYY-MM-DD')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading && transactions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Sales
                  </Typography>
                  <Typography variant="h4">
                    KES {summary.total_amount.toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Transactions
                  </Typography>
                  <Typography variant="h4">
                    {summary.total_transactions.toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Most Popular Fuel
                  </Typography>
                  <Typography variant="h4">
                    {Object.entries(summary.fuel_totals)
                      .sort((a, b) => b[1].count - a[1].count)[0]?.[0] || 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Filters */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={2}>
                <Box display="flex" gap={1}>
                  <Tooltip title="Export to CSV">
                    <IconButton onClick={exportToCSV} color="primary">
                      <FileDownloadIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Refresh">
                    <IconButton onClick={fetchTransactions} color="primary">
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Transactions Table */}
        <Grid item xs={12}>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Phone</strong></TableCell>
                  <TableCell><strong>Amount</strong></TableCell>
                  <TableCell><strong>Fuel Type</strong></TableCell>
                  <TableCell><strong>Fuel Station</strong></TableCell>
                  <TableCell><strong>M-Pesa Receipt</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {dayjs(transaction.created_at).format('YYYY-MM-DD HH:mm:ss')}
                    </TableCell>
                    <TableCell>{transaction.phone}</TableCell>
                    <TableCell>KES {parseFloat(transaction.amount).toLocaleString()}</TableCell>
                    <TableCell>{transaction.fuel}</TableCell>
                    <TableCell>{transaction.fuelstation}</TableCell>
                    <TableCell>{transaction.mpesa_receipt || 'N/A'}</TableCell>
                  </TableRow>
                ))}
                {transactions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="body1" color="textSecondary">
                        No successful transactions found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Fuel Type Summary */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Fuel Type Summary
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(summary.fuel_totals).map(([fuel, data]) => (
              <Grid item xs={12} sm={6} md={4} key={fuel}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {fuel}
                    </Typography>
                    <Typography variant="h6">
                      KES {data.amount.toLocaleString()}
                    </Typography>
                    <Typography color="textSecondary">
                      {data.count} transactions
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Sales;