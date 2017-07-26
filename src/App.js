import React, { Component } from 'react'
import AppHeader from './components/Header'
import AppFooter from './components/Footer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          <AppHeader className="app-header"></AppHeader>
          <AppFooter className="app-footer"></AppFooter>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
