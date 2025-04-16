
# 🌍 TravelSuggest

**TravelSuggest** is an interactive React application that helps users explore and filter global travel destinations based on climate, type, and budget. Featuring intuitive UI components and elegant design, the app provides details and imagery for each destination with the ability to save favorites for later.

## ✨ Features

- 🔍 **Search** for destinations by name or country  
- 🧭 **Filter** by climate, destination type, and budget  
- ❤️ **Favorite** destinations and store them in local storage  
- 🌤️ Icon-based visual cues for climate and type  
- 📸 High-quality destination photos  
- 🧾 Responsive modal for destination details

## 🛠️ Built With

- **React** (with TypeScript)
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Lucide Icons** for clean, modern icons
- **Local Storage** for favorites persistence

## 📁 Project Structure
travelsuggest/
├── public/                 # Static assets (e.g., images, icons)
│   └── index.html          # HTML template
├── src/                    # Application source code
│   ├── assets/             # Static assets imported into components
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page-level components
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles (Tailwind CSS)
├── .eslintrc.cjs           # ESLint configuration
├── package.json            # Project metadata and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # Project documentation


## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/travelsuggest.git
   cd travelsuggest
npm install
Start the development server:

bash

npm run dev
Open http://localhost:5173 in your browser.

📦 Building for Production

bash
npm run build

📄 License
MIT License. See LICENSE file for details.
