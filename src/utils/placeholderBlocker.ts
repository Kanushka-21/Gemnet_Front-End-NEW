// Global image error handler to prevent placeholder image loops
// This file should be imported early in the application

// Override all placeholder URLs with local alternatives
const originalImage = window.Image;

// Intercept Image constructor to replace placeholder URLs
window.Image = function(width?: number, height?: number) {
  const img = new originalImage(width, height);
  
  const originalSrcSetter = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src')?.set;
  
  if (originalSrcSetter) {
    Object.defineProperty(img, 'src', {
      set: function(value: string) {
        // Check if it's a via.placeholder.com URL and replace it
        if (typeof value === 'string' && value.includes('via.placeholder.com')) {
          console.warn('Blocked placeholder.com request:', value);
          // Replace with a simple data URI
          const dataUri = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMThweCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdlbSBJbWFnZTwvdGV4dD48L3N2Zz4=';
          originalSrcSetter!.call(this, dataUri);
          return;
        }
        originalSrcSetter!.call(this, value);
      },
      get: function() {
        return this.getAttribute('src') || '';
      },
      configurable: true
    });
  }
  
  return img;
} as any;

// Also intercept direct src assignments on existing images
const originalSetAttribute = HTMLImageElement.prototype.setAttribute;
HTMLImageElement.prototype.setAttribute = function(name: string, value: string) {
  if (name === 'src' && typeof value === 'string' && value.includes('via.placeholder.com')) {
    console.warn('Blocked placeholder.com request via setAttribute:', value);
    const dataUri = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMThweCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdlbSBJbWFnZTwvdGV4dD48L3N2Zz4=';
    return originalSetAttribute.call(this, name, dataUri);
  }
  return originalSetAttribute.call(this, name, value);
};

// Also intercept fetch requests to block placeholder URLs
const originalFetch = window.fetch;
window.fetch = function(...args: Parameters<typeof fetch>) {
  const url = args[0];
  if (typeof url === 'string' && url.includes('via.placeholder.com')) {
    console.warn('Blocked placeholder.com fetch request:', url);
    // Return a resolved promise with a fake response
    return Promise.resolve(new Response('', { status: 404, statusText: 'Blocked' }));
  }
  return originalFetch.apply(this, args);
};

// Block XMLHttpRequest as well
const originalXHROpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method: string, url: string | URL, ...args: any[]) {
  if (typeof url === 'string' && url.includes('via.placeholder.com')) {
    console.warn('Blocked placeholder.com XHR request:', url);
    // Replace with a data URI that will fail silently
    url = 'data:,';
  }
  return originalXHROpen.call(this, method, url, ...args);
};

console.log('🚫 Placeholder image blocker loaded - via.placeholder.com requests will be intercepted');
