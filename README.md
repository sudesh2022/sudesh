# Sudesh Kumar Krishnamoorthy - Portfolio Website

A modern, premium portfolio website showcasing 20+ years of expertise in cloud architecture, AI/ML solutions, and technical leadership.

## 🌐 Live Site

Once published, your portfolio will be available at: `https://[your-github-username].github.io/googlecode/`

## ✨ Features

- **Modern Dark Theme** with animated gradient orbs
- **Smooth Animations** with intersection observers
- **Parallax Scrolling** effects
- **3D Tilt Effects** on project cards
- **Responsive Design** for all devices
- **SEO Optimized** with proper meta tags
- **Interactive Elements** including typing animations and stats counter

## 📋 Sections

1. **Hero** - Introduction with key stats
2. **About** - Professional summary and approach
3. **Technical Expertise** - Skills organized by category
4. **Featured Projects** - 6 major enterprise projects
5. **Professional Journey** - Career timeline
6. **Education & Certifications** - Academic background and credentials
7. **Key Achievements** - Notable accomplishments
8. **Contact** - Get in touch section

## 🚀 Publishing to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right and select **"New repository"**
3. Name your repository (e.g., `googlecode` or `portfolio`)
4. Choose **Public** (required for free GitHub Pages)
5. **Do NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**

### Step 2: Initialize Git and Push Your Code

Open Terminal in this directory and run these commands:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Portfolio website"

# Add your GitHub repository as remote (replace with your actual repository URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR-USERNAME` and `YOUR-REPO-NAME`** with your actual GitHub username and repository name.

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select **"Deploy from a branch"**
5. Under **"Branch"**, select **"main"** and **"/ (root)"**
6. Click **"Save"**

### Step 4: Wait for Deployment

- GitHub will automatically build and deploy your site
- This usually takes 1-2 minutes
- You'll see a green checkmark when it's ready
- Your site will be available at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## 🔄 Updating Your Portfolio

After making changes to your portfolio:

```bash
# Add changed files
git add .

# Commit changes
git commit -m "Update portfolio content"

# Push to GitHub
git push
```

GitHub Pages will automatically rebuild and deploy your changes within a few minutes.

## 📁 File Structure

```
googlecode/
├── index.html          # Main HTML file
├── portfolio.css       # Stylesheet
├── portfolio.js        # JavaScript for interactions
├── README.md          # This file
└── .gitignore         # Git ignore file
```

## 🎨 Customization

### Updating Content

- **Personal Information**: Edit the text in `index.html`
- **Colors**: Modify CSS variables in `portfolio.css` (lines 10-50)
- **Projects**: Add/remove project cards in the Projects section of `index.html`
- **Contact Info**: Update email, phone, and LinkedIn in the Contact section

### Changing Colors

In `portfolio.css`, find the `:root` section and modify:

```css
--primary-500: #3b82f6;  /* Main blue color */
--accent-500: #8b5cf6;   /* Purple accent */
```

## 🌟 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript** - Interactive features
- **Google Fonts** - Inter & Space Grotesk

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 📄 License

© 2025 Sudesh Kumar Krishnamoorthy. All rights reserved.

## 🤝 Support

For issues or questions about GitHub Pages, visit:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Community Forum](https://github.community/)

---

**Built with ❤️ using modern web technologies**
