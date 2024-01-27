import React, { useEffect } from 'react';
import './App.css';
import backgroundImage from 'components/assets/images/background.png';
import NavigationForm from 'components/pages/forms/navigationForm';
import HealthService from 'components/services/healthCheckService';
import TransactionEntry from 'components/pages/transactionEntry';
import ErrorBoundary from 'components/pages/forms/subforms/errorForm';
import TransactionImport from 'components/pages/transactionImport';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'components/assets/theme'; 
import Dashboard from 'components/pages/dashboard'
import { Style, globalStyle} from 'components/assets/generalStyle';

const App = () => {
  useEffect(() => {
    HealthService.checkBackendHealth();
  }, []);

  const appStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    minHeight: '100vh',
  };

  return (
    <ErrorBoundary>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={appStyle}>
      <NavigationForm />
        <div className="body-content">
          <div id="dashboard-section">
            <Dashboard />
          </div>
          <div id="transaction-entry-section">
            <TransactionEntry />
          </div>
          <div id="transaction-import-section">
            <TransactionImport />
          </div>
        </div>
      </div>
    </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
