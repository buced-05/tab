# BEST - TUU Project

A modern, clean marketplace application built with React and Vite.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
best/
├── config/             # Configuration files
│   ├── vite.config.js  # Vite build configuration
│   ├── eslint.config.js # ESLint configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── postcss.config.js # PostCSS configuration
├── docs/               # Documentation
│   ├── PROJECT_STRUCTURE.md
│   └── LISTES DE PRODUITS DU SONDAGE.docx
├── scripts/            # Utility scripts
│   └── clear-browser-data.bat
├── src/                # Source code
│   ├── components/     # Reusable UI components
│   │   ├── ModernUI/   # Modern UI component library
│   │   └── index.js    # Component exports
│   ├── pages/          # Page components
│   │   └── index.js    # Page exports
│   ├── services/       # API and business logic
│   │   └── index.js    # Service exports
│   ├── utils/          # Utility functions
│   │   └── index.js    # Utility exports
│   ├── contexts/       # React contexts
│   │   └── index.js    # Context exports
│   ├── hooks/          # Custom React hooks
│   │   └── index.js    # Hook exports
│   ├── styles/         # CSS stylesheets
│   │   └── index.css   # Consolidated styles
│   ├── i18n/           # Internationalization
│   │   └── locales/    # Translation files
│   └── assets/         # Static assets
├── bestserver/          # Backend server (optional)
├── public/             # Static public assets
└── dist/               # Build output
```

## 🛠️ Features

- **Modern React Architecture**: Built with React 18 and modern hooks
- **Responsive Design**: Mobile-first responsive design
- **Internationalization**: Multi-language support (French, English, etc.)
- **Product Management**: Product browsing, search, and filtering
- **Affiliate Integration**: Built-in affiliate link management
- **Error Handling**: Comprehensive error boundaries and handling
- **Performance Optimized**: Lazy loading and performance monitoring

## 🎨 Components

### Core Components
- `Header` - Main navigation header
- `Footer` - Site footer
- `ProductCard` - Individual product display
- `ProductList` - Product grid/list view
- `QuickViewModal` - Product quick view modal

### UI Components
- `ModalManager` - Modal system management
- `CurrencySelector` - Currency selection
- `LanguageSelector` - Language selection
- `StarRating` - Product rating display

## 🔧 Services

- `api.js` - Main API service with product and affiliate APIs
- `affiliateService.js` - Affiliate link management
- `clickTrackingService.js` - Click tracking and analytics
- `errorService.js` - Error handling and logging

## 📱 Pages

- `Home` - Landing page
- `Products` - Product listing page
- `ProductDetail` - Individual product page
- `HelpCenter` - Help and support
- `ContactUs` - Contact form
- Legal pages (Privacy, Terms, etc.)

## 🌐 Internationalization

The app supports multiple languages with French as the default. Translation files are located in `src/i18n/locales/`.

## 🎯 Development

### Adding New Components
1. Create component in `src/components/`
2. Export from `src/components/index.js`
3. Import using: `import { ComponentName } from './components'`

### Adding New Pages
1. Create page in `src/pages/`
2. Export from `src/pages/index.js`
3. Add route in `src/App.jsx`

### Adding New Services
1. Create service in `src/services/`
2. Export from `src/services/index.js`
3. Import using: `import { serviceName } from './services'`

## 🚀 Deployment

The app is configured for easy deployment with:
- Vite build system
- Optimized production builds
- Static file serving ready

## 📄 License

This project is part of the BEST TUU initiative.