import { Route, Routes } from 'react-router-dom';
import App from './App';
import Kanban from './Kanban';
import Crud from './Crud';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/Kanban" element={<Kanban />} />
            <Route path="/Crud" element={<Crud />} />
        </Routes>

    );
}

export default Router;