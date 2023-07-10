import React, { useState } from 'react';
import './App.css';
import About from './component/About';
import Navbar from './component/Navbar';
import TextForm from './component/TextForm';
import Alert from './component/Alert';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light'); //whether dark mode is eanble or not

  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1000);
  }

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark')
      document.body.style.backgroundColor = "#211410"
      showAlert('Dark mode has been enabled', 'success')
      // document.title = 'TextUtils - Dark Mode' // this is for title change
    }

    else {
      setMode('light')
      document.body.style.backgroundColor = "white"
      showAlert('Light mode has been enabled', 'success')
      // document.title = 'TextUtils - Light Mode' // this is for title change
    }

  }
  return (
    <>
      <Router>
        <Navbar title="TextUtils" about="About us" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className='container my-3'>
          <Routes>
            <Route exact path="/about" element={<About />} />
            <Route exact path="/" element={<TextForm heading="Enter a text to analyze below" showAlert={showAlert} mode={mode} />
            } />
          </Routes>
        </div>

      </Router>
    </>
  );
}

export default App;
