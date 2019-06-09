import React from 'react';
//import logo from './logo.svg';
import './App.css';
import SliderContainer from './sliderComponent/SliderContainer';
import FlameAnimationContainer from './flameComponent/FlameAnimationContainer';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        Fire Width:
        <SliderContainer  />
        <br />
        <FlameAnimationContainer />
      </header>
    </div>
  );
}

export default App;
