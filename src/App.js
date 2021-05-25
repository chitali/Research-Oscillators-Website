import React from 'react';
import { useSelector } from 'react-redux';

import Home from './components/Home';
import Instrument from './components/Instrument'

function App() {
  return (
    <div>
     <Home/>
     <Instrument/>
    </div>
  );
}

export default App;
