declare module '~/composables/useHelpers' {
  import { Ref } from 'vue';
  
  interface SEOItem {
    provider: string;
    url?: string;
    handle?: string;
  }

  interface Helpers {
    frontEndUrl: Ref<string>;
    wooNuxtSEO: Ref<SEOItem[]>;
    stripHtml: (html: string) => string;
    formatPrice: (price: number | string) => string;
    formatDate: (date: string | Date) => string;
    truncateText: (text: string, length: number) => string;
    slugify: (text: string) => string;
    debounce: <T extends (...args: any[]) => any>(
      func: T,
      wait: number
    ) => (...args: Parameters<T>) => void;
  }

  export function useHelpers(): Helpers;
}

declare module '~/composables/useImage' {
  interface ImageSize {
    width: number;
    height: number;
  }

  interface ImageOptions extends ImageSize {
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png';
    fit?: 'cover' | 'contain' | 'fill';
  }

  interface ImageSizes {
    src: string;
    width: number;
    height: number;
  }

  interface ImageComposable {
    getSizes: (url: string, options: ImageOptions) => ImageSizes | null;
    getResponsiveSizes: (url: string, sizes: ImageSize[]) => ImageSizes[];
    getPlaceholder: (width: number, height: number) => string;
  }

  export function useImage(): ImageComposable;
}

declare module '~/composables/useAppConfig' {
  import { Ref } from 'vue';

  interface AppConfig {
    siteName: Ref<string>;
    description: Ref<string>;
    shortDescription: Ref<string>;
    siteImage: Ref<string>;
  }

  export function useAppConfig(): AppConfig;
}

declare module '~/composables/useSeoMeta' {
  interface SeoMetaOptions {
    title?: string;
    ogTitle?: string;
    description?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterCard?: string;
    noindex?: boolean;
    canonical?: string;
    alternates?: {
      [key: string]: string;
    };
    robots?: string;
    article?: {
      publishedTime?: string;
      modifiedTime?: string;
      authors?: string[];
      tags?: string[];
    };
  }

  export function useSeoMeta(options: SeoMetaOptions): void;
} 
