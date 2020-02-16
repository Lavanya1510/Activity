import React, { Component } from 'react'
import "./App.css";
import "antd/dist/antd.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from './Components/LoginPage'
import MainPage from './Components/MainPage'
export class App extends Component {
  render() {
    return (
        <BrowserRouter>
                <Switch>
                   <Route path="/" component={MainPage} exact />
                   <Route path="/LoginPage" component={LoginPage} exact />
                </Switch>
        </BrowserRouter>
    )
  }
}

export default App
