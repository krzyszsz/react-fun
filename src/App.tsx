import React from 'react';
//import logo from './logo.svg';
import FlameAnimation  from './flameComponent/FlameAnimation';
import './App.css';
import SliderContainer from './sliderComponent/SliderContainer';

const App: React.FC = () => {
  let abc : number = 30;
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        Fire Width:
        <SliderContainer  />
        <br />
        <FlameAnimation fireWidth={abc} />
      </header>
    </div>
  );
}

export default App;
