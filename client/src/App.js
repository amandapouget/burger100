import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const dummyUserQuery="Raleigh, NC";
const fetchDummyResponse = (setDummyResponse) => {
  fetch('http://localhost:8000/')
    .then(response => response.json())
    .then(data => setDummyResponse(JSON.stringify(data)));
};

function App() {
  const [dummyResponse, setDummyResponse] = useState('');

  useEffect(() => {
    fetchDummyResponse(setDummyResponse);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Request: {dummyUserQuery}
        </p>
        <p>
          Response: {dummyResponse}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
