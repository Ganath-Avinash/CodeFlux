# 🏥 Digital Wellness Monitoring Platform

A comprehensive healthcare support system for tracking wellness, appointments, and health data.

## ✨ Features

- 👤 User Authentication (Sign up/Login)
- 📊 Daily Wellness Tracking (Sleep, Activity, Hydration, Mood)
- 📅 Appointment Management
- 📈 Wellness Trends Dashboard
- 🔔 Preventive Care Reminders
- 📁 Health History Logging

## 🚀 Quick Start Guide

### Step 1: Setup Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project named "wellness-platform"
3. Enable **Authentication** → Email/Password
4. Create **Firestore Database** → Test mode
5. Get your config:
   - Click ⚙️ Settings → Project Settings
   - Scroll to "Your apps" → Web icon `</>`
   - Copy the `firebaseConfig` object

### Step 2: Configure Your Project

1. Open `js/firebase-config.js`
2. Replace the placeholder values with your Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Step 3: Deploy to GitHub Pages

#### Option A: Using GitHub Desktop (Easiest)

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Click "File" → "Add Local Repository"
3. Select your `wellness-platform` folder
4. Click "Publish Repository"
5. Go to GitHub.com → Your repository → Settings → Pages
6. Under "Source" select: `main` branch, `/ (root)` folder
7. Click Save
8. Your site will be at: `https://YOUR_USERNAME.github.io/wellness-platform/`

#### Option B: Using Command Line

```bash
# In your project folder
git add .
git commit -m "Initial commit"

# Create repo on GitHub.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/wellness-platform.git
git push -u origin main

# Enable GitHub Pages in repository settings
```

### Step 4: Test Your Application

1. Visit your GitHub Pages URL
2. Sign up with an email and password
3. Start logging wellness data!

## 📁 Project Structure

```
wellness-platform/
├── index.html              # Login/Signup page
├── dashboard.html          # Main dashboard
├── wellness.html           # Daily wellness tracking
├── appointments.html       # Appointment management
├── history.html            # Health history
├── profile.html            # User profile
├── css/
│   └── style.css          # All styles
├── js/
│   ├── firebase-config.js # Firebase setup
│   ├── auth.js            # Authentication
│   ├── dashboard.js       # Dashboard logic
│   ├── wellness.js        # Wellness tracking
│   └── appointments.js    # Appointment logic
└── README.md              # This file
```

## 🔒 Security Notes

**Important:** The current setup uses Firebase test mode, which is NOT secure for production.

### Before Going Live:

1. Update Firestore Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /wellness/{document} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
    match /appointments/{document} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

2. Enable HTTPS (automatically handled by GitHub Pages)
3. Add email verification for new users

## 🛠️ Troubleshooting

### "Firebase is not defined" Error
- Make sure Firebase scripts load BEFORE your custom scripts
- Check that all Firebase CDN links are correct

### Data Not Saving
- Check browser console for errors (F12)
- Verify Firebase config is correct
- Ensure Firestore is in test mode

### Page Not Loading on GitHub Pages
- Wait 5-10 minutes after first deployment
- Check that `index.html` is in the root folder
- Verify GitHub Pages is enabled in settings

## 📱 Browser Compatibility

Works on all modern browsers:
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## 🎨 Customization

### Change Colors
Edit `css/style.css` - look for gradient values:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add More Tracking Fields
1. Add input field in `wellness.html`
2. Update `saveWellness()` function in `js/wellness.js`
3. Update Firestore data structure

## 📞 Support

If you encounter issues:
1. Check browser console (F12)
2. Review Firebase console for errors
3. Verify all files are in correct folders

## 📄 License

Free to use for personal and educational purposes.

---

**Built with:** HTML, CSS, JavaScript, Firebase

**Last Updated:** January 2026# 🏥 Digital Wellness Monitoring Platform

A comprehensive healthcare support system for tracking wellness, appointments, and health data.

## ✨ Features

- 👤 User Authentication (Sign up/Login)
- 📊 Daily Wellness Tracking (Sleep, Activity, Hydration, Mood)
- 📅 Appointment Management
- 📈 Wellness Trends Dashboard
- 🔔 Preventive Care Reminders
- 📁 Health History Logging

## 🚀 Quick Start Guide

### Step 1: Setup Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project named "wellness-platform"
3. Enable **Authentication** → Email/Password
4. Create **Firestore Database** → Test mode
5. Get your config:
   - Click ⚙️ Settings → Project Settings
   - Scroll to "Your apps" → Web icon `</>`
   - Copy the `firebaseConfig` object

### Step 2: Configure Your Project

1. Open `js/firebase-config.js`
2. Replace the placeholder values with your Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Step 3: Deploy to GitHub Pages

#### Option A: Using GitHub Desktop (Easiest)

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Click "File" → "Add Local Repository"
3. Select your `wellness-platform` folder
4. Click "Publish Repository"
5. Go to GitHub.com → Your repository → Settings → Pages
6. Under "Source" select: `main` branch, `/ (root)` folder
7. Click Save
8. Your site will be at: `https://YOUR_USERNAME.github.io/wellness-platform/`

#### Option B: Using Command Line

```bash
# In your project folder
git add .
git commit -m "Initial commit"

# Create repo on GitHub.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/wellness-platform.git
git push -u origin main

# Enable GitHub Pages in repository settings
```

### Step 4: Test Your Application

1. Visit your GitHub Pages URL
2. Sign up with an email and password
3. Start logging wellness data!

## 📁 Project Structure

```
wellness-platform/
├── index.html              # Login/Signup page
├── dashboard.html          # Main dashboard
├── wellness.html           # Daily wellness tracking
├── appointments.html       # Appointment management
├── history.html            # Health history
├── profile.html            # User profile
├── css/
│   └── style.css          # All styles
├── js/
│   ├── firebase-config.js # Firebase setup
│   ├── auth.js            # Authentication
│   ├── dashboard.js       # Dashboard logic
│   ├── wellness.js        # Wellness tracking
│   └── appointments.js    # Appointment logic
└── README.md              # This file
```

## 🔒 Security Notes

**Important:** The current setup uses Firebase test mode, which is NOT secure for production.

### Before Going Live:

1. Update Firestore Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /wellness/{document} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
    match /appointments/{document} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

2. Enable HTTPS (automatically handled by GitHub Pages)
3. Add email verification for new users

## 🛠️ Troubleshooting

### "Firebase is not defined" Error
- Make sure Firebase scripts load BEFORE your custom scripts
- Check that all Firebase CDN links are correct

### Data Not Saving
- Check browser console for errors (F12)
- Verify Firebase config is correct
- Ensure Firestore is in test mode

### Page Not Loading on GitHub Pages
- Wait 5-10 minutes after first deployment
- Check that `index.html` is in the root folder
- Verify GitHub Pages is enabled in settings

## 📱 Browser Compatibility

Works on all modern browsers:
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## 🎨 Customization

### Change Colors
Edit `css/style.css` - look for gradient values:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add More Tracking Fields
1. Add input field in `wellness.html`
2. Update `saveWellness()` function in `js/wellness.js`
3. Update Firestore data structure

## 📞 Support

If you encounter issues:
1. Check browser console (F12)
2. Review Firebase console for errors
3. Verify all files are in correct folders

## 📄 License

Free to use for personal and educational purposes.

---

**Built with:** HTML, CSS, JavaScript, Firebase

**Last Updated:** January 2026