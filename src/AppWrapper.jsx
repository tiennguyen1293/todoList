import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './globalStyles';
import App from './pages/App';

const theme = {
  white: '#ffffff',
  black: '#000000',
  
  fontFamily: 'Helvetica Neue',
  fontSize: '14px',
};

class AppWrapper extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <App />
          <GlobalStyles />
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default AppWrapper;
