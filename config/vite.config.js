import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Optimized Vite configuration for production
export default defineConfig({
  plugins: [
    react({
      // Disable React Fast Refresh for stability
      fastRefresh: false,
      // Optimize JSX runtime
      jsxRuntime: 'automatic'
    })
  ],
  
  server: {
    port: 3000,
    host: true,
    open: true
  },

  // Production build optimization
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild', // Use esbuild instead of terser for better React compatibility
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    
    // Rollup configuration
    rollupOptions: {
      output: {
        // Optimized chunk splitting
        manualChunks: {
          // Core React chunks
          'react-vendor': ['react', 'react-dom'],
          'react-router': ['react-router-dom'],
          
          // UI libraries
          'ui-vendor': ['lucide-react'],
          
          // Utility libraries
          'utils-vendor': [],
          
          // Internationalization
          'i18n-vendor': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          
          // Toast notifications
          'toast-vendor': ['react-hot-toast']
        },
        
        // Optimized file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        
        // Asset optimization
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          if (/\.(css)$/.test(assetInfo.name)) {
            return `assets/css/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|svg|gif|webp|avif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash].${ext}`;
          }
          return `assets/[ext]/[name]-[hash].${ext}`;
        }
      }
    }
  },

  // Dependency optimization
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'lucide-react', 
      'i18next',
      'react-i18next',
      'i18next-browser-languagedetector',
      'react-hot-toast'
    ],
    force: true
  },

  // CSS optimization
  css: {
    devSourcemap: false
  },

  // Asset handling
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp', '**/*.avif'],

  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  },

  // ESBuild optimization
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    target: 'es2020',
    jsx: 'automatic',
    jsxDev: false
  },

  // Base configuration
  base: './',

  // Performance optimization
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@styles': '/src/styles',
      '@services': '/src/services',
      '@utils': '/src/utils',
      '@contexts': '/src/contexts',
      '@hooks': '/src/hooks',
      '@router': '/src/router',
      '@assets': '/src/assets'
    }
  },

  // Preview server
  preview: {
    port: 3000,
    host: true,
    open: true
  }
})