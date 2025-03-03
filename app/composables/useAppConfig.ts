import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

export const useAppConfig = () => {
  const config = useRuntimeConfig();
  const publicConfig = config.public;

  const siteName = ref(publicConfig.siteTitle);
  const description = ref(publicConfig.siteDescription);
  const shortDescription = ref(publicConfig.siteShortDescription);
  const siteImage = ref(publicConfig.siteImage);

  return {
    siteName,
    description,
    shortDescription,
    siteImage
  };
}; 
