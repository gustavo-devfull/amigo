import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/funnel-display/400.css';
import '@fontsource/funnel-display/500.css';
import '@fontsource/funnel-display/600.css';
import '@fontsource/funnel-display/700.css';
import './index.css';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

// Suprimir erro do ResizeObserver (erro conhecido que não afeta funcionalidade)
const resizeObserverError = 'ResizeObserver loop completed with undelivered notifications';

// Interceptar console.error
const originalError = console.error;
console.error = (...args) => {
  if (
    args.some(arg => 
      (typeof arg === 'string' && arg.includes(resizeObserverError)) ||
      (arg?.message && arg.message.includes(resizeObserverError)) ||
      (arg?.toString && arg.toString().includes(resizeObserverError))
    )
  ) {
    return;
  }
  originalError.call(console, ...args);
};

// Interceptar window.onerror
const originalErrorHandler = window.onerror;
window.onerror = (message, source, lineno, colno, error) => {
  if (
    (typeof message === 'string' && message.includes(resizeObserverError)) ||
    (error?.message && error.message.includes(resizeObserverError))
  ) {
    return true;
  }
  if (originalErrorHandler) {
    return originalErrorHandler(message, source, lineno, colno, error);
  }
  return false;
};

// Interceptar eventos de erro
window.addEventListener('error', (event) => {
  if (
    event.message &&
    event.message.includes(resizeObserverError)
  ) {
    event.stopImmediatePropagation();
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
}, true);

// Interceptar unhandledrejection também
window.addEventListener('unhandledrejection', (event) => {
  if (
    event.reason?.message?.includes(resizeObserverError) ||
    (typeof event.reason === 'string' && event.reason.includes(resizeObserverError))
  ) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

