# 🌿 GreenField AgriTech — Honeypot Project

**Programme:** Cloud Computing, Cyber Security & Ethical Hacking  
**Technology:** HTML, CSS, JavaScript (Static site — GitHub Pages compatible)  
**Project:** Honeypot Network for Agriculture Threat Intelligence

---

## 🚀 Live Demo

After hosting on GitHub Pages, your site will be at:
```
https://YOUR-USERNAME.github.io/greenfield-agritech/
```

---

## 📁 Project Structure

```
greenfield-agritech/
├── index.html              ← Main agriculture website (honeypot trap)
├── css/
│   └── style.css           ← All styles
├── js/
│   ├── main.js             ← Site functionality (weather, sensors, market)
│   └── honeypot.js         ← Silent visitor tracking & logging
├── pages/
│   ├── login.html          ← Farm portal login (honeypot trigger)
│   └── dashboard.html      ← Security dashboard (admin only)
└── README.md
```

---

## 🔐 Dashboard Login Credentials

```
Username: agri_admin
Password: GreenField@2024
```

> ⚠️ Change these in `pages/login.html` before publishing!

---

## 🌐 Hosting on GitHub Pages (Step-by-Step)

### Step 1 — Create GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click **"New repository"**
3. Name it: `greenfield-agritech`
4. Set to **Public**
5. Click **"Create repository"**

### Step 2 — Upload Files
1. Click **"uploading an existing file"** or use **"Add file → Upload files"**
2. Upload ALL files maintaining the folder structure:
   - `index.html` (root)
   - `css/style.css`
   - `js/main.js`
   - `js/honeypot.js`
   - `pages/login.html`
   - `pages/dashboard.html`
3. Commit with message: `Initial honeypot project`

### Step 3 — Enable GitHub Pages
1. Go to your repository **Settings**
2. Scroll to **"Pages"** in the left sidebar
3. Under **Source**, select **"Deploy from a branch"**
4. Select branch: `main`, folder: `/ (root)`
5. Click **Save**
6. Wait 2–5 minutes for deployment

### Step 4 — Access Your Live Site
Your site is now live at:
```
https://YOUR-USERNAME.github.io/greenfield-agritech/
```

Share this URL with anyone to test the honeypot!

---

## 🧠 How the Honeypot Works

| Page | What Visitors See | What Actually Happens |
|---|---|---|
| `index.html` | Professional agriculture website | Silently logs visit, browser, OS, timezone |
| `pages/login.html` | Realistic farm portal login | Logs every login attempt with username tried |
| `pages/dashboard.html` | Admin security dashboard | Shows all logged threat data in real-time |

### Data Captured per Visitor:
- Timestamp of visit
- Which page they visited
- Browser type (Chrome, Firefox, Safari, etc.)
- Operating system (Windows, Android, iOS, etc.)
- Screen resolution
- Language settings
- Timezone (approximate location)
- Whether they used a mobile/touch device
- Time spent on page
- Login attempts (username tried, number of attempts)

---

## 📊 Dashboard Features

- **Overview** — Stats, recent threats, threat gauge, activity chart
- **Threat Log** — Full log table with filtering and CSV export
- **Visitor Intel** — Pages visited, usernames tried, device breakdown
- **Live Sensors** — Simulated IoT farm sensor data feed
- **Alerts** — Security + farm notifications with thresholds
- **Settings** — Configure email/phone alert preferences

---

## 🔔 Adding Real Alerts (Advanced)

For real email/SMS alerts with GitHub Pages (static hosting):

### Email Alerts (Free)
1. Sign up at [emailjs.com](https://emailjs.com)
2. Create a service and email template
3. Add to `js/honeypot.js`:
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
  to_email: 'your@email.com',
  message: `Login attempt: ${username} at ${new Date()}`
});
```

### SMS/WhatsApp (Twilio)
1. Sign up at [twilio.com](https://twilio.com)
2. Use their REST API via a small backend (Vercel/Netlify function)

---

## ⚠️ Ethical Use Notice

This project is for **educational purposes only** as part of a Cyber Security course.  
The honeypot logs visitor data for **academic threat intelligence demonstration**.  
Do not use this on production systems without proper legal authorization.

---

## 👨‍🎓 Project Details

| Field | Details |
|---|---|
| Project Title | Honeypot Network for Agriculture Threat Intelligence |
| Programme | Cloud Computing, Cyber Security & Ethical Hacking |
| Technology | Python (backend), HTML/CSS/JS (frontend) |
| Port Simulated | 8888 (Agriculture IoT Portal) |
| Tools | VS Code, GitHub Pages |
