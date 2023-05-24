import React from 'react';
import GlobalRouter from './components/Router/GlobalRouter';
import Menu from './components/Menu/Menu';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to Devon KidsKonnect</h1>
            </header>
            <menu className="menu">
                <Menu />
            </menu>
            <main>
                <GlobalRouter />
            </main>
        </div>
    );
};

export default App;
