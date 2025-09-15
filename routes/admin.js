const express = require('express');
const bcrypt = require('bcryptjs');
const Contact = require('../models/Contact');
const { 
  generateToken, 
  addActiveToken, 
  requireAdmin, 
  loginLimiter 
} = require('../middleware/auth');
const { 
  adminLoginValidation, 
  handleValidationErrors, 
  validatePagination 
} = require('../middleware/validation');
const { generatePDF } = require('../utils/pdfGenerator');

const router = express.Router();

// POST /api/admin/login - Admin authentication
router.post('/login',
  loginLimiter,
  adminLoginValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      const adminUsername = process.env.ADMIN_USERNAME || 'admin';

      // Check username (optional, but good practice)
      if (username && username !== adminUsername) {
        return res.status(401).json({
          ok: false,
          error: 'Invalid credentials'
        });
      }

      // Compare password
      const isValidPassword = await bcrypt.compare(password, await bcrypt.hash(adminPassword, 10)) || 
                             password === adminPassword; // Fallback for plain text

      if (!isValidPassword) {
        return res.status(401).json({
          ok: false,
          error: 'Invalid credentials'
        });
      }

      // Generate JWT token
      const token = generateToken({
        role: 'admin',
        timestamp: Date.now()
      });

      // Add token to active tokens
      addActiveToken(token);

      console.log('Admin login successful');

      res.status(200).json({
        ok: true,
        token,
        message: 'Login successful'
      });

    } catch (error) {
      console.error('Admin login error:', error);
      res.status(500).json({
        ok: false,
        error: 'Authentication failed'
      });
    }
  }
);

// GET /api/admin/submissions - Get contact submissions
router.get('/submissions',
  requireAdmin,
  validatePagination,
  async (req, res) => {
    try {
      const { limit, offset, search } = req.query;

      let submissions;
      
      if (search && search.trim()) {
        // Search submissions
        submissions = await Contact.searchSubmissions(search.trim(), limit);
      } else {
        // Get all submissions with pagination
        submissions = await Contact.getSubmissions(limit, offset);
      }

      // Format submissions for frontend
      const formattedSubmissions = submissions.map(submission => ({
        id: submission._id,
        name: submission.name,
        email: submission.email,
        phone: submission.phone || '',
        country_code: submission.country_code || '',
        company: submission.company || '',
        project_type: submission.project_type || '',
        budget_range: submission.budget_range || '',
        timeline: submission.timeline || '',
        project_details: submission.project_details || '',
        created_at: submission.createdAt
      }));

      res.status(200).json({
        ok: true,
        submissions: formattedSubmissions,
        total: formattedSubmissions.length,
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

    } catch (error) {
      console.error('Get submissions error:', error);
      res.status(500).json({
        ok: false,
        error: 'Failed to fetch submissions'
      });
    }
  }
);

// GET /api/admin/export/pdf - Export submissions as PDF
router.get('/export/pdf',
  requireAdmin,
  async (req, res) => {
    try {
      // Get all submissions (limit to 1000 for PDF)
      const submissions = await Contact.getSubmissions(1000, 0);

      if (!submissions || submissions.length === 0) {
        return res.status(404).json({
          ok: false,
          error: 'No submissions found to export'
        });
      }

      // Generate PDF
      const pdfBuffer = await generatePDF(submissions);

      // Set response headers
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=taskletix_submissions.pdf');
      res.setHeader('Content-Length', pdfBuffer.length);

      // Send PDF
      res.send(pdfBuffer);

    } catch (error) {
      console.error('PDF export error:', error);
      res.status(500).json({
        ok: false,
        error: 'Failed to generate PDF report'
      });
    }
  }
);

// GET /api/admin/stats - Get dashboard statistics
router.get('/stats',
  requireAdmin,
  async (req, res) => {
    try {
      // Get total submissions
      const totalSubmissions = await Contact.countDocuments();

      // Get submissions by project type
      const projectTypeStats = await Contact.aggregate([
        {
          $group: {
            _id: '$project_type',
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        }
      ]);

      // Get recent submissions (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const recentSubmissions = await Contact.countDocuments({
        createdAt: { $gte: sevenDaysAgo }
      });

      // Get submissions by month (last 6 months)
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      
      const monthlyStats = await Contact.aggregate([
        {
          $match: {
            createdAt: { $gte: sixMonthsAgo }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { '_id.year': 1, '_id.month': 1 }
        }
      ]);

      res.status(200).json({
        ok: true,
        stats: {
          totalSubmissions,
          recentSubmissions,
          projectTypeStats,
          monthlyStats
        }
      });

    } catch (error) {
      console.error('Stats error:', error);
      res.status(500).json({
        ok: false,
        error: 'Failed to fetch statistics'
      });
    }
  }
);

module.exports = router;
