const { body, validationResult } = require('express-validator');

// Contact form validation rules
const contactFormValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 150 })
    .withMessage('Name cannot exceed 150 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .isLength({ max: 200 })
    .withMessage('Email cannot exceed 200 characters')
    .custom((value) => {
      const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!gmailRegex.test(value)) {
        throw new Error('Please enter a valid Gmail address');
      }
      return true;
    }),
  
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone is required')
    .isLength({ max: 50 })
    .withMessage('Phone cannot exceed 50 characters')
    .matches(/^[\d\s\-\+\(\)]+$/)
    .withMessage('Phone can only contain numbers, spaces, hyphens, and parentheses'),
  
  body('country_code')
    .trim()
    .notEmpty()
    .withMessage('Country code is required')
    .isLength({ max: 10 })
    .withMessage('Country code cannot exceed 10 characters')
    .matches(/^\+\d{1,4}$/)
    .withMessage('Country code must be in format +XXX'),
  
  body('company')
    .trim()
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ max: 150 })
    .withMessage('Company name cannot exceed 150 characters'),
  
  body('project_type')
    .trim()
    .notEmpty()
    .withMessage('Project type is required')
    .isLength({ max: 120 })
    .withMessage('Project type cannot exceed 120 characters'),
  
  body('budget_range')
    .trim()
    .notEmpty()
    .withMessage('Budget range is required')
    .isLength({ max: 120 })
    .withMessage('Budget range cannot exceed 120 characters'),
  
  body('timeline')
    .trim()
    .notEmpty()
    .withMessage('Timeline is required')
    .isLength({ max: 120 })
    .withMessage('Timeline cannot exceed 120 characters'),
  
  body('project_details')
    .trim()
    .notEmpty()
    .withMessage('Project details are required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Project details must be between 10 and 2000 characters')
];

// Admin login validation
const adminLoginValidation = [
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters'),
  
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];

// Sanitize data
const sanitizeData = (req, res, next) => {
  // Remove extra spaces and trim all string fields
  Object.keys(req.body).forEach(key => {
    if (typeof req.body[key] === 'string') {
      req.body[key] = req.body[key].trim();
    }
  });
  next();
};

// Check validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({
      ok: false,
      error: errorMessages[0] || 'Validation failed',
      details: errorMessages
    });
  }
  
  next();
};

// Custom validation for pagination
const validatePagination = (req, res, next) => {
  const limit = parseInt(req.query.limit) || 200;
  const offset = parseInt(req.query.offset) || 0;
  
  if (limit < 1 || limit > 1000) {
    return res.status(400).json({
      ok: false,
      error: 'Limit must be between 1 and 1000'
    });
  }
  
  if (offset < 0) {
    return res.status(400).json({
      ok: false,
      error: 'Offset must be non-negative'
    });
  }
  
  req.query.limit = limit;
  req.query.offset = offset;
  next();
};

module.exports = {
  contactFormValidation,
  adminLoginValidation,
  sanitizeData,
  handleValidationErrors,
  validatePagination
};
