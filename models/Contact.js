const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [150, 'Name cannot exceed 150 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    maxlength: [200, 'Email cannot exceed 200 characters'],
    validate: {
      validator: function(email) {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return gmailRegex.test(email);
      },
      message: 'Please enter a valid Gmail address'
    }
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [50, 'Phone cannot exceed 50 characters']
  },
  country_code: {
    type: String,
    trim: true,
    maxlength: [10, 'Country code cannot exceed 10 characters'],
    default: '+91'
  },
  company: {
    type: String,
    trim: true,
    maxlength: [150, 'Company name cannot exceed 150 characters']
  },
  project_type: {
    type: String,
    required: [true, 'Project type is required'],
    trim: true,
    maxlength: [120, 'Project type cannot exceed 120 characters']
  },
  budget_range: {
    type: String,
    trim: true,
    maxlength: [120, 'Budget range cannot exceed 120 characters']
  },
  timeline: {
    type: String,
    trim: true,
    maxlength: [120, 'Timeline cannot exceed 120 characters']
  },
  project_details: {
    type: String,
    required: [true, 'Project details are required'],
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
contactSchema.index({ email: 1, createdAt: -1 });
contactSchema.index({ project_type: 1 });

// Virtual for full phone number
contactSchema.virtual('fullPhone').get(function() {
  if (this.phone && this.country_code) {
    return `${this.country_code} ${this.phone}`;
  }
  return this.phone || '';
});

// Pre-save middleware to clean data
contactSchema.pre('save', function(next) {
  // Clean and format data
  if (this.name) this.name = this.name.trim();
  if (this.email) this.email = this.email.trim().toLowerCase();
  if (this.phone) this.phone = this.phone.trim();
  if (this.company) this.company = this.company.trim();
  if (this.project_details) this.project_details = this.project_details.trim();
  
  next();
});

// Static method to get submissions with pagination
contactSchema.statics.getSubmissions = async function(limit = 200, offset = 0) {
  try {
    const submissions = await this.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .lean();
    
    return submissions;
  } catch (error) {
    throw new Error('Failed to fetch submissions');
  }
};

// Static method to search submissions
contactSchema.statics.searchSubmissions = async function(searchTerm, limit = 200) {
  try {
    const searchRegex = new RegExp(searchTerm, 'i');
    
    const submissions = await this.find({
      $or: [
        { name: searchRegex },
        { email: searchRegex },
        { company: searchRegex },
        { project_type: searchRegex },
        { project_details: searchRegex }
      ]
    })
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .lean();
    
    return submissions;
  } catch (error) {
    throw new Error('Failed to search submissions');
  }
};

module.exports = mongoose.model('Contact', contactSchema);
