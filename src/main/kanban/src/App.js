import './App.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';



function App() {
    const navigate = useNavigate();
    const goKanban = () => {
        return navigate('/Kanban');
    };
    const goCrud = () => {
        return navigate('/Crud');
    };

    return (
        <>
            <h1>hi</h1>
            <button onClick={goKanban}>Kanban</button>
            <button onClick={goCrud}>Crud</button>
        </>
    );
}

export default App;
