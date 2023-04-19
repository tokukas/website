/// <reference types="vite/client" />

/**
 * Define the type of env variables.
 */
interface ImportMetaEnv {
  readonly VITE_APP_EMAIL?: string;
  readonly VITE_APP_INSTAGRAM_USERNAME?: string;
  readonly VITE_APP_SHOP_ADDRESS?: string;
  readonly VITE_APP_TELEGRAM_USERNAME?: string;
  readonly VITE_APP_TWITTER_USERNAME?: string;
  readonly VITE_APP_WHATSAPP_NUMBER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
