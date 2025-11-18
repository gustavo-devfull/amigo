import React from 'react';
import { HeroUIProvider } from '@heroui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListaAmigos from './components/ListaAmigos';

function App() {
  return (
    <HeroUIProvider>
      <div className="App" style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
        <ListaAmigos />
      </div>
    </HeroUIProvider>
  );
}

export default App;

