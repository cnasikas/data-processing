import React from 'react'
import AppHeader from './components/Header'
import AppMain from './components/Main'
import AppFooter from './components/Footer'

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends React.Component {
  render() {
    return (
        <div className="app-wrapper">
          <AppHeader className="app-header"></AppHeader>
          <AppMain className="app-main"></AppMain>
          <AppFooter className="app-footer"></AppFooter>
        </div>
    );
  }
}
