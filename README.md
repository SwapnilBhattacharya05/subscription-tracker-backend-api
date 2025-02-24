# 📝 Subscription Tracker API

Built a production ready Subscription Management System API. It handles real users, real money and real business logic. Authenticating users via JWTs, connect mongoDB to store data, Use of QStash Workflow API to send email reminders based on renewal date. Security integration with Arcjet

## ✏️ Tech Stack

[![NodeJS](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](#)  
[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](#)  
[![Upstash](https://img.shields.io/badge/Upstash-000000?style=for-the-badge&logo=upstash&logoColor=white)](#)  
[![Nodemailer](https://img.shields.io/badge/Nodemailer-D2665A?style=for-the-badge&logo=nodemailer&logoColor=white)](#)  
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](#)  
[![Arcjet](https://img.shields.io/badge/Arcjet-000000?style=for-the-badge&logo=arcjet&logoColor=white)](#)

## ⚙️ Features

➡️ Rate Limiting: Implemented rate limiting to prevent abuse of API with Arcjet.
➡️ Database Modeling: MongoDB for efficient data storage.  
➡️ Authentication: JWT-based authentication and user CRUD operations and subscription management.
➡️ Global Error Handling: Input validation and error handling middleware integrated.  
➡️ Logging: Log mechanism for tracking and debugging.  
➡️ Email Reminders: Automated smart email reminders with Upstash workflows and Nodemailer.

## ✨ Quick Start

**Steps to set up the project:**  
_Requirements:_

[![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)](#)  
[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)  
[![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](#)

**Clone Repository**

```bash
git clone https://github.com/SwapnilBhattacharya05/subscription-tracker-backend-api.git
cd subscription-tracker-backend-api
```

**Install Dependencies**

```bash
npm install
```

**Setup Environment Variables**

```bash
# ENVIRONMENT
NODE_ENV='development'

# PORT
PORT=5500
SERVER_URL=http://localhost:5500

# DATABASE
DB_URI=

# JWT AUTH
JWT_SECRET=
JWT_EXPIRES_IN=1d

# ARCJET
ARCJET_KEY=
ARCJET_ENV=development

# UPSTASH
QSTASH_URL=http://localhost:8080
QSTASH_TOKEN=

# NODEMAILER
EMAIL_USER=
EMAIL_PASSWORD=
```

Replace the placeholder values with your actual [Qstash](https://upstash.com) and [Arcjet](https://arcjet.com) credentials.

**Start the App**

```bash
npm run dev
```

Open [Open http://localhost:5500](http://localhost:5500) in your browser or any HTTP client to test the project.

## 🌐Socials

[![Discord](https://img.shields.io/badge/Discord-%237289DA.svg?logo=discord&logoColor=white)](https://discord.gg/https://discord.com/invite/MvRFh7qMvA) [![Facebook](https://img.shields.io/badge/Facebook-%231877F2.svg?logo=Facebook&logoColor=white)](https://facebook.com/swapnil.bhattacharya.39) [![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white)](https://instagram.com/iam___swapnil) [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/swapnil-bhattacharya-357ab527a)
