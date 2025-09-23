import React, { useState, useEffect } from 'react'; // This line is now correct
import { useAuth } from '../AuthContext';
import './AdminPage.css';

const AdminPage = () => {
    const [matches, setMatches] = useState([]);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token, roles } = useAuth();
    
    // Debug: Log the user's roles
    console.log('AdminPage - User roles:', roles);
    console.log('AdminPage - Token:', token ? 'Present' : 'Missing');
    
    // State for the new match form
    const [homeTeam, setHomeTeam] = useState('');
    const [awayTeam, setAwayTeam] = useState('');
    const [homeGoals, setHomeGoals] = useState(0);
    const [awayGoals, setAwayGoals] = useState(0);

    useEffect(() => {
        const fetchAdminPageData = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            const headers = { 'Authorization': `Bearer ${token}` };
            console.log('AdminPage - Making API requests with headers:', headers);
            try {
                const [matchesRes, teamsRes] = await Promise.all([
                    fetch('http://localhost:8080/api/matches', { headers }),
                    fetch('http://localhost:8080/api/football-data', { headers })
                ]);
                console.log('AdminPage - API responses:', {
                    matches: { status: matchesRes.status, ok: matchesRes.ok },
                    teams: { status: teamsRes.status, ok: teamsRes.ok }
                });
                if (!matchesRes.ok || !teamsRes.ok) throw new Error('Could not fetch page data.');
                
                const matchesData = await matchesRes.json();
                const teamsData = await teamsRes.json();
                setMatches(matchesData.map(dto => dto.match)); 
                setTeams(teamsData.teams || []);

                if (teamsData.teams && teamsData.teams.length > 1) {
                    setHomeTeam(teamsData.teams[0].name);
                    setAwayTeam(teamsData.teams[1].name);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAdminPageData();
    }, [token]);

    const handleAddMatch = async (e) => {
        e.preventDefault();
        if (homeTeam === awayTeam) {
            setError("Home and Away teams cannot be the same.");
            return;
        }
        setError(''); 
        const newMatch = { homeTeam, awayTeam, homeGoals, awayGoals, matchDate: new Date().toISOString() };
        const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
        
        try {
            const response = await fetch('http://localhost:8080/api/matches', {
                method: 'POST',
                headers,
                body: JSON.stringify(newMatch)
            });
            if (!response.ok) throw new Error('Failed to add match.');
            
            const updatedMatchesRes = await fetch('http://localhost:8080/api/matches', { headers });
            const updatedMatches = await updatedMatchesRes.json();
            setMatches(updatedMatches.map(dto => dto.match));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteMatch = async (matchId) => {
        if (!window.confirm('Are you sure you want to delete this match?')) return;
        
        const headers = { 'Authorization': `Bearer ${token}` };
        try {
            const response = await fetch(`http://localhost:8080/api/matches/${matchId}`, {
                method: 'DELETE',
                headers
            });
            if (!response.ok) throw new Error('Failed to delete match.');
            setMatches(prevMatches => prevMatches.filter(match => match.id !== matchId));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className="admin-container"><p>Loading admin panel...</p></div>;

    return (
        <div className="admin-container">
            <h2>Admin Panel: Manage Matches</h2>
            {error && <p className="error-message">{error}</p>}
            
            <div className="admin-dashboard">
                <div className="admin-section">
                    <h3>Add New Match</h3>
                    <form onSubmit={handleAddMatch} className="add-match-form">
                        <select value={homeTeam} onChange={e => setHomeTeam(e.target.value)}>
                            {teams.map(team => <option key={`home-${team.id}`} value={team.name}>{team.name}</option>)}
                        </select>
                        <select value={awayTeam} onChange={e => setAwayTeam(e.target.value)}>
                            {teams.map(team => <option key={`away-${team.id}`} value={team.name}>{team.name}</option>)}
                        </select>
                        <div className="score-inputs">
                           <input type="number" min="0" placeholder="Home" value={homeGoals} onChange={e => setHomeGoals(parseInt(e.target.value))} required />
                           <input type="number" min="0" placeholder="Away" value={awayGoals} onChange={e => setAwayGoals(parseInt(e.target.value))} required />
                        </div>
                        <button type="submit">Add Match</button>
                    </form>
                </div>

                <div className="admin-section">
                    <h3>Existing Matches ({matches.length})</h3>
                    <table className="matches-table">
                        <thead>
                            <tr>
                                <th>Home Team</th>
                                <th>Score</th>
                                <th>Away Team</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matches.map(match => (
                                <tr key={match.id}>
                                    <td>{match.homeTeam}</td>
                                    <td>{match.homeGoals} - {match.awayGoals}</td>
                                    <td>{match.awayTeam}</td>
                                    <td>
                                        <button onClick={() => handleDeleteMatch(match.id)} className="delete-btn">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;