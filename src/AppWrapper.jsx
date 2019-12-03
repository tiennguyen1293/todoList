import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Loadable from './layouts/Loadable';

import Button from 'commons/Button/Button';
import GlobalStyles from './globalStyles';
import lightTheme from './themes/light';
import darkTheme from './themes/dark';

const ButtonToggle = styled(Button)`
  position: fixed;
  top: 0;
  left: 50px;
  padding: 8px 12px;
  border-radius: 0 0 4px 4px;
  color: ${props => props.theme.primary};
  background-color: ${props => props.theme.secondary};
`;

const AsyncHome = Loadable({ loader: () => import('pages/TodoList') });

function AppWrapper() {
  const storedThemes = localStorage.getItem('appThemes');
  const [isDarkTheme, setTheme] = useState(
    storedThemes === 'true' ? true : false,
  );

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <React.Fragment>
        <ButtonToggle
          isDarkTheme={isDarkTheme}
          onClick={() => {
            setTheme(!isDarkTheme);
            localStorage.setItem('appThemes', !isDarkTheme);
          }}
        >
          {isDarkTheme ? '☀' : '☾'}
        </ButtonToggle>

        <Router>
          <Switch>
            <Route exact path="/" component={AsyncHome} />
            <Route path="*" component={AsyncHome} />
          </Switch>
        </Router>

        <GlobalStyles />
      </React.Fragment>
    </ThemeProvider>
  );
}

export default AppWrapper;
