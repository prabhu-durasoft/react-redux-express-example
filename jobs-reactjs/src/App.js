import React, { Component } from 'react';
import './App.css';
import JobsMain from 'jobs/JobsMain'

class App extends Component {
  render() {
    return (
      <div className="App">
		<JobsMain/>
      </div>
    );
  }
}

export default App;
