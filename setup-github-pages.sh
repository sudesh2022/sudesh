#!/bin/bash

# Portfolio GitHub Pages Setup Script
# This script helps you publish your portfolio to GitHub Pages

echo "🚀 Portfolio GitHub Pages Setup"
echo "================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first:"
    echo "   https://git-scm.com/downloads"
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Check if already initialized
if [ -d ".git" ]; then
    echo "⚠️  Git repository already initialized"
    echo ""
    read -p "Do you want to reinitialize? (y/N): " reinit
    if [[ $reinit =~ ^[Yy]$ ]]; then
        rm -rf .git
        echo "✅ Removed existing git repository"
    else
        echo "Skipping initialization..."
        exit 0
    fi
fi

# Get GitHub username
echo "Please enter your GitHub information:"
read -p "GitHub username: " github_user

if [ -z "$github_user" ]; then
    echo "❌ GitHub username is required"
    exit 1
fi

# Get repository name
read -p "Repository name (default: googlecode): " repo_name
repo_name=${repo_name:-googlecode}

echo ""
echo "📝 Summary:"
echo "   GitHub User: $github_user"
echo "   Repository: $repo_name"
echo "   URL will be: https://$github_user.github.io/$repo_name/"
echo ""

read -p "Continue? (Y/n): " confirm
if [[ $confirm =~ ^[Nn]$ ]]; then
    echo "Cancelled."
    exit 0
fi

echo ""
echo "🔧 Initializing git repository..."
git init

echo "📦 Adding files..."
git add .

echo "💾 Creating initial commit..."
git commit -m "Initial commit: Portfolio website"

echo "🔗 Adding remote repository..."
git remote add origin "https://github.com/$github_user/$repo_name.git"

echo "📤 Pushing to GitHub..."
git branch -M main

echo ""
echo "⚠️  IMPORTANT: Before pushing, make sure you have:"
echo "   1. Created the repository '$repo_name' on GitHub"
echo "   2. Set it to Public (required for free GitHub Pages)"
echo ""

read -p "Have you created the repository on GitHub? (Y/n): " created
if [[ $created =~ ^[Nn]$ ]]; then
    echo ""
    echo "Please create the repository first:"
    echo "   1. Go to https://github.com/new"
    echo "   2. Repository name: $repo_name"
    echo "   3. Make it Public"
    echo "   4. Do NOT initialize with README"
    echo "   5. Click 'Create repository'"
    echo ""
    echo "Then run this script again or manually run:"
    echo "   git push -u origin main"
    exit 0
fi

echo ""
echo "🚀 Pushing to GitHub..."
if git push -u origin main; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Go to https://github.com/$github_user/$repo_name/settings/pages"
    echo "   2. Under 'Source', select 'Deploy from a branch'"
    echo "   3. Select branch 'main' and folder '/ (root)'"
    echo "   4. Click 'Save'"
    echo ""
    echo "⏳ Your site will be live in 1-2 minutes at:"
    echo "   https://$github_user.github.io/$repo_name/"
    echo ""
    echo "🎉 Done!"
else
    echo ""
    echo "❌ Push failed. This might be because:"
    echo "   1. The repository doesn't exist on GitHub"
    echo "   2. You don't have permission to push"
    echo "   3. Authentication failed"
    echo ""
    echo "Please check and try again with:"
    echo "   git push -u origin main"
fi
