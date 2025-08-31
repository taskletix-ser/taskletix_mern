# 🚀 TASKLETIX Website Deployment Guide for Hostinger VPS

## 📋 Prerequisites
- Hostinger VPS KVM 2 plan
- SSH access to your VPS
- Domain name pointed to your VPS IP
- Git installed on your VPS

## 🔧 Step 1: Prepare Your Local Repository

### 1.1 Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit: TASKLETIX website"
```

### 1.2 Create GitHub/GitLab Repository
- Create a new repository on GitHub or GitLab
- Push your code:
```bash
git remote add origin https://github.com/yourusername/tasklitx-website.git
git branch -M main
git push -u origin main
```

## 🖥️ Step 2: Set Up Your Hostinger VPS

### 2.1 Connect to Your VPS
```bash
ssh root@your-vps-ip
```

### 2.2 Update System
```bash
apt update && apt upgrade -y
```

### 2.3 Install Required Software
```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install Nginx
apt install nginx -y

# Install PM2 for process management
npm install -g pm2

# Install Git
apt install git -y

# Install MongoDB (if not using external DB)
apt install mongodb -y
```

### 2.3 Install Certbot for SSL
```bash
apt install certbot python3-certbot-nginx -y
```

## 📥 Step 3: Deploy Your Application

### 3.1 Clone Your Repository
```bash
cd /var/www
git clone https://github.com/yourusername/tasklitx-website.git
cd tasklitx-website
```

### 3.2 Set Up Backend
```bash
cd backend
npm install

# Create production environment file
cat > .env << EOF
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb://localhost:27017/tasklitx_db
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
ADMIN_PASSWORD=admin123
CORS_ORIGIN=https://yourdomain.com
EOF

# Start backend with PM2
pm2 start server.js --name "tasklitx-backend"
pm2 save
pm2 startup
```

### 3.3 Set Up Frontend
```bash
cd ../frontend
npm install

# Update API base URL for production
sed -i 's|http://localhost:5000/api|https://yourdomain.com/api|g' src/services/api.js

# Build for production
npm run build

# Copy build files to Nginx directory
cp -r dist/* /var/www/html/
```

## 🌐 Step 4: Configure Nginx

### 4.1 Create Nginx Configuration
```bash
cat > /etc/nginx/sites-available/tasklitx << EOF
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Frontend (React app)
    location / {
        root /var/www/html;
        try_files \$uri \$uri/ /index.html;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
    
    # Health check
    location /health {
        proxy_pass http://localhost:5000;
    }
}
EOF
```

### 4.2 Enable Site
```bash
ln -s /etc/nginx/sites-available/tasklitx /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

## 🔒 Step 5: Set Up SSL Certificate

### 5.1 Get SSL Certificate
```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 5.2 Auto-renewal
```bash
crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

## 🚀 Step 6: Final Configuration

### 6.1 Update Frontend API URL
Make sure your frontend is using the correct production API URL:
```javascript
// In frontend/src/services/api.js
baseURL: 'https://yourdomain.com/api'
```

### 6.2 Test Your Application
- Visit: `https://yourdomain.com`
- Test contact form submission
- Test admin login: `https://yourdomain.com/admin`

## 🔧 Step 7: Maintenance Commands

### 7.1 Update Application
```bash
cd /var/www/tasklitx-website
git pull origin main

# Update backend
cd backend
npm install
pm2 restart tasklitx-backend

# Update frontend
cd ../frontend
npm install
npm run build
cp -r dist/* /var/www/html/
```

### 6.2 Monitor Application
```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs tasklitx-backend

# Check Nginx status
systemctl status nginx
```

## 📱 Step 8: Mobile Optimization

Your website is already responsive, but you can test it on various devices using:
- Google Mobile-Friendly Test
- Browser DevTools mobile simulation

## 🎯 Important Notes

1. **Replace `yourdomain.com`** with your actual domain
2. **Change JWT_SECRET** to a strong, unique secret
3. **Update MongoDB URI** if using external database
4. **Set up firewall** to only allow necessary ports (22, 80, 443)
5. **Regular backups** of your database and application files
6. **Monitor logs** for any errors or security issues

## 🆘 Troubleshooting

### Common Issues:
- **Port 5000 blocked**: Check firewall settings
- **MongoDB connection failed**: Ensure MongoDB is running
- **Nginx 502 error**: Check if backend is running with PM2
- **SSL issues**: Verify domain DNS settings

### Useful Commands:
```bash
# Check if ports are listening
netstat -tlnp

# Check Nginx error logs
tail -f /var/log/nginx/error.log

# Restart services
systemctl restart nginx
pm2 restart all
```

Your TASKLETIX website should now be live on your Hostinger VPS! 🎉
