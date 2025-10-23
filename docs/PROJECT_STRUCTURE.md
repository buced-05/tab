# Project Structure

This document outlines the organized structure of the BEST TUU project.

## 📁 Root Directory

```
best/
├── config/                 # Configuration files
│   ├── ecosystem.config.js # PM2 configuration
│   ├── eslint.config.js    # ESLint configuration
│   ├── postcss.config.js   # PostCSS configuration
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   └── vite.config.js      # Vite build configuration
├── docs/                   # Documentation
│   ├── PROJECT_STRUCTURE.md
│   └── LISTES DE PRODUITS DU SONDAGE.docx
├── scripts/                # Utility scripts
│   └── clear-browser-data.bat
├── src/                    # Source code
├── bestserver/             # Backend server (if needed)
├── public/                # Static assets
├── dist/                  # Build output
├── node_modules/          # Dependencies
├── package.json           # Project configuration
├── package-lock.json      # Dependency lock file
├── README.md              # Project documentation
├── LICENSE                # License file
├── index.html             # Main HTML file
└── .gitignore             # Git ignore rules
```

## 📁 Source Code Structure (`src/`)

```
src/
├── components/            # Reusable UI components
│   ├── ModernUI/         # Modern UI component library
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── LazyImage.jsx
│   │   └── Modal.jsx
│   ├── index.js          # Component exports
│   ├── Header.jsx        # Main navigation
│   ├── Footer.jsx        # Site footer
│   ├── ProductCard.jsx   # Product display
│   ├── ProductList.jsx   # Product listing
│   ├── QuickViewModal.jsx # Product quick view
│   ├── StarRating.jsx    # Rating component
│   └── ...               # Other components
├── pages/                # Page components
│   ├── index.js          # Page exports
│   ├── Home.jsx          # Landing page
│   ├── Products.jsx      # Product listing page
│   ├── ProductDetail.jsx # Individual product page
│   ├── HelpCenter.jsx    # Help and support
│   ├── ContactUs.jsx     # Contact form
│   └── ...               # Other pages
├── services/             # API and business logic
│   ├── index.js          # Service exports
│   ├── api.js            # Main API service
│   ├── affiliateService.js # Affiliate management
│   ├── clickTrackingService.js # Click tracking
│   └── errorService.js   # Error handling
├── utils/                # Utility functions
│   ├── index.js          # Utility exports
│   ├── currency.js       # Currency handling
│   ├── numberFormatter.js # Number formatting
│   ├── productTranslations.js # Product translations
│   ├── redirectUtils.js  # URL redirection
│   └── sampleData.js     # Sample product data
├── contexts/             # React contexts
│   ├── index.js          # Context exports
│   ├── LoadingContext.jsx # Loading state
│   └── ModalContext.jsx  # Modal state
├── hooks/                # Custom React hooks
│   ├── index.js          # Hook exports
│   ├── useApiError.js    # API error handling
│   └── useDeviceNavigation.js # Device navigation
├── styles/               # CSS stylesheets
│   ├── index.css         # Consolidated styles
│   ├── variables.css     # CSS variables
│   ├── header.css        # Header styles
│   ├── footer.css        # Footer styles
│   ├── product-cards.css # Product card styles
│   └── ...               # Other style files
├── i18n/                 # Internationalization
│   ├── index.js          # i18n configuration
│   ├── modernI18n.js     # Modern i18n setup
│   └── locales/          # Translation files
│       ├── en-complete.json
│       ├── fr-complete.json
│       └── ...           # Other language files
├── config/               # App configuration
│   └── api.js            # API configuration
├── assets/               # Static assets
├── App.jsx               # Main app component
├── App.css               # Main app styles
├── main.jsx              # App entry point
└── index.css             # Global styles
```

## 📁 Backend Server Structure (`bestserver/`)

```
bestserver/
├── config/               # Server configuration
│   └── config.js          # Server configuration
├── data/                 # Data files
│   └── products.json     # Product data
├── models/               # Data models
│   ├── Product.js        # Product model
│   └── AffiliateClick.js # Affiliate click model
├── routes/               # API routes
│   ├── index.js          # Main routes
│   ├── products.js       # Product routes
│   └── affiliate.js      # Affiliate routes
├── add-*.js              # Product addition scripts
├── app.js                # Main server file
├── config.js             # Server configuration
├── package.json          # Server dependencies
└── README.md             # Server documentation
```

## 🎯 Key Features

### Component Organization
- **ModernUI/**: Reusable UI components with consistent design
- **Core Components**: Header, Footer, ProductCard, etc.
- **Specialized Components**: AffiliateLinks, ClickStats, etc.

### Service Layer
- **API Service**: Centralized API communication
- **Affiliate Service**: Affiliate link management
- **Error Service**: Comprehensive error handling

### Utility Functions
- **Currency**: Multi-currency support
- **Formatting**: Number and text formatting
- **Translations**: Product translation utilities
- **Redirects**: Safe URL redirection

### Styling
- **Modular CSS**: Component-specific stylesheets
- **Variables**: Centralized CSS variables
- **Responsive**: Mobile-first responsive design

## 🚀 Development Workflow

1. **Components**: Add new components to `src/components/`
2. **Pages**: Add new pages to `src/pages/`
3. **Services**: Add new services to `src/services/`
4. **Styles**: Add new styles to `src/styles/`
5. **Utils**: Add utility functions to `src/utils/`

## 📝 Configuration

- **Vite**: `config/vite.config.js`
- **ESLint**: `config/eslint.config.js`
- **Tailwind**: `config/tailwind.config.js`
- **PostCSS**: `config/postcss.config.js`

This structure provides a clean, maintainable, and scalable codebase for the BEST TUU project.




