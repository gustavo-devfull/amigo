import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListaAmigos from './components/ListaAmigos';

function App() {
  return (
    <div className="App" style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
      <ListaAmigos />
    </div>
  );
}

export default App;

