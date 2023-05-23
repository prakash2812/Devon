import React from 'react';
import GlobalRouter from './components/GlobalRouter';
import Menu from './components/Menu';
import './css/App.css';
import './css/Home.css';
import './css/SessionOverview.css';
import './css/Childrens.css';
import './css/News.css';

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
