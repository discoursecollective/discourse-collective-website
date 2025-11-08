# Discourse Collective Casting App - Deployment Guide

This guide will help you deploy your React casting application for **free** using your existing `discoursecollective.co.uk` domain from Squarespace.

## 🎯 Recommended: Netlify Deployment

**Why Netlify?**
- ✅ Free tier with generous limits
- ✅ Easy custom domain setup
- ✅ Automatic HTTPS
- ✅ Continuous deployment from GitHub
- ✅ Great for React applications

---

## 📋 Prerequisites

1. **GitHub Account** (free) - [github.com](https://github.com)
2. **Netlify Account** (free) - [netlify.com](https://netlify.com)
3. **Access to Squarespace DNS** settings

---

## 🚀 Step 1: Prepare Your Application

### 1.1 Build for Production
In your project directory, run:
```bash
npm run build
```
This creates a `dist` folder with production-ready files.

### 1.2 Create GitHub Repository
1. Go to [github.com](https://github.com) and create a new repository
2. Name it: `discourse-collective-casting`
3. Make it public (required for free deployment)

### 1.3 Upload Code to GitHub
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - casting application"

# Add your GitHub repository as origin
git remote add origin https://github.com/discoursecollective/discourse-collective-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🌐 Step 2: Deploy to Netlify

### 2.1 Connect GitHub to Netlify
1. Go to [netlify.com](https://netlify.com) and sign up with GitHub
2. Click "New site from Git"
3. Choose "GitHub" as your provider
4. Select your `discourse-collective-casting` repository

### 2.2 Configure Build Settings
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Branch to deploy**: `main`

### 2.3 Deploy
1. Click "Deploy site"
2. Wait for deployment to complete
3. Note your temporary Netlify URL (e.g., `amazing-app-123456.netlify.app`)

---

## 🔗 Step 3: Connect Your Custom Domain

### 3.1 Add Domain in Netlify
1. In your Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter: `casting.discoursecollective.co.uk` (or your preferred subdomain)
4. Click "Verify"
5. Netlify will show you DNS records to add

### 3.2 Configure Squarespace DNS
1. Log into your Squarespace account
2. Go to Settings → Domains → discoursecollective.co.uk
3. Click "Use Squarespace nameservers" (if not already)
4. Go to "DNS Settings"

### 3.3 Add DNS Records
Add these records in Squarespace DNS:

**For subdomain (recommended):**
```
Type: CNAME
Host: casting
Points to: [your-netlify-url].netlify.app
```

**For main domain (alternative):**
```
Type: A
Host: @
Points to: 75.2.60.5

Type: CNAME  
Host: www
Points to: [your-netlify-url].netlify.app
```

### 3.4 Wait for DNS Propagation
- DNS changes can take 24-48 hours to fully propagate
- Check status at: [whatsmydns.net](https://whatsmydns.net)

---

## ⚡ Alternative Options

### Option 2: Vercel (Also Excellent)
1. Sign up at [vercel.com](https://vercel.com)
2. Connect GitHub repository  
3. Deploy with one click
4. Add custom domain in project settings

### Option 3: GitHub Pages
1. Push code to GitHub
2. Go to repository Settings → Pages
3. Choose source: GitHub Actions
4. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Option 4: Surge.sh (Simple)
```bash
npm install -g surge
npm run build
cd dist
surge
# Follow prompts to deploy
```

---

## 🔧 Domain Configuration Details

### Squarespace DNS Options

**Option A: Subdomain (Easiest)**
- Use: `casting.discoursecollective.co.uk`
- Keep main site on Squarespace
- Add CNAME record only

**Option B: Subdirectory Path**
- Use: `discoursecollective.co.uk/casting`
- Requires Squarespace Business plan
- More complex setup

**Option C: Main Domain**
- Use: `discoursecollective.co.uk`
- Replaces Squarespace site entirely
- Requires A record changes

### Recommended Setup
```
Main Squarespace site: discoursecollective.co.uk
Casting application: casting.discoursecollective.co.uk
```

---

## ✅ Testing Your Deployment

### Pre-deployment Checklist
- [ ] EmailJS credentials are configured
- [ ] Form submission works locally
- [ ] All images/assets load correctly
- [ ] Build command runs without errors
- [ ] `dist` folder contains all necessary files

### Post-deployment Testing
1. Visit your custom domain
2. Test form submission
3. Check email delivery
4. Test on mobile devices
5. Verify all social media links work

---

## 🛠️ Troubleshooting

### Common Issues

**Build Fails**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**EmailJS Not Working**
- Check browser console for errors
- Verify EmailJS credentials in `src/utils/emailService.js`
- Test EmailJS from their dashboard

**DNS Not Resolving**
- Wait 24-48 hours for propagation
- Use [nslookup.io](https://nslookup.io) to check DNS
- Verify DNS records are correctly entered

**404 Errors on Page Refresh**
Add `_redirects` file in your `public` folder:
```
/*    /index.html   200
```

**Images Not Loading**
- Ensure images are in `public` folder
- Use absolute paths starting with `/`
- Check build output includes assets

### Getting Help
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **EmailJS**: [www.emailjs.com/docs](https://www.emailjs.com/docs)

---

## 💰 Cost Breakdown

### Free Tier Limits
- **Netlify**: 100GB bandwidth, 300 build minutes/month
- **Vercel**: 100GB bandwidth, unlimited static deployments  
- **GitHub Pages**: 1GB storage, 100GB bandwidth
- **Surge.sh**: Unlimited static hosting

### When You Might Need to Pay
- High traffic (>100GB/month)
- Need more build minutes
- Want advanced features (forms, analytics)
- Custom serverless functions

---

## 🎉 Final Steps

1. **Update EmailJS template** with your live domain
2. **Test thoroughly** on the live site
3. **Share the URL** with your team
4. **Monitor performance** via hosting platform dashboards

### Your Live URLs
- **Casting App**: `https://casting.discoursecollective.co.uk`
- **Admin Dashboard**: Your hosting platform dashboard
- **EmailJS Dashboard**: Monitor email delivery

---

## 📱 Next Steps (Optional)

### Add Analytics
- Google Analytics 4
- Hotjar for user behavior
- Netlify Analytics (paid)

### Performance Optimization
- Enable compression in hosting settings
- Optimize images with WebP format
- Add service worker for offline access

### Security Enhancements  
- Add form spam protection
- Set up CORS headers
- Enable security headers

---

**🚀 Ready to Deploy!** 

Choose Netlify for the easiest setup, follow the steps above, and your casting application will be live on your custom domain within a few hours!