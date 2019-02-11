import React, { Component, Fragment } from 'react';
import Welcome from './Components/Welcome';
import UserInfo from './Components/UserInfo';
import Chart from './Components/Chart'

// import './App.css';


class App extends Component {
  render() {
    return (
      <Fragment className="App">
        <Welcome />
        <UserInfo /> 
      </Fragment>
    );
  }
}

export default App;
