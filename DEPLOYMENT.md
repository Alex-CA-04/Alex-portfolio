# How to Deploy Portfolio Website to Render

## Step 1: Prepare Your Project

✅ Already done! Your files are ready for deployment.

## Step 2: Push to GitHub

1. Go to https://github.com and create account (if you don't have one)

2. Click "New" button to create a new repository
   - Name: `portfolio-website`
   - Make it Public
   - Don't add README or .gitignore (we have them)
   - Click "Create repository"

3. Open terminal in your project folder and run:

```bash
cd "C:\Users\ronal\Desktop\tie company\portfolio-project"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Step 3: Create Render Account

1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (easier) or email

## Step 4: Create MySQL Database on Render

1. In Render dashboard, click "New +" button
2. Select "MySQL"
3. Fill in:
   - Name: `portfolio-db`
   - Database: `portfolio_db`
   - User: `portfolio_user`
   - Region: Choose closest to you
   - Instance Type: Free
4. Click "Create Database"
5. Wait for database to be created (takes 2-3 minutes)
6. **SAVE THESE VALUES** (you'll need them):
   - Hostname
   - Username  
   - Password
   - Database name
   - Internal Database URL

## Step 5: Create Web Service

1. Click "New +" button again
2. Select "Web Service"
3. Connect your GitHub repository:
   - Click "Connect account" if needed
   - Find `portfolio-website` repository
   - Click "Connect"

4. Fill in settings:
   - Name: `portfolio-website`
   - Region: Same as database
   - Branch: `main`
   - Root Directory: Leave empty
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: Free

5. Click "Advanced" button

6. Add Environment Variables (click "Add Environment Variable"):
   ```
   DB_HOST = [your database hostname]
   DB_USER = [your database username]
   DB_PASSWORD = [your database password]
   DB_NAME = portfolio_db
   NODE_ENV = production
   ```

7. Click "Create Web Service"

## Step 6: Setup Database Tables

1. Go back to your MySQL database in Render dashboard
2. Click "Connect" button
3. Copy the external connection string
4. Open MySQL Workbench on your computer
5. Create new connection:
   - Hostname: [from connection string]
   - Port: [from connection string]
   - Username: [from connection string]
   - Password: [from connection string]
6. Run this SQL:

```sql
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Step 7: Test Your Website

1. Wait for deployment to complete (5-10 minutes)
2. Render will show you a URL like: `https://portfolio-website-xxxx.onrender.com`
3. Click the URL to open your website
4. Test the contact form!

## Step 8: Update Frontend URL (If Needed)

If contact form doesn't work:

1. Open `public/script.js`
2. Change this line:
   ```javascript
   fetch('http://localhost:3000/api/contact', {
   ```
   To:
   ```javascript
   fetch('/api/contact', {
   ```

3. Save and push to GitHub:
   ```bash
   git add .
   git commit -m "Fix API URL"
   git push
   ```

4. Render will auto-deploy the update

## Troubleshooting

### Database Connection Error
- Check environment variables are correct
- Make sure database is in same region as web service
- Verify database is running

### Website Not Loading
- Check Render logs (click "Logs" tab)
- Make sure all dependencies installed
- Verify start command is correct

### Form Not Working
- Check browser console for errors
- Make sure API URL is correct (use relative path `/api/contact`)
- Verify database tables exist

## Important Notes

⚠️ **Free Tier Limitations:**
- Website sleeps after 15 minutes of inactivity
- First load after sleeping takes 30-60 seconds
- 750 hours/month free (enough for one service)

💡 **Tips:**
- Keep your database password secure
- Don't commit passwords to GitHub
- Free database has 1GB storage limit

## Your Website URLs

Once deployed, save these:
- Website: `https://portfolio-website-xxxx.onrender.com`
- Database: Internal URL from Render dashboard

## Need Help?

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- Check Render logs for errors

---

**Congratulations! Your portfolio is now live! 🎉**
