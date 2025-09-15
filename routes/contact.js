const express = require('express');
const Contact = require('../models/Contact');
const { contactFormLimiter } = require('../middleware/auth');
const { 
  contactFormValidation, 
  sanitizeData, 
  handleValidationErrors 
} = require('../middleware/validation');

const router = express.Router();

// POST /api/contact - Submit contact form
router.post('/', 
  contactFormLimiter,
  sanitizeData,
  contactFormValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        country_code,
        company,
        project_type,
        budget_range,
        timeline,
        project_details
      } = req.body;

      // Create new contact submission
      const contact = new Contact({
        name,
        email,
        phone,
        country_code: country_code || '+91',
        company,
        project_type,
        budget_range,
        timeline,
        project_details
      });

      // Save to database
      await contact.save();

      // Log successful submission (for monitoring)
      console.log(`New contact submission from: ${email} - ${project_type}`);

      res.status(200).json({
        ok: true,
        message: 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.',
        submissionId: contact._id
      });

    } catch (error) {
      console.error('Contact submission error:', error);
      
      // Handle validation errors from Mongoose
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({
          ok: false,
          error: validationErrors[0] || 'Validation failed',
          details: validationErrors
        });
      }

      // Handle duplicate email (if needed)
      if (error.code === 11000) {
        return res.status(400).json({
          ok: false,
          error: 'A submission with this email already exists'
        });
      }

      res.status(500).json({
        ok: false,
        error: 'Failed to submit contact form. Please try again later.'
      });
    }
  }
);

// GET /api/contact/health - Health check for contact service
router.get('/health', (req, res) => {
  res.status(200).json({
    ok: true,
    message: 'Contact service is healthy',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
