import React from 'react';
import { Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

// Import all your page components
import FootballData from './FootballData';
import MatchResults from './MatchResults';
import TopScorers from './TopScorers';
import H2HPage from './H2HPage';
import AdminPage from './AdminPage';
import QuizPage from './QuizPage';
import LeaderboardPage from './LeaderboardPage';

const MainLayout = () => {
    // 1. Get the user's roles from the authentication context
    const { logout, roles } = useAuth(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="App">
            <div className="top-bar">
                <h1>FootyBot – Live Football Stats</h1>
                <div className="top-links">
                    {/* 2. Conditionally render the Admin link */}
                    {/* This link will ONLY appear if the user has the 'ROLE_ADMIN' */}
                    {roles && roles.includes('ROLE_ADMIN') && (
                        <Link to="/admin" className="admin-link">Admin</Link>
                    )}
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </div>
          
            <nav className="main-nav">
                <NavLink to="/">Teams & Standings</NavLink>
                <NavLink to="/results">Results</NavLink>
                <NavLink to="/top-scorers">Top Scorers</NavLink>
                <NavLink to="/h2h">H2H Stats</NavLink>
                <NavLink to="/quiz">Quiz</NavLink>
                <NavLink to="/leaderboard">Leaderboard</NavLink>
            </nav>

            <Routes>
                <Route path="/" element={<FootballData />} />
                <Route path="/results" element={<MatchResults />} />
                <Route path="/top-scorers" element={<TopScorers />} />
                <Route path="/h2h" element={<H2HPage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </div>
    );
};

export default MainLayout;