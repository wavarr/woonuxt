import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

interface SEOItem {
  provider: string;
  url?: string;
  handle?: string;
}

export const useHelpers = () => {
  const config = useRuntimeConfig();
  const publicConfig = config.public;

  const frontEndUrl = ref(publicConfig.frontendUrl);
  const wooNuxtSEO = ref<SEOItem[]>([]);

  const stripHtml = (html: string): string => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  };

  const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(numPrice);
  };

  const formatDate = (date: string | Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  const truncateText = (text: string, length: number): string => {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
  };

  const slugify = (text: string): string => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  };

  const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  return {
    frontEndUrl,
    wooNuxtSEO,
    stripHtml,
    formatPrice,
    formatDate,
    truncateText,
    slugify,
    debounce
  };
}; 
