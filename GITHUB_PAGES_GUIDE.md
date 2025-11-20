# 📘 GitHub Pages Publishing Guide

## Quick Start (3 Easy Methods)

### Method 1: Automated Script (Recommended) ⚡

Run the setup script in Terminal:

```bash
cd /Users/sudeshkrishnamoorthy/Documents/IBM/2026/googlecode
./setup-github-pages.sh
```

The script will guide you through the entire process!

---

### Method 2: Manual Setup (Step-by-Step) 📝

#### Part A: Create GitHub Repository

1. **Go to GitHub**
   - Visit: https://github.com/new
   - Sign in if needed

2. **Create New Repository**
   - Repository name: `googlecode` (or any name you prefer)
   - Description: "My Professional Portfolio"
   - **Important**: Select **Public** (required for free GitHub Pages)
   - **Do NOT check** "Initialize this repository with a README"
   - Click **"Create repository"**

#### Part B: Push Your Code

Open Terminal and run these commands one by one:

```bash
# Navigate to your project folder
cd /Users/sudeshkrishnamoorthy/Documents/IBM/2026/googlecode

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Portfolio website"

# Add your GitHub repository (REPLACE with your actual username and repo name)
git remote add origin https://github.com/YOUR-USERNAME/googlecode.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Important**: Replace `YOUR-USERNAME` with your actual GitHub username!

#### Part C: Enable GitHub Pages

1. **Go to Repository Settings**
   - Navigate to: `https://github.com/YOUR-USERNAME/googlecode`
   - Click the **"Settings"** tab (top right)

2. **Configure Pages**
   - Scroll down and click **"Pages"** in the left sidebar
   - Under **"Source"**, select **"Deploy from a branch"**
   - Under **"Branch"**:
     - Select: **main**
     - Select: **/ (root)**
   - Click **"Save"**

3. **Wait for Deployment**
   - GitHub will show a message: "Your site is ready to be published"
   - Wait 1-2 minutes for the build to complete
   - Refresh the page to see the live URL
   - Your site will be at: `https://YOUR-USERNAME.github.io/googlecode/`

---

### Method 3: GitHub Desktop (GUI) 🖱️

If you prefer a graphical interface:

1. **Download GitHub Desktop**
   - Visit: https://desktop.github.com/
   - Install and sign in

2. **Create Repository**
   - File → New Repository
   - Name: `googlecode`
   - Local Path: `/Users/sudeshkrishnamoorthy/Documents/IBM/2026/googlecode`
   - Click "Create Repository"

3. **Publish to GitHub**
   - Click "Publish repository" button
   - Uncheck "Keep this code private"
   - Click "Publish Repository"

4. **Enable GitHub Pages**
   - Follow Part C from Method 2 above

---

## 🔄 Updating Your Portfolio

After making changes to your portfolio:

### Using Terminal:

```bash
cd /Users/sudeshkrishnamoorthy/Documents/IBM/2026/googlecode
git add .
git commit -m "Update portfolio content"
git push
```

### Using GitHub Desktop:

1. Open GitHub Desktop
2. Select your repository
3. Review changes in the left panel
4. Add commit message
5. Click "Commit to main"
6. Click "Push origin"

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Repository is created on GitHub
- [ ] Repository is set to **Public**
- [ ] Code is pushed to GitHub (check repository page)
- [ ] GitHub Pages is enabled in Settings → Pages
- [ ] Site builds successfully (green checkmark in Actions tab)
- [ ] Site is accessible at `https://YOUR-USERNAME.github.io/googlecode/`

---

## 🎯 Your Portfolio URL

Once published, your portfolio will be available at:

```
https://YOUR-USERNAME.github.io/googlecode/
```

**Example**: If your GitHub username is `sudeshk`, your URL will be:
```
https://sudeshk.github.io/googlecode/
```

---

## 🐛 Troubleshooting

### Issue: "Permission denied" when pushing

**Solution**: Set up SSH keys or use Personal Access Token
- Guide: https://docs.github.com/en/authentication

### Issue: "Repository not found"

**Solution**: Make sure you created the repository on GitHub first
- The repository name must match exactly

### Issue: Site shows 404

**Solutions**:
1. Wait 2-3 minutes after enabling Pages
2. Check that `index.html` is in the root directory
3. Verify branch is set to `main` in Pages settings
4. Check the Actions tab for build errors

### Issue: Changes not showing

**Solutions**:
1. Clear browser cache (Cmd+Shift+R on Mac)
2. Wait 1-2 minutes for GitHub to rebuild
3. Check if push was successful: `git status`

---

## 📚 Additional Resources

- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **Git Tutorial**: https://git-scm.com/docs/gittutorial
- **GitHub Desktop Guide**: https://docs.github.com/en/desktop

---

## 🎨 Customization Tips

### Change Colors

Edit `portfolio.css` and modify the CSS variables:

```css
:root {
    --primary-500: #3b82f6;  /* Change this for main color */
    --accent-500: #8b5cf6;   /* Change this for accent color */
}
```

### Update Content

Edit `index.html` and find the sections you want to modify:
- Hero section (lines 42-87)
- About section (lines 90-154)
- Projects section (lines 221-376)
- Contact section (lines 559-620)

### Add New Projects

Copy a project card block in `index.html` and modify the content:

```html
<div class="project-card">
    <div class="project-header">
        <!-- Icon and tag -->
    </div>
    <h3 class="project-title">Your Project Name</h3>
    <p class="project-description">Description here</p>
    <ul class="project-highlights">
        <li>Highlight 1</li>
        <li>Highlight 2</li>
    </ul>
</div>
```

---

## 💡 Pro Tips

1. **Custom Domain**: You can use your own domain (e.g., sudeshk.com)
   - Add a `CNAME` file with your domain
   - Configure DNS settings
   - Guide: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

2. **Analytics**: Add Google Analytics to track visitors
   - Add tracking code before `</head>` in `index.html`

3. **SEO**: Your portfolio is already SEO-optimized with:
   - Meta descriptions
   - Semantic HTML
   - Proper heading structure
   - Fast loading times

4. **Share Your Portfolio**:
   - Add to LinkedIn profile
   - Include in email signature
   - Share on social media
   - Add to resume/CV

---

**Need Help?** Check the README.md file or GitHub Pages documentation!
