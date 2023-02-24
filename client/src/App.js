import React, { useEffect, useState } from 'react';
import burger from './burger.png';
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
        <h1>Burger 100</h1>
        <img src={burger} className="Burger-logo" alt="Burger Logo" />
        <h3>Where the Best 100 Burgers Compete to Find the Perfect Burger</h3>
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
      <p><a href='https://pngtree.com/so/layered'>Burger png from pngtree.com</a></p>
    </div>
  );
}

export default App;
