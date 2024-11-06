import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create root element for React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
    <App />
);

// Performance measurement
reportWebVitals(); // You can pass a function like reportWebVitals(console.log) if you want to log metrics
