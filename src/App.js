import React from 'react';
import { useSelector } from 'react-redux';
import Footer from './components/Footer';
import Home from './components/Home';
import Instrument from './components/Instrument'

function App() {
  return (
    <div>
     <Home/>
     <Instrument/>
     <Footer/>
    </div>
  );
}

export default App;
