import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Timeline,
  TrendingUp,
  LocalGasStation,
  AccessTime,
  AttachMoney,
  Receipt
} from '@mui/icons-material';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardContent = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://rk-energies-u9cj.onrender.com/backendapi/dashboard/');
        if (response.data) {
          setDashboardData(response.data);
          setError(null);
        } else {
          setError('No data received from server');
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError(err.response?.data?.error || err.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !dashboardData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        {dashboardData && (
          <Alert severity="info">
            Showing last loaded data. Auto-refresh will continue in the background.
          </Alert>
        )}
      </Box>
    );
  }

  if (!dashboardData) {
    return (
      <Box p={3}>
        <Alert severity="warning">No dashboard data available</Alert>
      </Box>
    );
  }

  const {
    today_stats,
    daily_trend,
    fuel_distribution,
    peak_hours,
    station_performance,
    recent_transactions
  } = dashboardData;

  // Chart configurations
  const salesTrendConfig = {
    labels: daily_trend.map(item => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Daily Sales (KES)',
        data: daily_trend.map(item => parseFloat(item.amount)),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const fuelDistributionConfig = {
    labels: fuel_distribution.map(item => item.fuel),
    datasets: [
      {
        data: fuel_distribution.map(item => item.count),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0'
        ]
      }
    ]
  };

  const peakHoursConfig = {
    labels: peak_hours.map(item => `${item.hour}:00`),
    datasets: [
      {
        label: 'Transactions',
        data: peak_hours.map(item => item.count),
        backgroundColor: 'rgba(54, 162, 235, 0.5)'
      }
    ]
  };

  return (
    <Box p={3}>
      <Container maxWidth={false}>
        {/* Today's Stats */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <AttachMoney color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Today's Sales
                    </Typography>
                    <Typography variant="h4">
                      KES {today_stats.total_sales.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Receipt color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Transactions Today
                    </Typography>
                    <Typography variant="h4">
                      {today_stats.transaction_count}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <TrendingUp color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Average Transaction
                    </Typography>
                    <Typography variant="h4">
                      KES {today_stats.average_transaction.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid container spacing={3}>
          {/* Sales Trend */}
          <Grid item xs={12} lg={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Sales Trend (Last 7 Days)
              </Typography>
              <Box height={300}>
                <Line
                  data={salesTrendConfig}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Fuel Distribution */}
          <Grid item xs={12} lg={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Fuel Type Distribution
              </Typography>
              <Box height={300}>
                <Pie
                  data={fuelDistributionConfig}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Peak Hours */}
          <Grid item xs={12} lg={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Peak Hours Analysis
              </Typography>
              <Box height={300}>
                <Bar
                  data={peakHoursConfig}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Station Performance */}
          <Grid item xs={12} lg={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Station Performance
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Station</TableCell>
                      <TableCell align="right">Sales</TableCell>
                      <TableCell align="right">Transactions</TableCell>
                      <TableCell align="right">Avg. Transaction</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {station_performance.map((station) => (
                      <TableRow key={station.fuelstation}>
                        <TableCell>{station.fuelstation}</TableCell>
                        <TableCell align="right">
                          KES {parseFloat(station.total_sales).toLocaleString()}
                        </TableCell>
                        <TableCell align="right">
                          {station.transaction_count}
                        </TableCell>
                        <TableCell align="right">
                          KES {parseFloat(station.average_transaction).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Recent Transactions */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Transactions
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Time</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Fuel</TableCell>
                      <TableCell>Station</TableCell>
                      <TableCell>M-Pesa Receipt</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recent_transactions.map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {new Date(transaction.created_at).toLocaleString()}
                        </TableCell>
                        <TableCell>{transaction.phone}</TableCell>
                        <TableCell>
                          KES {parseFloat(transaction.amount).toLocaleString()}
                        </TableCell>
                        <TableCell>{transaction.fuel}</TableCell>
                        <TableCell>{transaction.fuelstation}</TableCell>
                        <TableCell>{transaction.mpesa_receipt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardContent;