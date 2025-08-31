# TASKLETIX - MERN Stack Website

A professional web development agency website built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🚀 Features

- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Contact Form**: Gmail validation with real-time feedback
- **Admin Dashboard**: Secure authentication with JWT tokens
- **PDF Export**: Generate reports of contact submissions
- **Search & Filter**: Advanced admin panel with search functionality
- **Modern Tech Stack**: Built with latest MERN technologies

## 📁 Project Structure

```
tasklitx-website/
├── backend/                 # Node.js/Express Backend
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Authentication & validation
│   ├── utils/              # Helper functions
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── .env.example        # Environment variables template
├── frontend/               # React Frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── styles/         # CSS files
│   │   ├── utils/          # Helper functions
│   │   └── App.js          # Main React app
│   ├── package.json        # Frontend dependencies
│   └── README.md           # Frontend setup guide
├── images/                 # Shared images
└── README.md              # This file
```

## 🛠️ Tech Stack

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **PDFKit**: PDF generation
- **CORS**: Cross-origin resource sharing

### Frontend
- **React.js**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **React Hook Form**: Form handling
- **React Toastify**: Notifications
- **CSS3**: Styling with modern features

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 📋 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskletix_db
JWT_SECRET=your_jwt_secret_here
ADMIN_PASSWORD=admin123
NODE_ENV=development
```

## 🔧 API Endpoints

### Contact Form
- `POST /api/contact` - Submit contact form

### Admin Routes
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/submissions` - Get contact submissions
- `GET /api/admin/export/pdf` - Export submissions as PDF

## 🎨 Design Features

- **Mobile-First**: Responsive design optimized for mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Performance**: Optimized images and code splitting
- **SEO**: Meta tags and structured data

## 📱 Mobile Optimization

- Touch-friendly interface
- Optimized images for mobile
- Fast loading times
- Responsive navigation
- Mobile-specific interactions

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Rate limiting (can be added)

## 📊 Database Schema

### Contact Submission
```javascript
{
  name: String (required),
  email: String (required, Gmail only),
  phone: String,
  country_code: String,
  company: String,
  project_type: String (required),
  budget_range: String,
  timeline: String,
  project_details: String (required),
  created_at: Date
}
```

## 🚀 Deployment

### Backend Deployment
- Deploy to Heroku, Railway, or DigitalOcean
- Set environment variables
- Connect MongoDB Atlas

### Frontend Deployment
- Deploy to Netlify, Vercel, or GitHub Pages
- Update API base URL
- Configure build settings

## 🔄 Migration from Flask

### What Changed
- **Backend**: Python Flask → Node.js Express
- **Database**: MySQL → MongoDB
- **Frontend**: Static HTML → React.js
- **Authentication**: Session-based → JWT tokens
- **File Structure**: Organized for scalability

### Preserved Features
- ✅ Same visual design and styling
- ✅ All original images and assets
- ✅ Contact form functionality
- ✅ Admin dashboard features
- ✅ PDF export capability
- ✅ Mobile responsiveness

## 📝 Development Notes

- Code written with human-like patterns
- Proper error handling and validation
- Clean, readable code structure
- Comprehensive comments
- Follows React best practices
- Implements modern JavaScript features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email taskletix@gmail.com or call +91 95730 586468.

---

**Built with ❤️ by TASKLETIX Team**