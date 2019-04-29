import React from 'react';
//import logo from './logo.svg';
import FlameAnimation  from './flameComponent/FlameAnimation';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        <FlameAnimation fireWidth={30} />
      </header>
    </div>
  );
}

export default App;
