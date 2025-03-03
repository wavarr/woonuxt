import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

interface ImageSize {
  width: number;
  height: number;
}

interface ImageSizes {
  src: string;
  width: number;
  height: number;
}

interface ImageOptions extends ImageSize {
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  fit?: 'cover' | 'contain' | 'fill';
}

export const useImage = () => {
  const config = useRuntimeConfig();
  const publicConfig = config.public;

  const getSizes = (url: string, options: ImageOptions): ImageSizes | null => {
    if (!url) return null;
    
    // Ensure URL is absolute
    const absoluteUrl = url.startsWith('http') ? url : `${publicConfig.frontendUrl}${url}`;
    
    // For now, return the original URL with the requested dimensions
    // In a real implementation, this would handle image resizing and optimization
    return {
      src: absoluteUrl,
      width: options.width,
      height: options.height
    };
  };

  const getResponsiveSizes = (url: string, sizes: ImageSize[]): ImageSizes[] => {
    if (!url) return [];
    
    return sizes.map(size => ({
      src: getSizes(url, size)?.src || '',
      width: size.width,
      height: size.height
    })).filter(img => img.src);
  };

  const getPlaceholder = (width: number, height: number): string => {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='%23f3f4f6'/%3E%3C/svg%3E`;
  };

  return {
    getSizes,
    getResponsiveSizes,
    getPlaceholder
  };
}; 
