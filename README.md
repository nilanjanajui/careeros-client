# 🏙️ CareerOS
## Full-Stack Career Management Platform
A production-grade career platform for job seekers and professionals — AI-inferred job searches, profile management, and a modern dashboard, built on the modern web stack.

[Live Demo](https://careeros-client.vercel.app) | [Server Repo](https://github.com/nilanjanajui/careeros-server)

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### 💡 Why CareerOS?
Most job search platforms stop at basic listings. CareerOS goes further — it's a comprehensive platform with AI-inferred regional job searches, a dynamic profile editor, and interactive analytics dashboards, built to mirror how production career platforms actually work under the hood.

At a glance:

- 🔐 **Auth** Email/password + Google OAuth, JWT-secured APIs
- 💼 **Job Search** Dynamic, AI-inferred regional job searches via Adzuna integration
- 👤 **Profile** Responsive profile editor for managing user details
- 📊 **Dashboards** Modern dashboard with staggered loading and data visualization
- 📱 **UX** Fully responsive, animated with Framer Motion, premium SaaS aesthetic

### 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Styling | Tailwind CSS v4 |
| State Management | Zustand, React Query |
| Animation | Framer Motion |
| Data Viz | Recharts |
| Forms | React Hook Form, Zod |

### ✨ Core Features

#### 🔐 Authentication & Authorization
- Email/password login + Google OAuth
- JWT-secured API layer with protected routes
- Persistent sessions

#### 💼 Job Search Engine
- AI-inferred regional job searches
- Interactive job cards

#### 📊 Dashboard & Profile
- Modern dashboard with Recharts visualizations
- Responsive profile editor
- Staggered loading animations for a premium feel

#### 🎨 Experience
- Mobile-first, fully responsive design
- Framer Motion global route transitions and micro-interactions
- Premium SaaS aesthetic

### 🗂️ Project Structure

```text
src/
├── app/
│   ├── about/           # About page
│   ├── blog/            # Blog page
│   ├── contact/         # Contact page
│   ├── dashboard/       # Main dashboard
│   └── (auth)/          # Auth routes (if applicable)
├── components/          # Reusable UI components
├── context/             # Global state providers
├── hooks/               # Custom React hooks
├── lib/                 # Config & integrations
└── utils/               # Helpers
```

### 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/nilanjanajui/careeros-client.git
cd careeros-client

# Install dependencies
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

```bash
# Run the dev server
npm run dev
```

Visit http://localhost:3000

### 🏆 Project Highlights
- ⚡ Built on Next.js 16 App Router for modern rendering performance
- 🎨 Premium, modern SaaS aesthetic with Framer Motion animations
- 🔍 Dynamic job searches via Adzuna integration
- 📊 Interactive charts and dashboards using Recharts
- 📱 Fully responsive UI across devices

### 🔗 Related Repositories

| Repository | Link |
|---|---|
| 🖥️ Client (this repo) | You're here |
| ⚙️ Server / API | [careeros-server](https://github.com/nilanjanajui/careeros-server) |

### 📄 License
This project was developed for educational and portfolio purposes under the MIT License.

Built with ❤️ using Next.js, React, Tailwind CSS, & Framer Motion
