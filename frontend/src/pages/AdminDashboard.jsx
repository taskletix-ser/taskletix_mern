import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminAPI } from '../services/api';
import { formatDate, truncateText } from '../utils/validation';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [exporting, setExporting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }

    fetchSubmissions();
  }, [currentPage, navigate]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getSubmissions({
        page: currentPage,
        limit: 10,
        search: searchTerm
      });
      
      setSubmissions(response.data.submissions);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin');
        toast.error('Session expired. Please login again.');
      } else {
        toast.error('Failed to load submissions');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchSubmissions();
  };

  const handleExportPDF = async () => {
    try {
      setExporting(true);
      const response = await adminAPI.exportPDF();
      
      // Create blob and download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `taskletix-submissions-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('PDF exported successfully!');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export PDF');
    } finally {
      setExporting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
    toast.success('Logged out successfully');
  };

  const filteredSubmissions = submissions.filter(submission =>
    submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <h1>TASKLETIX Admin Dashboard</h1>
            <div className="header-actions">
              <button 
                onClick={handleExportPDF} 
                className="btn btn-secondary"
                disabled={exporting}
              >
                {exporting ? 'Exporting...' : 'Export PDF'}
              </button>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="container">
          <div className="dashboard-content">
            <div className="search-section">
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Search by name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </form>
            </div>

            <div className="submissions-section">
              <h2>Contact Submissions ({submissions.length})</h2>
              
              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Loading submissions...</p>
                </div>
              ) : submissions.length === 0 ? (
                <div className="empty-state">
                  <p>No submissions found.</p>
                </div>
              ) : (
                <div className="submissions-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>Project Type</th>
                        <th>Budget</th>
                        <th>Date</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSubmissions.map((submission) => (
                        <tr key={submission._id}>
                          <td>{submission.name}</td>
                          <td>{submission.email}</td>
                          <td>{submission.country_code} {submission.phone}</td>
                          <td>{submission.company}</td>
                          <td>{submission.project_type}</td>
                          <td>{submission.budget_range}</td>
                          <td>{formatDate(submission.createdAt)}</td>
                          <td>
                            <div className="details-popup">
                              <button className="details-btn">View</button>
                              <div className="popup-content">
                                <h4>Project Details</h4>
                                <p><strong>Timeline:</strong> {submission.timeline}</p>
                                <p><strong>Project Details:</strong></p>
                                <p>{submission.project_details}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-secondary"
                  >
                    Previous
                  </button>
                  <span className="page-info">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn btn-secondary"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

