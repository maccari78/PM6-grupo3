export const getApiUrl = (envVar: string): string => {
    const url = process.env[envVar];
    if (!url) {
      throw new Error(`Environment variable ${envVar} is not set`);
    }
    return url;
  };
  

  export const getApiBaseUrl = (endpoint: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
      throw new Error('Environment variable NEXT_PUBLIC_API_BASE_URL is not set');
    }
    return `${baseUrl}${endpoint}`;
  };
  