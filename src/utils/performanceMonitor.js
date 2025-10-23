// Advanced Performance Monitoring System
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      pageLoad: {},
      userInteractions: [],
      resourceTimings: [],
      memoryUsage: [],
      networkRequests: [],
      errors: []
    };
    
    this.thresholds = {
      pageLoad: 3000, // 3 seconds
      apiResponse: 2000, // 2 seconds
      memoryUsage: 100, // 100MB
      longTask: 50 // 50ms
    };
    
    this.isMonitoring = false;
    this.observer = null;
    
    this.initializeMonitoring();
  }

  initializeMonitoring() {
    // Monitor page load performance
    this.monitorPageLoad();
    
    // Monitor user interactions
    this.monitorUserInteractions();
    
    // Monitor resource loading
    this.monitorResourceTimings();
    
    // Monitor memory usage
    this.monitorMemoryUsage();
    
    // Monitor network requests
    this.monitorNetworkRequests();
    
    // Monitor long tasks
    this.monitorLongTasks();
    
    // Monitor Core Web Vitals
    this.monitorCoreWebVitals();
  }

  monitorPageLoad() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.navigationStart;
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.navigationStart;
          const firstPaint = this.getFirstPaint();
          const firstContentfulPaint = this.getFirstContentfulPaint();
          
          this.metrics.pageLoad = {
            loadTime,
            domContentLoaded,
            firstPaint,
            firstContentfulPaint,
            timestamp: Date.now(),
            url: window.location.href
          };
          
          // Check if load time exceeds threshold
          if (loadTime > this.thresholds.pageLoad) {
            this.reportPerformanceIssue('slow_page_load', {
              loadTime,
              threshold: this.thresholds.pageLoad,
              url: window.location.href
            });
          }
          
          // Log to console in development
          if (process.env.NODE_ENV === 'development') {
            console.log('Page Load Performance:', this.metrics.pageLoad);
          }
        }
      }, 1000);
    });
  }

  getFirstPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? firstPaint.startTime : null;
  }

  getFirstContentfulPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return firstContentfulPaint ? firstContentfulPaint.startTime : null;
  }

  monitorUserInteractions() {
    const interactionTypes = ['click', 'scroll', 'keydown', 'touchstart'];
    
    interactionTypes.forEach(type => {
      document.addEventListener(type, (event) => {
        const interaction = {
          type,
          timestamp: Date.now(),
          target: event.target.tagName,
          x: event.clientX || 0,
          y: event.clientY || 0,
          url: window.location.href
        };
        
        this.metrics.userInteractions.push(interaction);
        
        // Keep only last 100 interactions
        if (this.metrics.userInteractions.length > 100) {
          this.metrics.userInteractions = this.metrics.userInteractions.slice(-100);
        }
      }, { passive: true });
    });
  }

  monitorResourceTimings() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resourceTiming = {
            name: entry.name,
            duration: entry.duration,
            size: entry.transferSize || 0,
            type: this.getResourceType(entry.name),
            timestamp: Date.now()
          };
          
          this.metrics.resourceTimings.push(resourceTiming);
          
          // Check for slow resources
          if (entry.duration > 2000) { // 2 seconds
            this.reportPerformanceIssue('slow_resource', {
              name: entry.name,
              duration: entry.duration,
              size: entry.transferSize
            });
          }
        }
      }
    });
    
    observer.observe({ entryTypes: ['resource'] });
  }

  getResourceType(url) {
    if (url.includes('.js')) return 'script';
    if (url.includes('.css')) return 'stylesheet';
    if (url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg') || url.includes('.gif') || url.includes('.webp')) return 'image';
    if (url.includes('.woff') || url.includes('.ttf') || url.includes('.otf')) return 'font';
    return 'other';
  }

  monitorMemoryUsage() {
    if (!performance.memory) return;
    
    const checkMemory = () => {
      const memory = performance.memory;
      const memoryData = {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024), // MB
        timestamp: Date.now()
      };
      
      this.metrics.memoryUsage.push(memoryData);
      
      // Keep only last 50 measurements
      if (this.metrics.memoryUsage.length > 50) {
        this.metrics.memoryUsage = this.metrics.memoryUsage.slice(-50);
      }
      
      // Check for high memory usage
      if (memoryData.used > this.thresholds.memoryUsage) {
        this.reportPerformanceIssue('high_memory_usage', {
          used: memoryData.used,
          limit: memoryData.limit,
          threshold: this.thresholds.memoryUsage
        });
      }
    };
    
    // Check memory every 30 seconds
    setInterval(checkMemory, 30000);
    checkMemory(); // Initial check
  }

  monitorNetworkRequests() {
    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const url = args[0];
      
      try {
        const response = await originalFetch(...args);
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        const requestData = {
          url: url.toString(),
          method: 'GET', // Default, could be enhanced
          duration,
          status: response.status,
          timestamp: Date.now()
        };
        
        this.metrics.networkRequests.push(requestData);
        
        // Check for slow API responses
        if (duration > this.thresholds.apiResponse) {
          this.reportPerformanceIssue('slow_api_response', {
            url: url.toString(),
            duration,
            status: response.status,
            threshold: this.thresholds.apiResponse
          });
        }
        
        return response;
      } catch (error) {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        this.reportPerformanceIssue('network_error', {
          url: url.toString(),
          duration,
          error: error.message
        });
        
        throw error;
      }
    };
  }

  monitorLongTasks() {
    if (!('PerformanceObserver' in window)) return;
    
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > this.thresholds.longTask) {
            this.reportPerformanceIssue('long_task', {
              duration: entry.duration,
              startTime: entry.startTime,
              threshold: this.thresholds.longTask
            });
          }
        }
      });
      
      observer.observe({ entryTypes: ['longtask'] });
    } catch (error) {
      console.warn('Long task monitoring not supported:', error);
    }
  }

  monitorCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    this.observeLCP();
    
    // First Input Delay (FID)
    this.observeFID();
    
    // Cumulative Layout Shift (CLS)
    this.observeCLS();
  }

  observeLCP() {
    if (!('PerformanceObserver' in window)) return;
    
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        this.reportCoreWebVital('LCP', lastEntry.startTime);
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      console.warn('LCP monitoring not supported:', error);
    }
  }

  observeFID() {
    if (!('PerformanceObserver' in window)) return;
    
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.reportCoreWebVital('FID', entry.processingStart - entry.startTime);
        }
      });
      
      observer.observe({ entryTypes: ['first-input'] });
    } catch (error) {
      console.warn('FID monitoring not supported:', error);
    }
  }

  observeCLS() {
    if (!('PerformanceObserver' in window)) return;
    
    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        
        this.reportCoreWebVital('CLS', clsValue);
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('CLS monitoring not supported:', error);
    }
  }

  reportPerformanceIssue(type, data) {
    const issue = {
      type,
      data,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };
    
    this.metrics.errors.push(issue);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Performance Issue:', issue);
    }
    
    // Send to error monitoring service
    this.sendToMonitoringService(issue);
  }

  reportCoreWebVital(metric, value) {
    const vital = {
      metric,
      value,
      timestamp: Date.now(),
      url: window.location.href
    };
    
    // Only log critical Core Web Vitals in development
    if (process.env.NODE_ENV === 'development' && (metric === 'LCP' || metric === 'FID' || metric === 'CLS')) {
      console.log('Core Web Vital:', vital);
    }
    
    // Send to monitoring service
    this.sendToMonitoringService(vital);
  }

  async sendToMonitoringService(data) {
    // Skip sending data in development mode or if no backend is available
    if (process.env.NODE_ENV === 'development' || window.location.hostname.includes('localhost')) {
      // Only log in development if it's important
      if (data.type === 'error') {
        console.log('Performance data (development mode):', data);
      }
      return;
    }

    try {
      await fetch('/api/errors/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          id: `perf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date().toISOString(),
          type: 'performance_issue',
          message: `Performance issue: ${data.type || data.metric}`,
          severity: 'medium',
          sessionId: this.getSessionId(),
          userId: localStorage.getItem('userId') || 'anonymous',
          url: window.location.href,
          userAgent: navigator.userAgent,
          performance: data
        })
      });
    } catch (error) {
      console.warn('Failed to send performance data:', error);
    }
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  // Public methods
  getMetrics() {
    return {
      ...this.metrics,
      summary: this.getSummary()
    };
  }

  getSummary() {
    const recentInteractions = this.metrics.userInteractions.slice(-10);
    const recentMemory = this.metrics.memoryUsage.slice(-5);
    const recentRequests = this.metrics.networkRequests.slice(-10);
    
    return {
      totalInteractions: this.metrics.userInteractions.length,
      recentInteractions: recentInteractions.length,
      averageMemoryUsage: recentMemory.length > 0 
        ? Math.round(recentMemory.reduce((sum, m) => sum + m.used, 0) / recentMemory.length)
        : 0,
      averageRequestTime: recentRequests.length > 0
        ? Math.round(recentRequests.reduce((sum, r) => sum + r.duration, 0) / recentRequests.length)
        : 0,
      performanceIssues: this.metrics.errors.length
    };
  }

  clearMetrics() {
    this.metrics = {
      pageLoad: {},
      userInteractions: [],
      resourceTimings: [],
      memoryUsage: [],
      networkRequests: [],
      errors: []
    };
  }

  setThresholds(newThresholds) {
    this.thresholds = { ...this.thresholds, ...newThresholds };
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

// Export for use in components
export default performanceMonitor;

// Global performance monitoring functions
export const getPerformanceMetrics = () => performanceMonitor.getMetrics();
export const getPerformanceSummary = () => performanceMonitor.getSummary();
export const clearPerformanceMetrics = () => performanceMonitor.clearMetrics();
export const setPerformanceThresholds = (thresholds) => performanceMonitor.setThresholds(thresholds);














