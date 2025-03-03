import { useRuntimeConfig } from '#app';

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

export const useSeoMeta = (options: SeoMetaOptions) => {
  const config = useRuntimeConfig();
  const publicConfig = config.public;

  // Default values
  const defaults = {
    title: publicConfig.siteTitle,
    description: publicConfig.siteDescription,
    ogImage: publicConfig.siteImage,
    twitterCard: 'summary_large_image',
    robots: 'index, follow',
    canonical: typeof window !== 'undefined' ? window.location.href : ''
  };

  // Merge options with defaults
  const meta = {
    ...defaults,
    ...options,
    ogTitle: options.ogTitle || options.title,
    ogDescription: options.ogDescription || options.description
  };

  // Update meta tags
  if (typeof document !== 'undefined') {
    // Title
    document.title = meta.title || '';

    // Description
    updateMetaTag('description', meta.description);
    updateMetaTag('og:description', meta.ogDescription);

    // Title
    updateMetaTag('og:title', meta.ogTitle);
    updateMetaTag('twitter:title', meta.title);

    // Image
    updateMetaTag('og:image', meta.ogImage);
    updateMetaTag('twitter:image', meta.ogImage);

    // Type
    updateMetaTag('og:type', 'website');
    updateMetaTag('twitter:card', meta.twitterCard);

    // URL
    updateMetaTag('og:url', meta.canonical);
    updateMetaTag('twitter:url', meta.canonical);

    // Robots
    updateMetaTag('robots', meta.robots);

    // Article meta
    if (meta.article) {
      updateMetaTag('article:published_time', meta.article.publishedTime);
      updateMetaTag('article:modified_time', meta.article.modifiedTime);
      if (meta.article.authors) {
        meta.article.authors.forEach(author => {
          updateMetaTag('article:author', author);
        });
      }
      if (meta.article.tags) {
        meta.article.tags.forEach(tag => {
          updateMetaTag('article:tag', tag);
        });
      }
    }

    // Alternate languages
    if (meta.alternates) {
      Object.entries(meta.alternates).forEach(([lang, url]) => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = lang;
        link.href = url;
        document.head.appendChild(link);
      });
    }

    // Canonical URL
    if (meta.canonical) {
      const canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = meta.canonical;
      document.head.appendChild(canonicalLink);
    }
  }
};

function updateMetaTag(name: string, content?: string) {
  if (!content) return;

  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
} 
