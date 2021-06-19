import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Show from './Pages/Show';
import Starred from './Pages/Starred';

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/starred" exact>
          <Starred />
        </Route>
        <Route exact path="/show/:id">
          <Show />
        </Route>
        <Route>
          <div>Page not found</div>
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
