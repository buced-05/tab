# Development Guide

This guide provides instructions for developing and maintaining the AdsMarket TUU project.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd tbr

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠️ Development Commands

```bash
# Development server (with new config path)
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview

# Start backend server (if needed)
npm run server

# Start both frontend and backend
npm run start:all
```

## 📁 File Organization

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

### Adding New Utilities
1. Create utility in `src/utils/`
2. Export from `src/utils/index.js`
3. Import using: `import { utilityName } from './utils'`

## 🎨 Styling Guidelines

### CSS Organization
- Use `src/styles/index.css` for consolidated imports
- Create component-specific CSS files in `src/styles/`
- Use CSS variables defined in `src/styles/variables.css`

### Component Styling
```jsx
// Import styles at component level
import './ComponentName.css';

// Or use the consolidated styles
import '../styles/index.css';
```

## 🌐 Internationalization

### Adding Translations
1. Add translations to `src/i18n/locales/[language]-complete.json`
2. Use the `useTranslation` hook in components:
```jsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  return <h1>{t('common.welcome')}</h1>;
};
```

## 🔧 Configuration

### Vite Configuration
- Located in `config/vite.config.js`
- Optimized for React and modern browsers
- Includes build optimizations and chunk splitting

### ESLint Configuration
- Located in `config/eslint.config.js`
- Enforces React best practices
- Includes accessibility rules

### Tailwind Configuration
- Located in `config/tailwind.config.js`
- Custom theme and utilities
- Optimized for the project's design system

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Create `.env` files for different environments:
- `.env.local` - Local development
- `.env.production` - Production deployment

### Static Hosting
The built files in `dist/` can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🐛 Debugging

### Development Tools
- React Developer Tools
- Redux DevTools (if using Redux)
- Network tab for API debugging

### Error Handling
- Global error boundary in `src/components/ErrorBoundary.jsx`
- Error logging in `src/services/errorService.js`
- Toast notifications for user feedback

## 📝 Code Standards

### JavaScript/React
- Use functional components with hooks
- Follow React best practices
- Use TypeScript for type safety (if enabled)

### CSS
- Use CSS modules or styled-components
- Follow BEM naming convention
- Mobile-first responsive design

### Git
- Use conventional commit messages
- Create feature branches
- Keep commits atomic and focused

## 🔍 Testing

### Component Testing
```bash
# Run tests (if test setup exists)
npm test

# Run tests in watch mode
npm run test:watch
```

### Manual Testing
- Test on multiple browsers
- Test responsive design on different devices
- Test accessibility with screen readers

## 📚 Resources

- [React Documentation](https://reactjs.org/docs)
- [Vite Documentation](https://vitejs.dev/guide)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [i18next Documentation](https://www.i18next.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or issues:
- Check the documentation in `docs/`
- Review existing issues
- Contact the development team




