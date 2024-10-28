import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Content from "./components/Content/Content";
import CreateContent from "./components/CreateContent/CreateContent";
import NotAuthenticated from "./components/Dashboard/NotAuthenticated";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/notes/:slug' element={<Content />} />
                <Route path='/create' element={<CreateContent />} />
                <Route path="/notAuthenticated" element={<NotAuthenticated />} />
            </Routes>
            <ToastContainer />
        </Router>
    );
}
