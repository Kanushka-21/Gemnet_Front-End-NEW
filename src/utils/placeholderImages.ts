// Utility function to create base64 placeholder images
export const createPlaceholderImage = (
  width: number,
  height: number,
  text: string,
  backgroundColor: string = '#e5e7eb',
  textColor: string = '#6b7280'
): string => {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Fill background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);
  
  // Set text style
  const fontSize = Math.min(width, height) / 8;
  ctx.fillStyle = textColor;
  ctx.font = `${fontSize}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Draw text
  ctx.fillText(text, width / 2, height / 2);
  
  // Return base64 data URL
  return canvas.toDataURL('image/png');
};

// Pre-generated placeholder images to avoid repeated canvas operations
export const placeholderImages = {
  gem300x200: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMThweCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdlbSBJbWFnZTwvdGV4dD48L3N2Zz4=',
  gem100x100: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTJweCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdlbTwvdGV4dD48L3N2Zz4=',
  gem800x600: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzZweCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdlbSBJbWFnZTwvdGV4dD48L3N2Zz4=',
  avatar64x64: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiNlNWU3ZWIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0cHgiIGZpbGw9IiM2YjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BVjwvdGV4dD48L3N2Zz4=',
  platform600x400: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjRweCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdlbU5ldCBQbGF0Zm9ybTwvdGV4dD48L3N2Zz4=',
  // Specific gem images with colors
  blueSapphire: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzQxNjlFMSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMThweCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJsdWUgU2FwcGhpcmU8L3RleHQ+PC9zdmc+',
  ruby: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0RDMTQzQyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMThweCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlJ1Ynk8L3RleHQ+PC9zdmc+',
  yellowTopaz: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0ZGRDcwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMThweCIgZmlsbD0iIzMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlllbGxvdyBUb3BhejwvdGV4dD48L3N2Zz4=',
  emerald: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzUwQzg3OCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMThweCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkVtZXJhbGQ8L3RleHQ+PC9zdmc+'
};

// Helper function to get appropriate placeholder
export const getPlaceholderImage = (type: string, size?: string): string => {
  switch (type.toLowerCase()) {
    case 'blue sapphire':
    case 'blue_sapphire':
      return placeholderImages.blueSapphire;
    case 'ruby':
      return placeholderImages.ruby;
    case 'yellow topaz':
    case 'yellow_topaz':
      return placeholderImages.yellowTopaz;
    case 'emerald':
      return placeholderImages.emerald;
    case 'avatar':
      return placeholderImages.avatar64x64;
    case 'platform':
      return placeholderImages.platform600x400;
    default:
      // Default gem image based on size
      if (size === '800x600') return placeholderImages.gem800x600;
      if (size === '100x100' || size === '100') return placeholderImages.gem100x100;
      return placeholderImages.gem300x200;
  }
};

// Error handler for broken images
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>, fallbackType: string = 'gem', size?: string) => {
  const target = event.target as HTMLImageElement;
  
  // Prevent infinite loops by checking if we're already using a placeholder
  if (target.src.startsWith('data:image/svg+xml')) {
    console.warn('Placeholder image failed to load, stopping error handler to prevent infinite loop');
    return;
  }
  
  // Check if we've already tried to fix this image (prevent rapid retries)
  if (target.hasAttribute('data-error-handled')) {
    console.warn('Image error already handled, preventing infinite loop');
    return;
  }
  
  // Mark this image as handled
  target.setAttribute('data-error-handled', 'true');
  
  // Only set placeholder if current src is external URL
  if (target.src.includes('http') || target.src.includes('via.placeholder.com')) {
    const placeholderSrc = getPlaceholderImage(fallbackType, size);
    console.log(`Replacing failed image "${target.src}" with placeholder: ${fallbackType}`);
    target.src = placeholderSrc;
    // Remove the onError handler to prevent further loops
    target.onerror = null;
  }
};
