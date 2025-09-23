const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// In-memory storage for active tokens (in production, use Redis)
const activeTokens = new Set();

// Generate JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { 
    expiresIn: '24h' 
  });
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Add token to active tokens
const addActiveToken = (token) => {
  activeTokens.add(token);
};

// Remove token from active tokens
const removeActiveToken = (token) => {
  activeTokens.delete(token);
};

// Check if token is active
const isTokenActive = (token) => {
  return activeTokens.has(token);
};

// Admin authentication middleware
const requireAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        ok: false,
        error: 'Access token required'
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Check if token is active
    if (!isTokenActive(token)) {
      return res.status(401).json({
        ok: false,
        error: 'Token expired or invalid'
      });
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        ok: false,
        error: 'Invalid token'
      });
    }

    // Add user info to request
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      ok: false,
      error: 'Authentication failed'
    });
  }
};

// Rate limiting middleware
const rateLimit = require('express-rate-limit');

const contactFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    ok: false,
    error: 'Too many contact form submissions, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login attempts per windowMs
  message: {
    ok: false,
    error: 'Too many login attempts, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  generateToken,
  verifyToken,
  addActiveToken,
  removeActiveToken,
  isTokenActive,
  requireAdmin,
  contactFormLimiter,
  loginLimiter
};
