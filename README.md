# Project Progress Hub

<div align="center">

**A modern, lightweight project management solution for agile teams**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[Demo](#demo) • [Features](#features) • [Getting Started](#getting-started) • [Documentation](#project-structure)

</div>

---

## 📋 Overview

Project Progress Hub is a streamlined single-page application (SPA) designed to help small teams organize, track, and manage their projects efficiently. Built with modern web technologies, it offers an intuitive interface for task management, team collaboration, and project analytics.

## ✨ Features

### Core Functionality
- 🔐 **Authentication System** - Secure login and registration flows
- 📊 **Kanban Board** - Drag-and-drop task management with visual workflow
- 👥 **Team Management** - Member assignment, role management, and permissions
- 📈 **Analytics Dashboard** - Real-time project insights and progress tracking
- 🎯 **Task Management** - Create, edit, and organize tasks with detailed metadata
- 🔔 **Toast Notifications** - Non-intrusive user feedback system
- 📱 **Responsive Design** - Optimized for desktop and mobile devices

### Technical Highlights
- ⚡ Lightning-fast development with Vite HMR
- 🎨 Modular CSS architecture for maintainable styling
- 🪝 Custom React hooks for clean state management
- 🛠️ ESLint integration for code quality

## 🚀 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18+, JSX |
| **Build Tool** | Vite 5+ |
| **Styling** | CSS Modules, Global CSS |
| **State Management** | React Hooks, Custom State Hook |
| **Code Quality** | ESLint |
| **Package Manager** | npm / yarn / pnpm |

## 🌐 Demo

> 🚧 **Coming Soon** - Live demo will be available on GitHub Pages / Netlify / Vercel

In the meantime, follow the [Getting Started](#getting-started) guide to run locally.

## 🏁 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** / **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/project-progress-hub.git
   cd project-progress-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` (default Vite port)

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint code quality checks |

## 📁 Project Structure

```
project-progress-hub/
├── public/                 # Static assets
│   └── screenshot.png      # App preview image
├── src/
│   ├── assets/            # Images, icons, media files
│   ├── components/        # React components
│   │   ├── Dashboard/     # Main dashboard component
│   │   ├── Sidebar/       # Navigation sidebar
│   │   ├── Board/         # Kanban board view
│   │   ├── Views/         # Primary application views
│   │   └── Modals/        # Modal dialogs (tasks, members)
│   ├── hooks/             # Custom React hooks
│   │   └── useAppState.js # Global state management
│   ├── App.jsx            # Root application component
│   ├── main.jsx           # Application entry point
│   ├── App.css            # Component-specific styles
│   └── index.css          # Global styles
├── eslint.config.js       # ESLint configuration
├── vite.config.js         # Vite configuration
└── package.json           # Project dependencies
```

### Key Directories

- **`src/components/Views`** - Contains primary application views (Board, Overview, Analytics)
- **`src/hooks`** - Custom hooks for state management and side effects
- **`src/components/Modals`** - Reusable modal components for task/member management

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory if you need to configure API endpoints or keys:

```env
VITE_API_URL=https://your-api-endpoint.com
VITE_APP_NAME=Project Progress Hub
```

### Linting

ESLint is pre-configured. Run linting with:

```bash
npm run lint
```

Customize rules in `eslint.config.js` as needed.

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Contribution Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Guidelines

- Follow the existing code style and conventions
- Ensure all tests pass before submitting
- Keep PRs focused on a single feature/fix
- Update documentation for significant changes
- Add comments for complex logic

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- GitHub: https://github.com/samiksha-2005
- Email: samikshagoli2005@gmail.com
- LinkedIn: https://linkedin.com/in/samiksha-goli-08b223357

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing-fast build tool
- All contributors who help improve this project

## 📞 Support

If you have any questions or need help, please:
- Open an [issue](https://github.com/yourusername/project-progress-hub/issues)
- Start a [discussion](https://github.com/yourusername/project-progress-hub/discussions)
- Reach out via email

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by Samiksha

</div>
