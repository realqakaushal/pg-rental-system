# Git Repository Setup Instructions

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the details:
   - **Repository name**: `pg-rental-system`
   - **Description**: "A modern web application for managing Paying Guest (PG) accommodations"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have them)
5. Click "Create repository"

## Step 2: Link Local Repository to GitHub

After creating the repository on GitHub, run these commands in your terminal:

```bash
# Navigate to project directory
cd /Users/mackbook/hackathon/pg-rental-system

# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/pg-rental-system.git

# Add all files to git
git add .

# Create initial commit
git commit -m "Initial commit: PG Rental Management System

- Full-stack application with React frontend and Node.js backend
- Room browsing and booking functionality
- Multiple payment methods including cash
- User profiles and booking history
- SQLite database for easy setup"

# Push to GitHub
git push -u origin main
```

## Step 3: Verify Upload

1. Refresh your GitHub repository page
2. You should see all the files uploaded
3. The README.md should be displayed on the main page

## Alternative: Using GitHub CLI

If you have GitHub CLI installed:

```bash
# Create repository and push in one command
gh repo create pg-rental-system --public --source=. --remote=origin --push
```

## Files Included

✅ **Source Code**
- Frontend React application
- Backend Node.js/Express API
- Database schema and models

✅ **Documentation**
- README.md - Quick start guide
- PRD.md - Product requirements document
- PROJECT_OVERVIEW.md - Simple project overview
- CONTRIBUTING.md - Contribution guidelines

✅ **Configuration**
- .gitignore - Excludes node_modules, .env, database files
- .env.example - Environment variables template
- package.json files - Dependencies

❌ **Not Included** (for security)
- .env files
- pg_rental.db (SQLite database)
- node_modules directories

## After Upload

1. **Add Topics**: Go to Settings → Add topics like `react`, `nodejs`, `rental-management`, `sqlite`

2. **Set Up GitHub Pages** (optional): 
   - Go to Settings → Pages
   - Deploy documentation

3. **Enable Issues**: Make sure Issues tab is enabled for bug reports

4. **Add Collaborators**: Settings → Manage access → Add people

## Sharing Your Repository

Once uploaded, share your repository with:
```
https://github.com/YOUR_USERNAME/pg-rental-system
```

Anyone can clone and run it using:
```bash
git clone https://github.com/YOUR_USERNAME/pg-rental-system.git
cd pg-rental-system
# Follow README.md instructions
```